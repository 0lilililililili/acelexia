import {createOpenAI} from "@ai-sdk/openai";
import {streamText,Output} from "ai";
import {FamilyBankSchema} from "./arcade-bank-schema";

export async function makeFamilyBank(grade:string,exclude:string[]) {
 const key=process.env.LOVABLE_API_KEY;
 if(!key)throw new Error("Question generation is not configured.");
 let runId:string|undefined;
 const provider=createOpenAI({baseURL:"https://ai.gateway.lovable.dev/v1",apiKey:key,headers:{"Lovable-API-Key":key,"X-Lovable-AIG-SDK":"vercel-ai-sdk"},fetch:async(input,init)=>{const headers=new Headers(init?.headers);if(runId)headers.set("X-Lovable-AIG-Run-ID",runId);const response=await fetch(input,{...init,headers});runId??=response.headers.get("X-Lovable-AIG-Run-ID")??undefined;return response}});
 const result=streamText({model:provider.responses("openai/gpt-6-astra"),maxRetries:0,instructions:`Create real English word-family pairs for Hong Kong ${grade} dyslexic children. K3/P1: familiar singular/plural pairs. P2/P3: simple plurals, -ing/-ed, -er, -ful. P4-P6: derivational noun/adjective/adverb pairs. Each child word must be different. Related words must share a root; no invented words. Exclude every child word supplied by the user.`,prompt:`Generate 12 fresh pairs. Excluded child words: ${exclude.join(", ")}`,output:Output.object({schema:FamilyBankSchema}),providerOptions:{openai:{forceReasoning:true,reasoningEffort:"low",reasoningSummary:"auto",store:false,include:["reasoning.encrypted_content"]}}});
 const bank=await result.output;
 return bank.families.filter(q=>!exclude.includes(q.child));
}