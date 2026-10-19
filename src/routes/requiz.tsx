import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Star } from "lucide-react";
import { addExp, getState, recordAnswer, DEFAULT_SETTINGS, type State } from "@/lib/store";
import { SpeakButton } from "@/components/speak-button";
import { voiceLangFor } from "@/lib/read-aloud";
import { useSpeech } from "@/hooks/use-speech";
import { LETTERS } from "@/lib/answer-match";
import { answerOutcome } from "@/lib/answer-outcome";
import { answerFormat } from "@/lib/answer-format";

export const Route = createFileRoute("/requiz")({
  head: () => ({
    meta: [
      { title: "Re-quiz — Acelexia" },
      { name: "description", content: "Practise 15 questions from your revision bank. No items allowed — every correct answer earns exp." },
      { property: "og:title", content: "Re-quiz — Acelexia" },
      { property: "og:description", content: "Redo the questions you missed and earn exp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    subject: typeof s.subject === "string" ? s.subject : undefined,
    topic: typeof s.topic === "string" ? s.topic : undefined,
  }),
  component: RequizPage,
});

const QUIZ_SIZE = 15;
const LANG: Record<string, "en-US" | "zh-HK"> = { eng: "en-US", chi: "zh-HK", math: "en-US" };

type QuizItem = { subject: string; topic: string; prompt: string; answer: string; choices?: string[] };

function poolFrom(state: State): QuizItem[] {
  const out: QuizItem[] = [];
  for (const [subject, topics] of Object.entries(state.revision ?? {})) {
    for (const [topic, list] of Object.entries(topics ?? {})) {
      for (const it of list) out.push({ subject, topic, prompt: it.prompt, answer: it.answer, choices: it.choices });
    }
  }
  return out;
}

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function RequizPage() {
  const [pool, setPool] = useState<QuizItem[] | null>(null);
  const [round, setRound] = useState(0);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [wrongFlash, setWrongFlash] = useState(false);
  const [typed, setTyped] = useState("");
  const answeredRef = useRef(false);

  const { subject: onlySubject, topic: onlyTopic } = Route.useSearch();
  useEffect(() => setPool(poolFrom(getState()).filter((q) => (!onlySubject || q.subject === onlySubject) && (!onlyTopic || q.topic === onlyTopic))), [onlySubject, onlyTopic]);

  const quiz = useMemo(() => (pool ? shuffle(pool).slice(0, QUIZ_SIZE) : []), [pool, round]);
  const current = quiz[idx];
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  useEffect(() => { setSettings(getState().settings); }, []);
  const lang = voiceLangFor(current?.subject ?? "eng", settings.language);
  const startedAt = useRef(Date.now());
  useEffect(() => { startedAt.current = Date.now(); },[current]);
  const finished = quiz.length > 0 && idx >= quiz.length;

  const next = useCallback(() => {
    answeredRef.current = false;
    setTranscript("");
    setTyped("");
    setIdx((i) => i + 1);
  }, []);

  const check = useCallback(
    (text: string, spoken = false) => {
      if (!current || answeredRef.current) return;
      const outcome = answerOutcome(text, current.answer, current.choices, spoken);
      if (outcome === "correct") {
        recordAnswer(current.subject, true, Date.now() - startedAt.current, current.topic);
        answeredRef.current = true;
        setScore((s) => s + 1);
        addExp(1);
        setTimeout(next, 600);
      } else {
        setWrongFlash(true);
        setTimeout(() => setWrongFlash(false), 400);
        if (outcome === "wrong") {
          recordAnswer(current.subject, false, Date.now() - startedAt.current, current.topic);
          answeredRef.current = true;
          setTimeout(next, 600);
        }
      }
    },
    [current, next],
  );

  const handleResult = useCallback(
    (t: string) => {
      setTranscript(t);
      check(t, true);
    },
    [check],
  );

  const { listening, supported, start } = useSpeech({ lang, onResult: handleResult });

  if (pool && pool.length === 0) {
    return (
      <main className="min-h-screen grid place-items-center p-6 text-center">
        <div>
          <h1 className="text-3xl font-extrabold">Nothing to re-quiz yet</h1>
          <p className="text-muted-foreground mt-2">Missed questions land in your revision bank automatically.</p>
          <Link to="/revision" className="text-primary font-semibold mt-6 inline-block">← Back to revision bank</Link>
        </div>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="min-h-screen grid place-items-center p-6 text-center">
        <div>
          <Star size={56} className="mx-auto text-primary fill-current" aria-hidden />
          <h1 className="text-4xl font-extrabold mt-3">Re-quiz done!</h1>
          <p className="text-muted-foreground mt-2">You answered {score} / {quiz.length} correctly — +{score} exp.</p>
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => { setIdx(0); setScore(0); setRound((r) => r + 1); }}
              className="rounded-2xl bg-primary text-primary-foreground px-6 py-3 font-bold shadow"
            >
              Another 15
            </button>
            <Link to="/revision" className="rounded-2xl bg-card border-2 border-border px-6 py-3 font-bold">
              Revision bank
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-8 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        <Link to="/revision" className="text-primary font-semibold">← Back to revision bank</Link>
        <div className="mt-3 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Re-quiz</h1>
          <span className="font-extrabold">{Math.min(idx + 1, quiz.length)} / {quiz.length} • Score {score}</span>
        </div>
        <p className="text-sm text-muted-foreground">No items here — every correct answer gives +1 exp.</p>

        {current && (
          <div className="mt-8 bg-card border-4 border-foreground/80 rounded-3xl p-8 text-center shadow-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {current.subject.toUpperCase()} • {current.topic}
            </div>
            {!current.choices && (current.subject === "chi" || (current.subject === "eng" && !/\s/.test(current.prompt))) && (
              <div className="mt-2 text-base font-extrabold">Read out loud:</div>
            )}
            <div className="flex items-start justify-center gap-3 mt-1"><div className="text-4xl font-extrabold break-words min-w-0">{current.prompt}</div><SpeakButton text={current.prompt} subject={current.subject} lang={settings.language}/></div>
             {!current.choices?.length && <p className="mt-2 text-sm font-bold text-muted-foreground">Answer format: {answerFormat(current.subject, current.prompt, current.answer)}</p>}
            {current.choices && current.choices.length > 0 && (
              <>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                  {current.choices.slice(0, 4).map((c, i) => (
                    <button
                      key={i}
                      onClick={() => check(c)}
                      className="rounded-xl border-2 border-border bg-background hover:border-primary px-3 py-2 text-lg font-bold"
                    >
                      <span className="text-primary mr-2 uppercase font-extrabold">{LETTERS[i]}.</span>{c}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm font-extrabold">
                  Say it like this: <span className="text-primary">“letter A”</span> — “letter B”, “letter C”, “letter D”
                </p>
              </>
            )}
          </div>
        )}

        {transcript && (
          <div className="pointer-events-none fixed inset-x-0 bottom-40 z-[100] flex justify-center px-4">
            <div className={`speech-readout font-extrabold text-center rounded-2xl px-4 py-2 bg-black/45 ${wrongFlash ? "animate-pulse" : ""}`}>
              You said: “{transcript.split("|")[0]}”
            </div>
          </div>
        )}

        <div className="mt-auto pt-8 flex flex-col items-center gap-4">
          {supported ? (
            <button
              onClick={start}
              disabled={listening}
              className={`rounded-full w-24 h-24 bg-primary text-primary-foreground shadow-2xl grid place-items-center ${listening ? "mic-pulse" : "hover:scale-105"}`}
              aria-label="Speak your answer"
            >
              <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" stroke="none" />
                <path d="M5 11a7 7 0 0 0 14 0" />
                <path d="M12 18v3" />
                <path d="M8 21h8" />
              </svg>
            </button>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); check(typed); }}
              className="flex gap-2 w-full max-w-sm"
            >
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder="Type your answer"
                className="flex-1 rounded-2xl border-2 border-border bg-background px-4 py-3 font-bold"
              />
              <button className="rounded-2xl bg-primary text-primary-foreground px-5 py-3 font-bold">Check</button>
            </form>
          )}
          <button onClick={next} className="text-sm font-bold text-muted-foreground hover:text-foreground">
            Next question →
          </button>
        </div>
      </div>
    </main>
  );
}
