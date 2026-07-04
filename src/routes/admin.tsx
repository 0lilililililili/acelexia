import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid, ResponsiveContainer, Scatter, ScatterChart,
  Tooltip, XAxis, YAxis, ZAxis,
} from "recharts";
import {
  GRADES, QUESTIONS_BY_GRADE, loadSubmissions, type Grade, type MCQ, type Submission,
} from "@/lib/input-questions";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type Point = { t: number; sec: number; date: string };

function AdminPage() {
  const nav = useNavigate();
  const [ok, setOk] = useState(false);
  const [grade, setGrade] = useState<Grade>("P3");
  const [subs, setSubs] = useState<Submission[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = window.sessionStorage.getItem("wq_admin") === "1";
    if (!flag) nav({ to: "/login" });
    else setOk(true);
    setSubs(loadSubmissions());
  }, [nav]);

  const filtered = useMemo(() => subs.filter((s) => s.grade === grade), [subs, grade]);
  const dysCount = filtered.filter((s) => s.dyslexia === true).length;
  const nonCount = filtered.filter((s) => s.dyslexia === false).length;
  const questions = QUESTIONS_BY_GRADE[grade];

  if (!ok) return null;

  return (
    <main className="min-h-screen p-6 bg-background">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">Admin • Per-question Stats</h1>
          <p className="text-sm text-muted-foreground">
            For each question: 4 scatter charts (dyslexia correct/incorrect, normal correct/incorrect).
            Each point = one attempt. X = submission time, Y = seconds taken.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link to="/" className="text-sm text-primary font-semibold mr-2">← Home</Link>
          <button
            onClick={() => exportJson(subs)}
            className="rounded-xl bg-card border-2 border-border px-3 py-2 text-sm font-bold"
          >Export data</button>
          <label className="rounded-xl bg-card border-2 border-border px-3 py-2 text-sm font-bold cursor-pointer">
            Import data
            <input
              type="file" accept="application/json" className="hidden"
              onChange={(e) => importJson(e, setSubs)}
            />
          </label>
          <button
            onClick={() => { window.sessionStorage.removeItem("wq_admin"); nav({ to: "/login" }); }}
            className="rounded-xl bg-card border-2 border-border px-3 py-2 text-sm font-bold"
          >Log out</button>
        </div>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold mr-2">Grade:</span>
        {GRADES.map((g) => (
          <button
            key={g}
            onClick={() => setGrade(g)}
            className={`rounded-xl px-3 py-1.5 font-bold border-2 ${grade === g ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
          >{g}</button>
        ))}
        <div className="ml-auto text-sm text-muted-foreground">
          Submissions: {filtered.length} (dyslexic {dysCount} • non-dyslexic {nonCount})
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card border-2 border-border rounded-3xl p-10 text-center">
          <p className="text-lg">No submissions yet for {grade}.</p>
          <Link to="/input-data" className="inline-block mt-4 rounded-2xl bg-primary text-primary-foreground px-5 py-3 font-bold">
            Collect data
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q) => (
            <QuestionBlock key={q.id} q={q} subs={filtered} />
          ))}
        </div>
      )}
    </main>
  );
}

function QuestionBlock({ q, subs }: { q: MCQ; subs: Submission[] }) {
  const buckets = useMemo(() => bucketize(q.id, subs), [q.id, subs]);
  return (
    <section className="bg-card border-2 border-border rounded-3xl p-4 shadow">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h2 className="font-extrabold text-lg">
          <span className="text-primary">{q.id}</span> • {q.subject.toUpperCase()} • {q.attr}
        </h2>
        <p className="text-sm text-muted-foreground truncate max-w-xl">{q.q}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MiniScatter title="Dyslexia • Correct" color="hsl(142 71% 45%)" points={buckets.dysCorrect} />
        <MiniScatter title="Dyslexia • Incorrect" color="hsl(0 84% 60%)" points={buckets.dysWrong} />
        <MiniScatter title="Normal • Correct" color="hsl(199 89% 48%)" points={buckets.nonCorrect} />
        <MiniScatter title="Normal • Incorrect" color="hsl(38 92% 50%)" points={buckets.nonWrong} />
      </div>
    </section>
  );
}

function MiniScatter({ title, points, color }: { title: string; points: Point[]; color: string }) {
  return (
    <div className="border border-border rounded-2xl p-2">
      <div className="text-xs font-bold mb-1 flex justify-between">
        <span>{title}</span>
        <span className="text-muted-foreground">n={points.length}</span>
      </div>
      <div className="h-40">
        {points.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-muted-foreground">No data</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="t" type="number" domain={["dataMin", "dataMax"]}
                tickFormatter={(v) => new Date(v).toLocaleDateString(undefined, { month: "numeric", day: "numeric" })}
                tick={{ fontSize: 10 }}
                name="Submission time"
              />
              <YAxis dataKey="sec" type="number" tick={{ fontSize: 10 }} unit="s" name="Time taken" />
              <ZAxis range={[60, 60]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(v: any, name: string) => name === "sec" ? [`${(v as number).toFixed(2)}s`, "Time"] : v}
                labelFormatter={(_, payload) => {
                  const p = payload?.[0]?.payload as Point | undefined;
                  return p ? p.date : "";
                }}
              />
              <Scatter data={points} fill={color} />
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

function bucketize(qid: string, subs: Submission[]) {
  const dysCorrect: Point[] = [];
  const dysWrong: Point[] = [];
  const nonCorrect: Point[] = [];
  const nonWrong: Point[] = [];
  for (const s of subs) {
    const r = s.results.find((x) => x.qid === qid);
    if (!r) continue;
    const pt: Point = { t: s.timestamp, sec: r.timeMs / 1000, date: new Date(s.timestamp).toLocaleString() };
    if (s.dyslexia === true) (r.correct ? dysCorrect : dysWrong).push(pt);
    else if (s.dyslexia === false) (r.correct ? nonCorrect : nonWrong).push(pt);
  }
  return { dysCorrect, dysWrong, nonCorrect, nonWrong };
}

function exportJson(subs: Submission[]) {
  const blob = new Blob([JSON.stringify(subs, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `wq_submissions_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importJson(e: React.ChangeEvent<HTMLInputElement>, setSubs: (s: Submission[]) => void) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(String(reader.result)) as Submission[];
      const existing = JSON.parse(window.localStorage.getItem("wq_submissions_v1") || "[]") as Submission[];
      const seen = new Set(existing.map((s) => `${s.userId}|${s.timestamp}`));
      const merged = [...existing, ...imported.filter((s) => !seen.has(`${s.userId}|${s.timestamp}`))];
      window.localStorage.setItem("wq_submissions_v1", JSON.stringify(merged));
      setSubs(merged);
      alert(`Imported ${imported.length} submissions (${merged.length} total).`);
    } catch { alert("Invalid JSON file."); }
  };
  reader.readAsText(file);
  e.target.value = "";
}
