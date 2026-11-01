import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const listQuestionBanks = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ adminToken: z.string().max(2000) }).parse(input))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./session.server");
    await requireAdmin(data.adminToken);
    const [{ QUESTIONS_BY_GRADE }, { ENGLISH_BANKS }, { BAKERY_BANKS }, arcade, { CHARACTER_LAYOUTS }] = await Promise.all([
      import("./input-questions"), import("./english-banks"), import("./bakery-banks"), import("./arcade-data"), import("./character-layout-data"),
    ]);
    type Row = { bank: string; grade: string; subject: string; prompt: string; answer: string; topic: string; choices: string[]; detail: string };
    const rows: Row[] = [];
    for (const [grade, bank] of Object.entries(QUESTIONS_BY_GRADE)) for (const q of bank) rows.push({ bank: "Assessment", grade, subject: q.subject, prompt: q.q, answer: q.choices[q.answer], topic: q.attr, choices: q.choices, detail: q.id });
    for (const [grade, bank] of Object.entries(ENGLISH_BANKS)) {
      for (const q of bank.typos) rows.push({ bank: "Typo Detective", grade, subject: "eng", prompt: q.sentence, answer: q.good, topic: "Spelling", choices: q.choices, detail: `Incorrect spelling: ${q.bad} · Scene: ${q.scene}` });
      for (const q of bank.families) rows.push({ bank: "Word Family", grade, subject: "eng", prompt: q.child, answer: q.mother, topic: "Word families", choices: [], detail: "" });
    }
    for (const [grade, bank] of Object.entries(BAKERY_BANKS)) for (const q of bank) rows.push({ bank: "Bakery", grade, subject: "math", prompt: q.prompt, answer: q.answer, topic: `${q.unit} · ${q.topic}`, choices: q.formulas, detail: `Formula: ${q.formula}\n${q.explanation}` });
    for (const q of arcade.BUILD_CHARACTERS) rows.push({ bank: "Character Builder", grade: Object.entries(arcade.BUILDER_BANDS).find(([, b]) => q.difficulty >= b.min && q.difficulty <= b.max)?.[0] ?? "Shared", subject: "chi", prompt: q.word, answer: q.parts.join(" · "), topic: q.hint, choices: q.distractors, detail: JSON.stringify(CHARACTER_LAYOUTS[q.word]) });
    for (const q of arcade.APPRAISALS) rows.push({ bank: "Appraiser", grade: "Shared", subject: "chi", prompt: q.meaning, answer: q.answer, topic: q.source, choices: [q.answer, q.falseWord], detail: `Simplified: ${q.simple}` });
    for (const [topic, words] of Object.entries(arcade.VOCAL_WORDS)) for (const word of words) rows.push({ bank: "Vocal Arena", grade: "Shared", subject: "chi", prompt: word, answer: word, topic, choices: [], detail: "" });
    return { rows };
  });