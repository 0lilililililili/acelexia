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
let currentAudio: HTMLAudioElement | null = null;

export function stopReading() {
  runId++;
  timers.forEach(clearTimeout);
  timers = [];
  live = [];
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
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

function browserReadAloud(text: string, voiceLang: string, pauseMs = 1500) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
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
  timers.push(setTimeout(() => speakFrom(0), 80));
  return true;
}

const clipCache = new Map<string, Promise<string | null>>();

function fetchClip(text: string, lang: string): Promise<string | null> {
  const k = `${lang}|${text}`;
  if (!clipCache.has(k)) {
    clipCache.set(k, import("./tts.functions").then(({ speakText }) =>
      speakText({ data: { text, lang: lang as "zh-HK" | "zh-CN" | "en-US" } }),
    ).then((r) => (r.ok ? `data:audio/wav;base64,${r.audio}` : null)).catch(() => null));
  }
  return clipCache.get(k)!.then((v) => { if (!v) clipCache.delete(k); return v; });
}

function playClip(src: string, id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (id !== runId) return resolve();
    const a = new Audio(src);
    currentAudio = a;
    a.onended = () => resolve();
    a.onerror = () => reject(new Error("play"));
    a.play().catch(reject);
  });
}

/** Speaks the text with a natural AI voice; falls back to the device voice if that fails. */
export async function readAloud(text: string, voiceLang: string, pauseMs = 1500) {
  if (typeof window === "undefined") return false;
  stopReading();
  const id = runId;
  const parts = splitAtBlanks(text);
  const clips = parts.map((p) => (p === null ? null : fetchClip(p, voiceLang)));
  try {
    for (let i = 0; i < parts.length; i++) {
      if (id !== runId) return true;
      const c = clips[i];
      if (c === null) { await new Promise((r) => timers.push(setTimeout(r, pauseMs))); continue; }
      const src = await c;
      if (!src) throw new Error("clip");
      await playClip(src, id);
    }
    return true;
  } catch {
    if (id !== runId) return true;
    return browserReadAloud(text, voiceLang, pauseMs);
  }
}
