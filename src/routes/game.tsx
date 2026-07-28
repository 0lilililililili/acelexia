import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isFestivalOpen, festivalFor, nextOpening } from "@/lib/festivals";
import { WORLD_ART } from "@/lib/world-art";

export const Route = createFileRoute("/game")({ component: GameMap });

const WORLDS = [
  { id: "aquatic", name: "Aquatic World", desc: "Defeat sea-monster bosses.", limited: false },
  { id: "forest", name: "Forest Hunt", desc: "Sneak past wild beasts.", limited: false },
  { id: "fire", name: "Fire World", desc: "Tame the lava demons.", limited: false },
  { id: "olympus", name: "Mount Olympus", desc: "Hidden summer quest: Greek gods!", limited: true },
  { id: "winter", name: "Santa's Workshop", desc: "Christmas event: elves & gifts.", limited: true },
  { id: "festival", name: "Lunar Festival", desc: "Chinese New Year quest.", limited: true },
];

function formatDate(d: Date) {
  return d.toLocaleDateString("en-HK", { month: "short", day: "numeric" });
}

function GameMap() {
  const [player, setPlayer] = useState<{ name: string; grade: string } | null>(null);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("player");
      if (raw) setPlayer(JSON.parse(raw));
    } catch {}
  }, []);
  return (
    <main className="min-h-screen px-6 py-8">
      <header className="flex items-center justify-between max-w-6xl mx-auto mb-8">
        <div>
          <div className="text-sm text-muted-foreground">
            {player?.name ? `${player.name} • ` : "Player • "}Grade {player?.grade ?? "—"} • Level 1
          </div>
          <h1 className="text-3xl font-extrabold">World Map</h1>
        </div>

        <Link to="/settings" className="rounded-full bg-card border-2 border-border px-4 py-2 font-semibold hover:border-primary">
          Settings
        </Link>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {WORLDS.map((w) => {
          const open = isFestivalOpen(w.id);
          const fest = festivalFor(w.id);
          const next = !open && fest ? nextOpening(w.id) : null;
          const art = WORLD_ART[w.id];

          const card = (
            <div
              className={`group rounded-3xl p-6 shadow-lg relative overflow-hidden border-4 border-white/40 ${open ? "hover:scale-[1.02] transition" : "opacity-60 grayscale cursor-not-allowed"}`}
              style={{
                backgroundImage: `linear-gradient(160deg, ${art.color}, oklch(0.95 0.04 90))`,
              }}
            >
              <img
                src={art.boss}
                alt=""
                loading="lazy"
                width={160}
                height={160}
                className="w-32 h-32 object-contain drop-shadow-xl mx-auto"
              />
              <h2 className="mt-3 text-2xl font-extrabold text-white drop-shadow text-center">{w.name}</h2>
              <p className="text-white/95 mt-1 text-center">{w.desc}</p>
              {w.limited && (
                <div className="mt-2 inline-block bg-black/40 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  Limited event
                </div>
              )}
              <div className="mt-4 mx-auto w-fit bg-white/90 text-foreground rounded-full px-3 py-1 text-sm font-bold">
                {open ? "Enter →" : next ? `Opens ${formatDate(next)}` : "Locked"}
              </div>
            </div>
          );

          return open ? (
            <Link key={w.id} to="/world/$world" params={{ world: w.id }}>
              {card}
            </Link>
          ) : (
            <div key={w.id} aria-disabled="true">{card}</div>
          );
        })}
      </div>

      <p className="text-center text-muted-foreground mt-10 text-sm">
        Limited maps follow the Hong Kong festival calendar — check back during Christmas, CNY and summer!
      </p>
    </main>
  );
}
