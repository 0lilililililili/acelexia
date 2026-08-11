// Weighted revision planner.
// Method: every "struggle event" (a wrong answer or a tool used on a question)
// is a data point with a severity weight. Per topic we compute
//   raw   = sum of weights
//   decay = exponential recency weighting, half-life 14 days
//   score = sum(weight * 0.5 ^ (age_days / 14))
// Topics are then ranked, normalised to a 0-100 priority index, and cut at the
// Pareto point (topics covering the first 80% of total score) to keep the plan
// short enough for a child to actually finish.
import type { RevisionItem, RevisionReason } from "./auth.functions";

export const REASON_WEIGHT: Record<RevisionReason, number> = {
  glass: 1, // needed extra time
  potion: 2, // dodged the question
  torch: 2, // passed the question
  wrong: 2, // wrong / timed out
};

export const REASON_LABEL: Record<RevisionReason, string> = {
  wrong: "Missed",
  glass: "Needed more time",
  potion: "Swapped away",
  torch: "Passed with a torch",
};

const HALF_LIFE_DAYS = 14;
const DAY = 86_400_000;

export type TopicPlan = {
  subject: string;
  topic: string;
  items: number;
  raw: number;
  score: number;
  priority: number; // 0-100
  reasons: Record<RevisionReason, number>;
  band: "high" | "medium" | "low";
  suggestedQuestions: number;
};

export type StudyPlan = {
  topics: TopicPlan[];
  focus: TopicPlan[]; // Pareto 80% cut
  bySubject: { subject: string; score: number; share: number; items: number }[];
  totalItems: number;
};

export function buildStudyPlan(
  revision: Record<string, Record<string, RevisionItem[]>>,
  now = Date.now(),
): StudyPlan {
  const topics: TopicPlan[] = [];
  let totalItems = 0;

  for (const [subject, byTopic] of Object.entries(revision ?? {})) {
    for (const [topic, list] of Object.entries(byTopic ?? {})) {
      if (!list?.length) continue;
      const reasons: Record<RevisionReason, number> = { wrong: 0, glass: 0, potion: 0, torch: 0 };
      let raw = 0;
      let score = 0;
      for (const it of list) {
        const reason: RevisionReason = it.reason ?? "wrong";
        const w = REASON_WEIGHT[reason] ?? 2;
        reasons[reason] += 1;
        raw += w;
        const ageDays = Math.max(0, (now - (it.ts || now)) / DAY);
        score += w * Math.pow(0.5, ageDays / HALF_LIFE_DAYS);
      }
      totalItems += list.length;
      topics.push({
        subject,
        topic,
        items: list.length,
        raw,
        score,
        priority: 0,
        reasons,
        band: "low",
        suggestedQuestions: 0,
      });
    }
  }

  topics.sort((a, b) => b.score - a.score);
  const max = topics[0]?.score ?? 0;
  const total = topics.reduce((s, t) => s + t.score, 0);

  for (const t of topics) {
    t.priority = max > 0 ? Math.round((t.score / max) * 100) : 0;
    t.band = t.priority >= 67 ? "high" : t.priority >= 34 ? "medium" : "low";
    // 5 questions baseline, scaled by priority, capped at 15 (one re-quiz round)
    t.suggestedQuestions = Math.min(15, Math.max(5, Math.round(t.raw * 1.5)));
  }

  const focus: TopicPlan[] = [];
  let acc = 0;
  for (const t of topics) {
    focus.push(t);
    acc += t.score;
    if (total > 0 && acc / total >= 0.8) break;
    if (focus.length >= 5) break;
  }

  const subjMap = new Map<string, { score: number; items: number }>();
  for (const t of topics) {
    const cur = subjMap.get(t.subject) ?? { score: 0, items: 0 };
    cur.score += t.score;
    cur.items += t.items;
    subjMap.set(t.subject, cur);
  }
  const bySubject = [...subjMap.entries()]
    .map(([subject, v]) => ({
      subject,
      score: v.score,
      items: v.items,
      share: total > 0 ? Math.round((v.score / total) * 100) : 0,
    }))
    .sort((a, b) => b.score - a.score);

  return { topics, focus, bySubject, totalItems };
}
