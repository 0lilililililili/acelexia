import { scaffoldChunks, type ScaffoldLevel } from "@/lib/dyslexia-scaffold";

export function DyslexicText({ text, level }: { text: string; level?: ScaffoldLevel }) {
  const lv = level ?? "off";
  return (
    <span style={lv === "full" ? { letterSpacing: "0.06em", wordSpacing: "0.2em" } : undefined}>
      {scaffoldChunks(text, lv).map((c, i) => (
        <span key={i}>{c.bold && <b className="font-black text-primary">{c.bold}</b>}{c.rest}</span>
      ))}
    </span>
  );
}
