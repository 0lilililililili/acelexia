import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MODEL = "google/gemini-3.1-flash-tts-preview";
const LANG_HINT: Record<string, string> = {
  "zh-HK": "Read aloud slowly and clearly in Cantonese (粵語)",
  "zh-CN": "Read aloud slowly and clearly in Mandarin (普通话)",
  "en-US": "Read aloud slowly and clearly in English",
};

/** Returns a WAV clip (base64) of the text spoken in the requested language. */
export const speakText = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ text: z.string().trim().min(1).max(300), lang: z.enum(["zh-HK", "zh-CN", "en-US"]) }).parse(d),
  )
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { ok: false as const, error: "Voice is not set up." };
    const res = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        contents: [{ role: "user", parts: [{ text: `${LANG_HINT[data.lang]}: ${data.text}` }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } },
        },
      }),
    });
    if (!res.ok) {
      const msg = res.status === 429 ? "Too many requests, try again soon." : res.status === 402 ? "AI credits have run out." : "Voice is unavailable right now.";
      return { ok: false as const, error: msg };
    }
    const bytes = new Uint8Array(await res.arrayBuffer());
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return { ok: true as const, audio: btoa(bin) };
  });
