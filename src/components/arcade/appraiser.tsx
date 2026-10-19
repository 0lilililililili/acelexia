import {useMemo,useRef,useState} from "react";
import {Gem} from "lucide-react";
import {Button} from "@/components/ui/button";
import {APPRAISALS} from "@/lib/arcade-data";
import {arcadeAnswer} from "@/lib/arcade-record";
import type {ArcadeProps} from "@/lib/arcade";
export function Appraiser({onComplete}:ArcadeProps){const [i,setI]=useState(0);const [score,setScore]=useState(0);const [result,setResult]=useState<boolean|null>(null);const [gallery,setGallery]=useState(false);const start=useRef(Date.now());const q=APPRAISALS[i];const choices=useMemo(()=>[q.answer,q.falseWord].sort(()=>Math.random()-.5),[q]);
 const choose=(text:string)=>{if(result!==null)return;const ok=text===q.answer;setResult(ok);if(ok)setScore(score+1);arcadeAnswer("chi","形近字與詞語",`哪件是真品？ ${choices.join(" / ")}`,q.answer,ok,Date.now()-start.current)};
 if(gallery)return <div><h2 className="text-2xl font-bold">鑑賞畫廊 · {score}/8</h2><div className="grid gap-4 mt-6 sm:grid-cols-2">{APPRAISALS.map(a=><article key={a.answer} className="border border-border rounded-md p-4"><h3 className="text-xl font-bold">{a.answer}</h3><p>{a.meaning}</p><p className="text-sm text-muted-foreground">{a.source}</p></article>)}</div><Button className="mt-6" onClick={()=>onComplete(score,8)}>Finish gallery</Button></div>;
 return <div className="text-center"><p className="font-bold">鑑定師 · {i+1}/8</p><h2 className="text-2xl font-bold mt-6">哪件是真品？</h2><div className="grid gap-5 sm:grid-cols-2 mt-8">{choices.map(c=><Button key={c} variant="outline" className="h-48 flex-col text-2xl whitespace-normal" disabled={result!==null} onClick={()=>choose(c)}><Gem className="text-fire size-16"/>{c}</Button>)}</div>{result!==null&&<div className="mt-6" role="status"><p>{result?"正確！":`真品：${q.answer}`}</p><Button className="mt-3" onClick={()=>{if(i===7){setGallery(true);return}setI(i+1);setResult(null);start.current=Date.now()}}>Next →</Button></div>}</div>
}