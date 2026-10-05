// Daily lottery: one spin per day after all 3 daily quests are done.
// Odds: nothing > EXP > stars > tools > avatar clothes.
import { getState, setState, type ItemKey } from "./store";
import { ITEMS } from "./avatar";

export type Prize =
  | { kind: "nothing" }
  | { kind: "exp"; n: number }
  | { kind: "stars"; color: "red" | "blue" | "green" | "yellow"; n: number }
  | { kind: "tool"; item: ItemKey }
  | { kind: "clothes"; id: string; name: { en: string; zh: string } };

export const LOTTERY_ODDS = { nothing: 40, exp: 28, stars: 18, tool: 10, clothes: 4 } as const;

const today = () => new Date().toISOString().slice(0, 10);

export function canSpin(): boolean {
  const st = getState().streak;
  return st.daily.length === 3 && st.daily.every((d) => d.done) && st.lotteryDay !== today();
}
export const spunToday = () => getState().streak.lotteryDay === today();

export function pickKind(r: number): keyof typeof LOTTERY_ODDS {
  let acc = 0;
  for (const [k, w] of Object.entries(LOTTERY_ODDS)) { acc += w; if (r * 100 < acc) return k as keyof typeof LOTTERY_ODDS; }
  return "nothing";
}

export function spin(rand: () => number = Math.random): Prize | null {
  if (!canSpin()) return null;
  const s = getState();
  let kind = pickKind(rand());
  let prize: Prize = { kind: "nothing" };
  const wallet = { ...s.wallet, stars: { ...s.wallet.stars }, items: { ...s.wallet.items } };
  const avatar = { ...s.avatar, owned: [...s.avatar.owned] };
  if (kind === "clothes") {
    const pool = ITEMS.filter((i) => i.slot !== "skin" && !avatar.owned.includes(i.id) && (!i.gender || i.gender === avatar.gender) && Object.keys(i.cost).length > 0);
    if (pool.length) { const it = pool[Math.floor(rand() * pool.length)]; avatar.owned.push(it.id); prize = { kind: "clothes", id: it.id, name: it.name }; }
    else kind = "tool";
  }
  if (kind === "tool") {
    const keys: ItemKey[] = ["glassA", "potionA", "torch"];
    const item = keys[Math.floor(rand() * keys.length)];
    wallet.items[item] = (wallet.items[item] ?? 0) + 1; prize = { kind: "tool", item };
  } else if (kind === "stars") {
    const colors = ["red", "blue", "green", "yellow"] as const;
    const color = colors[Math.floor(rand() * 3.2) % 4]; const n = color === "yellow" ? 1 : 3;
    wallet.stars[color] = (wallet.stars[color] ?? 0) + n; prize = { kind: "stars", color, n };
  } else if (kind === "exp") {
    const n = 30; wallet.exp = (wallet.exp ?? 0) + n; prize = { kind: "exp", n };
  }
  setState({ ...s, wallet, avatar, streak: { ...s.streak, lotteryDay: today() } });
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("wq-updated"));
  return prize;
}
