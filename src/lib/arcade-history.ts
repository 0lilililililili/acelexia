import {getState,updateState} from "./store";
export function practicedWords(grade:string):string[]{
 try{return JSON.parse(getState().settings[`familySeen_${grade}`] as string||"[]")}catch{return []}
}
export function rememberFamily(grade:string,child:string){
 const seen=practicedWords(grade);
 if(!seen.includes(child))updateState(s=>({...s,settings:{...s.settings,[`familySeen_${grade}`]:JSON.stringify([...seen,child])}}));
}