import {useCallback,useEffect,useRef,useState} from "react";
import {Mic,Shield,Swords} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FightingAvatar} from "@/components/fighting-avatar";
import {SpeakButton} from "@/components/speak-button";
import {VOCAL_WORDS} from "@/lib/arcade-data";
import {arcadeAnswer} from "@/lib/arcade-record";
import {useSpeech} from "@/hooks/use-speech";
import {voiceLangFor} from "@/lib/read-aloud";
import {matches as matchesAnswer} from "@/lib/answer-match";
import {WORLD_ART} from "@/lib/world-art";
import type {ArcadeProps} from "@/lib/arcade";
export function VocalArena({lang,grade,onComplete}:ArcadeProps){const [theme,setTheme]=useState<string|null>(null);const [turn,setTurn]=useState(0);const [hp,setHp]=useState(100);const [enemy,setEnemy]=useState(100);const [mode,setMode]=useState<"attack"|"defense"|"critical">("attack");const [result,setResult]=useState<string|null>(null);const [score,setScore]=useState(0);const [typed,setTyped]=useState("");const [seconds,setSeconds]=useState(15);const [striking,setStriking]=useState(false);const [guard,setGuard]=useState(false);const startAt=useRef(Date.now());const answered=useRef(false);const finished=theme!==null&&(turn>=10||hp<=0||enemy<=0);const words=VOCAL_WORDS[theme??"食物"];const base=words[turn%words.length];const word=mode==="defense"?"防守":mode==="critical"?(grade==="K3"||grade==="P1"?base:"一心一意"):base;
 const attempts=useRef(0);
 const check=useCallback((text:string)=>{if(answered.current||finished||!theme)return;answered.current=true;attempts.current++;const ok=matchesAnswer(text,word);arcadeAnswer("chi",mode==="critical"?"成語":`讀音·${theme}`,word,word,ok,Date.now()-startAt.current);if(ok)setScore(s=>s+1);
  if(mode==="defense"){if(!ok)setHp(h=>Math.max(0,h-18));setResult(ok?"防守成功！":"防守失敗！ −18 HP")}
  else {if(ok){const damage=mode==="critical"?24:guard?5:12;setEnemy(h=>Math.max(0,h-damage));setStriking(true);setResult(`命中！ −${damage} HP`)}else setResult("招式未能使出！"); if(!guard)setHp(h=>Math.max(0,h-8))}
 },[word,finished,theme,mode,guard]);
 const speech=useSpeech({lang:voiceLangFor("chi",lang),onResult:check});
 useEffect(()=>{if(!theme||finished||result)return;const timer=setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000);return()=>clearInterval(timer)},[theme,finished,result]);
 useEffect(()=>{if(seconds===0&&!result)check("")},[seconds,result,check]);
 const next=()=>{const defend=Math.random()<(enemy<35?.65:.25);setGuard(defend);setMode(Math.random()<.2?"critical":!defend&&Math.random()<.4?"defense":"attack");setTurn(t=>t+1);setResult(null);setStriking(false);setTyped("");setSeconds(15);answered.current=false;startAt.current=Date.now()};
 if(!theme)return <div><h2 className="text-2xl font-bold">擂台 · 選擇主題</h2><div className="grid grid-cols-2 gap-4 mt-6">{Object.keys(VOCAL_WORDS).map(t=><Button key={t} className="h-24 text-2xl" variant="outline" onClick={()=>{setTheme(t);startAt.current=Date.now()}}>{t}</Button>)}</div></div>;
 return <div><div className="flex justify-between font-bold"><span>{theme} · {Math.min(turn+1,10)}/10</span><span>{seconds}s</span></div><div className="grid grid-cols-2 gap-6 mt-4"><div><p>You · {hp} HP</p><progress className="w-full accent-primary" value={hp} max={100}/></div><div><p>Opponent · {enemy} HP</p><progress className="w-full accent-destructive" value={enemy} max={100}/></div></div><div className="relative min-h-64 mt-5 bg-secondary/30 rounded-md"><FightingAvatar striking={striking}/><img src={WORLD_ART.fire.boss} alt="Arena opponent" className={`absolute right-8 bottom-6 w-36 ${guard?"opacity-60":"animate-pop"}`}/>{guard&&<Shield className="absolute right-4 top-4 text-primary"/>}</div>
 {finished?<div className="text-center mt-6"><h2 className="text-2xl font-bold">{enemy<=0||enemy<hp?"勝利！":"比賽結束"}</h2><Button className="mt-4" onClick={()=>onComplete(score,attempts.current)}>Finish match</Button></div>:<div className="text-center mt-6"><p className="font-bold flex justify-center gap-2">{mode==="defense"?<Shield/>:<Swords/>}{mode==="defense"?"防守！":mode==="critical"?"大技！":"出招！"}</p><div className="flex justify-center items-center gap-4 mt-3"><h2 className="text-4xl font-bold">{word}</h2><SpeakButton text={word} subject="chi" lang={lang}/></div>{result?<><p role="status" className="mt-4 font-bold">{result}</p><Button onClick={next} className="mt-4">Next move →</Button></>:speech.supported?<Button aria-label="Speak arena word" size="icon" className="size-20 rounded-full mt-5" disabled={speech.listening} onClick={speech.start}><Mic className="size-9"/></Button>:<form className="flex justify-center gap-3 mt-5" onSubmit={e=>{e.preventDefault();check(typed)}}><input aria-label="Arena word" className="min-w-0 w-36 border border-border rounded-md px-3" value={typed} onChange={e=>setTyped(e.target.value)}/><Button type="submit">Check</Button></form>}</div>}
 </div>
}