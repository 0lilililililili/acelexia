/* eslint-disable @typescript-eslint/no-explicit-any */
// Server-side sanity rules for saved game progress. The game runs on the
// player's device, so every save is checked against the last stored copy:
// rewards can only grow at a realistic pace, avatar items must be real and
// paid for, and badges are re-checked on the server.
import { ITEMS, byId, isStarter } from "./avatar";
import { BADGES } from "./badges";
import { playerLv } from "./leveling";
import { normalizeAvatar, normalizeBadges, normalizeStreak, normalizeWallet, emptyState, type State } from "./store";

const COLORS = ["red", "blue", "green", "yellow"] as const;
const int = (n: unknown) => Math.max(0, Math.floor(Number(n) || 0));

type Prev = { wallet: any; avatar: any; streak: any; badges: any; towers: any; updated_at: string | null } | null;

export function guardProgress(prev: Prev, next: { wallet?: any; avatar?: any; streak?: any; badges?: any; towers: Record<string, number> }) {
  const elapsed = prev?.updated_at ? Math.max(1, (Date.now() - Date.parse(prev.updated_at)) / 1000) : 60;
  // Generous ceilings per save, scaled by time since the last save.
  const scale = Math.min(1, elapsed / 30);
  const MAX_EXP = Math.ceil(600 * scale) + 40;
  const MAX_STARS = Math.ceil(30 * scale) + 3;
  const MAX_ITEMS = 3;
  const MAX_TOWER = Math.ceil(5 * scale) + 1;

  const pw = normalizeWallet(prev?.wallet);
  const nw = normalizeWallet(next.wallet);

  // Towers: each tower may only rise a few levels per save, max 500.
  const prevTowers = (prev?.towers ?? {}) as Record<string, number>;
  const towers: Record<string, number> = {};
  for (const [k, v] of Object.entries(next.towers ?? {})) {
    if (!/^[A-Z0-9]{2}:[a-z-]{1,20}:(chi|eng|math)$/.test(k) && !/^[\w:-]{1,60}$/.test(k)) continue;
    const before = int(prevTowers[k]);
    towers[k] = Math.min(500, Math.min(int(v), before + MAX_TOWER));
  }

  // Wallet: increases are capped; decreases (spending) are allowed.
  const wallet = { stars: {} as Record<string, number>, items: {} as Record<string, number>, exp: 0 };
  wallet.exp = Math.min(int(nw.exp), int(pw.exp) + MAX_EXP);
  for (const c of COLORS) wallet.stars[c] = Math.min(int(nw.stars[c]), int(pw.stars[c]) + MAX_STARS);
  for (const k of Object.keys(nw.items)) wallet.items[k] = Math.min(int((nw.items as any)[k]), int((pw.items as any)[k]) + MAX_ITEMS);

  // Avatar: new items must exist, meet the LV gate, and be paid for with stars
  // (one free non-starter item per save is allowed for the daily lottery).
  const pa = normalizeAvatar(prev?.avatar);
  const na = normalizeAvatar(next.avatar);
  const lv = playerLv(wallet.exp);
  const spent: Record<string, number> = {};
  for (const c of COLORS) spent[c] = Math.max(0, int(pw.stars[c]) - wallet.stars[c]);
  const owned = new Set(pa.owned.filter((id) => byId(id)));
  let freeUsed = false;
  for (const id of na.owned) {
    if (owned.has(id)) continue;
    const item = byId(id);
    if (!item || item.lv > lv) continue;
    if (isStarter(item)) { owned.add(id); continue; }
    const affordable = COLORS.every((c) => (item.cost[c] ?? 0) <= spent[c]);
    if (affordable) {
      for (const c of COLORS) spent[c] -= item.cost[c] ?? 0;
      owned.add(id);
    } else if (!freeUsed) {
      freeUsed = true;
      owned.add(id);
    }
  }
  const equipped: Record<string, string> = {};
  for (const [slot, id] of Object.entries(na.equipped ?? {})) {
    const item = byId(id);
    if (item && item.slot === slot && (owned.has(id) || isStarter(item))) equipped[slot] = id;
  }
  const avatar = { ...na, gender: na.gender === "girl" ? "girl" : "boy", owned: [...owned], equipped };

  // Streak: best can only grow by one day per save.
  const ps = normalizeStreak(prev?.streak);
  const ns = normalizeStreak(next.streak);
  const best = Math.min(int(ns.best), int(ps.best) + 1);
  const streak = { ...ns, best, current: Math.min(int(ns.current), best) };

  // Badges: keep earlier ones, add new ones only if the server agrees.
  const pb = normalizeBadges(prev?.badges);
  const nb = normalizeBadges(next.badges);
  const bestRun: Record<string, number> = {};
  for (const [k, v] of Object.entries(nb.bestRun ?? {})) bestRun[k] = Math.min(int(v), int(pb.bestRun?.[k]) + 50);
  const state: State = {
    ...emptyState(),
    towers,
    wallet: wallet as any,
    avatar: avatar as any,
    streak: streak as any,
    badges: { unlocked: [], run: nb.run ?? {}, bestRun },
  };
  const valid = new Set(BADGES.map((b) => b.id));
  const unlocked = new Set(pb.unlocked.filter((id) => valid.has(id)));
  for (const id of nb.unlocked) {
    const b = BADGES.find((x) => x.id === id);
    if (b && b.check(state)) unlocked.add(id);
  }
  const badges = { ...nb, bestRun, unlocked: [...unlocked] };

  void ITEMS;
  return { towers, wallet, avatar, streak, badges };
}
