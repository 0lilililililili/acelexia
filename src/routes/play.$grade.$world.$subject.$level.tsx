import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { generateLevelItems } from "@/lib/qb.functions";
import { useSpeech } from "@/hooks/use-speech";

export const Route = createFileRoute("/play/$grade/$world/$subject/$level")({
  component: PlayPage,
});

const WORLD_THEME: Record<string, { color: string; emoji: string; defeatedEmoji: string; label: string }> = {
  aquatic:  { color: "var(--color-aqua)",   emoji: "🐟", defeatedEmoji: "🐡", label: "Aquatic" },
  forest:   { color: "var(--color-forest)", emoji: "👹", defeatedEmoji: "😵", label: "Forest" },
  fire:     { color: "var(--color-fire)",   emoji: "👺", defeatedEmoji: "💀", label: "Fire" },
  olympus:  { color: "var(--color-grape)",  emoji: "⚡", defeatedEmoji: "💨", label: "Olympus" },
  winter:   { color: "var(--color-fire)",   emoji: "🎁", defeatedEmoji: "✨", label: "Workshop" },
  festival: { color: "var(--color-sun)",    emoji: "🏮", defeatedEmoji: "💥", label: "Festival" },
};

const SUBJECT_LANG: Record<string, "en-US" | "zh-HK"> = {
  eng: "en-US",
  chi: "zh-HK",
  math: "en-US",
};

const FALL_SECONDS = 18; // time before the enemy falls off-screen / question expires

type Item = { prompt: string; answer: string; hint?: string };

function normalize(s: string) {
  return s.toLowerCase().replace(/[^\p{Letter}\p{Number}]/gu, "");
}

function matches(transcript: string, answer: string) {
  const a = normalize(answer);
  if (!a) return false;
  return transcript.split("|").some((alt) => {
    const n = normalize(alt);
    return n === a || n.includes(a) || a.includes(n);
  });
}

function PlayPage() {
  const { grade, world, subject, level } = Route.useParams();
  const nav = useNavigate();
  const theme = WORLD_THEME[world] ?? WORLD_THEME.forest;
  const lang = SUBJECT_LANG[subject] ?? "en-US";

  const generate = useServerFn(generateLevelItems);
  const { data, isLoading, error } = useQuery({
    queryKey: ["qb", subject, grade, world, level],
    queryFn: () =>
      generate({
        data: {
          subject: subject as "chi" | "eng" | "math",
          grade,
          theme: theme.label,
          level: Math.min(500, Math.max(1, parseInt(level, 10) || 1)),
          count: 8,
        },
      }),
    staleTime: Infinity,
  });

  const items: Item[] = data?.items ?? [];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [defeated, setDefeated] = useState(false);
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
    setDefeated(false);
    setTranscript("");
    setTick(0);
    itemKeyRef.current++;
  }, [level, subject, world, grade]);

  const handleResult = useCallback((t: string) => {
    setTranscript(t);
    if (!current) return;
    if (matches(t, current.answer)) {
      setDefeated(true);
      setScore((s) => s + 1);
      setTimeout(() => {
        setDefeated(false);
        setTranscript("");
        itemKeyRef.current++;
        setIdx((i) => i + 1);
        setTick(0);
      }, 700);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback("none"), 400);
    }
  }, [current]);

  const { listening, supported, start } = useSpeech({ lang, onResult: handleResult });

  // countdown
  useEffect(() => {
    if (!current || defeated) return;
    setTick(0);
    const id = setInterval(() => setTick((t) => t + 0.1), 100);
    return () => clearInterval(id);
  }, [idx, current, defeated]);

  useEffect(() => {
    if (tick >= FALL_SECONDS && current && !defeated) {
      // expire
      itemKeyRef.current++;
      setIdx((i) => i + 1);
      setTranscript("");
    }
  }, [tick, current, defeated]);

  const onSkip = () => {
    if (!current) return;
    if (skipped.has(current.prompt)) return; // can only skip once per word
    setSkipped((s) => new Set(s).add(current.prompt));
    itemKeyRef.current++;
    setIdx((i) => i + 1);
    setTranscript("");
  };

  const canSkip = current ? !skipped.has(current.prompt) : false;
  const finished = !isLoading && items.length > 0 && idx >= items.length;
  const remaining = Math.max(0, FALL_SECONDS - tick);
  const fallPct = Math.min(100, (tick / FALL_SECONDS) * 100);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-bounce">{theme.emoji}</div>
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
        <div className="text-7xl">🏆</div>
        <h1 className="text-4xl font-extrabold mt-3">Level {level} cleared!</h1>
        <p className="text-muted-foreground mt-2">Score: {score} / {items.length}</p>
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => { setIdx(0); setScore(0); setSkipped(new Set()); }}
            className="rounded-2xl bg-card border-2 border-border px-6 py-3 font-bold"
          >
            🔁 Play again
          </button>
          <button
            onClick={() => nav({ to: "/play/$grade/$world/$subject/$level", params: { grade, world, subject, level: String((parseInt(level, 10) || 1) + 1) } })}
            className="rounded-2xl bg-primary text-primary-foreground px-6 py-3 font-bold shadow"
          >
            Next level →
          </button>
        </div>
        <Link to="/tower/$grade/$world/$subject" params={{ grade, world, subject }} className="text-primary font-semibold mt-6">
          ← Back to tower
        </Link>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ background: `linear-gradient(180deg, ${theme.color} 0%, var(--color-background) 100%)` }}
    >
      {/* HUD */}
      <header className="flex items-center justify-between px-5 py-3 bg-black/20 backdrop-blur text-white">
        <Link to="/tower/$grade/$world/$subject" params={{ grade, world, subject }} className="font-bold">← Exit</Link>
        <div className="text-center">
          <div className="text-xs opacity-90 uppercase tracking-wider">{theme.label} • {subject.toUpperCase()} • {grade}</div>
          <div className="font-extrabold">Level {level} • Score {score}</div>
        </div>
        <Link to="/settings" className="font-bold">⚙️</Link>
      </header>

      {/* Falling enemy */}
      <div className="relative flex-1">
        {current && !defeated && (
          <div
            key={itemKeyRef.current}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{
              top: `${fallPct * 0.7}vh`,
              transition: "top 0.1s linear",
            }}
          >
            <div className="text-[7rem] leading-none drop-shadow-lg">{theme.emoji}</div>
            <div className="mt-2 bg-card border-4 border-foreground/80 rounded-2xl px-6 py-3 shadow-2xl">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-wide text-center">
                {current.prompt}
              </div>
            </div>
          </div>
        )}
        {defeated && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/3 animate-defeated text-[7rem]">
            {theme.defeatedEmoji}
          </div>
        )}

        {/* Timer bar */}
        <div className="absolute top-2 left-4 right-4 h-2 rounded-full bg-white/30 overflow-hidden">
          <div
            className="h-full bg-white transition-[width] duration-100"
            style={{ width: `${100 - fallPct}%` }}
          />
        </div>
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
              ⏭️ Skip
            </button>
            <button
              onClick={start}
              disabled={listening}
              className={`rounded-full w-24 h-24 bg-primary text-primary-foreground text-4xl font-extrabold shadow-2xl flex items-center justify-center ${listening ? "mic-pulse" : "hover:scale-105"}`}
              aria-label="Speak"
            >
              🎤
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
