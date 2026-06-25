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

    const subjectDesc = {
      chi: "Traditional Chinese character recognition for Hong Kong students. 'prompt' is a single Chinese character or 2-character word. 'answer' is the Cantonese jyutping OR the character itself (the speech recognizer will compare loosely).",
      eng: "English word recognition. 'prompt' is a single English word appropriate for the grade. 'answer' is the same word in lowercase.",
      math: "Basic arithmetic. 'prompt' is an expression like '3 + 4' or '12 - 5'. 'answer' is the numeric result as a word or digits (e.g. '7').",
    }[data.subject];

    const sys = `You generate dyslexia-friendly practice items for kids in Hong Kong (K3-P6). Keep items short, age-appropriate for ${data.grade}, themed around "${data.theme}" when natural. Difficulty scales with level ${data.level}/500. ${subjectDesc} Return ONLY JSON matching: {"items":[{"prompt":"","answer":"","hint":""}]}`;

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
