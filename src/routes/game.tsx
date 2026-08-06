import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings as Gear, BookOpen, Waves, Trees, Flame, Lock, Sparkles } from "lucide-react";
import { isFestivalOpen, nextOpening } from "@/lib/festivals";
import { WORLD_ART } from "@/lib/world-art";
import continentMap from "@/assets/continent-map.jpg";

export const Route = createFileRoute("/game")({
  head: () => ({
    meta: [
      { title: "World Map — Acalexia" },
      { name: "description", content: "Sail the Acalexia continent: aquatic, forest and fire lands, plus limited festival islands." },
      { property: "og:title", content: "World Map — Acalexia" },
      { property: "og:description", content: "Pick a land and challenge its boss towers." },
    ],
  }),
  component: GameMap,
});

/** Countries of the continent — positioned as % over the map illustration. */
const COUNTRIES = [
  { id: "aquatic", name: "Aquatic Bay", Icon: Waves, x: 30, y: 60 },
  { id: "forest", name: "Forest Land", Icon: Trees, x: 56, y: 32 },
  { id: "fire", name: "Fire Land", Icon: Flame, x: 78, y: 52 },
];

const EVENTS = ["olympus", "winter", "festival"];

function formatDate(d: Date) {
  return d.toLocaleDateString("en-HK", { month: "short", day: "numeric" });
}

/** Icon button with a hover label (dyslexia-friendly: picture first, word on hover). */
function IconAction({ to, label, children }: { to: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      aria-label={label}
      title={label}
      className="group relative grid place-items-center w-14 h-14 rounded-full bg-card border-4 border-border shadow-lg hover:border-primary hover:scale-105 transition"
    >
      {children}
      <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded-lg bg-foreground text-background text-xs font-bold px-2 py-1 opacity-0 group-hover:opacity-100 transition">
        {label}
      </span>
    </Link>
  );
}

function GameMap() {
  const [player, setPlayer] = useState<{ name: string; grade: string } | null>(null);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("player");
      if (raw) setPlayer(JSON.parse(raw));
    } catch {}
  }, []);

  const openEvents = EVENTS.filter((id) => isFestivalOpen(id));

  return (
    <main className="min-h-screen px-4 py-6">
      <header className="flex items-center justify-between max-w-6xl mx-auto mb-6 gap-4">
        <div>
          <div className="text-sm text-muted-foreground">
            {player?.name ? `${player.name} • ` : "Player • "}Grade {player?.grade ?? "—"}
          </div>
          <h1 className="text-4xl font-extrabold brand-outline">Acalexia</h1>
        </div>

        <div className="flex items-center gap-3">
          <IconAction to="/revision" label="Revision bank">
            <BookOpen className="text-primary" size={26} aria-hidden />
          </IconAction>
          <IconAction to="/settings" label="Settings">
            <Gear className="text-primary" size={26} aria-hidden />
          </IconAction>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-[2rem] overflow-hidden border-4 border-border shadow-2xl"
          style={{ aspectRatio: "3 / 2" }}
        >
          <img
            src={continentMap}
            alt="Map of the Acalexia continent with three lands and a festival island"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Countries of the continent */}
          {COUNTRIES.map(({ id, name, Icon, x, y }) => {
            const art = WORLD_ART[id];
            return (
              <Link
                key={id}
                to="/world/$world"
                params={{ world: id }}
                aria-label={name}
                title={name}
                className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span
                  className="grid place-items-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white/90 shadow-2xl hover:scale-110 transition overflow-hidden"
                  style={{ background: art.color }}
                >
                  <img src={art.boss} alt="" loading="lazy" className="w-16 h-16 object-contain drop-shadow" />
                </span>
                <span className="mt-1 grid place-items-center w-8 h-8 rounded-full bg-white/90 shadow">
                  <Icon size={18} className="text-foreground" aria-hidden />
                </span>
                <span className="mt-1 rounded-full bg-black/60 text-white text-xs font-bold px-2 py-0.5 opacity-0 group-hover:opacity-100 transition">
                  {name}
                </span>
              </Link>
            );
          })}

          {/* Festival island — only lists events that are open right now */}
          <div className="absolute right-[3%] top-[6%] w-[26%] min-w-[150px]">
            <div className="rounded-[2rem] bg-[oklch(0.95_0.06_90)]/90 border-4 border-white/80 shadow-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles size={14} aria-hidden /> Event Isle
              </div>

              {openEvents.length === 0 ? (
                <div className="mt-3 flex flex-col items-center gap-1" title="No event is open right now">
                  <Lock size={28} className="text-foreground/70" aria-hidden />
                  <span className="text-[11px] font-semibold text-foreground/70">Locked</span>
                  {(() => {
                    const next = EVENTS.map((id) => nextOpening(id)).filter(Boolean).sort((a, b) => a!.getTime() - b!.getTime())[0];
                    return next ? (
                      <span className="text-[11px] text-foreground/60">Opens {formatDate(next)}</span>
                    ) : null;
                  })()}
                </div>
              ) : (
                <div className="mt-2 space-y-2">
                  {openEvents.map((id) => {
                    const art = WORLD_ART[id];
                    return (
                      <Link
                        key={id}
                        to="/world/$world"
                        params={{ world: id }}
                        title={art.label}
                        className="flex items-center gap-2 rounded-2xl bg-white/90 border-2 border-border px-2 py-1.5 hover:border-primary transition"
                      >
                        <img src={art.boss} alt="" loading="lazy" className="w-9 h-9 object-contain" />
                        <span className="text-xs font-extrabold">{art.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
