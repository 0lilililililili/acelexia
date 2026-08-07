import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getState, grantItem, setState, spendStars, type ItemKey, type State } from "@/lib/store";
import { STAR_HEX, type StarColor } from "@/lib/leveling";
import { StarRow } from "@/components/stars";
import hourglassImg from "@/assets/icon-hourglass.png";
import potionImg from "@/assets/icon-potion.png";
import torchImg from "@/assets/icon-torch.png";
import shopImg from "@/assets/icon-shop.png";

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
  const [msg, setMsg] = useState<string | null>(null);
  const [convert, setConvert] = useState(1);

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
      flash(`Not enough ${p.color} stars for ${p.name}.`);
      return;
    }
    grantItem(p.key);
    flash(`${p.name} bought!`);
  };

  const doConvert = (to: StarColor) => {
    const n = Math.max(1, Math.floor(convert));
    const s = getState();
    if ((s.wallet.stars.yellow ?? 0) < n) {
      flash("Not enough yellow stars.");
      return;
    }
    setState({
      ...s,
      wallet: {
        ...s.wallet,
        stars: { ...s.wallet.stars, yellow: s.wallet.stars.yellow - n, [to]: (s.wallet.stars[to] ?? 0) + n },
      },
    });
    flash(`Converted ${n} yellow → ${n} ${to}. This cannot be undone.`);
  };

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/game" className="text-primary font-semibold">← Back to map</Link>

        <header className="mt-3 flex items-center gap-4 flex-wrap">
          <img src={shopImg} alt="" loading="lazy" width={512} height={512} className="w-20 h-20 object-contain" />
          <div>
            <h1 className="text-4xl font-extrabold">Star Shop</h1>
            <p className="text-muted-foreground">Spend the stars you win in the towers.</p>
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
              <p className="mt-2 font-extrabold" style={{ color: STAR_HEX[p.color] }}>
                {p.price} {p.color} stars
              </p>
              <p className="text-xs text-muted-foreground">You own: {wallet?.items[p.key] ?? 0}</p>
              <button
                onClick={() => buy(p)}
                className="mt-3 rounded-2xl bg-primary text-primary-foreground px-5 py-2 font-bold w-full"
              >
                Buy
              </button>
            </div>
          ))}
        </div>

        <section className="mt-8 bg-card border-2 border-border rounded-3xl p-6 shadow">
          <h2 className="text-xl font-extrabold">Yellow star exchange</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Event (yellow) stars can be turned into red, blue or green stars — one way only.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="font-bold" htmlFor="convert-amount">Amount</label>
            <input
              id="convert-amount"
              type="number"
              min={1}
              value={convert}
              onChange={(e) => setConvert(parseInt(e.target.value, 10) || 1)}
              className="w-24 rounded-xl border-2 border-border bg-background px-3 py-2 font-bold"
            />
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => doConvert(c)}
                className="rounded-2xl px-4 py-2 font-bold text-white"
                style={{ background: STAR_HEX[c] }}
              >
                → {c}
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
