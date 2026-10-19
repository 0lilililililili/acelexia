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
 return shuffled([{text:`${target-1} + 1`,value:target},{text:`${target*2} ÷ 2`,value:target},{text:`${target+seed%4} + 3`,value:target+seed%4+3},{text:`${target+4} − 4`,value:target}]);
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
  const next=candidates.find(c=>c.word!==rows.at(-1)?.word)??candidates[0];
  if(!next)break;
  rows.push(next);remaining-=next.difficulty;
 }
 return rows;
}