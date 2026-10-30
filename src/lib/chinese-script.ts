import {Converter} from "opencc-js";
const traditional=Converter({from:"cn",to:"hk"});
export function normalizedChinese(text:string){return traditional(text)}