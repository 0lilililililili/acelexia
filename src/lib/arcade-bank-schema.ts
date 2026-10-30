import {z} from "zod";
export const GRADES = ["K3","P1","P2","P3","P4","P5","P6"] as const;
export const SCENES = ["bakery","park","classroom","seaside"] as const;
export const TypoItemSchema = z.object({sentence:z.string().min(5).max(220),bad:z.string().min(1).max(30),good:z.string().min(1).max(30),choices:z.array(z.string().min(1).max(30)).length(3),scene:z.enum(SCENES)});
export type TypoItem = z.infer<typeof TypoItemSchema>;
export const FamilySchema = z.object({child:z.string().regex(/^[a-z]+$/).max(30),mother:z.string().regex(/^[a-z]+$/).max(30)});
export const GradeBankSchema = z.object({typos:z.array(TypoItemSchema).length(50),families:z.array(FamilySchema).length(50)});
export const FamilyBankSchema = z.object({families:z.array(FamilySchema).min(6).max(20)});
export function validTypos(rows:TypoItem[]) {
 return rows.every(q=>q.bad!==q.good&&q.choices.includes(q.good)&&new Set(q.choices).size===3&&q.sentence.split(/\s+/).filter(w=>w.replace(/[.,!?]/g,"")===q.bad).length===1)&&new Set(rows.map(q=>q.sentence)).size===rows.length;
}