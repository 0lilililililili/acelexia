import { Lightbulb, RotateCcw } from "lucide-react";
import { explain } from "@/lib/explanations";
import { SpeakButton } from "@/components/speak-button";
import { Button } from "@/components/ui/button";

type Props = {
  subject: string;
  lang: Parameters<typeof SpeakButton>[0]["lang"];
  prompt: string;
  answer: string;
  chosen: string | null;
  onRetry: () => void;
  onSkip: () => void;
};

/** Shown inside the question half only, so the battle stays visible. */
export function ExplanationPanel({ subject, lang, prompt, answer, chosen, onRetry, onSkip }: Props) {
  const e = explain({ subject, prompt, answer, chosen: chosen ?? undefined });
  const spoken = [...e.why, e.tip].join(" ");
  return (
    <div role="dialog" aria-label="Why it was wrong" className="absolute inset-0 z-10 overflow-y-auto rounded-2xl bg-card border-4 border-primary p-4 shadow-2xl animate-pop">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xl font-extrabold flex items-center gap-2"><Lightbulb className="text-primary" aria-hidden /> Let's see why</h2>
        <SpeakButton text={spoken} subject={subject} lang={lang} />
      </div>
      <p className="mt-2 font-bold">{chosen ? <>You chose: <span className="text-destructive">{chosen}</span></> : "Time ran out."}</p>
      <ul className="mt-2 space-y-1 text-lg leading-relaxed list-disc pl-5">
        {e.why.filter((w) => !w.includes(answer) || subject === "math").map((w, i) => <li key={i}>{w}</li>)}
      </ul>
      <p className="mt-2 rounded-xl bg-secondary px-3 py-2 font-bold">Tip: {e.tip}</p>
      <div className="mt-3 flex gap-2 justify-center flex-wrap">
        <Button size="lg" onClick={onRetry}><RotateCcw aria-hidden /> Choose again</Button>
        <Button size="lg" variant="ghost" onClick={onSkip}>Skip</Button>
      </div>
    </div>
  );
}
