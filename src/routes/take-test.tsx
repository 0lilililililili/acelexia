import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/take-test")({ component: TestPage });

const AGES = ["K3", "P1", "P2", "P3", "P4", "P5", "P6"];

// 9 sample qs — 3 per subject, mapped to radar attributes
const QUESTIONS = [
  { subject: "chi", attr: "Character recognition", q: "識別這個字：「貓」", choices: ["dog", "cat", "fish", "bird"], answer: 1 },
  { subject: "chi", attr: "Word reading",          q: "「蘋果」是甚麼？", choices: ["fruit", "vehicle", "animal", "color"], answer: 0 },
  { subject: "chi", attr: "Comprehension",         q: "「太陽從哪裡升起？」", choices: ["West", "North", "East", "South"], answer: 2 },
  { subject: "eng", attr: "Word recognition",      q: "Which word is spelled correctly?", choices: ["recieve", "receive", "receeve", "receve"], answer: 1 },
  { subject: "eng", attr: "Reading",               q: "What is the opposite of 'hot'?", choices: ["warm", "spicy", "cold", "fast"], answer: 2 },
  { subject: "eng", attr: "Comprehension",         q: "Pick the picture word: 'The cat is sleeping under the tree.'", choices: ["🐱💤🌳", "🐶🍖", "🐟🌊", "🦁👑"], answer: 0 },
  { subject: "math", attr: "Arithmetic",           q: "7 + 5 = ?", choices: ["10", "11", "12", "13"], answer: 2 },
  { subject: "math", attr: "Word problems",        q: "Anna has 8 apples and eats 3. How many left?", choices: ["3", "5", "8", "11"], answer: 1 },
  { subject: "math", attr: "Number sense",         q: "Which is largest?", choices: ["1/2", "1/3", "1/4", "1/5"], answer: 0 },
];

function TestPage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState<string>("");
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const pick = (i: number) => {
    const next = [...answers, i];
    setAnswers(next);
    if (idx + 1 < QUESTIONS.length) setIdx(idx + 1);
    else {
      // Build per-attribute score
      const results = QUESTIONS.map((q, k) => ({
        subject: q.subject,
        attr: q.attr,
        correct: next[k] === q.answer ? 1 : 0,
      }));
      const payload = encodeURIComponent(JSON.stringify({ name, age, results }));
      nav({ to: "/result", search: { d: payload } });
    }
  };

  if (!started) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-card border-2 border-border rounded-3xl p-8 w-full max-w-md shadow-lg">
          <h1 className="text-3xl font-extrabold">Quick test ✏️</h1>
          <p className="text-muted-foreground mt-2">9 short questions. Takes about 3 minutes.</p>

          <label className="block mt-6 font-semibold">Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sam"
            className="mt-1 w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-lg"
          />

          <label className="block mt-4 font-semibold">Grade</label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {AGES.map((a) => (
              <button
                key={a}
                onClick={() => setAge(a)}
                className={`rounded-xl py-2 font-bold border-2 ${age === a ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
              >{a}</button>
            ))}
          </div>

          <button
            disabled={!name.trim()}
            onClick={() => {
              try {
                window.localStorage.setItem("player", JSON.stringify({ name, grade: age }));
              } catch {}
              setStarted(true);
            }}
            className="mt-8 w-full rounded-2xl bg-primary text-primary-foreground py-4 text-lg font-bold disabled:opacity-50"
          >
            Start test →
          </button>

          <Link to="/home2" className="block mt-4 text-center text-sm text-muted-foreground">← Back</Link>
        </div>
      </main>
    );
  }

  const q = QUESTIONS[idx];
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">Question {idx + 1} / {QUESTIONS.length}</div>
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">{q.subject}</div>
        </div>
        <div className="h-2 rounded-full bg-muted mb-8 overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${((idx) / QUESTIONS.length) * 100}%` }} />
        </div>

        <div className="bg-card rounded-3xl border-2 border-border p-8 shadow animate-pop" key={idx}>
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
