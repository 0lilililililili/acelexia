import {shuffled} from "@/lib/shuffle";
import {useMemo,useRef,useState} from "react";
import {Gem} from "lucide-react";
import {Button} from "@/components/ui/button";
import {APPRAISALS} from "@/lib/arcade-data";
import {arcadeAnswer} from "@/lib/arcade-record";
import type {ArcadeProps} from "@/lib/arcade";
import counter from "@/assets/appraiser-counter.jpg";
import happy from "@/assets/appraiser-correct.jpg";
import concerned from "@/assets/appraiser-wrong.jpg";
export function Appraiser({onComplete}:ArcadeProps){const [i,setI]=useState(0);const [score,setScore]=useState(0);const [result,setResult]=useState<boolean|null>(null);const [gallery,setGallery]=useState(false);const start=useRef(Date.now());const q=APPRAISALS[i];const choices=useMemo(()=>shuffled([q.answer,q.falseWord]),[q]);
 const choose=(text:string)=>{if(result!==null)return;const ok=text===q.answer;setResult(ok);if(ok)setScore(score+1);arcadeAnswer("chi","形近字與詞語",`哪件是真品？ ${choices.join(" / ")}`,q.answer,ok,Date.now()-start.current)};
 if(gallery)return <div><h2 className="text-2xl font-bold">鑑賞畫廊 · {score}/8</h2><div className="grid gap-4 mt-6 sm:grid-cols-2">{APPRAISALS.map(a=><article key={a.answer} className="border border-border rounded-md p-4"><h3 className="text-xl font-bold">{a.answer}</h3><p>{a.meaning}</p><p className="text-sm text-muted-foreground">{a.source}</p></article>)}</div><Button className="mt-6" onClick={()=>onComplete(score,8)}>Finish gallery</Button></div>;
 return <div className="text-center"><p className="font-bold">鑑定師 · {i+1}/8</p><div className="relative mt-4"><img key={`${i}-${result}`} src={result===null?counter:result?happy:concerned} alt={result===null?"老鑑定師在古玩櫃台等候":result?"老鑑定師微笑並豎起拇指":"老鑑定師溫柔地提醒你再看清楚"} width={1536} height={1024} className={`w-full rounded-md ${result!==null?"appraiser-reaction":""}`}/><div className="absolute inset-x-0 bottom-3 grid grid-cols-2 gap-3 px-4 sm:px-10">{choices.map(c=><Button key={c} variant="outline" className="h-20 sm:h-28 flex-col text-lg sm:text-2xl whitespace-normal border-4 border-sun bg-card/95" disabled={result!==null} onClick={()=>choose(c)}><Gem className="text-fire size-7"/>{c}</Button>)}</div></div><h2 className="text-2xl font-bold mt-4">哪件是真品？</h2>{result!==null&&<div className="mt-3" role="status"><p>{result?"正確！慧眼識真品！":`再看看字形，真品是：${q.answer}`}</p><Button className="mt-3" onClick={()=>{if(i===7){setGallery(true);return}setI(i+1);setResult(null);start.current=Date.now()}}>Next →</Button></div>}</div>
}