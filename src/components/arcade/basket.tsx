import {useState,useRef,useEffect} from "react";
import {ShoppingBasket} from "lucide-react";
import {Button} from "@/components/ui/button";
import {AvatarFigure} from "@/components/avatar-figure";
import {getState} from "@/lib/store";
import {resolveLook} from "@/lib/avatar";
import {BASKET_SECONDS,PARALYSIS_SECONDS,nextBasketGood,basketGoal} from "@/lib/arcade-data";
import counter from "@/assets/market-counter.jpg";
import {arcadeAnswer} from "@/lib/arcade-record";
import type {ArcadeProps} from "@/lib/arcade";
import {BASKET_REPLACEMENT_MS} from "@/lib/basket-timing";
export function Basket({grade,onComplete}:ArcadeProps){
 const [remaining,setRemaining]=useState(BASKET_SECONDS);const [paralyzed,setParalyzed]=useState(0);const [count,setCount]=useState(0);const [wrong,setWrong]=useState(0);const [avatar]=useState(()=>getState().avatar);
 const target=grade==="K3"?5:8+(Number(grade.slice(1))||0);const goal=basketGoal(grade);const seen=useRef(new Set<string>());const serial=useRef(0);
 const createGood=()=>{const g=nextBasketGood(target,serial.current++,seen.current,grade);seen.current.add(g.text);return {...g,started:Date.now()}};
 const [goods,setGoods]=useState<({text:string;value:number;started:number}|null)[]>(()=>Array.from({length:8},createGood));const finished=remaining===0||count>=goal;
 const replacements=useRef<ReturnType<typeof setTimeout>[]>([]);
 useEffect(()=>()=>{replacements.current.forEach(clearTimeout)},[]);
 useEffect(()=>{if(finished)return;const timer=setInterval(()=>{setRemaining(r=>Math.max(0,r-1));setParalyzed(p=>Math.max(0,p-1))},1000);return()=>clearInterval(timer)},[finished]);
 const pick=(i:number)=>{if(paralyzed||finished)return;const good=goods[i];if(!good)return;const ok=good.value===target;arcadeAnswer("math","equivalent expressions",`${good.text} = ${target}: yes or no?`,good.value===target?"yes":"no",ok,Date.now()-good.started);if(ok)setCount(c=>c+1);else{setWrong(w=>w+1);setParalyzed(PARALYSIS_SECONDS)}setGoods(g=>g.map((item,j)=>i===j?null:item));replacements.current.push(setTimeout(()=>{const replacement=createGood();setGoods(g=>g.map((item,j)=>i===j?replacement:item))},BASKET_REPLACEMENT_MS))};
 return <section className="text-center"><div className="flex justify-between font-bold"><span>{remaining}s</span><span>{count}/{goal} collected</span></div><h2 className="text-xl font-bold my-3">Collect expressions equal to {target}</h2><div className="basket-layout"><div className="basket-counter"><img src={counter} alt="Supermarket counter" width={1536} height={768} className="absolute inset-0 w-full h-full object-cover"/><div className="absolute bottom-0 left-1/2 -translate-x-1/2"><AvatarFigure look={resolveLook(avatar)} gender={avatar.gender} size={90}/><div className="absolute bottom-4 left-8 flex gap-1 items-center bg-card border-2 border-forest rounded-md px-2"><ShoppingBasket className="size-9 text-forest"/><strong className="text-2xl">{target}</strong></div></div></div><div className="basket-cupboards" aria-label="Eight cupboard choices">{goods.map((g,i)=><Button key={i} variant="outline" disabled={!g||paralyzed>0||finished} aria-label={g?`Collect ${g.text}`:`Restocking cupboard ${i+1}`} onClick={()=>pick(i)} className="basket-cupboard h-full flex-col text-base sm:text-xl whitespace-normal px-1"><ShoppingBasket className="size-8 text-forest mb-2"/><span>{g?.text??"…"}</span></Button>)}</div></div><p role="status" className="h-8 mt-2 font-bold text-destructive">{paralyzed>0?`Ouch! ${paralyzed}s`:""}</p>{finished&&<Button onClick={()=>onComplete(count,Math.max(goal,count+wrong))}>Finish basket</Button>}</section>
}