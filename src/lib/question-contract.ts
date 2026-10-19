export type TowerItem = { prompt: string; answer: string; hint?: string; topic?: string; choices?: string[] };
export function matchesSubject(item: TowerItem, subject: string): boolean {
 if (!item.prompt.trim() || !item.answer.trim()) return false;
 if (item.choices && (item.choices.length !== 4 || !item.choices.includes(item.answer) || new Set(item.choices).size !== 4)) return false;
 const text = `${item.prompt} ${item.topic ?? ""}`;
 if (subject === "math") return !/spelling|spell\b|letter.?order|word form|correct word|past tense|present tense|字形|成語|拼寫|拼写/i.test(text) && /\d|[+−×÷=％%]|數|数|幾|几|角|圓|圆|形|長|长|面積|面积/.test(item.prompt) && /\d/.test(item.answer);
 if (subject === "chi") return /\p{Script=Han}/u.test(item.prompt) && /\p{Script=Han}/u.test(item.answer) && !/spelling|word form/i.test(text);
 if (subject === "eng") return /[a-z]/i.test(item.prompt) && /[a-z]/i.test(item.answer) && !/\p{Script=Han}/u.test(item.prompt);
 return false;
}
export function fallbackItems(subject: string, count: number): TowerItem[] {
 const words = subject === "chi" ? ["人","口","手","日","月","山","水","火"] : ["cat","dog","sun","fish","tree","bird","moon","star"];
 return Array.from({length:count},(_,i)=>subject === "math" ? {prompt:`${i+1} + ${i+2}`,answer:String(2*i+3),topic:"addition",hint:"Answer with a number, for example 12."} : {prompt:words[i%words.length],answer:words[i%words.length],topic:subject === "chi" ? "認字" : "reading"});
}