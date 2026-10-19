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
// Keep utterances referenced: Chrome garbage-collects them and silently drops playback/onend.
let live: SpeechSynthesisUtterance[] = [];
let runId = 0;

export function stopReading() {
  runId++;
  timers.forEach(clearTimeout);
  timers = [];
  live = [];
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

function pickVoice(voiceLang: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const norm = (s: string) => s.replace("_", "-").toLowerCase();
  const want = norm(voiceLang);
  return (
    voices.find((v) => norm(v.lang) === want) ??
    voices.find((v) => norm(v.lang).startsWith(want.split("-")[0] + "-" + (want.split("-")[1] ?? ""))) ??
    (want === "zh-hk" ? voices.find((v) => /yue|cantonese|hong kong/i.test(`${v.lang} ${v.name}`)) : undefined) ??
    voices.find((v) => norm(v.lang).startsWith(want.split("-")[0]))
  );
}

export function readAloud(text: string, voiceLang: string, pauseMs = 1500) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  stopReading();
  const id = runId;
  const synth = window.speechSynthesis;
  const parts = splitAtBlanks(text);
  const speakFrom = (i: number) => {
    if (id !== runId || i >= parts.length) return;
    const p = parts[i];
    if (p === null) { timers.push(setTimeout(() => speakFrom(i + 1), pauseMs)); return; }
    const u = new SpeechSynthesisUtterance(p);
    u.lang = voiceLang;
    const voice = pickVoice(voiceLang);
    if (voice) u.voice = voice;
    u.rate = 0.9;
    u.onend = () => speakFrom(i + 1);
    u.onerror = () => speakFrom(i + 1);
    live.push(u);
    if (synth.paused) synth.resume();
    synth.speak(u);
  };
  const begin = () => timers.push(setTimeout(() => speakFrom(0), 80)); // cancel() then immediate speak() is dropped in Chrome
  if (synth.getVoices().length === 0) {
    let started = false;
    const go = () => { if (!started) { started = true; begin(); } };
    synth.addEventListener("voiceschanged", go, { once: true });
    timers.push(setTimeout(go, 400));
  } else begin();
  return true;
}
