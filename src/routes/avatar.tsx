import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getState, updateState, flushProgress, type State } from "@/lib/store";
import { itemsFor, isOwned, itemName, resolveLook, SLOTS, OPTIONAL_SLOTS, type Slot } from "@/lib/avatar";
import { equip, SLOT_LABEL } from "@/lib/avatar-shop";
import { AvatarFigure } from "@/components/avatar-figure";
import { ItemCost, LockBadge } from "@/components/item-cost";
import { useLang } from "@/lib/i18n";
import { tr } from "@/lib/tr";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/avatar")({
  head: () => ({
    meta: [
      { title: "My Avatar — Acelexia" },
      { name: "description", content: "Dress up your Acelexia explorer with clothes, hats and weapons you unlock." },
      { property: "og:title", content: "My Avatar — Acelexia" },
      { property: "og:description", content: "Dress up your explorer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AvatarPage,
});

export function useGameState() {
  const [s, set] = useState<State | null>(null);
  useEffect(() => {
    const sync = () => set(getState());
    sync();
    window.addEventListener("wq-updated", sync);
    return () => window.removeEventListener("wq-updated", sync);
  }, []);
  return s;
}

function AvatarPage() {
  const s = useGameState();
  const { lang, t } = useLang();
  const [tab, setTab] = useState<Slot>("skin");
  if (!s) return null;
  const look = resolveLook(s.avatar);
  const L = (x: [string, string, string]) => tr(lang, ...x);

  return (
    <main className="min-h-screen px-4 py-6 max-w-5xl mx-auto">
      <Link to="/game" className="text-primary font-semibold">{t("back_map")}</Link>
      <div className="mt-3 flex items-center gap-3 flex-wrap">
        <h1 className="text-4xl font-extrabold">{tr(lang, "My Avatar", "我的角色", "我的角色")}</h1>
        <Link to="/avatarshop" className="ml-auto rounded-2xl bg-primary text-primary-foreground px-4 py-2 font-bold">
          {tr(lang, "Avatar Shop", "角色商店", "角色商店")}
        </Link>
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-[260px_1fr]">
        <div className="bg-card border-2 border-border rounded-3xl p-4 shadow grid place-items-center">
          <AvatarFigure look={look} gender={s.avatar.gender} size={200} />
          <div className="mt-3 flex gap-2" role="group" aria-label="Gender">
            {(["boy", "girl"] as const).map((g) => (
              <Button key={g} variant={s.avatar.gender === g ? "default" : "outline"} className="rounded-2xl font-bold"
                onClick={() => { updateState((st) => ({ ...st, avatar: { ...st.avatar, gender: g, equipped: Object.fromEntries(Object.entries(st.avatar.equipped).filter(([sl, id]) => { const it = itemsFor(sl as Slot, g).find((x) => x.id === id); return !!it; })) } })); void flushProgress(); }}>
                {g === "boy" ? tr(lang, "Boy", "男孩", "男孩") : tr(lang, "Girl", "女孩", "女孩")}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-2" role="tablist">
            {SLOTS.map((sl) => (
              <Button key={sl} role="tab" aria-selected={tab === sl} variant={tab === sl ? "default" : "outline"} className="rounded-2xl font-bold" onClick={() => setTab(sl)}>
                {L(SLOT_LABEL[sl])}
              </Button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3">
            {OPTIONAL_SLOTS.includes(tab) && (
              <button onClick={() => equip(tab, null)} className={`rounded-2xl border-2 p-3 font-bold bg-card ${!s.avatar.equipped[tab] ? "border-primary" : "border-border"}`}>
                {tr(lang, "None", "不戴", "不戴")}
              </button>
            )}
            {itemsFor(tab, s.avatar.gender).map((it) => {
              const owned = isOwned(s.avatar, it);
              const on = look[tab]?.id === it.id && (s.avatar.equipped[tab] !== undefined || !OPTIONAL_SLOTS.includes(tab));
              return (
                <button
                  key={it.id}
                  disabled={!owned}
                  onClick={() => equip(tab, it.id)}
                  className={`relative rounded-2xl border-2 p-3 bg-card text-center ${on ? "border-primary" : "border-border"}`}
                >
                  <span className="mx-auto block w-12 h-12 rounded-full border-2 border-border" style={{ background: it.color }} />
                  <span className="mt-2 block font-bold">{itemName(it, lang)}</span>
                  {!owned && <ItemCost item={it} />}
                  {!owned && <LockBadge />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
