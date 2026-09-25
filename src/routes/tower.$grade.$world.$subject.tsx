import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Star } from "lucide-react";
import { getCleared } from "@/lib/progress";
import { getState } from "@/lib/store";
import { playerLv, requiredLv } from "@/lib/leveling";
import { WORLD_ART, mutedBgStyle } from "@/lib/world-art";
import { useLang } from "@/lib/i18n";
import { festivalName } from "@/lib/festivals";
import towerImg from "@/assets/tower.png";


export const Route = createFileRoute("/tower/$grade/$world/$subject")({
  component: TowerPage,
});

import { SUBJECT_LABEL } from "@/lib/subjects";

function TowerPage() {
  const { grade, world, subject } = Route.useParams();
  const [page, setPage] = useState(0);
  const perPage = 50;
  const totalLevels = 500;
  const pages = Math.ceil(totalLevels / perPage);
  const start = page * perPage + 1;
  const end = Math.min(start + perPage - 1, totalLevels);

  const [unlockedThrough, setUnlockedThrough] = useState(0);
  const [lv, setLv] = useState(1);
  useEffect(() => {
    const sync = () => {
      setUnlockedThrough(getCleared(grade, world, subject));
      setLv(playerLv(getState().wallet.exp));
    };
    sync();
    window.addEventListener("progress-updated", sync);
    window.addEventListener("wq-updated", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("progress-updated", sync);
      window.removeEventListener("wq-updated", sync);
      window.removeEventListener("focus", sync);
    };
  }, [grade, world, subject]);

  const art = WORLD_ART[world] ?? WORLD_ART.forest;
  const { lang, t } = useLang();
  const wname = festivalName(world, lang) ?? (["aquatic", "forest", "fire"].includes(world) ? t(world) : art.label);
  return (
    <main className="min-h-screen relative" style={{ ...mutedBgStyle(art.bg), backgroundAttachment: "fixed" }}>
      <div className="absolute inset-0 bg-background/70 pointer-events-none" />
      <div className="relative px-6 py-8 max-w-5xl mx-auto">
      <Link to="/world/$world" params={{ world }} className="text-primary font-semibold">← {wname}</Link>

      <header className="mt-4 mb-6 text-center">
        <img src={towerImg} alt="" width={768} height={1024} className="mx-auto w-32 h-40 object-contain drop-shadow-xl" />
        <h1 className="text-3xl font-extrabold">
          {grade} {wname} {SUBJECT_LABEL[subject] ?? subject}
        </h1>
        <p className="text-muted-foreground">{t("tower_meta", { subject: SUBJECT_LABEL[subject] ?? subject, lv })}</p>
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
          const lvNum = start + i;
          const need = requiredLv(lvNum);
          const lvGated = lv < need;
          const locked = lvNum > unlockedThrough + 1;
          const cleared = lvNum <= unlockedThrough;
          return locked || lvGated ? (
            <div
              key={lvNum}
              title={lvGated ? t("not_enough_lv", { lv: need }) : t("locked")}
              className="aspect-square rounded-xl bg-muted text-muted-foreground flex flex-col items-center justify-center text-center p-1"
            >
              <Lock size={14} aria-hidden />
              {lvGated && !locked && <span className="text-[9px] font-bold leading-tight mt-0.5">LV{need}</span>}
            </div>

          ) : (
            <Link
              key={lvNum}
              to="/play/$grade/$world/$subject/$level"
              params={{ grade, world, subject, level: String(lvNum) }}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center font-extrabold transition hover:scale-110 ${
                cleared ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground ring-4 ring-primary/30 animate-pulse"
              }`}
            >
              <span className="text-base">{lvNum}</span>
              {cleared && <Star size={12} className="fill-current" aria-hidden />}
            </Link>
          );
        })}
      </div>
      </div>
    </main>
  );
}
