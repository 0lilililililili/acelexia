import {useState,useRef,useMemo} from "react";
import {Button} from "@/components/ui/button";
import sceneArt from "@/assets/english-scenes.jpg";
import {ENGLISH_BANKS} from "@/lib/english-banks";
import {shuffled} from "@/lib/shuffle";
import {arcadeAnswer} from "@/lib/arcade-record";
import type {ArcadeProps} from "@/lib/arcade";
export function TypoDetective({grade,onComplete}:ArcadeProps){
 const round=useMemo(()=>shuffled(ENGLISH_BANKS[grade]?.typos??ENGLISH_BANKS.P3.typos).slice(0,5),[grade]);const [index,setIndex]=useState(0);const [active,setActive]=useState(false);const [result,setResult]=useState<boolean|null>(null);const [score,setScore]=useState(0);const [notice,setNotice]=useState("");const start=useRef(Date.now());const q=round[index];const choices=useMemo(()=>shuffled(q.choices),[q]);
 const correct=(word:string)=>{if(result!==null)return;const ok=word===q.good;arcadeAnswer("eng","spelling",q.sentence,q.good,ok,Date.now()-start.current);if(ok)setScore(s=>s+1);setResult(ok);setNotice(ok?"Scene restored!":`The spelling is ${q.good}.`)};
 const next=()=>{if(index===round.length-1){onComplete(score,round.length);return}setIndex(i=>i+1);setActive(false);setResult(null);setNotice("");start.current=Date.now()};
 return <section><h2 className="text-2xl font-bold">Typo Scene Detective · {index+1}/5</h2><div className={`english-scene scene-${q.scene} mt-4 rounded-md`}><img src={sceneArt} alt={`Illustrated ${q.scene} story scene`} width={1536} height={1536}/></div><h3 className="text-xl font-bold mt-5">Which word is spelt incorrectly?</h3><div className="flex flex-wrap gap-1 mt-3">{q.sentence.split(" ").map((w,j)=><Button key={j} variant="ghost" disabled={result!==null} onClick={()=>{if(w.replace(/[.,!?]/g,"")===q.bad){setActive(true);setNotice("")}else setNotice("Look carefully at the spelling.")}} className="text-xl px-2">{result===true&&w.replace(/[.,!?]/g,"")===q.bad?w.replace(q.bad,q.good):w}</Button>)}</div>{active&&result===null&&<div className="mt-5"><h3 className="font-bold mb-3">Which spelling fits the picture?</h3><div className="flex flex-wrap gap-3">{choices.map(c=><Button key={c} variant="outline" onClick={()=>correct(c)}>{c}</Button>)}</div></div>}<p role="status" className="mt-4 font-bold text-primary">{notice}</p>{result!==null&&<Button className="mt-4" onClick={next}>{index===4?"Finish story":"Next scene →"}</Button>}</section>
}