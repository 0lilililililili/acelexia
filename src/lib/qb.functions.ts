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
    const langSyllabus: Record<string, string> = {
      K3: "high-frequency single characters/words, 2-3 letter sight words",
      P1: "basic everyday vocabulary: family, school, common objects",
      P2: "short 2-character Chinese words / 3-5 letter English words, common verbs and adjectives",
      P3: "2-character compound words and simple idioms; English CVCe and common blends",
      P4: "basic 4-character idioms, descriptive vocabulary; English multi-syllable words",
      P5: "richer idioms and light classical phrases (淺白文言); English academic vocab, prefixes/suffixes",
      P6: "advanced 成語 and literary expressions; upper-primary English vocabulary, synonyms/antonyms",
    };
    const msyl = mathSyllabus[data.grade] ?? mathSyllabus.P3;
    const lsyl = langSyllabus[data.grade] ?? langSyllabus.P3;

    const subjectDesc = {
      chi: `Traditional Chinese character/word recognition for HK students following the HKEAA primary syllabus for ${data.grade} (${lsyl}). 'prompt' is a single Chinese character or 2-character word at that level. 'answer' is the Cantonese jyutping OR the character itself.`,
      eng: `English word recognition aligned to the HKEAA primary English syllabus for ${data.grade} (${lsyl}). 'prompt' is one age-appropriate English word. 'answer' is the same word in lowercase.`,
      math: `Mathematics aligned to the HKEAA primary mathematics syllabus for ${data.grade}. Focus strictly on: ${msyl}. 'prompt' is a short expression or question (e.g. '3456 + 1289', '25% of 80', '3/4 + 1/8'). 'answer' is the numeric result as digits (e.g. '4745', '20', '7/8').`,
    }[data.subject];

    const sys = `You generate dyslexia-friendly practice items for Hong Kong primary students strictly within the HKEAA syllabus for ${data.grade}. Difficulty scales gently with level ${data.level}/500 but must NOT exceed ${data.grade} scope. Theme items around "${data.theme}" when natural. ${subjectDesc} Return ONLY JSON matching: {"items":[{"prompt":"","answer":"","hint":""}]}`;

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
