import {useState,useRef,useEffect,useMemo} from "react";
import {ShoppingBasket,Apple,BookOpen,Shirt,Check} from "lucide-react";
import {Button} from "@/components/ui/button";
import {AvatarFigure} from "@/components/avatar-figure";
import {getState} from "@/lib/store";
import {resolveLook} from "@/lib/avatar";
import {BASKET_SECONDS,PARALYSIS_SECONDS,basketGoods,basketGoal} from "@/lib/arcade-data";
import {arcadeAnswer} from "@/lib/arcade-record";
import type {ArcadeProps} from "@/lib/arcade";
export function Basket({grade,onComplete}:ArcadeProps){const [remaining,setRemaining]=useState(BASKET_SECONDS);const [paralyzed,setParalyzed]=useState(0);const [batch,setBatch]=useState(0);const [count,setCount]=useState(0);const [wrong,setWrong]=useState(0);const [picked,setPicked]=useState<number[]>([]);const [itemTime,setItemTime]=useState(12);const [avatar]=useState(()=>getState().avatar);const target=grade==="K3"?5:8+(Number(grade.slice(1))||0);const goal=basketGoal(grade);const goods=useMemo(()=>basketGoods(target,batch),[target,batch]);const start=useRef(Date.now());const finished=remaining===0||count>=goal;
 useEffect(()=>{if(finished)return;const timer=setInterval(()=>{setRemaining(r=>Math.max(0,r-1));setParalyzed(p=>Math.max(0,p-1));setItemTime(t=>Math.max(0,t-1))},1000);return()=>clearInterval(timer)},[finished]);
 useEffect(()=>{if(itemTime===0){setBatch(b=>b+1);setPicked([]);setItemTime(12);start.current=Date.now()}},[itemTime]);
 const pick=(i:number)=>{if(paralyzed||finished||picked.includes(i))return;const good=goods[i];const ok=good.value===target;setPicked([...picked,i]);arcadeAnswer("math","equivalent expressions",`${good.text} = ?`,String(good.value),ok,Date.now()-start.current);if(ok)setCount(count+1);else{setWrong(wrong+1);setParalyzed(PARALYSIS_SECONDS)}};
 const icons=[Apple,BookOpen,Shirt,Apple];return <div className="text-center"><div className="flex justify-between font-bold"><span>{remaining}s</span><span>{count}/{goal} collected</span></div><div className={`relative min-h-56 flex justify-center items-center mt-4 ${paralyzed?"animate-pulse":""}`}><AvatarFigure look={resolveLook(avatar)} gender={avatar.gender} size={100}/><div className="absolute bottom-1 left-1/2 bg-card border-2 border-primary p-2 rounded-md"><ShoppingBasket className="size-14 text-forest"/><strong className="text-3xl">{target}</strong></div></div>{paralyzed>0&&<p role="status" className="text-destructive font-bold">Ouch! {paralyzed}s</p>}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">{goods.map((g,i)=>{const Icon=icons[i];return <Button key={`${batch}-${i}`} variant="outline" disabled={paralyzed>0||picked.includes(i)||finished} onClick={()=>pick(i)} className="flex-col h-36 text-lg"><Icon className="size-10 text-forest"/><span>{g.text}</span><span className="text-xs text-muted-foreground">{picked.includes(i)?<Check/>:`${itemTime}s`}</span></Button>})}</div>
 {finished?<Button className="mt-6" onClick={()=>onComplete(count,count+wrong)}>Finish basket</Button>:<Button variant="ghost" className="mt-4" onClick={()=>{setBatch(batch+1);setPicked([]);setItemTime(12)}}>Next goods →</Button>}</div>
}