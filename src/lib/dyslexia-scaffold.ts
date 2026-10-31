// Reading scaffolds: bold the start of each English word (anchor reading) or of each Chinese clause.
export type ScaffoldLevel = "off" | "light" | "full";
export type Chunk = { bold: string; rest: string };

/** Split text into chunks whose leading letters get bolded. Light = long words only. */
export function scaffoldChunks(text: string, level: ScaffoldLevel): Chunk[] {
  if (level === "off") return [{ bold: "", rest: text }];
  return text.split(/(\s+)/).map((tok) => {
    const m = tok.match(/^([A-Za-z]+)(.*)$/s);
    if (!m) return { bold: "", rest: tok };
    const word = m[1];
    if (level === "light" && word.length < 5) return { bold: "", rest: tok };
    const n = word.length <= 3 ? 1 : word.length <= 6 ? 2 : 3;
    return { bold: word.slice(0, n), rest: word.slice(n) + m[2] };
  });
}
