import {shuffled} from "@/lib/shuffle";
export const BUILD_CHARACTERS = [
 {word:"林",parts:["木","木"],distractors:["本","禾"],hint:"森林的林",difficulty:1},
 {word:"明",parts:["日","月"],distractors:["目","白"],hint:"明天的明",difficulty:1},
 {word:"休",parts:["亻","木"],distractors:["彳","本"],hint:"休息的休",difficulty:1},
 {word:"好",parts:["女","子"],distractors:["大","了"],hint:"好人的好",difficulty:1},
 {word:"語",parts:["言","五","口"],distractors:["氵","日"],hint:"語言的語",difficulty:4},
 {word:"清",parts:["氵","青"],distractors:["忄","晴"],hint:"清水的清",difficulty:2},
 {word:"晴",parts:["日","青"],distractors:["目","清"],hint:"晴天的晴",difficulty:2},
 {word:"湖",parts:["氵","古","月"],distractors:["言","日"],hint:"湖水的湖",difficulty:3},
 {word:"謝",parts:["言","身","寸"],distractors:["氵","才"],hint:"謝謝的謝",difficulty:5},
 {word:"樹",parts:["木","壴","寸"],distractors:["禾","才"],hint:"樹木的樹",difficulty:5},
 {word:"朋",parts:["月","月"],distractors:["目","日"],hint:"朋友的朋",difficulty:2},
 {word:"森",parts:["木","木","木"],distractors:["本","禾"],hint:"森林的森",difficulty:3},
 {word:"話",parts:["言","舌"],distractors:["氵","古"],hint:"說話的話",difficulty:4},
 {word:"想",parts:["木","目","心"],distractors:["日","必"],hint:"想法的想",difficulty:6},
 {word:"意",parts:["立","日","心"],distractors:["目","必"],hint:"意思的意",difficulty:6},
 {word:"福",parts:["礻","一","口","田"],distractors:["衤","日"],hint:"幸福的福",difficulty:7},
 {word:"富",parts:["宀","一","口","田"],distractors:["冖","日"],hint:"豐富的富",difficulty:7},
 {word:"橋",parts:["木","喬"],distractors:["禾","高"],hint:"橋樑的橋",difficulty:8},
 {word:"機",parts:["木","幾"],distractors:["禾","戈"],hint:"飛機的機",difficulty:8},
 {word:"憶",parts:["忄","意"],distractors:["氵","音"],hint:"記憶的憶",difficulty:9},
 {word:"識",parts:["言","戠"],distractors:["氵","音"],hint:"知識的識",difficulty:9},
 {word:"議",parts:["言","義"],distractors:["氵","美"],hint:"會議的議",difficulty:10},
 {word:"贏",parts:["亡","口","月","貝","凡"],distractors:["目","見"],hint:"輸贏的贏",difficulty:10},
 {word:"辯",parts:["辛","言","辛"],distractors:["刀","力"],hint:"辯論的辯",difficulty:11},
 {word:"辨",parts:["辛","刀","辛"],distractors:["言","力"],hint:"辨認的辨",difficulty:11},
 {word:"籃",parts:["竹","監"],distractors:["艹","藍"],hint:"籃球的籃",difficulty:12},
 {word:"藍",parts:["艹","監"],distractors:["竹","籃"],hint:"藍色的藍",difficulty:12},
 {word:"觀",parts:["雚","見"],distractors:["隹","貝"],hint:"觀察的觀",difficulty:13},
 {word:"歡",parts:["雚","欠"],distractors:["見","人"],hint:"歡迎的歡",difficulty:13},
 {word:"聽",parts:["耳","王","十","罒","一","心"],distractors:["目","必"],hint:"聽見的聽",difficulty:14},
 {word:"體",parts:["骨","豊"],distractors:["月","豐"],hint:"身體的體",difficulty:14},
 {word:"鑿",parts:["丵","臼","殳","金"],distractors:["土","王"],hint:"開鑿的鑿",difficulty:15},
 {word:"鬱",parts:["木","缶","木","冖","鬯","彡"],distractors:["本","氵"],hint:"憂鬱的鬱",difficulty:15},

{word:"江",parts:["氵", "工"],distractors:["目","本"],hint:"組合「江」",difficulty:1},
{word:"河",parts:["氵", "可"],distractors:["目","本"],hint:"組合「河」",difficulty:1},
{word:"村",parts:["木", "寸"],distractors:["目","本"],hint:"組合「村」",difficulty:1},
{word:"苗",parts:["艹", "田"],distractors:["目","本"],hint:"組合「苗」",difficulty:1},
{word:"早",parts:["日", "十"],distractors:["目","本"],hint:"組合「早」",difficulty:1},
{word:"地",parts:["土", "也"],distractors:["目","本"],hint:"組合「地」",difficulty:1},
{word:"行",parts:["彳", "亍"],distractors:["目","本"],hint:"組合「行」",difficulty:2},
{word:"字",parts:["宀", "子"],distractors:["目","本"],hint:"組合「字」",difficulty:2},
{word:"安",parts:["宀", "女"],distractors:["目","本"],hint:"組合「安」",difficulty:2},
{word:"音",parts:["立", "日"],distractors:["目","本"],hint:"組合「音」",difficulty:2},
{word:"草",parts:["艹", "早"],distractors:["目","本"],hint:"組合「草」",difficulty:2},
{word:"花",parts:["艹", "化"],distractors:["目","本"],hint:"組合「花」",difficulty:2},
{word:"晶",parts:["日", "日", "日"],distractors:["目","本"],hint:"組合「晶」",difficulty:3},
{word:"品",parts:["口", "口", "口"],distractors:["目","本"],hint:"組合「品」",difficulty:3},
{word:"淼",parts:["水", "水", "水"],distractors:["目","本"],hint:"組合「淼」",difficulty:3},
{word:"焱",parts:["火", "火", "火"],distractors:["目","本"],hint:"組合「焱」",difficulty:3},
{word:"炎",parts:["火", "火"],distractors:["目","本"],hint:"組合「炎」",difficulty:3},
{word:"海",parts:["氵", "每"],distractors:["目","本"],hint:"組合「海」",difficulty:3},
{word:"校",parts:["木", "交"],distractors:["目","本"],hint:"組合「校」",difficulty:4},
{word:"洋",parts:["氵", "羊"],distractors:["目","本"],hint:"組合「洋」",difficulty:4},
{word:"請",parts:["言", "青"],distractors:["目","本"],hint:"組合「請」",difficulty:4},
{word:"情",parts:["忄", "青"],distractors:["目","本"],hint:"組合「情」",difficulty:4},
{word:"讀",parts:["言", "賣"],distractors:["目","本"],hint:"組合「讀」",difficulty:4},
{word:"鋅",parts:["金", "辛"],distractors:["目","本"],hint:"組合「鋅」",difficulty:4},
{word:"轟",parts:["車", "車", "車"],distractors:["目","本"],hint:"組合「轟」",difficulty:5},
{word:"鑫",parts:["金", "金", "金"],distractors:["目","本"],hint:"組合「鑫」",difficulty:5},
{word:"磊",parts:["石", "石", "石"],distractors:["目","本"],hint:"組合「磊」",difficulty:5},
{word:"鞋",parts:["革", "圭"],distractors:["目","本"],hint:"組合「鞋」",difficulty:5},
{word:"鐘",parts:["金", "童"],distractors:["目","本"],hint:"組合「鐘」",difficulty:5},
{word:"燈",parts:["火", "登"],distractors:["目","本"],hint:"組合「燈」",difficulty:5},
{word:"息",parts:["自", "心"],distractors:["目","本"],hint:"組合「息」",difficulty:6},
{word:"悲",parts:["非", "心"],distractors:["目","本"],hint:"組合「悲」",difficulty:6},
{word:"念",parts:["今", "心"],distractors:["目","本"],hint:"組合「念」",difficulty:6},
{word:"思",parts:["田", "心"],distractors:["目","本"],hint:"組合「思」",difficulty:6},
{word:"禮",parts:["礻", "豊"],distractors:["目","本"],hint:"組合「禮」",difficulty:7},
{word:"裙",parts:["衤", "君"],distractors:["目","本"],hint:"組合「裙」",difficulty:7},
{word:"褲",parts:["衤", "庫"],distractors:["目","本"],hint:"組合「褲」",difficulty:7},
{word:"裕",parts:["衤", "谷"],distractors:["目","本"],hint:"組合「裕」",difficulty:7},
{word:"橫",parts:["木", "黃"],distractors:["目","本"],hint:"組合「橫」",difficulty:8},
{word:"樓",parts:["木", "婁"],distractors:["目","本"],hint:"組合「樓」",difficulty:8},
{word:"楓",parts:["木", "風"],distractors:["目","本"],hint:"組合「楓」",difficulty:8},
{word:"橙",parts:["木", "登"],distractors:["目","本"],hint:"組合「橙」",difficulty:8},
{word:"懷",parts:["忄", "褱"],distractors:["目","本"],hint:"組合「懷」",difficulty:9},
{word:"懂",parts:["忄", "董"],distractors:["目","本"],hint:"組合「懂」",difficulty:9},
{word:"憧",parts:["忄", "童"],distractors:["目","本"],hint:"組合「憧」",difficulty:9},
{word:"懶",parts:["忄", "賴"],distractors:["目","本"],hint:"組合「懶」",difficulty:9},
{word:"讓",parts:["言", "襄"],distractors:["目","本"],hint:"組合「讓」",difficulty:10},
{word:"護",parts:["言", "蒦"],distractors:["目","本"],hint:"組合「護」",difficulty:10},
{word:"譜",parts:["言", "普"],distractors:["目","本"],hint:"組合「譜」",difficulty:10},
{word:"諧",parts:["言", "皆"],distractors:["目","本"],hint:"組合「諧」",difficulty:10},
{word:"辦",parts:["辛", "力", "辛"],distractors:["目","本"],hint:"組合「辦」",difficulty:11},
{word:"瓣",parts:["辛", "瓜", "辛"],distractors:["目","本"],hint:"組合「瓣」",difficulty:11},
{word:"辮",parts:["辛", "糸", "辛"],distractors:["目","本"],hint:"組合「辮」",difficulty:11},
{word:"辭",parts:["辤", "辛"],distractors:["目","本"],hint:"組合「辭」",difficulty:11},
{word:"簾",parts:["竹", "廉"],distractors:["目","本"],hint:"組合「簾」",difficulty:12},
{word:"簿",parts:["竹", "溥"],distractors:["目","本"],hint:"組合「簿」",difficulty:12},
{word:"蕾",parts:["艹", "雷"],distractors:["目","本"],hint:"組合「蕾」",difficulty:12},
{word:"蓮",parts:["艹", "連"],distractors:["目","本"],hint:"組合「蓮」",difficulty:12},
{word:"勸",parts:["雚", "力"],distractors:["目","本"],hint:"組合「勸」",difficulty:13},
{word:"權",parts:["木", "雚"],distractors:["目","本"],hint:"組合「權」",difficulty:13},
{word:"灌",parts:["氵", "雚"],distractors:["目","本"],hint:"組合「灌」",difficulty:13},
{word:"罐",parts:["缶", "雚"],distractors:["目","本"],hint:"組合「罐」",difficulty:13},
{word:"攀",parts:["樊", "手"],distractors:["目","本"],hint:"組合「攀」",difficulty:14},
{word:"翻",parts:["番", "羽"],distractors:["目","本"],hint:"組合「翻」",difficulty:14},
{word:"耀",parts:["光", "翟"],distractors:["目","本"],hint:"組合「耀」",difficulty:14},
{word:"鷹",parts:["䧹", "鳥"],distractors:["目","本"],hint:"組合「鷹」",difficulty:14},
{word:"齉",parts:["鼻", "囊"],distractors:["目","本"],hint:"組合「齉」",difficulty:15},
{word:"龘",parts:["龍", "龍", "龍"],distractors:["目","本"],hint:"組合「龘」",difficulty:15},
{word:"爨",parts:["臼", "同", "冖", "林", "大", "火"],distractors:["目","本"],hint:"組合「爨」",difficulty:15},
{word:"灩",parts:["氵", "豔"],distractors:["目","本"],hint:"組合「灩」",difficulty:15},
];
export const APPRAISALS = [
 {answer:"符合",falseWord:"合符",meaning:"與要求或標準一致。",source:"現代常用詞",simple:"符合"},
 {answer:"合乎",falseWord:"乎合",meaning:"符合某種標準。",source:"現代常用詞",simple:"合乎"},
 {answer:"物是人非",falseWord:"物事人非",meaning:"景物依舊，人事已改變。",source:"李清照《武陵春》",simple:"物是人非"},
 {answer:"三人行必有我師",falseWord:"三人走必有我師",meaning:"每個人都有值得學習的地方。",source:"《論語·述而》",simple:"三人行必有我师"},
 {answer:"亡羊補牢",falseWord:"亡羊補勞",meaning:"出錯後及時補救。",source:"《戰國策·楚策》",simple:"亡羊补牢"},
 {answer:"一心一意",falseWord:"一心一義",meaning:"專心致志。",source:"常用成語",simple:"一心一意"},
 {answer:"七上八落",falseWord:"七上八樂",meaning:"心情不安。",source:"常用成語",simple:"七上八落"},
 {answer:"守株待兔",falseWord:"守珠待兔",meaning:"不努力而只希望僥倖成功。",source:"《韓非子·五蠹》",simple:"守株待兔"},
];
export const WORD_FAMILIES = [["happy","happiness"],["kind","kindness"],["teach","teacher"],["help","helpful"],["care","careful"],["play","player"],["hope","hopeful"],["quick","quickly"]];
export const SIMPLE_WORD_FAMILIES = [["cat","cats"],["dog","dogs"],["book","books"],["bird","birds"]];
export const VOCAL_WORDS:Record<string,string[]> = {"食物":["米飯","麵包","蘋果","雞蛋","牛奶","水果","魚","青菜","豆腐","湯"],"交通":["巴士","火車","電車","汽車","單車","飛機","船","馬路","車站","行人"],"日常":["早晨","學校","朋友","家人","書本","休息","讀書","明天","今天","老師"],"科學":["太陽","月亮","地球","空氣","水","光","聲音","植物","動物","星星"]};
export const BASKET_SECONDS = 200;
export const PARALYSIS_SECONDS = 3;
export function basketGoal(grade:string) { return 6 + Math.max(0,Number(grade.slice(1))||0)*2; }
export function basketGoods(target:number, seed:number) {
 const used=new Set<string>();
 return Array.from({length:8},(_,i)=>{const g=nextBasketGood(target,seed*8+i,used);used.add(g.text);return g});
}
export function nextBasketGood(target:number,seed:number,used:ReadonlySet<string>=new Set(),grade="P3") {
 const basic=grade==="K3"||grade==="P1";
 const pool:{text:string;value:number}[]=[];
 for(let value=Math.max(1,target-3);value<=target+3;value++){
  for(let n=1;n<=target+12;n++){
   if(n<value)pool.push({text:`${n} + ${value-n}`,value});
   pool.push({text:`${value+n} − ${n}`,value});
   if(!basic&&n>1&&n<=12){pool.push({text:`${value*n} ÷ ${n}`,value});if(value%n===0)pool.push({text:`${n} × ${value/n}`,value})}
  }
 }
 const wantCorrect=seed%3!==2;
 const fresh=pool.filter(g=>!used.has(g.text)&&(g.value===target)===wantCorrect);
 const choices=fresh.length?fresh:pool.filter(g=>!used.has(g.text));
 return shuffled(choices.length?choices:pool)[0];
}
export const BUILDER_BANDS: Record<string, {min:number;max:number;budget:number}> = {
 K3:{min:1,max:3,budget:12}, P1:{min:4,max:5,budget:24},
 P2:{min:6,max:7,budget:36}, P3:{min:8,max:9,budget:48},
 P4:{min:10,max:11,budget:60}, P5:{min:12,max:13,budget:72},
 P6:{min:14,max:15,budget:84},
};
export function builderRound(grade:string) {
 const band=BUILDER_BANDS[grade]??BUILDER_BANDS.P3;
 const eligible=BUILD_CHARACTERS.filter(c=>c.difficulty>=band.min&&c.difficulty<=band.max);
 const rows:typeof BUILD_CHARACTERS=[];
 let remaining=band.budget;
 // Exact-load sampling: only choose a part whose remaining load can still be completed.
 const reachable=(load:number):boolean=>load===0||load>=band.min&&eligible.some(c=>c.difficulty<=load&&reachable(load-c.difficulty));
 while(remaining>0){
  const candidates=shuffled(eligible.filter(c=>c.difficulty<=remaining&&reachable(remaining-c.difficulty)));
  const next=candidates.find(c=>!rows.some(r=>r.word===c.word))??candidates.find(c=>c.word!==rows.at(-1)?.word)??candidates[0];
  if(!next)break;
  rows.push(next);remaining-=next.difficulty;
 }
 return rows;
}