/** Read a question aloud with the browser voice, pausing at fill-in blanks. */
export type AppLang = "zh-TW" | "zh-CN" | "en";

/** Chinese & MATH follow settings (繁體 → Cantonese, 簡體 → Mandarin); ENG always English. */
export function voiceLangFor(subject: string, lang: AppLang): "zh-HK" | "zh-CN" | "en-US" {
  if (subject.toLowerCase() === "eng") return "en-US";
  if (lang === "zh-TW") return "zh-HK";
  if (lang === "zh-CN") return "zh-CN";
  return "en-US";
}

const BLANK = /_{2,}|＿+|\(\s*\)|（\s*）|\[\s*\]|【\s*】|□+/g;

/** Split text into spoken pieces; blanks become pause markers (null). */
export function splitAtBlanks(text: string): (string | null)[] {
  const out: (string | null)[] = [];
  let last = 0;
  for (const m of text.matchAll(BLANK)) {
    const seg = text.slice(last, m.index).trim();
    if (seg) out.push(seg);
    out.push(null);
    last = (m.index ?? 0) + m[0].length;
  }
  const tail = text.slice(last).trim();
  if (tail) out.push(tail);
  return out;
}

import { streamSpeech } from "./stream-speech";
import { getSession } from "./store";
let runId = 0;
let controller: AbortController | null = null;
export function stopReading() { runId++; controller?.abort(); controller = null; }
/** Stream each clause immediately, preserving an explicit silent pause at blanks. */
export async function readAloud(text: string, voiceLang: string, pauseMs = 1500) {
  if (typeof window === "undefined") return false;
  stopReading();
  const id = runId;
  const active = new AbortController();
  controller = active;
  try {
    for (const part of splitAtBlanks(text)) {
      if (id !== runId) return false;
      if (part === null) {
        await new Promise<void>(resolve => {
          const timer = setTimeout(resolve, pauseMs);
          active.signal.addEventListener("abort", () => { clearTimeout(timer); resolve(); }, {once:true});
        });
      } else {
        await streamSpeech("/api/speech", part, voiceLang, getSession()?.token, active.signal);
      }
    }
    return true;
  } catch (error) {
    if (active.signal.aborted) return false;
    throw error;
  }
}
