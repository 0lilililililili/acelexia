// Offline syllabus bank: used when live AI questions are unavailable (e.g. no credits).
// Pure and browser-safe; deterministic per level so replays are consistent.
import type { TowerItem } from "./question-contract";

type Grade = "K3" | "P1" | "P2" | "P3" | "P4" | "P5" | "P6";
const GRADES: Grade[] = ["K3", "P1", "P2", "P3", "P4", "P5", "P6"];
const band = (g: string) => Math.max(0, GRADES.indexOf(g as Grade));

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
function shuffle<T>(a: T[], r: () => number): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; }
  return c;
}

// [correct, look-alike distractors x3] — real characters only.
const CHI_FORM: [string, string, string, string, string][] = [
  // [prompt word with blank hint, correct, d1, d2, d3]
  ["大＿（樹木）", "木", "本", "未", "末"],
  ["＿天（白天）", "日", "目", "曰", "田"],
  ["＿己（自己）", "己", "已", "巳", "乙"],
  ["＿人（大人）", "人", "入", "八", "乂"],
  ["＿水（喝水）", "喝", "渴", "竭", "褐"],
  ["口＿（口渴）", "渴", "喝", "竭", "褐"],
  ["＿息（休息）", "休", "体", "伙", "什"],
  ["＿上（天上）", "天", "夫", "失", "矢"],
  ["＿友（朋友）", "朋", "明", "崩", "棚"],
  ["光＿（光明）", "明", "朋", "盟", "萌"],
  ["＿子（鳥兒）", "鳥", "烏", "島", "馬"],
  ["小＿（小狗）", "狗", "拘", "苟", "枸"],
  ["＿書（讀書）", "讀", "續", "賣", "瀆"],
  ["＿買（購買）", "買", "賣", "實", "貫"],
  ["＿天（晴天）", "晴", "睛", "清", "請"],
  ["眼＿（眼睛）", "睛", "晴", "清", "精"],
  ["＿坐（請坐）", "請", "清", "情", "晴"],
  ["＿水（清水）", "清", "請", "情", "晴"],
  ["＿況（情況）", "情", "清", "請", "晴"],
  ["＿生（學生）", "學", "覺", "舉", "譽"],
  ["＿得（覺得）", "覺", "學", "攪", "黨"],
  ["＿樂（快樂）", "快", "決", "缺", "塊"],
  ["＿定（決定）", "決", "快", "缺", "訣"],
  ["＿慢（緩慢）", "慢", "漫", "饅", "幔"],
  ["＿畫（漫畫）", "漫", "慢", "饅", "曼"],
  ["＿球（足球）", "球", "求", "救", "毬"],
  ["＿命（救命）", "救", "求", "球", "裘"],
  ["＿間（時間）", "時", "詩", "侍", "持"],
  ["＿歌（詩歌）", "詩", "時", "持", "待"],
  ["等＿（等待）", "待", "持", "侍", "特"],
  ["＿別（特別）", "特", "持", "待", "侍"],
  ["＿意（注意）", "注", "住", "柱", "往"],
  ["＿宅（住宅）", "住", "注", "往", "柱"],
  ["以＿（以往）", "往", "住", "注", "柱"],
  ["＿球（地球）", "地", "他", "池", "她"],
  ["水＿（水池）", "池", "地", "他", "弛"],
  ["＿們（他們）", "他", "地", "池", "她"],
  ["＿張（緊張）", "張", "漲", "帳", "脹"],
  ["＿篷（帳篷）", "帳", "張", "賬", "漲"],
  ["＿怕（害怕）", "怕", "拍", "伯", "柏"],
  ["＿手（拍手）", "拍", "怕", "伯", "泊"],
  ["＿理（管理）", "管", "官", "館", "棺"],
  ["圖書＿（圖書館）", "館", "管", "官", "棺"],
];
const CHI_IDIOM: [string, string, string, string, string][] = [
  ["做事專心，不三心二意，可說是：", "一心一意", "七上八落", "半途而廢", "亡羊補牢"],
  ["心情很緊張不安，可說是：", "七上八落", "一心一意", "興高采烈", "井井有條"],
  ["做事中途放棄，可說是：", "半途而廢", "有始有終", "一心一意", "畫蛇添足"],
  ["出錯後及時補救，可說是：", "亡羊補牢", "守株待兔", "畫蛇添足", "對牛彈琴"],
  ["非常高興，可說是：", "興高采烈", "垂頭喪氣", "七上八落", "目不轉睛"],
  ["多做了不必要的事，反而弄巧成拙：", "畫蛇添足", "亡羊補牢", "井井有條", "守株待兔"],
  ["不努力，只想等好運：", "守株待兔", "畫蛇添足", "一心一意", "自強不息"],
  ["東西排列很整齊：", "井井有條", "亂七八糟", "半途而廢", "七上八落"],
  ["看得很專注，眼睛不動：", "目不轉睛", "東張西望", "垂頭喪氣", "興高采烈"],
  ["失望又沒精神：", "垂頭喪氣", "興高采烈", "目不轉睛", "井井有條"],
];
const CHI_READ = ["人", "口", "手", "山", "水", "火", "家人", "學校", "朋友", "老師", "圖書館", "快樂", "天氣", "公園", "早餐", "眼睛"];

const ENG_SPELL: [string, string, string, string][] = [
  ["because", "becuase", "becasue", "bacause"],
  ["friend", "freind", "frend", "friand"],
  ["said", "siad", "sed", "saed"],
  ["was", "saw", "wos", "waz"],
  ["dog", "bog", "god", "dgo"],
  ["bed", "deb", "bde", "ded"],
  ["play", "paly", "pley", "plai"],
  ["school", "shcool", "scool", "skool"],
  ["knife", "nife", "kinfe", "knif"],
  ["write", "rite", "wirte", "writ"],
  ["happy", "hapy", "happey", "hapyy"],
  ["little", "litle", "littel", "lttile"],
  ["they", "thay", "tehy", "thye"],
  ["where", "wear", "whree", "were"],
  ["people", "peple", "poeple", "peopel"],
  ["beautiful", "beatiful", "beautifull", "beutiful"],
  ["different", "diffrent", "differant", "difrent"],
  ["quiet", "quite", "qiuet", "quieit"],
  ["answer", "anser", "answre", "ansewr"],
  ["listen", "lisen", "listn", "lisetn"],
];
const ENG_FORM: [string, string, string, string, string, number][] = [
  // [sentence, correct, d1, d2, d3, minBand]
  ["He ___ (stop) the car.", "stopped", "stoped", "stopeed", "stopd", 2],
  ["She is ___ (run) fast.", "running", "runing", "runeing", "runnig", 2],
  ["I ___ (go) to school yesterday.", "went", "goed", "wented", "gone", 3],
  ["They ___ (eat) lunch at noon yesterday.", "ate", "eated", "eat", "aten", 3],
  ["Tom is ___ than Ben. (tall)", "taller", "more tall", "tallest", "taler", 4],
  ["This is the ___ day ever. (happy)", "happiest", "happyest", "most happy", "happier", 4],
  ["I have ___ my homework. (finish)", "finished", "finish", "finishing", "finised", 5],
  ["The cake was ___ by Mum. (make)", "made", "maked", "make", "making", 6],
  ["The baby is ___ (cry).", "crying", "criing", "cryying", "cring", 2],
  ["We ___ (swim) yesterday.", "swam", "swimmed", "swum", "swimed", 3],
];
const ENG_READ = ["cat", "sun", "dog", "fish", "tree", "bird", "moon", "star", "book", "rain", "jump", "green", "train", "light", "school", "friend"];

function chiItems(g: number, r: () => number): TowerItem[] {
  const out: TowerItem[] = [];
  for (const [p, a, ...d] of CHI_FORM) out.push({ prompt: `選出正確的字：${p}`, answer: a, choices: [a, ...d], topic: "字形" });
  if (g >= 3) for (const [p, a, ...d] of CHI_IDIOM) out.push({ prompt: p, answer: a, choices: [a, ...d], topic: "成語" });
  for (const w of CHI_READ.slice(0, 6 + g * 2)) out.push({ prompt: w, answer: w, topic: "認字" });
  return shuffle(out, r);
}
function engItems(g: number, r: () => number): TowerItem[] {
  const out: TowerItem[] = [];
  for (const [a, ...d] of ENG_SPELL) out.push({ prompt: "Which spelling is correct?", answer: a, choices: [a, ...d], topic: "spelling" });
  for (const [s, a, d1, d2, d3, min] of ENG_FORM) if (g >= min) out.push({ prompt: s, answer: a, choices: [a, d1, d2, d3], topic: "word form" });
  for (const w of ENG_READ.slice(0, 6 + g * 2)) out.push({ prompt: w, answer: w, topic: "reading" });
  return shuffle(out, r);
}

function mathItem(g: number, r: () => number, zh: boolean): TowerItem {
  const n = (lo: number, hi: number) => lo + Math.floor(r() * (hi - lo + 1));
  const num = (hint: string) => (zh ? `請以數字作答，例如 ${hint}。` : `Answer with a number, for example ${hint}.`);
  const kind = n(0, Math.min(3, g));
  if (g === 0) { const a = n(1, 5), b = n(1, 5); return { prompt: `${a} + ${b} = ?`, answer: String(a + b), topic: zh ? "加法" : "addition", hint: num("7") }; }
  if (kind === 0) { const a = n(10, 20 * g * g), b = n(1, 10 * g * g); return { prompt: `${a} + ${b} = ?`, answer: String(a + b), topic: zh ? "加法" : "addition", hint: num("42") }; }
  if (kind === 1) { const a = n(20, 30 * g * g), b = n(1, a); return { prompt: `${a} − ${b} = ?`, answer: String(a - b), topic: zh ? "減法" : "subtraction", hint: num("15") }; }
  if (kind === 2) { const a = n(2, 9), b = n(2, g >= 4 ? 30 : 9); return { prompt: `${a} × ${b} = ?`, answer: String(a * b), topic: zh ? "乘法" : "multiplication", hint: num("24") }; }
  // kind 3: grade-specific situation problems
  if (g >= 5 && r() < 0.5) {
    const price = n(2, 20) * 10, pct = [10, 20, 25, 50][n(0, 3)];
    return { prompt: zh ? `一件玩具售 $${price}，打 ${pct}% 折扣後要付多少元？` : `A toy costs $${price}. With ${pct}% off, how many dollars do you pay?`, answer: String(price - (price * pct) / 100), topic: zh ? "百分數" : "percentages", hint: num("45") };
  }
  const per = n(2, 9), boxes = n(2, 9);
  return { prompt: zh ? `每盒有 ${per} 個蘋果，${boxes} 盒共有多少個蘋果？` : `Each box has ${per} apples. How many apples are in ${boxes} boxes?`, answer: String(per * boxes), topic: zh ? "應用題" : "word problems", hint: num("18") };
}

export function offlineLevelItems(o: { subject: string; grade: string; level: number; count: number; language?: string }): TowerItem[] {
  const g = band(o.grade);
  const r = rng(o.level * 7919 + g * 104729 + o.subject.length);
  if (o.subject === "math") {
    const zh = o.language !== "en";
    const seen = new Set<string>();
    const out: TowerItem[] = [];
    for (let i = 0; out.length < o.count && i < 200; i++) { const it = mathItem(g, r, zh); if (!seen.has(it.prompt)) { seen.add(it.prompt); out.push(it); } }
    return out;
  }
  const pool = o.subject === "chi" ? chiItems(g, r) : engItems(g, r);
  return pool.slice(0, o.count).map((it) => (it.choices ? { ...it, choices: shuffle(it.choices, r) } : it));
}
