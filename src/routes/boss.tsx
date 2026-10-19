import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { WORLD_ART } from "@/lib/world-art";
import { SUBJECT_LABEL } from "@/lib/subjects";
import { useLang } from "@/lib/i18n";
import towerImg from "@/assets/tower.png";

export const Route = createFileRoute("/boss")({
  head: () => ({
    meta: [
      { title: "Boss Towers — Acelexia" },
      { name: "description", content: "Climb the 中, ENG and MATH boss towers, 500 levels each." },
      { property: "og:title", content: "Boss Towers — Acelexia" },
      { property: "og:description", content: "One boss tower for each subject." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BossPage,
});

const TOWERS = [
  { subject: "chi", world: "fire" },
  { subject: "eng", world: "aquatic" },
  { subject: "math", world: "forest" },
];

function BossPage() {
  const { t } = useLang();
  const [grade, setGrade] = useState("P3");
  useEffect(() => {
    try {
      const p = JSON.parse(window.localStorage.getItem("player") ?? "null");
      if (p?.grade) setGrade(p.grade);
    } catch {}
  }, []);
  return (
    <main className="min-h-screen px-6 py-8 bg-background">
      <Link to="/game" className="text-primary font-semibold">{t("back_world")}</Link>
      <header className="text-center mt-4 mb-8">
        <img src={towerImg} alt="" width={768} height={1024} className="mx-auto w-28 h-36 object-contain" />
        <h1 className="text-4xl font-extrabold mt-2">Boss Towers</h1>
        <p className="text-muted-foreground text-lg">One tower for each subject. Stars: 40% yellow, 60% the tower's colour.</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-3 max-w-5xl mx-auto">
        {TOWERS.map(({ subject, world }) => {
          const art = WORLD_ART[world];
          return (
            <Link key={subject} to="/tower/$grade/$world/$subject" params={{ grade, world, subject }}
              className="rounded-3xl p-6 text-center shadow-2xl border-4 border-border hover:scale-[1.03] transition bg-card">
              <span className="mx-auto grid place-items-center w-28 h-28 rounded-full" style={{ background: art.color }}>
                <img src={art.boss} alt="" loading="lazy" className="w-20 h-20 object-contain" />
              </span>
              <h2 className="text-2xl font-extrabold mt-3">{SUBJECT_LABEL[subject]} {t("tower")}</h2>
              <p className="text-sm text-muted-foreground">{grade} • {t(world)}</p>
              <div className="mt-4 inline-block bg-primary text-primary-foreground rounded-full px-4 py-2 font-bold">{t("enter_tower")}</div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
