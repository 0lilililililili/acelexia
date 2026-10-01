import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Castle, Crown, CalendarDays, Star, Sword, GraduationCap, Shirt, Lock } from "lucide-react";
import { BADGES, evaluateBadges, type BadgeTab } from "@/lib/badges";
import { useLang } from "@/lib/i18n";
import { tr } from "@/lib/tr";
import { Button } from "@/components/ui/button";
import { useGameState } from "./avatar";

export const Route = createFileRoute("/badges")({
  head: () => ({
    meta: [
      { title: "Badge Board — Acelexia" },
      { name: "description", content: "See the badges you earned for streaks, towers and right-answer runs." },
      { property: "og:title", content: "Badge Board — Acelexia" },
      { property: "og:description", content: "Your Acelexia badges." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BadgesPage,
});

const ICONS = { flame: Flame, tower: Castle, crown: Crown, calendar: CalendarDays, star: Star, sword: Sword, hat: GraduationCap, shirt: Shirt };
const TABS: { id: BadgeTab; label: [string, string, string] }[] = [
  { id: "chi", label: ["中", "中", "中"] },
  { id: "eng", label: ["ENG", "ENG", "ENG"] },
  { id: "math", label: ["MATH", "MATH", "MATH"] },
  { id: "others", label: ["Others", "其他", "其他"] },
];

function BadgesPage() {
  const { lang, t } = useLang();
  const [tab, setTab] = useState<BadgeTab>("chi");
  useEffect(() => { evaluateBadges(); }, []);
  const s = useGameState();
  if (!s) return null;
  const list = BADGES.filter((b) => b.tab === tab);
  return (
    <main className="min-h-screen px-4 py-6 max-w-5xl mx-auto">
      <Link to="/game" className="text-primary font-semibold">{t("back_map")}</Link>
      <h1 className="mt-3 text-4xl font-extrabold">{tr(lang, "Badge Board", "徽章板", "徽章板")}</h1>
      <p className="text-muted-foreground font-semibold">{s.badges.unlocked.length} / {BADGES.length}</p>
      <div className="mt-4 flex gap-2" role="tablist">
        {TABS.map((x) => (
          <Button key={x.id} role="tab" aria-selected={tab === x.id} variant={tab === x.id ? "default" : "outline"} className="rounded-2xl font-bold" onClick={() => setTab(x.id)}>
            {tr(lang, ...x.label)}
          </Button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((b) => {
          const on = s.badges.unlocked.includes(b.id);
          const Icon = ICONS[b.icon];
          return (
            <div key={b.id} className={`relative bg-card border-2 rounded-3xl p-4 text-center shadow ${on ? "border-primary" : "border-border opacity-60 grayscale"}`}>
              <span className={`mx-auto grid place-items-center w-16 h-16 rounded-full ${on ? "bg-accent" : "bg-muted"}`}>
                <Icon size={32} aria-hidden />
              </span>
              <p className="mt-2 font-bold">{lang === "en" ? b.goal.en : b.goal.zh}</p>
              {!on && <Lock size={16} className="absolute top-3 right-3" aria-label="locked" />}
            </div>
          );
        })}
      </div>
    </main>
  );
}
