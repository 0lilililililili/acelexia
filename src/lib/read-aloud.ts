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
let aiVoicePausedUntil = 0;
/** Free browser voice; resolves when finished, cancelled or unavailable. */
function deviceSpeak(text: string, lang: string, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const synth = window.speechSynthesis;
    if (!synth) return reject(new Error("This device has no read-aloud voice."));
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    const base = lang.slice(0, 2);
    const voice = synth.getVoices().find(v => v.lang.replace("_", "-") === lang)
      ?? (lang === "zh-HK" ? synth.getVoices().find(v => /yue|HK/i.test(v.lang)) : undefined)
      ?? synth.getVoices().find(v => v.lang.startsWith(base));
    if (voice) u.voice = voice;
    u.rate = 0.9;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    signal.addEventListener("abort", () => { synth.cancel(); resolve(); }, { once: true });
    synth.speak(u);
  });
}
let runId = 0;
let controller: AbortController | null = null;
export function stopReading() {
  runId++; controller?.abort(); controller = null;
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}
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
      } else if (Date.now() < aiVoicePausedUntil) {
        await deviceSpeak(part, voiceLang, active.signal);
      } else {
        try {
          await streamSpeech("/api/speech", part, voiceLang, getSession()?.token, active.signal);
        } catch (error) {
          if (active.signal.aborted) throw error;
          // AI voice unavailable (e.g. no credits): use the free device voice for 10 minutes.
          aiVoicePausedUntil = Date.now() + 10 * 60_000;
          await deviceSpeak(part, voiceLang, active.signal);
        }
      }
    }
    return true;
  } catch (error) {
    if (active.signal.aborted) return false;
    throw error;
  }
}
