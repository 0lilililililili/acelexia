import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  GRADES, QUESTIONS_BY_GRADE, type Grade, type QResult,
} from "@/lib/input-questions";
import pirateMap from "@/assets/pirate-map.jpg";
import { getState, setState } from "@/lib/store";

const pageBg: React.CSSProperties = {
  backgroundImage: `url(${pirateMap})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
};

export const Route = createFileRoute("/take-test")({ component: TestPage });

function TestPage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<Grade | "">("");
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<QResult[]>([]);
  const startedAt = useRef<number>(Date.now());

  const questions = useMemo(() => (grade ? QUESTIONS_BY_GRADE[grade] : []), [grade]);
  const q = questions[idx];

  const pick = (i: number) => {
    if (!q) return;
    const timeMs = Date.now() - startedAt.current;
    const correct = i === q.answer;
    const next = [...results, { qid: q.id, correct, timeMs }];
    setResults(next);
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      startedAt.current = Date.now();
    } else {
      // Trial results are kept local-only — not saved to the shared dataset,
      // so trial performance is independent from the input-data research pool.



      // Radar-chart payload (per-subject attributes)
      const radar = questions.map((qq, k) => ({
        subject: qq.subject,
        attr: qq.attr,
        correct: next[k].correct ? 1 : 0,
      }));
      const payload = encodeURIComponent(JSON.stringify({ name, age: grade, results: radar }));
      nav({ to: "/result", search: { d: payload } });
    }
  };

  if (!started) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 relative" style={pageBg}>
        <div className="absolute inset-0 bg-foreground/35 pointer-events-none" />
        <div className="relative bg-card border-4 border-primary rounded-3xl p-8 w-full max-w-md shadow-2xl">

          <h1 className="text-3xl font-extrabold">Quick test ✏️</h1>
          <p className="text-muted-foreground mt-2">24 short questions (8 per subject) matching your grade's HKEAA syllabus.</p>

          <label className="block mt-6 font-semibold">Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sam"
            className="mt-1 w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-lg"
          />

          <label className="block mt-4 font-semibold">Grade</label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`rounded-xl py-2 font-bold border-2 ${grade === g ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
              >{g}</button>
            ))}
          </div>

          <button
            disabled={!name.trim() || !grade}
            onClick={() => {
              try {
                window.localStorage.setItem("player", JSON.stringify({ name, grade }));
              } catch {}
              setState({ ...getState(), grade: grade || null, onboarded: true });
              startedAt.current = Date.now();
              setStarted(true);
            }}
            className="mt-8 w-full rounded-2xl bg-primary text-primary-foreground py-4 text-lg font-bold disabled:opacity-50"
          >
            Start test →
          </button>

          <Link to="/" className="block mt-4 text-center text-sm text-muted-foreground">← Back</Link>
        </div>
      </main>
    );
  }

  if (!q) return null;
  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative" style={pageBg}>
      <div className="absolute inset-0 bg-foreground/30 pointer-events-none" />
      <div className="w-full max-w-2xl relative">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            Question {idx + 1} / {questions.length} • <span className="font-mono">{q.id}</span>
          </div>
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">{q.subject}</div>
        </div>
        <div className="h-2 rounded-full bg-muted mb-8 overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
        </div>

        <div className="bg-card rounded-3xl border-2 border-border p-8 shadow animate-pop" key={q.id}>
          <div className="text-xs text-muted-foreground mb-2">{q.attr}</div>
          <h2 className="text-2xl font-bold leading-snug">{q.q}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {q.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => pick(i)}
                className="rounded-2xl border-2 border-border bg-background hover:border-primary hover:bg-primary/5 px-5 py-4 text-lg font-semibold text-left transition"
              >
                <span className="text-primary mr-2">{String.fromCharCode(65 + i)}.</span>{c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
