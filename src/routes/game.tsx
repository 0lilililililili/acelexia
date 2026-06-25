import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/game")({ component: GameMap });

const WORLDS = [
  { id: "aquatic", name: "Aquatic World", emoji: "🌊", color: "var(--color-aqua)", desc: "Defeat sea-monster bosses." },
  { id: "forest", name: "Forest Hunt", emoji: "🌲", color: "var(--color-forest)", desc: "Sneak past wild beasts." },
  { id: "fire", name: "Fire World", emoji: "🔥", color: "var(--color-fire)", desc: "Tame the lava demons." },
  { id: "olympus", name: "Mount Olympus", emoji: "⚡", color: "var(--color-grape)", desc: "Hidden quest: Greek gods!" },
  { id: "winter", name: "Santa's Workshop", emoji: "🎄", color: "var(--color-fire)", desc: "Limited event: elves & gifts." },
  { id: "festival", name: "Lunar Festival", emoji: "🏮", color: "var(--color-sun)", desc: "Chinese traditional quest." },
];

function GameMap() {
  return (
    <main className="min-h-screen px-6 py-8">
      <header className="flex items-center justify-between max-w-6xl mx-auto mb-8">
        <div>
          <div className="text-sm text-muted-foreground">Player • Grade P3 • Level 1</div>
          <h1 className="text-3xl font-extrabold">World Map 🗺️</h1>
        </div>
        <Link to="/settings" className="rounded-full bg-card border-2 border-border px-4 py-2 font-semibold hover:border-primary">
          ⚙️ Settings
        </Link>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {WORLDS.map((w) => (
          <Link
            key={w.id}
            to="/world/$world"
            params={{ world: w.id }}
            className="group rounded-3xl p-6 shadow-lg hover:scale-[1.02] transition relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${w.color}, oklch(0.95 0.04 90))` }}
          >
            <div className="text-6xl drop-shadow">{w.emoji}</div>
            <h2 className="mt-3 text-2xl font-extrabold text-white drop-shadow">{w.name}</h2>
            <p className="text-white/90 mt-1">{w.desc}</p>
            <div className="mt-4 inline-block bg-white/90 text-foreground rounded-full px-3 py-1 text-sm font-bold">Enter →</div>
          </Link>
        ))}
      </div>

      <p className="text-center text-muted-foreground mt-10 text-sm">
        ✨ New themes unlock with festivals and limited events.
      </p>
    </main>
  );
}
