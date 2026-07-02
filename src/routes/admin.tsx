import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import {
  GRADES, QUESTIONS_BY_GRADE, loadSubmissions, type Grade, type Submission,
} from "@/lib/input-questions";

export const Route = createFileRoute("/admin")({ component: AdminPage });

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

  const stats = useMemo(() => buildStats(subs, grade), [subs, grade]);

  if (!ok) return null;

  return (
    <main className="min-h-screen p-6 bg-background">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">Admin • Question Stats</h1>
          <p className="text-sm text-muted-foreground">
            Accuracy % and avg time (seconds) per question, split by dyslexia group.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-primary font-semibold">← Home</Link>
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
          Submissions: {stats.totalSubs} (dyslexic {stats.dysCount} • non-dyslexic {stats.nonCount})
        </div>
      </div>

      {stats.totalSubs === 0 ? (
        <div className="bg-card border-2 border-border rounded-3xl p-10 text-center">
          <p className="text-lg">No submissions yet for {grade}.</p>
          <Link to="/input-data" className="inline-block mt-4 rounded-2xl bg-primary text-primary-foreground px-5 py-3 font-bold">
            Collect data
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <Chart title="Dyslexic group" empty={stats.dysCount === 0} rows={stats.rows.map((r) => ({ id: r.id, accuracy: r.dysAcc, time: r.dysTime }))} />
          <Chart title="Non-dyslexic group" empty={stats.nonCount === 0} rows={stats.rows.map((r) => ({ id: r.id, accuracy: r.nonAcc, time: r.nonTime }))} />
        </div>
      )}
    </main>
  );
}

function Chart({ title, rows, empty }: { title: string; empty: boolean; rows: { id: string; accuracy: number | null; time: number | null }[] }) {
  return (
    <div className="bg-card border-2 border-border rounded-3xl p-4 shadow">
      <h2 className="font-extrabold text-lg mb-2">{title}</h2>
      {empty ? (
        <div className="h-72 flex items-center justify-center text-muted-foreground text-sm">No data in this group yet.</div>
      ) : (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={rows} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="id" angle={-60} textAnchor="end" interval={0} tick={{ fontSize: 10 }} height={70} />
              <YAxis yAxisId="left" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} unit="s" />
              <Tooltip
                formatter={(v: any, name) => name === "accuracy" ? [`${v?.toFixed?.(0) ?? v}%`, "Accuracy"] : [`${v?.toFixed?.(1) ?? v}s`, "Avg time"]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="accuracy" name="Accuracy %" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="time" name="Avg time (s)" stroke="hsl(var(--destructive))" strokeWidth={2} dot />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function buildStats(subs: Submission[], grade: Grade) {
  const qs = QUESTIONS_BY_GRADE[grade];
  const filtered = subs.filter((s) => s.grade === grade);
  const dys = filtered.filter((s) => s.dyslexia === true);
  const non = filtered.filter((s) => s.dyslexia === false);

  const agg = (group: Submission[], qid: string) => {
    const rs = group.flatMap((s) => s.results).filter((r) => r.qid === qid);
    if (rs.length === 0) return { acc: null as number | null, time: null as number | null };
    const acc = (rs.filter((r) => r.correct).length / rs.length) * 100;
    const time = rs.reduce((a, r) => a + r.timeMs, 0) / rs.length / 1000;
    return { acc, time };
  };

  const rows = qs.map((q) => {
    const d = agg(dys, q.id);
    const n = agg(non, q.id);
    return { id: q.id, dysAcc: d.acc, dysTime: d.time, nonAcc: n.acc, nonTime: n.time };
  });

  return { rows, totalSubs: filtered.length, dysCount: dys.length, nonCount: non.length };
}
