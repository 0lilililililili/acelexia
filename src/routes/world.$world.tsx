import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isFestivalOpen, nextOpening, festivalName } from "@/lib/festivals";
import { WORLD_ART } from "@/lib/world-art";
import { useLang } from "@/lib/i18n";
import { SUBJECT_LABEL } from "@/lib/subjects";
import towerImg from "@/assets/tower.png";
import {ARCADE_GAMES} from "@/lib/arcade";
import {Button} from "@/components/ui/button";
import marketStreet from "@/assets/math-market-street.jpg";
import villageStreet from "@/assets/english-village-street.jpg";
import chinaStreet from "@/assets/chinatown-street.jpg";


export const Route = createFileRoute("/world/$world")({
  head: ({params}) => ({meta:[{title:`${params.world === "fire" ? "China Town" : params.world === "aquatic" ? "English Village" : params.world === "forest" ? "Math Market" : "Festival world"} — Acelexia`},{name:"description",content:"Choose a freely replayable learning game or continue to Boss Towers in Acelexia."},{property:"og:title",content:`${params.world} learning games — Acelexia`},{property:"og:description",content:"Explore subject practice games and Boss Towers."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"}]}),
  component: WorldPage,
});

function WorldPage() {
  const { world } = Route.useParams();
  const art = WORLD_ART[world] ?? WORLD_ART.forest;
  const { lang, t, fmtDate } = useLang();
  const label = festivalName(world, lang) ?? (["aquatic", "forest", "fire"].includes(world) ? t(world) : art.label);

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
    { key: "chi" },
    { key: "eng" },
    { key: "math" },
  ];

  const AREA: Record<string, { subject: string; games: string[] }> = {
    fire: { subject: "chi", games: ["Restaurant Character Builder", "1v1 Vocal Arena", "Counterfeit Goods Appraiser (形近字)"] },
    aquatic: { subject: "eng", games: ["Typo Scene Detective", "Word Family Linker", "Spelling Challenge"] },
    forest: { subject: "math", games: ["Basket Collector", "Bakery Problem Solver", "Market Maths"] },
  };
  const area = AREA[world];
  if (area) {
    return (
      <main className="min-h-screen bg-background py-6">
        <Button asChild variant="link" className="mx-4"><Link to="/game">{t("back_world")}</Link></Button>
        <header className="text-center mt-2 mb-5 text-foreground px-4">
          <h1 className="text-4xl font-extrabold">{label}</h1>
        </header>
        <div className={`subject-street ${world==="fire"?"street-three":""}`}>
          <img src={world==="forest"?marketStreet:world==="aquatic"?villageStreet:chinaStreet} alt={label} width={1536} height={1024}/>
          {ARCADE_GAMES.filter(g=>g.world===world).map((g,i) => (
            <Button key={g.id} asChild variant="ghost" className={`street-door street-door-${i}`}><Link to="/arcade/$game" params={{game:g.id}} aria-label={`Play ${g.name}`}><span>{g.name} →</span></Link></Button>
          ))}
        </div>
        <div className="text-center mt-5 mb-6">
          <Button asChild><Link to="/boss">Go to Boss Towers</Link></Button>
        </div>
      </main>
    );
  }

  if (!isFestivalOpen(world)) {
    const next = nextOpening(world);
    return (
      <main className="min-h-screen px-6 py-8 max-w-3xl mx-auto text-center">
        <Link to="/game" className="text-primary font-semibold">{t("back_world")}</Link>
        <img src={art.boss} alt="" className="mx-auto mt-16 w-40 h-40 object-contain opacity-60" />
        <h1 className="text-3xl font-extrabold mt-4">{t("world_closed", { name: label })}</h1>
        <p className="text-muted-foreground mt-2">
          {next ? t("closed_note", { date: fmtDate(next) }) : t("closed_note_none")}
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
      <Link to="/game" className="text-white font-semibold drop-shadow relative z-10">{t("back_world")}</Link>

      <header className="text-center mt-4 mb-10 text-white drop-shadow relative z-10">
        <img src={art.boss} alt="" className="mx-auto w-36 h-36 object-contain drop-shadow-2xl" />
        <h1 className="text-4xl font-extrabold mt-2">{label} {t("world_suffix")}</h1>
        <p className="opacity-95">{t("choose_tower")}</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-3 max-w-5xl mx-auto relative z-10">
        {towers.map((tw) => (
          <Link
            key={tw.key}
            to="/tower/$grade/$world/$subject"
            params={{ grade, world, subject: tw.key }}
            className="bg-card border-4 border-white/70 rounded-3xl p-6 text-center shadow-2xl hover:scale-[1.03] transition"
          >
            <img src={towerImg} alt="" loading="lazy" width={768} height={1024} className="mx-auto w-28 h-36 object-contain" />
            <h2 className="text-xl font-extrabold mt-2">{SUBJECT_LABEL[tw.key]} {t("tower")}</h2>
            <p className="text-sm text-muted-foreground mt-1">{grade} {label} {SUBJECT_LABEL[tw.key]}</p>
            <div className="mt-4 inline-block bg-primary text-primary-foreground rounded-full px-4 py-2 font-bold">{t("enter_tower")}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
