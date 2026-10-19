/** Read a question aloud with the browser voice, pausing at fill-in blanks. */
export type AppLang = "zh-TW" | "zh-CN" | "en";

/** Chinese & MATH follow settings (繁體 → Cantonese, 簡體 → Mandarin); ENG always English. */
export function voiceLangFor(subject: string, lang: AppLang): string {
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

let timers: ReturnType<typeof setTimeout>[] = [];

export function stopReading() {
  timers.forEach(clearTimeout);
  timers = [];
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

export function readAloud(text: string, voiceLang: string, pauseMs = 1500) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  stopReading();
  const synth = window.speechSynthesis;
  const voice = synth.getVoices().find((v) => v.lang.replace("_", "-").toLowerCase().startsWith(voiceLang.toLowerCase()));
  const parts = splitAtBlanks(text);
  const speakFrom = (i: number) => {
    if (i >= parts.length) return;
    const p = parts[i];
    if (p === null) { timers.push(setTimeout(() => speakFrom(i + 1), pauseMs)); return; }
    const u = new SpeechSynthesisUtterance(p);
    u.lang = voiceLang;
    if (voice) u.voice = voice;
    u.rate = 0.9;
    u.onend = () => speakFrom(i + 1);
    synth.speak(u);
  };
  speakFrom(0);
  return true;
}
