import {shuffled} from "@/lib/shuffle";
import {useMemo,useRef,useState} from "react";
import {Button} from "@/components/ui/button";
import {SpeakButton} from "@/components/speak-button";
import {builderRound} from "@/lib/arcade-data";
import {arcadeAnswer} from "@/lib/arcade-record";
import type {ArcadeProps} from "@/lib/arcade";
import {characterLayout} from "@/lib/character-layout";
export function CharacterBuilder({grade,lang,onComplete}:ArcadeProps){
 const round=useMemo(()=>builderRound(grade),[grade]); const [index,setIndex]=useState(0);const [slots,setSlots]=useState<string[]>([]);const [result,setResult]=useState<boolean|null>(null);const [score,setScore]=useState(0);const start=useRef(Date.now());
 const q=round[index];const layout=characterLayout(q.word);const options=useMemo(()=>shuffled([...q.parts,...q.distractors].map((text,id)=>({text,id}))),[q]);const [used,setUsed]=useState<number[]>([]);
 const [activeSlot,setActiveSlot]=useState<number|null>(null);
 const place=(text:string,id:number,slot?:number)=>{if(result!==null||used.includes(id))return;const index=slot??activeSlot??q.parts.findIndex((_,i)=>!slots[i]);if(index<0||slots[index])return;const next=[...slots];next[index]=text;setSlots(next);setUsed([...used,id]);setActiveSlot(null)};
 const check=()=>{const ok=slots.join("|")===q.parts.join("|");setResult(ok);if(ok)setScore(score+1);arcadeAnswer("chi","字形結構",`組合「${q.word}」`,q.parts.join(" + "),ok,Date.now()-start.current)};
 const next=()=>{if(index+1>=round.length){onComplete(score,round.length);return}setIndex(index+1);setSlots([]);setUsed([]);setActiveSlot(null);setResult(null);start.current=Date.now()};
 return <section className="text-center"><div className="flex justify-between font-bold"><span>Restaurant · {index+1}/{round.length}</span><span>{grade} · Difficulty {q.difficulty}</span></div><div className="flex justify-center items-center gap-3 mt-6"><h2 className="text-5xl font-bold">{q.word}</h2><SpeakButton text={q.hint} subject="chi" lang={lang}/></div>
  <div className="character-structure" style={{gridTemplateRows:`repeat(${layout.rows},minmax(0,1fr))`,gridTemplateColumns:`repeat(${layout.cols},minmax(0,1fr))`}} aria-label={`Character plate ${q.word}`} >{layout.parts.map((p,i)=><Button key={i} style={{gridRow:`${p.row} / span ${p.rowSpan}`,gridColumn:`${p.col} / span ${p.colSpan}`}} variant="outline" disabled={result!==null||!!slots[i]} aria-label={`Component position ${i+1}, row ${p.row}, column ${p.col}`} onClick={()=>setActiveSlot(i)} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const id=Number(e.dataTransfer.getData("text/plain"));const option=options.find(o=>o.id===id);if(option)place(option.text,id,i)}} className={`border-2 border-dashed border-primary ${activeSlot===i?"ring-4 ring-primary":""}`}>{slots[i]??"?"}</Button>)}</div>
  <div className="flex flex-wrap justify-center gap-3">{options.map(o=><Button key={o.id} draggable disabled={used.includes(o.id)||result!==null} onDragStart={e=>e.dataTransfer.setData("text/plain",String(o.id))} onClick={()=>place(o.text,o.id)} variant="outline" className="w-20 h-20 text-3xl">{o.text}</Button>)}</div>
  {result!==null?<div role="status" className="mt-6"><p className={result?"text-forest":"text-destructive"}>{result?"Correct!":`正確組合：${q.parts.join(" + ")}`}</p><Button onClick={next} className="mt-4">Next →</Button></div>:<div className="flex justify-center gap-3 mt-6"><Button variant="outline" onClick={()=>{setSlots([]);setUsed([]);setActiveSlot(null)}}>Reset plate</Button><Button disabled={q.parts.some((_,i)=>!slots[i])} onClick={check}>Check character</Button></div>}
 </section>
}