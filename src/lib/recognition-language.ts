import type {AppLang} from "./read-aloud";
import {voiceLangFor} from "./read-aloud";
/** Chinese pronunciation remains Chinese even when the interface is in English. */
export function recognitionLangFor(subject:string,lang:AppLang):"zh-HK"|"zh-CN"|"en-US" {
 return subject.toLowerCase()==="chi"?(lang==="zh-CN"?"zh-CN":"zh-HK"):voiceLangFor(subject,lang);
}