import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { generateLevelItems } from "@/lib/qb.functions";
import { useSpeech } from "@/hooks/use-speech";
import { markCleared } from "@/lib/progress";
import { addRevisionItem, DEFAULT_SETTINGS, getState } from "@/lib/store";
import { WORLD_ART, mutedBgStyle } from "@/lib/world-art";

export const Route = createFileRoute("/play/$grade/$world/$subject/$level")({
  component: PlayPage,
});

const SUBJECT_LANG: Record<string, "en-US" | "zh-HK"> = {
  eng: "en-US",
  chi: "zh-HK",
  math: "en-US",
};


type Item = { prompt: string; answer: string; hint?: string; topic?: string; choices?: string[] };

const LETTERS = ["a", "b", "c", "d"];

/** For multiple-choice items, map a spoken "a" / "letter b" / "option c" to the choice text. */
function choiceFromSpeech(transcript: string, choices: string[]): string | null {
  for (const alt of transcript.split("|")) {
    const raw = alt.toLowerCase().trim();
    const m = raw.match(/^(?:option\s+|letter\s+|answer\s+)?([abcd])[.)]?$/);
    if (m) {
      const i = LETTERS.indexOf(m[1]);
      if (choices[i]) return choices[i];
    }
  }
  return null;
}


const NUM_WORDS: Record<string, string> = {
  zero: "0", oh: "0",
  one: "1", two: "2", three: "3", four: "4", five: "5",
  six: "6", seven: "7", eight: "8", nine: "9", ten: "10",
  eleven: "11", twelve: "12", thirteen: "13", fourteen: "14", fifteen: "15",
  sixteen: "16", seventeen: "17", eighteen: "18", nineteen: "19", twenty: "20",
  thirty: "30", forty: "40", fifty: "50", sixty: "60", seventy: "70", eighty: "80", ninety: "90",
  hundred: "100", thousand: "1000",
  half: "1/2", halves: "1/2",
  third: "1/3", thirds: "1/3",
  quarter: "1/4", quarters: "1/4", fourth: "1/4", fourths: "1/4",
  fifth: "1/5", fifths: "1/5", sixth: "1/6", sixths: "1/6",
  seventh: "1/7", sevenths: "1/7", eighth: "1/8", eighths: "1/8",
  ninth: "1/9", ninths: "1/9", tenth: "1/10", tenths: "1/10",
};

function wordsToFraction(s: string): string | null {
  // "two over three", "two thirds", "two out of three", "two divided by three"
  const t = s.toLowerCase().trim();
  const overMatch = t.match(/^([a-z]+)\s+(?:over|out of|divided by|on)\s+([a-z0-9]+)$/);
  if (overMatch) {
    const n = NUM_WORDS[overMatch[1]] ?? overMatch[1];
    const d = NUM_WORDS[overMatch[2]] ?? overMatch[2];
    if (/^\d+$/.test(n) && /^\d+$/.test(d)) return `${n}/${d}`;
  }
  const thirdsMatch = t.match(/^([a-z]+)\s+([a-z]+)$/);
  if (thirdsMatch) {
    const n = NUM_WORDS[thirdsMatch[1]];
    const dWord = NUM_WORDS[thirdsMatch[2]];
    if (n && dWord && dWord.startsWith("1/")) {
      return `${n}${dWord.slice(1)}`; // "two" + "/3" → "2/3"
    }
  }
  return null;
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[^\p{Letter}\p{Number}]/gu, "");
}

function matches(transcript: string, answer: string) {
  const a = normalize(answer);
  if (!a) return false;
  const answerIsFraction = /^\d+\/\d+$/.test(answer.trim());
  return transcript.split("|").some((alt) => {
    const raw = alt.toLowerCase().trim();
    const n = normalize(raw);
    if (!n) return false;
    if (n === a) return true;
    // exact word match against any token in transcript (avoids "bee" ⊂ "beach")
    const tokens = raw.split(/[^\p{Letter}\p{Number}]+/u).filter(Boolean);
    if (tokens.some((tok) => normalize(tok) === a)) return true;
    // fraction: "two over three" / "two thirds" → "2/3"
    if (answerIsFraction) {
      const frac = wordsToFraction(raw);
      if (frac && frac === answer.trim()) return true;
    }
    // long answers: allow containment either direction (min length 4)
    if (a.length >= 4 && (n.includes(a) || a.includes(n))) return true;
    return false;
  });
}

function PlayPage() {
  const { grade, world, subject, level } = Route.useParams();
  const nav = useNavigate();
  const art = WORLD_ART[world] ?? WORLD_ART.forest;
  const lang = SUBJECT_LANG[subject] ?? "en-US";

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  useEffect(() => setSettings(getState().settings), []);
  const timeLimit = settings.timeLimit;

  const generate = useServerFn(generateLevelItems);
  const { data, isLoading, error } = useQuery({
    queryKey: ["qb", subject, grade, world, level],
    queryFn: () =>
      generate({
        data: {
          subject: subject as "chi" | "eng" | "math",
          grade,
          theme: art.label,
          level: Math.min(500, Math.max(1, parseInt(level, 10) || 1)),
          count: 8,
        },
      }),
    staleTime: Infinity,
  });

  const items: Item[] = data?.items ?? [];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"enter" | "active" | "defeat" | "escape">("enter");
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  const [transcript, setTranscript] = useState("");
  const [tick, setTick] = useState(0);
  const [feedback, setFeedback] = useState<"none" | "wrong">("none");
  const itemKeyRef = useRef(0);

  const current = items[idx];

  // Reset progress whenever the level (or its content) changes
  useEffect(() => {
    setIdx(0);
    setScore(0);
    setSkipped(new Set());
    setPhase("enter");
    setTranscript("");
    setTick(0);
    itemKeyRef.current++;
  }, [level, subject, world, grade]);

  const advance = useCallback(() => {
    itemKeyRef.current++;
    setTranscript("");
    setTick(0);
    setPhase("enter");
    setIdx((i) => i + 1);
  }, []);

  // Boss slides in from the left, then the countdown starts
  useEffect(() => {
    if (phase !== "enter") return;
    const t = setTimeout(() => setPhase("active"), 700);
    return () => clearTimeout(t);
  }, [phase, idx]);

  const missed = useCallback(
    (item: Item) => {
      addRevisionItem(subject, {
        prompt: item.prompt,
        answer: item.answer,
        topic: item.topic?.trim() || `${art.label} practice`,
        ts: Date.now(),
      });
    },
    [subject, art.label],
  );

  const handleResult = useCallback(
    (t: string) => {
      setTranscript(t);
      if (!current || phase !== "active") return;
      if (matches(t, current.answer)) {
        setPhase("defeat");
        setScore((s) => s + 1);
        setTimeout(advance, 700);
      } else {
        setFeedback("wrong");
        setTimeout(() => setFeedback("none"), 400);
      }
    },
    [current, phase, advance],
  );

  const { listening, supported, start } = useSpeech({ lang, onResult: handleResult });

  // countdown attached to the question bubble
  useEffect(() => {
    if (phase !== "active") return;
    const id = setInterval(() => setTick((t) => t + 0.1), 100);
    return () => clearInterval(id);
  }, [phase, idx]);

  // time up → boss escapes to the right, question goes to the revision bank
  useEffect(() => {
    if (phase !== "active" || tick < timeLimit || !current) return;
    missed(current);
    setPhase("escape");
    const t = setTimeout(advance, 600);
    return () => clearTimeout(t);
  }, [tick, phase, current, timeLimit, missed, advance]);

  const onSkip = () => {
    if (!current || phase !== "active") return;
    if (skipped.has(current.prompt)) return; // can only skip once per word
    setSkipped((s) => new Set(s).add(current.prompt));
    missed(current);
    setPhase("escape");
    setTimeout(advance, 600);
  };

  const canSkip = current ? !skipped.has(current.prompt) && phase === "active" : false;
  const finished = !isLoading && items.length > 0 && idx >= items.length;

  useEffect(() => {
    if (finished) {
      markCleared(grade, world, subject, parseInt(level, 10) || 1);
    }
  }, [finished, grade, world, subject, level]);

  const remaining = Math.max(0, timeLimit - tick);
  const pctLeft = Math.max(0, Math.min(100, (remaining / timeLimit) * 100));

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img src={art.boss} alt="" className="w-24 h-24 mx-auto animate-bounce object-contain" />
          <p className="mt-3 text-muted-foreground">Summoning bosses…</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-destructive font-semibold">Couldn't load this level.</p>
          <Link to="/tower/$grade/$world/$subject" params={{ grade, world, subject }} className="text-primary font-semibold mt-3 inline-block">
            ← Back to tower
          </Link>
        </div>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <img src={art.boss} alt="" className="w-32 h-32 object-contain" />
        <h1 className="text-4xl font-extrabold mt-3">Level {level} cleared!</h1>
        <p className="text-muted-foreground mt-2">Score: {score} / {items.length}</p>
        <div className="mt-8 flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => { setIdx(0); setScore(0); setSkipped(new Set()); setPhase("enter"); setTick(0); }}
            className="rounded-2xl bg-card border-2 border-border px-6 py-3 font-bold"
          >
            Play again
          </button>
          <button
            onClick={() => nav({ to: "/play/$grade/$world/$subject/$level", params: { grade, world, subject, level: String((parseInt(level, 10) || 1) + 1) } })}
            className="rounded-2xl bg-primary text-primary-foreground px-6 py-3 font-bold shadow"
          >
            Next level →
          </button>
        </div>
        <div className="mt-6 flex gap-4">
          <Link to="/tower/$grade/$world/$subject" params={{ grade, world, subject }} className="text-primary font-semibold">
            ← Back to tower
          </Link>
          <Link to="/revision" className="text-primary font-semibold">Revision bank →</Link>
        </div>
      </main>
    );
  }

  const bossAnim =
    phase === "enter" ? "animate-enter-left" : phase === "escape" ? "animate-exit-right" : phase === "defeat" ? "animate-defeated" : "";

  return (
    <main
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ ...mutedBgStyle(art.bg), backgroundAttachment: "fixed", fontSize: `${settings.fontScale}rem` }}
    >
      <div className="absolute inset-0 bg-background/40 pointer-events-none" />
      {/* HUD */}
      <header className="relative flex items-center justify-between px-5 py-3 bg-black/40 backdrop-blur text-white">
        <Link to="/tower/$grade/$world/$subject" params={{ grade, world, subject }} className="font-bold">← Exit</Link>
        <div className="text-center">
          <div className="text-xs opacity-90 uppercase tracking-wider">{art.label} • {subject.toUpperCase()} • {grade}</div>
          <div className="font-extrabold">Level {level} • Score {score}</div>
        </div>
        <Link to="/settings" className="font-bold">Settings</Link>
      </header>

      {/* Boss enters from the left and waits in the middle */}
      <div className="relative flex-1">
        {current && (
          <div
            key={itemKeyRef.current}
            className={`absolute left-1/2 top-1/2 flex flex-col items-center ${bossAnim}`}
            style={phase === "active" ? { transform: "translate(-50%, -50%)" } : undefined}
          >
            <img
              src={art.boss}
              alt="boss"
              className={`w-40 h-40 sm:w-48 sm:h-48 object-contain drop-shadow-2xl ${phase === "defeat" ? "grayscale opacity-70" : ""}`}
            />
            <div className="relative mt-2">
              {/* Countdown ring attached to the question bubble */}
              <div
                className="absolute -inset-1 rounded-3xl"
                style={{
                  background: `conic-gradient(var(--color-primary) ${pctLeft}%, transparent ${pctLeft}%)`,
                  filter: "blur(0.2px)",
                }}
                aria-hidden
              />
              <div className="relative bg-card border-4 border-foreground/80 rounded-2xl px-6 py-3 shadow-2xl">
                <div className="text-4xl sm:text-5xl font-extrabold tracking-wide text-center">
                  {current.prompt}
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-[width] duration-100"
                    style={{ width: `${pctLeft}%` }}
                  />
                </div>
                <div className="text-center text-xs font-bold text-muted-foreground mt-1">
                  {Math.ceil(remaining)}s
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transcript */}
      {transcript && (
        <div className={`text-center pb-2 font-semibold ${feedback === "wrong" ? "text-destructive" : "text-foreground"}`}>
          You said: "{transcript.split("|")[0]}"
        </div>
      )}

      {/* Mic + Skip */}
      <footer className="px-6 pb-8 pt-4 bg-background/80 backdrop-blur flex items-center justify-center gap-6">
        {!supported ? (
          <div className="text-destructive font-semibold text-center">
            Voice input isn't supported in this browser. Try Chrome.
          </div>
        ) : (
          <>
            <button
              onClick={onSkip}
              disabled={!canSkip}
              className="rounded-2xl bg-card border-2 border-border px-5 py-3 font-bold disabled:opacity-40"
              title={canSkip ? "Skip this word (once per word)" : "Already skipped"}
            >
              Skip
            </button>
            <button
              onClick={start}
              disabled={listening || phase !== "active"}
              className={`rounded-full w-24 h-24 bg-primary text-primary-foreground text-4xl font-extrabold shadow-2xl flex items-center justify-center ${listening ? "mic-pulse" : "hover:scale-105"}`}
              aria-label="Speak your answer"
            >
              <MicIcon />
            </button>
            <div className="w-[88px] text-xs text-muted-foreground text-center">
              {listening ? "Listening…" : "Tap & speak"}
            </div>
          </>
        )}
      </footer>
    </main>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" stroke="none" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
      <path d="M8 21h8" />
    </svg>
  );
}
