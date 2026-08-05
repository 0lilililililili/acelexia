// Tracks the highest cleared level per (grade, world, subject).
// Backed by the central store, which mirrors to the PROGRESS database when logged in.
import { getState, setState, towerKey } from "./store";

export function progressKey(grade: string, world: string, subject: string) {
  return towerKey(grade, world, subject);
}

export function getCleared(grade: string, world: string, subject: string): number {
  const n = getState().towers[towerKey(grade, world, subject)] ?? 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function markCleared(grade: string, world: string, subject: string, level: number) {
  if (typeof window === "undefined") return;
  const s = getState();
  const key = towerKey(grade, world, subject);
  if (level > (s.towers[key] ?? 0)) {
    setState({ ...s, towers: { ...s.towers, [key]: level } });
    window.dispatchEvent(new CustomEvent("progress-updated"));
  }
}
