// Player level (Lv), star rewards and the Lv gate that stops item-reliant players.

/** EXP needed to go from Lv n to Lv n+1: small at first, growing by 10 each LV (50, 60, 70 …). */
export function expForLv(lv: number) {
  return 50 + 10 * (Math.max(1, lv) - 1);
}

/** Total EXP needed to reach Lv n from Lv 1. */
export function totalExpForLv(lv: number) {
  const n = Math.max(1, lv) - 1;
  return 50 * n + 5 * n * (n - 1);
}

/** Lv starts at 1; each next LV needs a little more EXP than the last. */
export function playerLv(exp: number) {
  let lv = 1;
  while (totalExpForLv(lv + 1) <= Math.max(0, exp)) lv++;
  return lv;
}

/** EXP earned inside the current Lv and EXP needed for the next one. */
export function lvProgress(exp: number) {
  const lv = playerLv(exp);
  return { into: Math.max(0, exp) - totalExpForLv(lv), need: expForLv(lv) };
}

/** Exp progress inside the current Lv, as a 0–100 percentage. */
export function lvProgressPct(exp: number) {
  const { into, need } = lvProgress(exp);
  return (into / need) * 100;
}

/**
 * Lv required to unlock a tower level.
 * Upper bound of exp obtainable by clearing every tower up to level n:
 *   9 towers * 8 exp per level * n levels  → /250 exp per Lv, rounded down to a multiple of 5.
 * Only applied at every 100-level band (levels 1–99 are always open).
 */
export function requiredLv(level: number) {
  const band = Math.floor(level / 100) * 100;
  if (band < 100) return 1;
  const upper = (9 * 8 * band) / 250;
  return Math.floor(upper / 5) * 5;
}

export type StarColor = "red" | "blue" | "green" | "yellow";

export const WORLD_STAR: Record<string, StarColor> = {
  fire: "red",
  aquatic: "blue",
  forest: "green",
};

export function worldStarColor(world: string): StarColor {
  return WORLD_STAR[world] ?? "yellow";
}

export const STAR_HEX: Record<StarColor, string> = {
  red: "#e2483d",
  blue: "#2e86de",
  green: "#2ea44f",
  yellow: "#f2b705",
};

export const STAR_LABEL: Record<StarColor, string> = {
  red: "Red",
  blue: "Blue",
  green: "Green",
  yellow: "Yellow",
};

/** 0 wrong → 3 stars, 1 wrong → 2 stars, 2–3 wrong → 1 star, 4+ wrong → failed. */
export function starsForWrong(wrong: number) {
  if (wrong === 0) return 3;
  if (wrong < 2) return 2;
  if (wrong < 4) return 1;
  return 0;
}
