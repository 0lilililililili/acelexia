import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import {
  QUESTIONS_BY_GRADE,
  saveSubmission,
  genDataId,
  GRADES,
  type Grade,
  type QResult,
} from "@/lib/input-questions";

export const Route = createFileRoute("/input-data")({ component: InputDataPage });

type Step = "dyslexia" | "grade" | "quiz" | "done";

function InputDataPage() {
  const nav = useNavigate();
  const [step, setStep] = useState<Step>("dyslexia");
  const [dyslexia, setDyslexia] = useState<boolean | null>(null);
  const [grade, setGrade] = useState<Grade | "">("");
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<QResult[]>([]);
  const startedAt = useRef<number>(Date.now());
  const dataIdRef = useRef<string>(genDataId());

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
      saveSubmission({
        userId: `u_${Date.now()}`,
        dataId: dataIdRef.current,
        source: "input-data",
        dyslexia,
        grade: grade as Grade,
        timestamp: Date.now(),
        results: next,
      });
      setStep("done");
    }
  };

  // ---- Step 1: Dyslexia -----------------------------------------------------
  if (step === "dyslexia") {
    return (
      <Shell>
        <h1 className="text-3xl font-extrabold">Question 1 of 2</h1>
        <p className="mt-2 text-muted-foreground">Have you been diagnosed with dyslexia?</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { label: "Yes", val: true },
            { label: "No", val: false },
          ].map((o) => (
            <button
              key={o.label}
              onClick={() => setDyslexia(o.val)}
              className={`rounded-2xl border-2 py-6 text-xl font-bold ${dyslexia === o.val ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
            >{o.label}</button>
          ))}
        </div>
        <button
          disabled={dyslexia === null}
          onClick={() => setStep("grade")}
          className="mt-8 w-full rounded-2xl bg-primary text-primary-foreground py-4 text-lg font-bold disabled:opacity-40"
        >
          Next →
        </button>
        <Link to="/" className="block mt-4 text-center text-sm text-muted-foreground">← Home</Link>
      </Shell>
    );
  }

  // ---- Step 2: Grade --------------------------------------------------------
  if (step === "grade") {
    return (
      <Shell>
        <h1 className="text-3xl font-extrabold">Question 2 of 2</h1>
        <p className="mt-2 text-muted-foreground">What grade are you in?</p>
        <div className="mt-6 grid grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={`rounded-xl py-3 font-bold border-2 ${grade === g ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
            >{g}</button>
          ))}
        </div>
        <button
          disabled={!grade}
          onClick={() => { setStep("quiz"); startedAt.current = Date.now(); }}
          className="mt-8 w-full rounded-2xl bg-primary text-primary-foreground py-4 text-lg font-bold disabled:opacity-40"
        >
          Start 24 questions →
        </button>
        <button onClick={() => setStep("dyslexia")} className="block mt-4 mx-auto text-sm text-muted-foreground">← Back</button>
      </Shell>
    );
  }

  // ---- Step 3: Quiz ---------------------------------------------------------
  if (step === "quiz" && q) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div className="text-sm text-muted-foreground">
              Question {idx + 1} / {questions.length} • <span className="font-mono">{q.id}</span>
            </div>
            <div className="text-sm font-semibold uppercase tracking-wider text-primary">{q.subject}</div>
            <div className="text-xs font-mono px-2 py-1 rounded-md bg-muted text-muted-foreground">
              Data ID: <span className="font-bold text-foreground">{dataIdRef.current}</span>
            </div>
          </div>
          <div className="h-2 rounded-full bg-muted mb-8 overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
          </div>
          <div className="bg-card rounded-3xl border-2 border-border p-8 shadow" key={q.id}>
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

  // ---- Done -----------------------------------------------------------------
  const correct = results.filter((r) => r.correct).length;
  return (
    <Shell>
      <div className="text-6xl text-center">🎉</div>
      <h1 className="mt-3 text-3xl font-extrabold text-center">Thanks!</h1>
      <p className="text-center text-muted-foreground mt-2">
        You answered {correct} / {results.length} correctly. Your responses have been saved.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="flex-1 rounded-2xl bg-card border-2 border-border py-4 text-center font-bold">Home</Link>
        <button
          onClick={() => nav({ to: "/admin" })}
          className="flex-1 rounded-2xl bg-primary text-primary-foreground py-4 font-bold"
        >View admin stats →</button>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-card border-2 border-border rounded-3xl p-8 w-full max-w-md shadow-lg">
        {children}
      </div>
    </main>
  );
}
