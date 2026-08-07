// Shared answer matching + spoken item-command parsing for the play & re-quiz pages.

export const LETTERS = ["a", "b", "c", "d"];

/** Words the speech engine commonly returns instead of the bare letters a/b/c/d. */
const LETTER_HOMOPHONES: Record<string, string> = {
  a: "a", ay: "a", eh: "a", ah: "a", hey: "a", ei: "a", "a.": "a", "誒": "a", 甲: "a",
  b: "b", be: "b", bee: "b", bea: "b", bi: "b", "b.": "b", 乙: "b",
  c: "c", see: "c", sea: "c", si: "c", cee: "c", "c.": "c", 丙: "c",
  d: "d", de: "d", dee: "d", di: "d", the: "d", "d.": "d", 丁: "d",
};

/**
 * Map a spoken alternative ("b", "letter b", "option bee", "answer B.") to a
 * choice index. Deliberately forgiving — dyslexic kids often say the letter softly.
 */
export function letterFromSpeech(transcript: string): number | null {
  for (const alt of transcript.split("|")) {
    const raw = alt.toLowerCase().trim().replace(/[.,!?。，]/g, " ");
    const tokens = raw.split(/\s+/).filter(Boolean);
    // strip leading filler words
    const filler = new Set(["option", "letter", "answer", "choice", "number", "is", "the", "i", "choose", "pick", "select", "揀", "選"]);
    const meaningful = tokens.filter((t) => !filler.has(t));
    const candidates = meaningful.length ? meaningful : tokens;
    for (const tok of candidates) {
      const hit = LETTER_HOMOPHONES[tok];
      if (hit) return LETTERS.indexOf(hit);
    }
    // single character utterance, e.g. "B"
    if (raw.length === 1 && LETTER_HOMOPHONES[raw]) return LETTERS.indexOf(LETTER_HOMOPHONES[raw]);
  }
  return null;
}

export function choiceFromSpeech(transcript: string, choices: string[]): string | null {
  const i = letterFromSpeech(transcript);
  if (i !== null && i >= 0 && choices[i]) return choices[i];
  return null;
}

const NUM_WORDS: Record<string, string> = {
  zero: "0", oh: "0",
  one: "1", two: "2", three: "3", four: "4", five: "5",
  six: "6", seven: "7", eight: "8", nine: "9", ten: "10",
  eleven: "11", twelve: "12", thirteen: "13", fourteen: "14", fifteen: "15",
  sixteen: "16", seventeen: "17", eighteen: "18", nineteen: "19", twenty: "20",
  thirty: "30", forty: "40", fifty: "50", sixty: "60", seventy: "70", eighty: "80", ninety: "90",
  hundred: "100", thousand: "1000",
  half: "1/2", halves: "1/2",
  third: "1/3", thirds: "1/3",
  quarter: "1/4", quarters: "1/4", fourth: "1/4", fourths: "1/4",
  fifth: "1/5", fifths: "1/5", sixth: "1/6", sixths: "1/6",
  seventh: "1/7", sevenths: "1/7", eighth: "1/8", eighths: "1/8",
  ninth: "1/9", ninths: "1/9", tenth: "1/10", tenths: "1/10",
};

export function wordsToFraction(s: string): string | null {
  const t = s.toLowerCase().trim();
  const overMatch = t.match(/^([a-z]+)\s+(?:over|out of|divided by|on)\s+([a-z0-9]+)$/);
  if (overMatch) {
    const n = NUM_WORDS[overMatch[1]] ?? overMatch[1];
    const d = NUM_WORDS[overMatch[2]] ?? overMatch[2];
    if (/^\d+$/.test(n) && /^\d+$/.test(d)) return `${n}/${d}`;
  }
  const thirdsMatch = t.match(/^([a-z]+)\s+([a-z]+)$/);
  if (thirdsMatch) {
    const n = NUM_WORDS[thirdsMatch[1]];
    const dWord = NUM_WORDS[thirdsMatch[2]];
    if (n && dWord && dWord.startsWith("1/")) return `${n}${dWord.slice(1)}`;
  }
  return null;
}

export function normalize(s: string) {
  return s.toLowerCase().replace(/[^\p{Letter}\p{Number}]/gu, "");
}

export function matches(transcript: string, answer: string) {
  const a = normalize(answer);
  if (!a) return false;
  const answerIsFraction = /^\d+\/\d+$/.test(answer.trim());
  return transcript.split("|").some((alt) => {
    const raw = alt.toLowerCase().trim();
    const n = normalize(raw);
    if (!n) return false;
    if (n === a) return true;
    const tokens = raw.split(/[^\p{Letter}\p{Number}]+/u).filter(Boolean);
    if (tokens.some((tok) => normalize(tok) === a)) return true;
    if (answerIsFraction) {
      const frac = wordsToFraction(raw);
      if (frac && frac === answer.trim()) return true;
    }
    if (a.length >= 4 && (n.includes(a) || a.includes(n))) return true;
    return false;
  });
}

export type SpokenCommand =
  | { kind: "potion"; which: "A" | "B" }
  | { kind: "torch" }
  | { kind: "glass"; which: "A" | "B" | "C" }
  | { kind: "yes" }
  | { kind: "no" };

/** Parses spoken item commands like "item potion A", "item torch", "yes item glass B". */
export function parseCommand(transcript: string): SpokenCommand | null {
  for (const alt of transcript.split("|")) {
    const raw = " " + alt.toLowerCase().replace(/[.,!?]/g, " ").replace(/\s+/g, " ").trim() + " ";
    const letter = (m: RegExpMatchArray | null) => {
      if (!m) return null;
      const l = LETTER_HOMOPHONES[m[1].trim()] ?? m[1].trim();
      return l.toUpperCase();
    };
    const glass = raw.match(/(?:glass|hourglass|hour glass)\s+([a-z]+|[abc])\b/);
    if (glass) {
      const w = letter(glass);
      if (w === "A" || w === "B" || w === "C") return { kind: "glass", which: w };
    }
    const potion = raw.match(/potion\s+([a-z]+|[ab])\b/);
    if (potion) {
      const w = letter(potion);
      if (w === "A" || w === "B") return { kind: "potion", which: w };
    }
    if (/\b(torch|pass|item torch)\b/.test(raw)) return { kind: "torch" };
    if (/\b(yes|yeah|yep|ok|okay|sure|use it|use)\b/.test(raw)) return { kind: "yes" };
    if (/\b(no|nope|cancel|skip it)\b/.test(raw)) return { kind: "no" };
  }
  return null;
}
