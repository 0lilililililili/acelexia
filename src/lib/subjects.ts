/** Short, dyslexia-friendly subject labels used across the whole game. */
export const SUBJECT_LABEL: Record<string, string> = {
  chi: "中",
  eng: "ENG",
  math: "MATH",
};

export const SUBJECTS: { key: string; label: string }[] = [
  { key: "chi", label: SUBJECT_LABEL.chi },
  { key: "eng", label: SUBJECT_LABEL.eng },
  { key: "math", label: SUBJECT_LABEL.math },
];
