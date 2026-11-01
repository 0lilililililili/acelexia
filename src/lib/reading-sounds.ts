// Deliberately curated sound units; unsupported words stay unannotated rather than guessed.
export const ENGLISH_SOUNDS: Record<string, { chunks: string[]; sounds: string[] }> = {
  cat: { chunks: ["c", "a", "t"], sounds: ["/k/", "/æ/", "/t/"] },
  dog: { chunks: ["d", "o", "g"], sounds: ["/d/", "/ɒ/", "/ɡ/"] },
  sun: { chunks: ["s", "u", "n"], sounds: ["/s/", "/ʌ/", "/n/"] },
  fish: { chunks: ["f", "i", "sh"], sounds: ["/f/", "/ɪ/", "/ʃ/"] },
  ship: { chunks: ["sh", "i", "p"], sounds: ["/ʃ/", "/ɪ/", "/p/"] },
  shop: { chunks: ["sh", "o", "p"], sounds: ["/ʃ/", "/ɒ/", "/p/"] },
  book: { chunks: ["b", "oo", "k"], sounds: ["/b/", "/ʊ/", "/k/"] },
  rain: { chunks: ["r", "ai", "n"], sounds: ["/r/", "/eɪ/", "/n/"] },
  light: { chunks: ["l", "igh", "t"], sounds: ["/l/", "/aɪ/", "/t/"] },
  night: { chunks: ["n", "igh", "t"], sounds: ["/n/", "/aɪ/", "/t/"] },
  tree: { chunks: ["t", "r", "ee"], sounds: ["/t/", "/r/", "/iː/"] },
  sheep: { chunks: ["sh", "ee", "p"], sounds: ["/ʃ/", "/iː/", "/p/"] },
  teach: { chunks: ["t", "ea", "ch"], sounds: ["/t/", "/iː/", "/tʃ/"] },
  green: { chunks: ["g", "r", "ee", "n"], sounds: ["/ɡ/", "/r/", "/iː/", "/n/"] },
  moon: { chunks: ["m", "oo", "n"], sounds: ["/m/", "/uː/", "/n/"] },
  food: { chunks: ["f", "oo", "d"], sounds: ["/f/", "/uː/", "/d/"] },
  red: { chunks: ["r", "e", "d"], sounds: ["/r/", "/e/", "/d/"] },
  mix: { chunks: ["m", "i", "x"], sounds: ["/m/", "/ɪ/", "/ks/"] },
};
export const ENGLISH_SYLLABLES: Record<string, string[]> = {
  happy: ["hap", "py"], happiness: ["hap", "pi", "ness"], teacher: ["teach", "er"],
  helpful: ["help", "ful"], careful: ["care", "ful"], player: ["play", "er"],
  hopeful: ["hope", "ful"], quickly: ["quick", "ly"], because: ["be", "cause"],
  mother: ["moth", "er"], children: ["chil", "dren"], family: ["fam", "i", "ly"],
  spelling: ["spell", "ing"], reading: ["read", "ing"], running: ["run", "ning"],
  beautiful: ["beau", "ti", "ful"], elephant: ["el", "e", "phant"], banana: ["ba", "na", "na"],
};
// Relative Cantonese pitch heights (1 = low, 5 = high), not an assessment of recorded speech.
export const CANTONESE_PITCH: Record<number, number[]> = { 1: [5,5,5], 2: [2,3,5], 3: [3,3,3], 4: [2,1,1], 5: [2,2,3], 6: [2,2,2] };