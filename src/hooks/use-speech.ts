import { useCallback, useEffect, useRef, useState } from "react";

type Lang = "en-US" | "zh-HK" | "zh-CN";

interface Opts {
  lang: Lang;
  onResult: (transcript: string) => void;
}

export function useSpeech({ lang, onResult }: Opts) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recogRef = useRef<any>(null);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      return;
    }
    const r = new SR();
    r.lang = lang;
    r.continuous = false;
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.onresult = (e: any) => {
      const alts: string[] = [];
      for (let i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript);
      onResultRef.current(alts.join("|").toLowerCase().trim());
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    recogRef.current = r;
    return () => {
      try { r.stop(); } catch {}
    };
  }, [lang]);

  const start = useCallback(() => {
    if (!recogRef.current || listening) return;
    try {
      recogRef.current.start();
      setListening(true);
    } catch {}
  }, [listening]);

  const stop = useCallback(() => {
    try { recogRef.current?.stop(); } catch {}
  }, []);

  return { listening, supported, start, stop };
}
