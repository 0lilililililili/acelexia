import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/tower/$grade/$world/$subject")({
  component: TowerPage,
});

const SUBJECT_LABEL: Record<string, string> = { chi: "Chinese", eng: "English", math: "Math" };

function TowerPage() {
  const { grade, world, subject } = Route.useParams();
  const [page, setPage] = useState(0);
  const perPage = 50;
  const totalLevels = 500;
  const pages = Math.ceil(totalLevels / perPage);
  const start = page * perPage + 1;
  const end = Math.min(start + perPage - 1, totalLevels);

  const unlockedThrough = 25; // demo: pretend 25 levels cleared

  return (
    <main className="min-h-screen px-6 py-8 max-w-5xl mx-auto">
      <Link to="/world/$world" params={{ world }} className="text-primary font-semibold">← Back to {world}</Link>

      <header className="mt-4 mb-6 text-center">
        <h1 className="text-3xl font-extrabold">
          {grade}{world.charAt(0).toUpperCase() + world.slice(1)}{subject.toUpperCase()}
        </h1>
        <p className="text-muted-foreground">{SUBJECT_LABEL[subject] ?? subject} tower • 500 levels</p>
      </header>

      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded-full text-sm font-bold ${i === page ? "bg-primary text-primary-foreground" : "bg-card border-2 border-border"}`}
          >
            {i * perPage + 1}–{Math.min((i + 1) * perPage, totalLevels)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {Array.from({ length: end - start + 1 }, (_, i) => {
          const lv = start + i;
          const locked = lv > unlockedThrough + 1;
          const cleared = lv <= unlockedThrough;
          return locked ? (
            <div key={lv} className="aspect-square rounded-xl bg-muted text-muted-foreground flex items-center justify-center font-bold text-sm">
              🔒
            </div>
          ) : (
            <Link
              key={lv}
              to="/play/$grade/$world/$subject/$level"
              params={{ grade, world, subject, level: String(lv) }}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center font-extrabold transition hover:scale-110 ${
                cleared ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground ring-4 ring-primary/30 animate-pulse"
              }`}
            >
              <span className="text-base">{lv}</span>
              {cleared && <span className="text-[10px]">⭐</span>}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
