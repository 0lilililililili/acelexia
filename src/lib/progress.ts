// Tracks the highest cleared level per (grade, world, subject) using localStorage.

export function progressKey(grade: string, world: string, subject: string) {
  return `progress:${grade}:${world}:${subject}`;
}

export function getCleared(grade: string, world: string, subject: string): number {
  if (typeof window === "undefined") return 0;
  const v = window.localStorage.getItem(progressKey(grade, world, subject));
  const n = v ? parseInt(v, 10) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function markCleared(grade: string, world: string, subject: string, level: number) {
  if (typeof window === "undefined") return;
  const current = getCleared(grade, world, subject);
  if (level > current) {
    window.localStorage.setItem(progressKey(grade, world, subject), String(level));
    window.dispatchEvent(new CustomEvent("progress-updated"));
  }
}
