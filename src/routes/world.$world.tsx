import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isFestivalOpen, nextOpening } from "@/lib/festivals";

const WORLD_META: Record<string, { name: string; emoji: string; color: string }> = {
  aquatic:  { name: "Aquatic World",    emoji: "🌊", color: "var(--color-aqua)" },
  forest:   { name: "Forest Hunt",      emoji: "🌲", color: "var(--color-forest)" },
  fire:     { name: "Fire World",       emoji: "🔥", color: "var(--color-fire)" },
  olympus:  { name: "Mount Olympus",    emoji: "⚡", color: "var(--color-grape)" },
  winter:   { name: "Santa's Workshop", emoji: "🎄", color: "var(--color-fire)" },
  festival: { name: "Lunar Festival",   emoji: "🏮", color: "var(--color-sun)" },
};



export const Route = createFileRoute("/world/$world")({
  component: WorldPage,
});

function WorldPage() {
  const { world } = Route.useParams();
  const meta = WORLD_META[world] ?? { name: world, emoji: "🏰", color: "var(--color-primary)" };

  const [grade, setGrade] = useState("P3");
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("player");
      if (raw) {
        const p = JSON.parse(raw);
        if (p?.grade) setGrade(p.grade);
      }
    } catch {}
  }, []);

  const towers = [
    { subject: "CHI",  label: "Chinese Tower",  emoji: "🀄", key: "chi" },
    { subject: "ENG",  label: "English Tower",  emoji: "🔤", key: "eng" },
    { subject: "MATH", label: "Math Tower",     emoji: "🔢", key: "math" },
  ];

  if (!isFestivalOpen(world)) {
    const next = nextOpening(world);
    return (
      <main className="min-h-screen px-6 py-8 max-w-3xl mx-auto text-center">
        <Link to="/game" className="text-primary font-semibold">← World map</Link>
        <div className="mt-16 text-7xl opacity-60">{meta.emoji}</div>
        <h1 className="text-3xl font-extrabold mt-4">{meta.name} is closed</h1>
        <p className="text-muted-foreground mt-2">
          This is a limited festival map. {next ? `Come back on ${next.toLocaleDateString("en-HK", { month: "long", day: "numeric", year: "numeric" })}.` : "Check back during the next festival."}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-8" style={{ background: `linear-gradient(180deg, ${meta.color}, var(--color-background) 60%)` }}>

      <Link to="/game" className="text-white/90 font-semibold">← World map</Link>

      <header className="text-center mt-4 mb-10 text-white drop-shadow">
        <div className="text-7xl">{meta.emoji}</div>
        <h1 className="text-4xl font-extrabold mt-2">{meta.name}</h1>
        <p className="opacity-90">Choose a boss tower to challenge.</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-3 max-w-5xl mx-auto">
        {towers.map((t) => (
          <Link
            key={t.key}
            to="/tower/$grade/$world/$subject"
            params={{ grade, world, subject: t.key }}
            className="bg-card border-2 border-border rounded-3xl p-6 text-center shadow-lg hover:scale-[1.03] transition"
          >
            <div className="text-6xl">{t.emoji}</div>
            <h2 className="text-xl font-extrabold mt-2">{t.label}</h2>
            <p className="text-sm text-muted-foreground mt-1">{grade} {meta.name} {t.subject}</p>
            <div className="mt-4 inline-block bg-primary text-primary-foreground rounded-full px-4 py-2 font-bold">Enter tower</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
