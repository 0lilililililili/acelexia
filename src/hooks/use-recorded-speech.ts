import {useState,useRef,useEffect} from "react";
import {createParser} from "eventsource-parser";
import {recordWav} from "@/lib/record-wav";
import {getSession} from "@/lib/store";
export function useRecordedSpeech({lang,onResult}:{lang:string;onResult:(text:string)=>void}){
 const [listening,setListening]=useState(false);const [processing,setProcessing]=useState(false);const [error,setError]=useState("");const [transcript,setTranscript]=useState("");
 const recording=useRef<Awaited<ReturnType<typeof recordWav>>|null>(null);const callback=useRef(onResult);callback.current=onResult;const timer=useRef<ReturnType<typeof setTimeout>|null>(null);const mounted=useRef(true);
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;if(timer.current)clearTimeout(timer.current);void recording.current?.stop().catch(()=>{});recording.current=null}},[]);
 const stop=async()=>{if(timer.current)clearTimeout(timer.current);const active=recording.current;recording.current=null;if(!active)return;setListening(false);setProcessing(true);try{
  const file=await active.stop();const data=new FormData();data.append("file",file);data.append("lang",lang);
  const response=await fetch("/api/transcribe",{method:"POST",headers:{Authorization:`Bearer ${getSession()?.token??""}`},body:data});
  if(!response.ok){const b=await response.json().catch(()=>({}));throw new Error(b.message??b.error?.message??`Voice input unavailable (${response.status}).`)}
  const reader=response.body?.getReader();if(!reader)throw new Error("No transcript was received.");let text="";let complete=false;let streamError="";
  const parser=createParser({onEvent:event=>{if(event.data==="[DONE]")return;const b=JSON.parse(event.data);if(b.type==="transcript.text.delta")text+=b.delta??"";if(b.type==="transcript.text.done"){text=b.text??text;complete=true}if(b.type==="error")streamError=b.message??b.error?.message??"Voice input failed."}});const decoder=new TextDecoder();
  while(true){const {value,done}=await reader.read();if(done)break;parser.feed(decoder.decode(value,{stream:true}))}
  if(streamError)throw new Error(streamError);if(!complete||!text.trim())throw new Error("No spoken words were detected. Please record again.");
  if(mounted.current){setTranscript(text);callback.current(text)}
 }catch(e){if(mounted.current)setError(e instanceof Error?e.message:"Voice input failed.")}finally{if(mounted.current)setProcessing(false)}};
 const start=async()=>{if(listening||processing)return;setError("");setTranscript("");try{recording.current=await recordWav();setListening(true);timer.current=setTimeout(()=>void stop(),8000)}catch(e){setError(e instanceof Error?e.message:"Allow microphone access to record.")}};
 return {supported:true,listening,processing,error,transcript,start,stop};
}