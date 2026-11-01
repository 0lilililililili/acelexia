import { pronunciation, type SpokenChinese } from "@/lib/chinese-pronunciation";
import { CANTONESE_PITCH, ENGLISH_SOUNDS, ENGLISH_SYLLABLES } from "@/lib/reading-sounds";
import { SpeakButton } from "@/components/speak-button";

export function ReadingAid({ text, subject, enabled, spoken = "zh-HK" }: { text: string; subject: string; enabled?: boolean; spoken?: SpokenChinese }) {
  if (!enabled) return null;
  if (subject === "eng") {
    const word = text.trim().toLowerCase();
    const units = ENGLISH_SOUNDS[word];
    const syllables = ENGLISH_SYLLABLES[word];
    if (!units && !syllables) return null;
    return <div className="reading-aid" aria-label={`Sound help for ${text}`}>
      <div className="flex flex-wrap justify-center gap-2">{(units?.chunks ?? syllables ?? []).map((chunk, i) => <span className="sound-unit" key={i}><strong>{chunk}</strong>{units && <small>{units.sounds[i]}</small>}</span>)}</div>
      <SpeakButton text={text} subject="eng" lang="en" />
    </div>;
  }
  if (subject !== "chi" || !/^[\p{Script=Han}]{1,8}$/u.test(text.trim())) return null;
  const sounds = pronunciation(text, spoken).split(" ").filter(Boolean);
  if (!sounds.length) return null;
  return <div className="reading-aid" aria-label={spoken === "zh-HK" ? "Cantonese tone help" : "Mandarin pronunciation help"}>
    <div className="flex flex-wrap justify-center gap-3">{sounds.map((sound, i) => {
      const pitch = spoken === "zh-HK" ? CANTONESE_PITCH[Number(sound.slice(-1))] : undefined;
      return <span className="sound-unit" key={i}><strong>{Array.from(text.trim())[i]}</strong><small>{sound}</small>{pitch && <svg viewBox="0 0 60 36" width="60" height="36" role="img" aria-label={`Tone ${sound.slice(-1)}`}><polyline points={pitch.map((p, j) => `${8 + j * 22},${34 - p * 6}`).join(" ")} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>}</span>;
    })}</div>
  </div>;
}