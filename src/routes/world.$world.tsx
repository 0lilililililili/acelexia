import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isFestivalOpen, nextOpening } from "@/lib/festivals";
import { WORLD_ART } from "@/lib/world-art";
import towerImg from "@/assets/tower.png";


export const Route = createFileRoute("/world/$world")({
  component: WorldPage,
});

function WorldPage() {
  const { world } = Route.useParams();
  const art = WORLD_ART[world] ?? WORLD_ART.forest;

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
    { subject: "CHI",  label: "Chinese Tower",  key: "chi" },
    { subject: "ENG",  label: "English Tower",  key: "eng" },
    { subject: "MATH", label: "Math Tower",     key: "math" },
  ];

  if (!isFestivalOpen(world)) {
    const next = nextOpening(world);
    return (
      <main className="min-h-screen px-6 py-8 max-w-3xl mx-auto text-center">
        <Link to="/game" className="text-primary font-semibold">← World map</Link>
        <img src={art.boss} alt="" className="mx-auto mt-16 w-40 h-40 object-contain opacity-60" />
        <h1 className="text-3xl font-extrabold mt-4">{art.label} is closed</h1>
        <p className="text-muted-foreground mt-2">
          This is a limited festival map. {next ? `Come back on ${next.toLocaleDateString("en-HK", { month: "long", day: "numeric", year: "numeric" })}.` : "Check back during the next festival."}
        </p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen px-6 py-8 relative"
      style={{
        backgroundImage: `linear-gradient(180deg, oklch(0 0 0 / 0.15), oklch(0 0 0 / 0.3)), url(${art.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Link to="/game" className="text-white font-semibold drop-shadow relative z-10">← World map</Link>

      <header className="text-center mt-4 mb-10 text-white drop-shadow relative z-10">
        <img src={art.boss} alt="" className="mx-auto w-36 h-36 object-contain drop-shadow-2xl" />
        <h1 className="text-4xl font-extrabold mt-2">{art.label} World</h1>
        <p className="opacity-95">Choose a boss tower to challenge.</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-3 max-w-5xl mx-auto relative z-10">
        {towers.map((t) => (
          <Link
            key={t.key}
            to="/tower/$grade/$world/$subject"
            params={{ grade, world, subject: t.key }}
            className="bg-card border-4 border-white/70 rounded-3xl p-6 text-center shadow-2xl hover:scale-[1.03] transition"
          >
            <img src={towerImg} alt="" loading="lazy" width={768} height={1024} className="mx-auto w-28 h-36 object-contain" />
            <h2 className="text-xl font-extrabold mt-2">{t.label}</h2>
            <p className="text-sm text-muted-foreground mt-1">{grade} {art.label} {t.subject}</p>
            <div className="mt-4 inline-block bg-primary text-primary-foreground rounded-full px-4 py-2 font-bold">Enter tower</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
