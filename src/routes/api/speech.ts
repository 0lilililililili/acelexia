import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { requestSpeech } from "@/lib/speech-request.server";
import { verifySession } from "@/lib/session.server";
const LANG = {"zh-HK":"Cantonese (粵語)","zh-CN":"Mandarin (普通话)","en-US":"English"};
export const Route = createFileRoute("/api/speech")({server:{handlers:{POST:async({request})=>{
 const input = z.object({text:z.string().trim().min(1).max(300),lang:z.enum(["zh-HK","zh-CN","en-US"]),token:z.string().max(2000).optional()}).safeParse(await request.json().catch(()=>null));
 if(!input.success) return Response.json({message:"Invalid question text."},{status:400});
 if(!await verifySession(input.data.token)) return Response.json({message:"Please log in to read questions aloud."},{status:401});
 const apiKey = process.env.LOVABLE_API_KEY;
 if(!apiKey) return Response.json({message:"Voice is not set up."},{status:401});
 const upstream = await requestSpeech({baseURL:"https://ai.gateway.lovable.dev",apiKey,model:"google/gemini-3.1-flash-tts-preview",format:"gemini",voice:"Kore"},`Read clearly in ${LANG[input.data.lang]}: ${input.data.text}`);
 return new Response(upstream.body,{status:upstream.status,headers:{"Content-Type":upstream.headers.get("content-type") ?? "text/event-stream","Cache-Control":"no-cache"}});
}}}});