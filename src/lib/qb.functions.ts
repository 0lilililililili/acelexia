import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  subject: z.enum(["chi", "eng", "math"]),
  grade: z.string(),
  theme: z.string(),
  level: z.number().int().min(1).max(500),
  count: z.number().int().min(3).max(20).default(8),
});

const Item = z.object({
  prompt: z.string(),       // word to recognize or arithmetic expression
  answer: z.string(),       // expected spoken answer (lowercase)
  hint: z.string().optional(),
  topic: z.string().optional(),   // syllabus sub-topic, e.g. "percentages", "past tense", "成語"
  choices: z.array(z.string()).optional(), // multiple-choice options (成語 items): exactly 4
});

const Schema = z.object({ items: z.array(Item) });

export const generateLevelItems = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const mathSyllabus: Record<string, string> = {
      K3: "numbers 1-20, counting, simple addition within 10, shape recognition",
      P1: "addition and subtraction within 100 (2-digit), ordinal numbers, simple length/time, 2D shapes",
      P2: "addition and subtraction of 3 to 4 digit numbers, multiplication tables 2-9, simple division, money, mixed units of length",
      P3: "multiplication and division (multi-digit by 1-digit), fractions with same denominator, perimeter, angles, bar charts",
      P4: "multi-digit multiplication and division, decimals (add/subtract), equivalent fractions, area of rectangles, 24-hour time",
      P5: "decimals (multiply/divide), percentages basics, averages, area of triangles/parallelograms, volume of cuboid, simple algebra with symbols",
      P6: "percentages (discount, profit/loss), fractions (all operations, mixed numbers), ratio, speed, circles (circumference/area), 3D volume, simple equations, geometry angles",
    };
    const chiSyllabus: Record<string, string> = {
      K3: "high-frequency single traditional Chinese characters (人、口、手、日、月、山、水…); recognition of familiar objects",
      P1: "single characters and 2-character everyday words (家人、學校、食物); basic radicals",
      P2: "2-character compound words, common measure words (量詞) e.g. 一隻貓、一本書; simple sentence patterns",
      P3: "introductory 4-character 成語 (idioms) e.g. 一心一意、七上八落; near-synonyms/antonyms; punctuation",
      P4: "wider range of 成語 and descriptive vocabulary (擬聲、擬人); simple 修辭 (比喻、擬人)",
      P5: "richer 成語, common 諺語/歇後語, light 淺白文言 phrases (例如：亡羊補牢); 關聯詞",
      P6: "advanced 成語 and literary expressions, classical Chinese short excerpts, 修辭手法 (排比、對偶、誇張)",
    };
    const engSyllabus: Record<string, string> = {
      K3: "letter sounds A-Z, CVC sight words (cat, sun, dog); simple naming",
      P1: "present simple tense (I am / he is / she runs), plurals -s, personal pronouns, basic 3-5 letter words",
      P2: "present continuous (is/are + -ing), past simple regular verbs (-ed), articles a/an/the, common adjectives",
      P3: "past simple irregular verbs (went, ate, saw), simple future (will / going to), prepositions of place/time, adverbs of frequency",
      P4: "past continuous, comparatives/superlatives, countable vs uncountable (some/any/much/many), connectives (and, but, because)",
      P5: "present perfect (have/has + pp), modal verbs (can, must, should, might), relative clauses (who/which/that), phrasal verbs",
      P6: "past perfect (had + pp), first & second conditional (if...will / if...would), to-infinitive vs gerund, passive voice, reported speech",
    };
    const msyl = mathSyllabus[data.grade] ?? mathSyllabus.P3;
    const csyl = chiSyllabus[data.grade] ?? chiSyllabus.P3;
    const esyl = engSyllabus[data.grade] ?? engSyllabus.P3;

    const subjectDesc = {
      chi: `Traditional Chinese for HK dyslexic learners at HKEAA ${data.grade} level: ${csyl}. THE MAIN GOAL IS CHARACTER FORM (字形) — at least 70% of items must be multiple choice testing 形近字 / 錯別字 (visually confusable characters), because dyslexic learners mix up character shapes. Use ONLY real, typeable traditional characters: never invent a broken character; instead build the distractors from real look-alike characters (e.g. 「他去學＿」→ choices 校 / 較 / 交 / 效, answer 校; or 「哪個詞語沒有錯別字？」→ 分辨 / 分辯 / 分辦 / 分辮). Set 'topic' to "字形" for these. The rest may be 成語 multiple choice ("topic":"成語", prompt is a short question or a sentence with ＿＿, 4 plain 成語 options) or simple read-aloud items where 'prompt' is JUST a single character or 2-character word and 'answer' is exactly those characters. NEVER ask the student to write, type or spell, and NEVER ask for 粵語讀音/jyutping. For MC items give exactly 4 options in "choices" (no a/b/c/d labels) and set 'answer' to the exact text of the correct option.`,
      eng: `English for HK dyslexic learners at HKEAA ${data.grade} level: ${esyl}. THE MAIN GOAL IS WORD FORM AND SPELLING — at least 70% of items must be multiple choice on spelling / letter-order confusions typical of dyslexia (b/d, p/q, was/saw, silent letters, double letters, -ed/-ing endings), e.g. "Which spelling is correct?" → choices "because" / "becuase" / "becasue" / "bacause", answer "because"; or "He ___ (stop) the car." → "stopped" / "stoped" / "stopeed" / "stopd". Set 'topic' to "spelling" or "word form". Keep words within grade vocabulary. Remaining items may be a single word to read aloud or a short grammar fill-in; 'answer' is the target word in lowercase. For MC items give exactly 4 options in "choices" and set 'answer' to the exact correct option.`,
      math: `Mathematics aligned to HKEAA ${data.grade} strictly on: ${msyl}. 'prompt' is a short expression or question (e.g. '3456 + 1289', '25% of 80', '3/4 + 1/8'). 'answer' is the numeric result (e.g. '4745', '20', '7/8').`,
    }[data.subject];

    const sys = `You generate dyslexia-friendly practice items for Hong Kong primary students with dyslexia, strictly within the HKEAA syllabus for ${data.grade}. Keep prompts SHORT and plain. Difficulty scales gently with level ${data.level}/500 but must NOT exceed ${data.grade} scope. Theme items around "${data.theme}" when natural. ${subjectDesc} Each item also carries a short syllabus sub-topic label in "topic" (e.g. "字形", "成語", "spelling", "word form", "percentages"). Return ONLY JSON matching: {"items":[{"prompt":"","answer":"","hint":"","topic":"","choices":["","","",""]}]} — omit "choices" for items that are not multiple choice.`;



    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: `Generate ${data.count} items.` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`AI gateway ${res.status}: ${text.slice(0, 200)}`);
    }
    const json = await res.json();
    const content = json.choices?.[0]?.message?.content ?? "{}";
    const parsed = Schema.safeParse(JSON.parse(content));
    if (!parsed.success) {
      // Fallback so the game never blocks
      return {
        items: Array.from({ length: data.count }, (_, i) => ({
          prompt: data.subject === "math" ? `${i + 1} + ${i + 2}` : ["cat", "dog", "sun", "fish", "tree", "fire", "moon", "star"][i % 8],
          answer: data.subject === "math" ? `${(i + 1) + (i + 2)}` : ["cat", "dog", "sun", "fish", "tree", "fire", "moon", "star"][i % 8],
        })),
      };
    }
    return parsed.data;
  });
