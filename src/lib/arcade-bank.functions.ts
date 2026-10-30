import {createServerFn} from "@tanstack/react-start";
import {z} from "zod";
import {GRADES} from "./arcade-bank-schema";

export const generateFamilyPairs=createServerFn({method:"POST"}).inputValidator((d:unknown)=>z.object({token:z.string().min(10).max(2000),grade:z.enum(GRADES),exclude:z.array(z.string().regex(/^[a-z]+$/).max(30)).max(2000)}).parse(d)).handler(async({data})=>{
 const {verifySession}=await import("./session.server");
 const session=await verifySession(data.token);
 if(!session) return {ok:false as const,message:"Please log in to get new questions."};
 const {supabaseAdmin}=await import("@/integrations/supabase/client.server");
 const {data:progress}=await supabaseAdmin.from("progress").select("settings").eq("user_id",session.sub).maybeSingle();
 const settings=(progress?.settings??{}) as Record<string,unknown>;
 if(typeof settings.arcadeAiDenied==="string")return {ok:false as const,message:settings.arcadeAiDenied};
 try{
  const {makeFamilyBank}=await import("./arcade-ai.server");
  const families=await makeFamilyBank(data.grade,data.exclude);
  if(families.length<6)return {ok:false as const,message:"No complete fresh round was returned. Please start a fresh request."};
  return {ok:true as const,families};
 }catch(error){
  const e=error as {statusCode?:number;message?:string;responseBody?:string};
  let message=e.message??"Question generation could not finish.";
  try{const body=JSON.parse(e.responseBody??"{}");message=body.message??body.error?.message??message}catch{}
  if(e.statusCode===403){await supabaseAdmin.from("progress").update({settings:{...settings,arcadeAiDenied:message} as never}).eq("user_id",session.sub)}
  return {ok:false as const,message};
 }
});