import {getJyutpingList} from "to-jyutping";
import {pinyin} from "pinyin-pro";
import {normalizedChinese} from "./chinese-script";
import {matches} from "./answer-match";
export type SpokenChinese="zh-HK"|"zh-CN";
const clean=(text:string)=>normalizedChinese(text).replace(/[^\p{Script=Han}]/gu,"");
export function pronunciation(text:string,lang:SpokenChinese):string {
 const word=clean(text);if(!word)return "";
 if(lang==="zh-CN")return pinyin(word,{toneType:"num",type:"array"}).join(" ");
 const rows=getJyutpingList(word);if(rows.some(([,sound])=>!sound))return "";
 return rows.map(([,sound])=>sound).join(" ");
}
function distance(a:string,b:string){let prev=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,prev[j]+1,prev[j-1]+Number(a[i-1]!==b[j-1]));prev=next}return prev[b.length]}
/** Near speech is scaffolding, never an automatically correct answer. */
export function assessPronunciation(text:string,target:string,lang:SpokenChinese):"correct"|"close"|"different" {
 if(matches(text,target))return "correct";
 const a=pronunciation(text,lang),b=pronunciation(target,lang);if(!a||!b)return "different";
 if(a===b)return "correct";
 const x=a.split(" "),y=b.split(" ");if(x.length!==y.length)return "different";
 const similarity=1-distance(a,b)/Math.max(a.length,b.length);
 return similarity>=0.5?"close":"different";
}
export function pronunciationChoices(target:string,alternatives:string[],lang:SpokenChinese){
 const answer=pronunciation(target,lang);return [...new Set([answer,...alternatives.map(w=>pronunciation(w,lang))].filter(Boolean))].slice(0,3);
}