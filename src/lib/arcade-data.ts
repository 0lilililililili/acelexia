export const BUILD_CHARACTERS = [
 {word:"林",parts:["木","木"],distractors:["本","禾"],hint:"森林的林",difficulty:1},
 {word:"明",parts:["日","月"],distractors:["目","白"],hint:"明天的明",difficulty:1},
 {word:"休",parts:["亻","木"],distractors:["彳","本"],hint:"休息的休",difficulty:1},
 {word:"好",parts:["女","子"],distractors:["大","了"],hint:"好人的好",difficulty:1},
 {word:"語",parts:["言","五","口"],distractors:["氵","日"],hint:"語言的語",difficulty:2},
 {word:"清",parts:["氵","青"],distractors:["忄","晴"],hint:"清水的清",difficulty:2},
 {word:"晴",parts:["日","青"],distractors:["目","清"],hint:"晴天的晴",difficulty:2},
 {word:"湖",parts:["氵","古","月"],distractors:["言","日"],hint:"湖水的湖",difficulty:3},
 {word:"謝",parts:["言","身","寸"],distractors:["氵","才"],hint:"謝謝的謝",difficulty:3},
 {word:"樹",parts:["木","壴","寸"],distractors:["禾","才"],hint:"樹木的樹",difficulty:3},
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
 return [{text:`${target-1} + 1`,value:target},{text:`${target*2} ÷ 2`,value:target},{text:`${target+seed%4} + 3`,value:target+seed%4+3},{text:`${target+4} − 4`,value:target}].sort(()=>0.5-Math.random());
}
export function builderRound(grade:string) {
 const max = grade === "K3" ? 1 : Number(grade.slice(1)) < 3 ? 2 : 3;
 const eligible = BUILD_CHARACTERS.filter(c=>c.difficulty<=max);
 const rows:typeof BUILD_CHARACTERS=[]; let load=0;
 while(load<8) { const next=eligible[rows.length%eligible.length]; rows.push(next); load+=next.difficulty; }
 return rows;
}