import {createFileRoute} from "@tanstack/react-router";
import {verifySession} from "@/lib/session.server";
import {transcribe} from "@/lib/transcription-request.server";
export const Route=createFileRoute("/api/transcribe")({server:{handlers:{POST:async({request})=>{
 const token=request.headers.get("Authorization")?.replace(/^Bearer /,"");
 const session=await verifySession(token);
 if(!session)return Response.json({message:"Please log in to use voice input."},{status:401});
 const limit=2*1024*1024;
 if(Number(request.headers.get("content-length"))>limit)return Response.json({message:"Recording is too large."},{status:413});
 const reader=request.body?.getReader();if(!reader)return Response.json({message:"No recording received."},{status:400});
 const chunks:Uint8Array[]=[];let bytes=0;
 while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>limit){await reader.cancel();return Response.json({message:"Recording is too large."},{status:413})}chunks.push(value)}
 const data=await new Response(new Blob(chunks as BlobPart[]),{headers:{"Content-Type":request.headers.get("content-type")??""}}).formData().catch(()=>null);
 const file=data?.get("file");const lang=data?.get("lang");
 if(!(file instanceof File)||file.size<2048||file.type!=="audio/wav"||!['zh-HK','zh-CN','en-US'].includes(String(lang)))return Response.json({message:"Please record a complete spoken answer."},{status:400});
 const {supabaseAdmin}=await import("@/integrations/supabase/client.server");
 const {data:progress}=await supabaseAdmin.from("progress").select("settings").eq("user_id",session.sub).maybeSingle();
 const settings=(progress?.settings??{}) as Record<string,unknown>;
 if(typeof settings.voiceDenied==="string")return Response.json({message:settings.voiceDenied},{status:403});
 const key=process.env.LOVABLE_API_KEY;if(!key)return Response.json({message:"Voice input is not configured."},{status:401});
 const upstream=await transcribe({baseURL:"https://ai.gateway.lovable.dev",apiKey:key,model:"openai/gpt-transcribe",maxFileBytes:limit,audioOnly:true},file,{language:lang==="en-US"?"en":"zh",signal:request.signal});
 if(upstream.status===403){const body=await upstream.clone().json().catch(()=>({}));const message=body.message??body.error?.message??"Voice input access is unavailable.";await supabaseAdmin.from("progress").update({settings:{...settings,voiceDenied:message} as never}).eq("user_id",session.sub)}
 return new Response(upstream.body,{status:upstream.status,headers:{"Content-Type":upstream.headers.get("content-type")??"text/event-stream","Cache-Control":"no-cache"}});
}}}});