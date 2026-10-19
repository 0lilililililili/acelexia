import { recordAnswer, addRevisionItem } from "./store";
export function arcadeAnswer(subject:string, topic:string, prompt:string, answer:string, correct:boolean, ms:number, choices?:string[]) {
 recordAnswer(subject,correct,ms,topic);
 if(!correct) addRevisionItem(subject,{topic,prompt,answer,ts:Date.now(),reason:"wrong",...(choices ? {choices} : {})});
}