import { useEffect } from "react";
import { Volume2 } from "lucide-react";
import { readAloud, stopReading, voiceLangFor, type AppLang } from "@/lib/read-aloud";

export function SpeakButton({ text, subject, lang, className = "" }: { text: string; subject: string; lang: AppLang; className?: string }) {
  useEffect(() => () => stopReading(), [text]);
  return (
    <button
      type="button"
      aria-label="Read the question out loud"
      title="Read out loud"
      onClick={() => readAloud(text, voiceLangFor(subject, lang))}
      className={`grid place-items-center w-11 h-11 shrink-0 rounded-full bg-primary text-primary-foreground shadow hover:scale-105 transition ${className}`}
    >
      <Volume2 size={22} aria-hidden />
    </button>
  );
}
