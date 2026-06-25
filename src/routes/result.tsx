import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const Search = z.object({ d: z.string().optional() });

export const Route = createFileRoute("/result")({
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
    { key: "chi", label: "Chinese", emoji: "🀄" },
    { key: "eng", label: "English", emoji: "🔤" },
    { key: "math", label: "Math", emoji: "🔢" },
  ];

  return (
    <main className="min-h-screen px-6 py-10 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold">Great work, {payload.name}! 🎉</h1>
        <p className="text-muted-foreground mt-1">Grade {payload.age} • Here's how you did across three subjects.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {subjects.map((s) => {
          const data = payload!.results
            .filter((r) => r.subject === s.key)
            .map((r) => ({ attr: r.attr, score: r.correct }));
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
