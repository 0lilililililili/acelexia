// Shared HKEAA-aligned question bank used by BOTH the Input Data collection
// flow and the Trial mode test, so accuracy/time can be compared by questionID.

export type Subject = "chi" | "eng" | "math";
export type MCQ = {
  id: string;          // stable id, e.g. "P3-math-04"
  subject: Subject;
  attr: string;        // radar attribute
  q: string;
  choices: string[];
  answer: number;      // index into choices
};

export type Grade = "K3" | "P1" | "P2" | "P3" | "P4" | "P5" | "P6";
export const GRADES: Grade[] = ["K3", "P1", "P2", "P3", "P4", "P5", "P6"];

// Helpers -------------------------------------------------------------------
/** Stable per-question shuffle (same order on server and browser) so the answer isn't always first. */
function seededOrder(id: string, n: number): number[] {
  let h = 2166136261;
  for (const ch of id) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; const j = h % (i + 1); [order[i], order[j]] = [order[j], order[i]]; }
  return order;
}
const mk = (grade: Grade, subject: Subject, i: number, attr: string, q: string, choices: string[], answer: number): MCQ => {
  const id = `${grade}-${subject}-${String(i + 1).padStart(2, "0")}`;
  const order = seededOrder(id, choices.length);
  return { id, subject, attr, q, choices: order.map((k) => choices[k]), answer: order.indexOf(answer) };
};

// 8 questions per subject × 3 subjects × 7 grades. Terse but syllabus-aligned.
const CHI: Record<Grade, [string, string[], number, string][]> = {
  K3: [
    ["這是甚麼字：「日」？", ["月", "日", "山", "水"], 1, "字形識別"],
    ["這是甚麼字：「口」？", ["口", "目", "田", "白"], 0, "字形識別"],
    ["「人」的意思是？", ["person", "sun", "tree", "fish"], 0, "字義"],
    ["「一、二、三」下一個是？", ["五", "六", "四", "七"], 2, "數字"],
    ["「大」的相反是？", ["高", "小", "多", "長"], 1, "相反詞"],
    ["「爸爸」是家中的？", ["女兒", "父親", "老師", "朋友"], 1, "家庭"],
    ["這是甚麼字：「手」？", ["足", "手", "口", "耳"], 1, "身體"],
    ["「山」通常在哪裡？", ["天上", "海中", "地上", "書中"], 2, "常識"],
  ],
  P1: [
    ["「學校」是甚麼地方？", ["讀書", "睡覺", "游泳", "煮飯"], 0, "詞語"],
    ["「一隻___」通常配甚麼？", ["書", "貓", "水", "飯"], 1, "量詞"],
    ["「快」的相反是？", ["急", "慢", "早", "遲"], 1, "反義"],
    ["「哥哥」是？", ["姐姐的弟弟", "爸爸的爸爸", "比我大的男孩", "老師"], 2, "家庭"],
    ["「太陽」在哪裡出現？", ["晚上", "白天", "夢中", "水裡"], 1, "常識"],
    ["「蘋果」屬於？", ["水果", "蔬菜", "肉類", "文具"], 0, "分類"],
    ["「紅、黃、藍」是？", ["味道", "顏色", "數字", "動物"], 1, "分類"],
    ["「跑」的意思最接近？", ["走", "飛", "急步移動", "睡"], 2, "詞義"],
  ],
  P2: [
    ["「一本書」中「本」是？", ["名詞", "量詞", "動詞", "形容詞"], 1, "量詞"],
    ["「開心」的近義詞是？", ["快樂", "生氣", "難過", "害怕"], 0, "近義"],
    ["「明亮」的反義詞是？", ["清楚", "黑暗", "光滑", "美麗"], 1, "反義"],
    ["「他___學校讀書。」填？", ["在", "從", "把", "被"], 0, "介詞"],
    ["「花園裡開了很多___」", ["花", "書", "車", "飯"], 0, "詞語搭配"],
    ["「蝴蝶」是甚麼？", ["昆蟲", "魚類", "鳥類", "植物"], 0, "常識"],
    ["「一群___」通常指？", ["書本", "羊", "鉛筆", "月亮"], 1, "量詞"],
    ["「勤力」形容一個人？", ["懶惰", "努力", "傷心", "強壯"], 1, "詞義"],
  ],
  P3: [
    ["「一心一意」意思是？", ["三心兩意", "專心", "很快", "很累"], 1, "成語"],
    ["「七上八落」形容？", ["很整齊", "心情不安", "很開心", "很多人"], 1, "成語"],
    ["「他跑得像___一樣快。」", ["蝸牛", "烏龜", "獵豹", "石頭"], 2, "比喻"],
    ["「風平___靜」填？", ["浪", "水", "海", "山"], 0, "成語"],
    ["「勤有功，戲___益」填？", ["有", "無", "多", "少"], 1, "諺語"],
    ["「碩大」的反義是？", ["巨大", "微小", "圓形", "沉重"], 1, "反義"],
    ["「他非常___，總是幫助別人。」", ["自私", "善良", "懶惰", "粗魯"], 1, "詞義"],
    ["「日積月累」形容？", ["很短時間", "慢慢累積", "很危險", "很浪費"], 1, "成語"],
  ],
  P4: [
    ["「守株待兔」的意思是？", ["努力工作", "不勞而獲、死等機會", "打獵成功", "耕田"], 1, "成語故事"],
    ["「聞雞起舞」形容？", ["聽音樂跳舞", "勤奮努力", "早睡早起", "喜歡雞"], 1, "成語"],
    ["下列哪句用了擬人？", ["風在唱歌", "他跑得快", "書很厚", "水很冷"], 0, "修辭"],
    ["「亡羊補牢」比喻？", ["補籬笆", "事後補救仍不算晚", "養羊", "失敗"], 1, "成語"],
    ["「他寫的字___漂亮。」填？", ["非常", "很多", "一個", "然後"], 0, "副詞"],
    ["「因為下雨，___比賽取消了。」填？", ["但是", "所以", "如果", "雖然"], 1, "連詞"],
    ["「畫龍點睛」比喻？", ["畫畫", "關鍵一筆使事物生動", "點眼藥水", "浪費"], 1, "成語"],
    ["「他的笑容像陽光」用了？", ["排比", "比喻", "誇張", "反問"], 1, "修辭"],
  ],
  P5: [
    ["「亡羊補牢，未為晚也」出自？", ["《論語》", "《戰國策》", "《西遊記》", "《紅樓夢》"], 1, "文言"],
    ["「熟能生巧」意思接近？", ["天生聰明", "多練習便能精通", "工具好", "運氣好"], 1, "成語"],
    ["「一諾千金」形容？", ["很有錢", "重視承諾", "很吝嗇", "很快"], 1, "成語"],
    ["「三人行，必有我___」填？", ["敵", "師", "友", "親"], 1, "文言"],
    ["「畫蛇添足」比喻？", ["有創意", "多此一舉", "畫得好", "很小心"], 1, "成語"],
    ["「他既聰明___勤力。」填？", ["卻", "又", "但", "或"], 1, "關聯詞"],
    ["「井底之蛙」比喻？", ["聰明的人", "見識狹窄的人", "勇敢的人", "水中生物"], 1, "成語"],
    ["「有志者事竟成」意思？", ["有錢事成", "有決心便會成功", "運氣好", "有朋友"], 1, "諺語"],
  ],
  P6: [
    ["「臥薪嘗膽」形容？", ["很辛苦地睡", "刻苦自勵、發奮圖強", "生病", "吃苦膽"], 1, "成語"],
    ["「愚公移山」比喻？", ["搬家", "有恆心毅力便能成功", "老人力氣大", "山會動"], 1, "成語"],
    ["「不入虎穴，焉得虎子」意思？", ["很危險別去", "不冒險就沒收穫", "去打老虎", "老虎有子"], 1, "諺語"],
    ["下列哪句用了排比？", ["天很藍", "他跑、他跳、他笑", "花如笑臉", "書很重"], 1, "修辭"],
    ["「青出於藍而勝於藍」意思？", ["顏色深", "後輩勝過前輩", "藍色最好", "染布"], 1, "文言"],
    ["「一葉知秋」比喻？", ["樹葉落下", "見微知著", "秋天很美", "葉子黃了"], 1, "成語"],
    ["「桃李滿門」形容？", ["家中種樹", "學生眾多", "很多水果", "很富有"], 1, "成語"],
    ["「他___努力，___成績優異。」填？", ["因為…所以", "雖然…但是", "如果…就", "不但…而且"], 0, "關聯詞"],
  ],
};

const ENG: Record<Grade, [string, string[], number, string][]> = {
  K3: [
    ["Which starts with 'B'?", ["cat", "ball", "dog", "sun"], 1, "Phonics"],
    ["'C-A-T' spells?", ["car", "cat", "cup", "can"], 1, "CVC"],
    ["Opposite of 'big'?", ["tall", "small", "long", "wide"], 1, "Vocabulary"],
    ["Which is a fruit?", ["car", "apple", "shoe", "book"], 1, "Vocabulary"],
    ["How many legs does a dog have?", ["two", "three", "four", "six"], 2, "Comprehension"],
    ["Which one is red?", ["🍎", "🍌", "🥒", "🫐"], 0, "Vocabulary"],
    ["The sun is ___?", ["cold", "hot", "wet", "soft"], 1, "Vocabulary"],
    ["Choose the letter after 'D'.", ["B", "C", "E", "F"], 2, "Alphabet"],
  ],
  P1: [
    ["I ___ a student.", ["is", "am", "are", "be"], 1, "Present simple"],
    ["She ___ apples.", ["like", "likes", "liking", "liked"], 1, "Present simple"],
    ["Plural of 'book'?", ["book", "bookes", "books", "bookies"], 2, "Plurals"],
    ["___ name is Tom.", ["I", "My", "Me", "Mine"], 1, "Pronouns"],
    ["Opposite of 'happy'?", ["glad", "sad", "kind", "fast"], 1, "Vocabulary"],
    ["A ___ has wings.", ["fish", "bird", "car", "cup"], 1, "Vocabulary"],
    ["___ you my friend?", ["Is", "Am", "Are", "Be"], 2, "Present simple"],
    ["Which is a colour?", ["run", "blue", "sing", "eat"], 1, "Vocabulary"],
  ],
  P2: [
    ["He is ___ football now.", ["play", "plays", "playing", "played"], 2, "Present continuous"],
    ["Yesterday I ___ to school.", ["walk", "walks", "walked", "walking"], 2, "Past simple"],
    ["I saw ___ elephant.", ["a", "an", "the", "some"], 1, "Articles"],
    ["The cake is ___.", ["deliciously", "delicious", "delicate", "delight"], 1, "Adjectives"],
    ["They ___ their homework now.", ["do", "does", "are doing", "did"], 2, "Present continuous"],
    ["Opposite of 'begin'?", ["start", "end", "open", "run"], 1, "Vocabulary"],
    ["___ is your teacher?", ["What", "Who", "Where", "When"], 1, "WH-words"],
    ["The dog ___ loudly last night.", ["bark", "barks", "barked", "barking"], 2, "Past simple"],
  ],
  P3: [
    ["Last week I ___ to Japan.", ["go", "went", "gone", "going"], 1, "Past irregular"],
    ["Tomorrow she ___ visit us.", ["will", "was", "did", "is"], 0, "Future"],
    ["The cat is ___ the table.", ["on", "in", "at", "of"], 0, "Prepositions"],
    ["I ___ eat breakfast every day.", ["never", "always", "yesterday", "tomorrow"], 1, "Adverbs"],
    ["He ___ his keys yesterday.", ["lose", "loses", "lost", "losing"], 2, "Past irregular"],
    ["I'm going ___ swim later.", ["to", "for", "at", "in"], 0, "Future"],
    ["The book is ___ the bag.", ["in", "on", "over", "under"], 0, "Prepositions"],
    ["She ___ ate ice cream in her life.", ["never", "always", "yet", "soon"], 0, "Adverbs"],
  ],
  P4: [
    ["While I ___ TV, the phone rang.", ["watch", "watched", "was watching", "watches"], 2, "Past continuous"],
    ["This box is ___ than that one.", ["heavy", "heavier", "heaviest", "more heavy"], 1, "Comparatives"],
    ["There isn't ___ milk left.", ["many", "much", "few", "a lot"], 1, "Quantifiers"],
    ["I like tea ___ I don't like coffee.", ["and", "but", "so", "or"], 1, "Connectives"],
    ["Mount Everest is the ___ mountain.", ["high", "higher", "highest", "more high"], 2, "Superlatives"],
    ["How ___ apples are there?", ["much", "many", "some", "any"], 1, "Quantifiers"],
    ["He fell ___ he was running fast.", ["so", "but", "because", "although"], 2, "Connectives"],
    ["We ___ dinner when you called.", ["have", "had", "were having", "having"], 2, "Past continuous"],
  ],
  P5: [
    ["I ___ finished my homework.", ["have", "has", "am", "was"], 0, "Present perfect"],
    ["You ___ wear a helmet.", ["can", "must", "may", "will"], 1, "Modals"],
    ["The girl ___ is singing is my sister.", ["which", "who", "whose", "where"], 1, "Relative"],
    ["Please turn ___ the lights.", ["on", "of", "at", "in"], 0, "Phrasal verbs"],
    ["She has ___ to Paris twice.", ["been", "gone", "went", "being"], 0, "Present perfect"],
    ["You ___ smoke here. It's forbidden.", ["can", "must not", "should", "may"], 1, "Modals"],
    ["That's the house ___ we lived in.", ["who", "which", "whose", "when"], 1, "Relative"],
    ["He gave ___ smoking last year.", ["up", "in", "out", "on"], 0, "Phrasal verbs"],
  ],
  P6: [
    ["When I arrived, they ___ already left.", ["have", "has", "had", "was"], 2, "Past perfect"],
    ["If I ___ you, I would apologise.", ["am", "was", "were", "be"], 2, "2nd conditional"],
    ["She wants ___ a doctor.", ["become", "to become", "becoming", "became"], 1, "To-infinitive"],
    ["I enjoy ___ books at night.", ["read", "to read", "reading", "reads"], 2, "Gerund"],
    ["The letter ___ by Sam yesterday.", ["wrote", "was written", "written", "is writing"], 1, "Passive"],
    ["He said he ___ tired.", ["is", "was", "be", "being"], 1, "Reported speech"],
    ["If it rains, we ___ stay home.", ["will", "would", "had", "were"], 0, "1st conditional"],
    ["By 8pm, she ___ dinner.", ["cooked", "had cooked", "has cooked", "cooking"], 1, "Past perfect"],
  ],
};

const MATH: Record<Grade, [string, string[], number, string][]> = {
  K3: [
    ["Count: 🍎🍎🍎", ["2", "3", "4", "5"], 1, "Counting"],
    ["2 + 3 = ?", ["4", "5", "6", "7"], 1, "Addition"],
    ["Which is a circle?", ["■", "▲", "●", "◆"], 2, "Shapes"],
    ["1 + 1 = ?", ["1", "2", "3", "0"], 1, "Addition"],
    ["Which is bigger?", ["3", "7", "1", "2"], 1, "Compare"],
    ["Count: 🐶🐶🐶🐶🐶", ["3", "4", "5", "6"], 2, "Counting"],
    ["After 4 comes ___?", ["3", "5", "6", "2"], 1, "Sequence"],
    ["4 + 2 = ?", ["5", "6", "7", "8"], 1, "Addition"],
  ],
  P1: [
    ["25 + 34 = ?", ["49", "59", "69", "58"], 1, "2-digit +"],
    ["70 - 45 = ?", ["25", "35", "15", "20"], 0, "2-digit −"],
    ["Which is 3rd?", ["🥇", "🥈", "🥉", "4️⃣"], 2, "Ordinals"],
    ["A triangle has ___ sides.", ["2", "3", "4", "5"], 1, "2D shapes"],
    ["12 + 8 = ?", ["18", "19", "20", "22"], 2, "2-digit +"],
    ["What time is 3:30 also called?", ["quarter past 3", "half past 3", "quarter to 4", "3 o'clock"], 1, "Time"],
    ["50 + 27 = ?", ["67", "77", "87", "70"], 1, "2-digit +"],
    ["A square has ___ equal sides.", ["2", "3", "4", "5"], 2, "2D shapes"],
  ],
  P2: [
    ["3456 + 1289 = ?", ["4635", "4745", "4645", "4755"], 1, "4-digit +"],
    ["5008 - 2374 = ?", ["2634", "2734", "2624", "2534"], 0, "4-digit −"],
    ["7 × 6 = ?", ["42", "48", "36", "40"], 0, "×tables"],
    ["24 ÷ 3 = ?", ["6", "7", "8", "9"], 2, "Division"],
    ["$5 - $2.50 = ?", ["$2.50", "$3.50", "$2.00", "$3.00"], 0, "Money"],
    ["100 cm = ___ m", ["0.1", "1", "10", "100"], 1, "Length"],
    ["9 × 8 = ?", ["71", "72", "81", "64"], 1, "×tables"],
    ["1234 + 5678 = ?", ["6912", "6812", "6902", "7912"], 0, "4-digit +"],
  ],
  P3: [
    ["124 × 3 = ?", ["362", "372", "382", "472"], 1, "×1-digit"],
    ["96 ÷ 4 = ?", ["22", "23", "24", "26"], 2, "÷1-digit"],
    ["1/4 + 2/4 = ?", ["3/4", "3/8", "1/2", "2/4"], 0, "Fractions"],
    ["Perimeter of 3×5 rectangle?", ["8", "15", "16", "20"], 2, "Perimeter"],
    ["A right angle is ___°.", ["45", "60", "90", "180"], 2, "Angles"],
    ["213 × 4 = ?", ["842", "852", "832", "862"], 1, "×1-digit"],
    ["5/6 - 2/6 = ?", ["3/6", "7/6", "3/12", "2/6"], 0, "Fractions"],
    ["144 ÷ 6 = ?", ["22", "23", "24", "26"], 2, "÷1-digit"],
  ],
  P4: [
    ["234 × 12 = ?", ["2708", "2808", "2818", "2708"], 1, "×2-digit"],
    ["3.4 + 1.75 = ?", ["4.15", "5.05", "5.15", "5.25"], 2, "Decimals"],
    ["Equivalent to 2/3?", ["3/6", "4/6", "5/9", "2/6"], 1, "Fractions"],
    ["Area of 6×4 rectangle?", ["10", "20", "24", "28"], 2, "Area"],
    ["Convert 14:30 to 12hr.", ["2:30 am", "4:30 pm", "2:30 pm", "12:30 pm"], 2, "24-hr time"],
    ["456 ÷ 8 = ?", ["55", "56", "57", "58"], 2, "÷1-digit"],
    ["7.2 - 3.45 = ?", ["3.75", "3.85", "4.75", "3.65"], 0, "Decimals"],
    ["125 × 16 = ?", ["1800", "2000", "2100", "1900"], 1, "×2-digit"],
  ],
  P5: [
    ["25% of 80 = ?", ["15", "20", "25", "40"], 1, "Percentage"],
    ["Average of 4, 8, 12 = ?", ["6", "8", "10", "12"], 1, "Average"],
    ["Area of triangle base 10 height 6?", ["30", "60", "16", "36"], 0, "Area"],
    ["Volume of cuboid 2×3×4?", ["9", "18", "24", "36"], 2, "Volume"],
    ["3.2 × 0.5 = ?", ["1.6", "16", "0.16", "3.7"], 0, "Decimals ×"],
    ["If □ + 7 = 15, □ = ?", ["6", "7", "8", "9"], 2, "Algebra"],
    ["50% of 240 = ?", ["100", "110", "120", "140"], 2, "Percentage"],
    ["12.5 ÷ 5 = ?", ["2.5", "2.05", "2.55", "3.5"], 0, "Decimals ÷"],
  ],
  P6: [
    ["30% discount on $200 = ?", ["$60", "$140", "$170", "$180"], 1, "Percentage"],
    ["3/4 + 1/8 = ?", ["4/12", "7/8", "5/8", "1"], 1, "Fractions"],
    ["Ratio 12:18 simplified?", ["1:2", "2:3", "3:4", "6:9"], 1, "Ratio"],
    ["A car goes 120 km in 2h. Speed?", ["50", "60", "70", "80"], 1, "Speed"],
    ["Circumference of circle r=7 (π≈22/7)?", ["44", "22", "154", "14"], 0, "Circle"],
    ["Volume of cube side 5?", ["25", "75", "100", "125"], 3, "Volume"],
    ["Solve 3x = 21, x = ?", ["3", "6", "7", "9"], 2, "Equations"],
    ["Angles on a straight line sum to?", ["90°", "180°", "270°", "360°"], 1, "Angles"],
  ],
};

function build(grade: Grade): MCQ[] {
  const items: MCQ[] = [];
  CHI[grade].forEach((row, i) => items.push(mk(grade, "chi", i, row[3], row[0], row[1], row[2])));
  ENG[grade].forEach((row, i) => items.push(mk(grade, "eng", i, row[3], row[0], row[1], row[2])));
  MATH[grade].forEach((row, i) => items.push(mk(grade, "math", i, row[3], row[0], row[1], row[2])));
  return items;
}

export const QUESTIONS_BY_GRADE: Record<Grade, MCQ[]> = GRADES.reduce((acc, g) => {
  acc[g] = build(g);
  return acc;
}, {} as Record<Grade, MCQ[]>);

// Submissions storage -------------------------------------------------------
export type QResult = { qid: string; correct: boolean; timeMs: number };
export type Submission = {
  userId: string;
  dataId: string;              // short human-friendly id shown to the user
  source: "input-data" | "trial";
  dyslexia: boolean | null;    // null = unknown (trial mode without answer)
  grade: Grade;
  timestamp: number;
  results: QResult[];
};

const STORAGE_KEY = "wq_submissions_v1";

// Short id like "D-8F3K2" — easy to read out loud / write down.
export function genDataId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `D-${s}`;
}

// Local cache (used by importJson and as offline fallback). Cloud is source of truth.
export function loadLocalSubmissions(): Submission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const arr = raw ? (JSON.parse(raw) as Submission[]) : [];
    let mutated = false;
    for (const s of arr) {
      if (!s.dataId) { s.dataId = genDataId(); mutated = true; }
    }
    if (mutated) {
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch {}
    }
    return arr;
  } catch { return []; }
}

function writeLocal(all: Submission[]) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch {}
}

type Row = {
  data_id: string; user_id: string; grade: string;
  dyslexia: boolean | null; results: QResult[]; client_timestamp: number;
};

function rowToSub(r: Row): Submission {
  return {
    userId: r.user_id, dataId: r.data_id, grade: r.grade as Grade,
    dyslexia: r.dyslexia, results: r.results, timestamp: Number(r.client_timestamp),
    source: "input-data",
  };
}

// Load submissions from Lovable Cloud (admin only, server-side). Falls back to
// local cache when offline.
export async function loadSubmissions(adminPassword?: string): Promise<Submission[]> {
  try {
    const pw =
      adminPassword ??
      (typeof window !== "undefined" ? window.sessionStorage.getItem("wq_admin_token") ?? "" : "");
    const { listSubmissions } = await import("@/lib/submissions.functions");
    const { rows } = await listSubmissions({ data: { adminToken: pw } });
    const subs = (rows as unknown as Row[]).map(rowToSub);
    writeLocal(subs);
    return subs;
  } catch (e) {
    console.warn("[submissions] cloud load failed, using local", e);
    return loadLocalSubmissions();
  }
}

export async function saveSubmission(s: Submission): Promise<void> {
  // Mirror to local immediately for offline resilience.
  const all = loadLocalSubmissions();
  all.push(s);
  writeLocal(all);
  try {
    const { insertSubmissions } = await import("@/lib/submissions.functions");
    await insertSubmissions({ data: { submissions: [toPayload(s)] } });
  } catch (e) {
    console.error("[submissions] cloud insert failed", e);
  }
}

function toPayload(s: Submission) {
  return {
    dataId: s.dataId,
    userId: s.userId,
    grade: s.grade,
    dyslexia: s.dyslexia,
    timestamp: s.timestamp,
    results: s.results,
  };
}

// Bulk merge for the admin "Import data" button.
export async function importSubmissions(list: Submission[]): Promise<number> {
  if (!list.length) return 0;
  try {
    const { insertSubmissions } = await import("@/lib/submissions.functions");
    await insertSubmissions({ data: { submissions: list.map(toPayload) } });
    return list.length;
  } catch (e) {
    console.error("[submissions] import failed", e);
    return 0;
  }
}

