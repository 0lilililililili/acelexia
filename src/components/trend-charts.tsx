import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DailyStat } from "@/lib/store";
import { SUBJECT_LABEL } from "@/lib/subjects";

type Point = { day: string; acc: number; sec: number; n: number };

function series(daily: Record<string, DailyStat>, subject?: string): Point[] {
  const byDay: Record<string, DailyStat> = {};
  for (const [k, v] of Object.entries(daily)) {
    const [s, day] = k.split("|");
    if (!day || (subject && s !== subject)) continue;
    const d = (byDay[day] ??= { c: 0, t: 0, ms: 0 });
    d.c += v.c; d.t += v.t; d.ms += v.ms;
  }
  return Object.keys(byDay).sort().map((day) => {
    const d = byDay[day];
    return { day: day.slice(5), acc: d.t ? Math.round((d.c / d.t) * 100) : 0, sec: d.t ? Math.round(d.ms / d.t / 100) / 10 : 0, n: d.t };
  });
}

function Chart({ title, data }: { title: string; data: Point[] }) {
  return (
    <div className="bg-card border-2 border-border rounded-3xl p-4 shadow">
      <h3 className="text-lg font-extrabold">{title}</h3>
      {data.length === 0 ? (
        <p className="text-muted-foreground mt-2">No answers yet. Play some levels to see your trend.</p>
      ) : (
        <div className="h-56 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="a" domain={[0, 100]} unit="%" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="s" orientation="right" unit="s" tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: number, name: string) => (name === "Accuracy" ? `${v}%` : `${v}s`)} />
              <Legend />
              <Line yAxisId="a" type="monotone" dataKey="acc" name="Accuracy" stroke="var(--color-primary)" strokeWidth={3} dot={{ r: 4 }} />
              <Line yAxisId="s" type="monotone" dataKey="sec" name="Avg time" stroke="var(--color-destructive)" strokeWidth={3} strokeDasharray="6 3" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export function TrendCharts({ daily }: { daily: Record<string, DailyStat> }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-extrabold">Progress over time</h2>
      <p className="text-muted-foreground">Accuracy (solid line) and average answer time (dashed line) for each day.</p>
      <div className="mt-4 grid gap-4">
        <Chart title="All subjects" data={series(daily)} />
        <div className="grid gap-4 md:grid-cols-3">
          {["chi", "eng", "math"].map((s) => <Chart key={s} title={SUBJECT_LABEL[s] ?? s} data={series(daily, s)} />)}
        </div>
      </div>
    </section>
  );
}
