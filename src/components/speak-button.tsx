import { useEffect, useState } from "react";
import { Volume2, LoaderCircle, Square } from "lucide-react";
import { readAloud, stopReading, voiceLangFor, type AppLang } from "@/lib/read-aloud";

import { Button } from "@/components/ui/button";

export function SpeakButton({ text, subject, lang, className = "" }: { text: string; subject: string; lang: AppLang; className?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { setBusy(false); setError(null); return () => stopReading(); }, [text]);
  const play = async () => {
    if(busy) { stopReading(); setBusy(false); return; }
    setError(null); setBusy(true);
    try { await readAloud(text, voiceLangFor(subject,lang)); }
    catch(e) { setError(e instanceof Error ? e.message : "Voice is unavailable."); }
    finally { setBusy(false); }
  };
  return <span className="inline-flex flex-col items-center gap-1">
    <Button type="button" size="icon" aria-label={busy ? "Stop reading" : "Read the question out loud"} title={busy ? "Stop reading" : "Read out loud"} onClick={play} className={`w-11 h-11 shrink-0 rounded-full ${className}`}>
      {busy ? <><LoaderCircle className="animate-spin" aria-hidden/><Square size={12} aria-hidden/></> : <Volume2 aria-hidden/>}
    </Button>
    {error && <span role="alert" className="text-xs text-destructive max-w-64">{error}</span>}
  </span>;
}
