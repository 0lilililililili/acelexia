import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star, ArrowRight, Check, X } from "lucide-react";

import { getState, grantItem, setState, spendStars, type ItemKey, type State } from "@/lib/store";
import { STAR_HEX, type StarColor } from "@/lib/leveling";
import { StarRow } from "@/components/stars";
import hourglassImg from "@/assets/icon-hourglass.png";
import potionImg from "@/assets/icon-potion.png";
import torchImg from "@/assets/icon-torch.png";
import shopImg from "@/assets/icon-shop.png";
import stallImg from "@/assets/bg-shop-stall.jpg";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Star Shop — Acelexia" },
      { name: "description", content: "Spend the coloured stars you win in battle on hour-glasses, potions and passes." },
      { property: "og:title", content: "Star Shop — Acelexia" },
      { property: "og:description", content: "Buy HOUR-GLASS, POTION and PASS items with your stars." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

type Product = {
  key: ItemKey;
  name: string;
  blurb: string;
  color: StarColor;
  price: number;
  img: string;
};

const PRODUCTS: Product[] = [
  { key: "glassA", name: "HOUR-GLASS A", blurb: "+15 seconds when the timer runs out", color: "green", price: 5, img: hourglassImg },
  { key: "glassB", name: "HOUR-GLASS B", blurb: "+20 seconds when the timer runs out", color: "green", price: 10, img: hourglassImg },
  { key: "glassC", name: "HOUR-GLASS C", blurb: "+25 seconds when the timer runs out", color: "green", price: 15, img: hourglassImg },
  { key: "potionA", name: "POTION A", blurb: "Change the question once", color: "blue", price: 10, img: potionImg },
  { key: "potionB", name: "POTION B", blurb: "Buffet: change questions freely for 7 seconds", color: "blue", price: 20, img: potionImg },
  { key: "torch", name: "PASS (torch)", blurb: "Pass the question — counts as correct", color: "red", price: 20, img: torchImg },
];

const COLORS: StarColor[] = ["red", "blue", "green"];

function ShopPage() {
  const [state, setLocal] = useState<State | null>(null);
  const { t } = useLang();
  const [msg, setMsg] = useState<string | null>(null);
  const [convert, setConvert] = useState(1);
  const [convertTo, setConvertTo] = useState<StarColor>("red");
  const [confirm, setConfirm] = useState<{ kind: "buy"; product: Product } | { kind: "convert" } | null>(null);

  useEffect(() => {
    const sync = () => setLocal(getState());
    sync();
    window.addEventListener("wq-updated", sync);
    return () => window.removeEventListener("wq-updated", sync);
  }, []);

  const wallet = state?.wallet;
  const flash = (t: string) => {
    setMsg(t);
    setTimeout(() => setMsg(null), 1800);
  };

  const buy = (p: Product) => {
    if (!spendStars(p.color, p.price)) {
      flash(t("not_enough_color", { color: t(p.color), name: p.name }));
      return;
    }
    grantItem(p.key);
    flash(t("bought", { name: p.name }));
  };

  const doConvert = (to: StarColor) => {
    const n = Math.max(1, Math.floor(convert));
    const s = getState();
    if ((s.wallet.stars.yellow ?? 0) < n) {
      flash(t("not_enough_yellow"));
      return;
    }
    setState({
      ...s,
      wallet: {
        ...s.wallet,
        stars: { ...s.wallet.stars, yellow: s.wallet.stars.yellow - n, [to]: (s.wallet.stars[to] ?? 0) + n },
      },
    });
    flash(t("converted", { n, color: t(to) }));
    setConfirm(null);
  };

  const confirmAction = () => {
    if (!confirm) return;
    if (confirm.kind === "buy") {
      buy(confirm.product);
      setConfirm(null);
      return;
    }
    doConvert(convertTo);
  };

  return (
    <main className="min-h-screen px-6 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${stallImg})` }} aria-hidden />
      <div className="absolute inset-0 bg-background/35" aria-hidden />
      <div className="relative max-w-4xl mx-auto">
        <Link to="/game" className="text-primary font-semibold">{t("back_map")}</Link>

        <header className="mt-3 flex items-center gap-4 flex-wrap">
          <img src={shopImg} alt="" loading="lazy" width={512} height={512} className="w-20 h-20 object-contain" />
          <div>
            <h1 className="text-4xl font-extrabold">{t("star_shop")}</h1>
            <p className="text-muted-foreground">{t("shop_sub")}</p>
          </div>
          <div className="ml-auto bg-card border-2 border-border rounded-2xl px-4 py-3 shadow">
            {wallet && <StarRow stars={wallet.stars} />}
          </div>
        </header>

        {msg && <p className="mt-4 font-bold text-primary">{msg}</p>}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <div key={p.key} className="bg-card border-2 border-border rounded-3xl p-5 shadow text-center">
              <img src={p.img} alt={p.name} loading="lazy" width={512} height={512} className="w-24 h-24 mx-auto object-contain" />
              <h2 className="mt-2 text-lg font-extrabold">{p.name}</h2>
              <p className="text-sm text-muted-foreground mt-1 min-h-[2.5rem]">{p.blurb}</p>
              <p className="mt-2 inline-flex items-center justify-center gap-2 text-xl font-extrabold">
                {p.price}<Star size={25} style={{ color: STAR_HEX[p.color], fill: STAR_HEX[p.color] }} aria-label={t(p.color)} />
              </p>
              <p className="text-xs text-muted-foreground">{t("own", { n: wallet?.items[p.key] ?? 0 })}</p>
              <Button
                onClick={() => setConfirm({ kind: "buy", product: p })}
                className="mt-3 rounded-2xl px-5 py-2 font-bold w-full"
              >
                {t("buy")}
              </Button>
            </div>
          ))}
        </div>

        <section className="mt-8 bg-card border-2 border-border rounded-3xl p-6 shadow">
          <h2 className="text-xl font-extrabold flex items-center gap-2" aria-label={t("exchange_yellow")}>
            <Star size={26} style={{ color: STAR_HEX.yellow, fill: STAR_HEX.yellow }} aria-hidden />
            <ArrowRight size={22} aria-hidden />
            <Star size={22} style={{ color: STAR_HEX[convertTo], fill: STAR_HEX[convertTo] }} aria-hidden />
          </h2>

          <div className="mt-4 grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
            <span className="flex items-center gap-2 text-2xl font-extrabold">
              <Star size={34} style={{ color: STAR_HEX.yellow, fill: STAR_HEX.yellow }} aria-hidden /> {convert}
            </span>
            <div className="flex items-center gap-3">
              <input
                id="convert-amount"
                aria-label={t("yellow_to_exchange")}
                type="range"
                min={1}
                max={Math.max(1, wallet?.stars.yellow ?? 1)}
                value={Math.min(convert, Math.max(1, wallet?.stars.yellow ?? 1))}
                onChange={(e) => setConvert(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <ArrowRight size={30} className="text-primary shrink-0" aria-hidden />
            </div>
            <div className="flex items-center gap-2">
              {COLORS.map((c, i) => (
                <span key={c} className="contents">
                  {i > 0 && <span className="font-extrabold text-muted-foreground">{t("or")}</span>}
                  <Button
                    variant={convertTo === c ? "default" : "outline"}
                    size="icon"
                    onClick={() => setConvertTo(c)}
                    aria-label={t("choose_color", { color: t(c) })}
                    title={t(c)}
                    className="w-14 h-14 rounded-2xl border-2"
                  >
                    <Star size={30} style={{ color: STAR_HEX[c], fill: STAR_HEX[c] }} aria-hidden />
                  </Button>
                </span>
              ))}
            </div>
          </div>
          <Button className="mt-5 rounded-2xl px-6 font-bold" onClick={() => setConfirm({ kind: "convert" })} disabled={(wallet?.stars.yellow ?? 0) < 1}>
            <Check aria-hidden /> {t("confirm")}
          </Button>
        </section>

      </div>

      <Dialog open={confirm !== null} onOpenChange={(open) => !open && setConfirm(null)}>
        <DialogContent className="max-w-sm rounded-2xl border-2">
          <DialogHeader>
            <DialogTitle>{t("confirm")}</DialogTitle>
            <DialogDescription>
              {confirm?.kind === "buy" ? (
                <>{t("confirm_buy", { name: confirm.product.name, price: confirm.product.price, color: t(confirm.product.color) })}</>
              ) : (
                <>{t("confirm_convert", { n: convert, color: t(convertTo) })}</>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfirm(null)}><X aria-hidden /> {t("cancel")}</Button>
            <Button onClick={confirmAction}><Check aria-hidden /> {t("confirm")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
