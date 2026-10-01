import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { itemsFor, isOwned, itemName, SLOTS, type AvatarItem, type Slot } from "@/lib/avatar";
import { buyAvatarItem } from "@/lib/avatar-shop";
import { playerLv } from "@/lib/leveling";
import { ItemCost, LockBadge } from "@/components/item-cost";
import { useLang } from "@/lib/i18n";
import { tr } from "@/lib/tr";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useGameState } from "./avatar";

export const Route = createFileRoute("/avatarshop/$category")({
  beforeLoad: ({ params }) => {
    if (!SLOTS.includes(params.category as Slot)) throw notFound();
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const { lang, t } = useLang();
  const s = useGameState();
  const [pick, setPick] = useState<AvatarItem | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  if (!s) return null;
  const lv = playerLv(s.wallet.exp);
  // Show items for both genders in shop (gendered starters hidden by isOwned)
  const items = itemsFor(category as Slot, s.avatar.gender);

  const doBuy = () => {
    if (!pick) return;
    const r = buyAvatarItem(pick);
    setMsg(r === "ok" ? tr(lang, `Unlocked ${pick.name.en}!`, `已解鎖${pick.name.zh}！`) : r === "lv" ? tr(lang, `Need LV${pick.lv}`, `需要 LV${pick.lv}`) : tr(lang, "Not enough stars", "星星不足", "星星不足"));
    setPick(null);
  };

  return (
    <>
      {msg && <p className="mt-4 font-bold text-primary">{msg}</p>}
      <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((it) => {
          const owned = isOwned(s.avatar, it);
          const lvLocked = lv < it.lv;
          return (
            <div key={it.id} className="relative bg-card border-2 border-border rounded-3xl p-4 text-center shadow">
              <span className="mx-auto block w-14 h-14 rounded-full border-2 border-border" style={{ background: it.color }} />
              <h2 className="mt-2 font-extrabold">{itemName(it, lang)}</h2>
              <div className="mt-1"><ItemCost item={it} /></div>
              {owned ? (
                <p className="mt-2 font-bold text-primary">{tr(lang, "Owned", "已擁有", "已拥有")}</p>
              ) : (
                <Button className="mt-2 w-full rounded-2xl font-bold" disabled={lvLocked} onClick={() => setPick(it)}>{t("buy")}</Button>
              )}
              {lvLocked && !owned && <LockBadge />}
            </div>
          );
        })}
      </div>
      <Dialog open={!!pick} onOpenChange={(o) => !o && setPick(null)}>
        <DialogContent className="max-w-sm rounded-2xl border-2">
          <DialogHeader>
            <DialogTitle>{t("confirm")}</DialogTitle>
            <DialogDescription>{pick && itemName(pick, lang)}</DialogDescription>
          </DialogHeader>
          {pick && <ItemCost item={pick} />}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setPick(null)}>{t("cancel")}</Button>
            <Button onClick={doBuy}>{t("confirm")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
