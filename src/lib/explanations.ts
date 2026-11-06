// Browser-safe, offline explanation engine (zero AI cost).
export type Explanation = { why: string[]; tip: string };

const lev = (a: string, b: string) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
const MIRROR: Record<string, string> = { b: "d", d: "b", p: "q", q: "p", m: "w", w: "m", n: "u", u: "n" };
const isHan = (s: string) => /[\u4e00-\u9fff]/.test(s);

export function explain(input: { subject: string; prompt: string; answer: string; chosen?: string }): Explanation {
  const { subject, prompt, answer } = input;
  const chosen = (input.chosen ?? "").trim();
  const ans = answer.trim();
  const why: string[] = [];
  if (subject === "math" || /[0-9][\s]*[+\-×x*÷/]/.test(prompt)) {
    const m = prompt.match(/(\d+(?:\.\d+)?)\s*([+\-−×x*÷/])\s*(\d+(?:\.\d+)?)/);
    if (m) {
      const [a, op, b] = [Number(m[1]), m[2], Number(m[3])];
      const name = op === "+" ? "add" : op === "-" || op === "−" ? "take away" : op === "÷" || op === "/" ? "share (divide)" : "multiply";
      why.push(`Step 1: ${name} ${a} and ${b}.`, `Step 2: ${a} ${op} ${b} = ${ans}.`);
      if (chosen && !isNaN(Number(chosen))) {
        const diff = Math.abs(Number(chosen) - Number(ans));
        if (diff === 1) why.push(`${chosen} is just 1 away — count carefully on a number line.`);
        else if (diff % 10 === 0 && diff > 0) why.push(`${chosen} is off by ${diff}: check the tens column (carrying / borrowing).`);
      }
    } else why.push(`Read the story slowly, underline the numbers, then pick the operation. The answer is ${ans}.`);
    return { why, tip: "Draw it or use your fingers — break big numbers into tens and ones." };
  }
  if (isHan(ans)) {
    if (chosen && chosen.length === ans.length) {
      const diffs = [...ans].map((c, i) => [c, [...chosen][i]] as const).filter(([x, y]) => x !== y);
      for (const [c, w] of diffs) why.push(`「${w}」looks like「${c}」, but they are different characters. Look at each part (radical) closely.`);
    }
    why.push(`The correct answer is「${ans}」.`);
    return { why, tip: "Cover half of the character and check each part: left/right, top/bottom." };
  }
  // English
  const A = ans.toLowerCase(), C = chosen.toLowerCase();
  if (C && C !== A) {
    if (A.length === C.length) {
      [...A].forEach((ch, i) => {
        if (C[i] !== ch) why.push(MIRROR[ch] === C[i] ? `"${C[i]}" and "${ch}" are mirror letters — flipped the wrong way.` : `Letter ${i + 1} should be "${ch}", not "${C[i]}".`);
      });
    } else if (lev(A, C) <= 2) why.push(`"${chosen}" is close but has ${C.length > A.length ? "extra" : "missing"} letters.`);
    else why.push(`"${chosen}" is a different word from "${ans}".`);
  }
  why.push(`The correct answer is "${ans}". Say it in chunks: ${ans.replace(/([aeiou]+[^aeiou]?)(?=[a-z])/gi, "$1·")}.`);
  return { why, tip: "Tap the word and read it aloud slowly — sound out each chunk." };
}
