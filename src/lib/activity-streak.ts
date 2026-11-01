import type { StreakState } from "./store";

/** Only a completed daily quest or boss round qualifies; results need not be a win. */
export function activityStreak(streak: StreakState, activity: "visit" | "daily-quest" | "boss-level", today: string, yesterday: string): StreakState {
  if (activity === "visit" || streak.lastDay === today) return streak;
  const current = streak.lastDay === yesterday ? streak.current + 1 : 1;
  return { ...streak, current, best: Math.max(streak.best, current), lastDay: today };
}