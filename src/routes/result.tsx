import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const Search = z.object({ d: z.string().optional() });

export const Route = createFileRoute("/result")({head: () => ({ meta: [{ title: "Assessment results — Acelexia" }, { name: "description", content: "Review your Chinese, English and mathematics learning assessment." }, { property: "og:title", content: "Assessment results — Acelexia" }, { property: "og:description", content: "Review your Chinese, English and mathematics learning assessment." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), 
  validateSearch: Search,
  component: ResultPage,
});

type Row = { subject: string; attr: string; correct: number };

function ResultPage() {
  const { d } = Route.useSearch();
  let payload: { name: string; age: string; results: Row[] } | null = null;
  try { if (d) payload = JSON.parse(decodeURIComponent(d)); } catch {}

  if (!payload) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-muted-foreground">No test data found.</p>
          <Link to="/take-test" className="text-primary font-semibold">Take the test</Link>
        </div>
      </main>
    );
  }

  const subjects: { key: string; label: string; emoji: string }[] = [
    { key: "chi", label: "中", emoji: "🀄" },
    { key: "eng", label: "ENG", emoji: "🔤" },
    { key: "math", label: "MATH", emoji: "🔢" },
  ];

  return (
    <main className="min-h-screen px-6 py-10 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold">Great work, {payload.name}! 🎉</h1>
        <p className="text-muted-foreground mt-1">Grade {payload.age} • Here's how you did across 中 / ENG / MATH.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {subjects.map((s) => {
          const agg = new Map<string, { sum: number; n: number }>();
          payload!.results
            .filter((r) => r.subject === s.key)
            .forEach((r) => {
              const cur = agg.get(r.attr) ?? { sum: 0, n: 0 };
              cur.sum += r.correct;
              cur.n += 1;
              agg.set(r.attr, cur);
            });
          const data = Array.from(agg.entries()).map(([attr, v]) => ({
            attr,
            score: v.n ? v.sum / v.n : 0,
          }));
          return (
            <div key={s.key} className="bg-card border-2 border-border rounded-3xl p-5 shadow">
              <h2 className="text-xl font-bold">{s.emoji} {s.label}</h2>
              <div className="h-64 mt-2">
                <ResponsiveContainer>
                  <RadarChart data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="attr" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis domain={[0, 1]} tick={false} axisLine={false} />
                    <Radar dataKey="score" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.45} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/game"
          className="inline-block rounded-2xl bg-primary text-primary-foreground px-8 py-4 text-lg font-bold shadow-lg hover:scale-[1.03] transition"
        >
          Enter the World Map →
        </Link>
      </div>
    </main>
  );
}
