import {createFileRoute,Link,notFound} from "@tanstack/react-router";
import {useEffect,useState} from "react";
import {Star,RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ARCADE_GAMES} from "@/lib/arcade";
import {getState,getSession,addStars,DEFAULT_SETTINGS} from "@/lib/store";
import {CharacterBuilder} from "@/components/arcade/character-builder";
import {Appraiser} from "@/components/arcade/appraiser";
import {VocalArena} from "@/components/arcade/vocal-arena";
import {WordFamily} from "@/components/arcade/word-family";
import {TypoDetective} from "@/components/arcade/typo-detective";
import {Basket} from "@/components/arcade/basket";
import {Bakery} from "@/components/arcade/bakery";
import {WORLD_ART} from "@/lib/world-art";
const COMPONENTS={"character-builder":CharacterBuilder,"vocal-arena":VocalArena,"appraiser":Appraiser,"typo-detective":TypoDetective,"word-family":WordFamily,"basket":Basket,"bakery":Bakery};
export const Route=createFileRoute("/arcade/$game")({
 beforeLoad:({params})=>{if(!ARCADE_GAMES.some(g=>g.id===params.game))throw notFound()},
 head:({params})=>{const name=ARCADE_GAMES.find(g=>g.id===params.game)?.name??"Arcade";return {meta:[{title:`${name} — Acelexia`},{name:"description",content:`Play ${name}, a freely replayable learning adventure in Acelexia.`},{property:"og:title",content:`${name} — Acelexia`},{property:"og:description",content:"Grade-aware practice in the Acelexia arcade."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"}]};},component:ArcadePage
});
function ArcadePage(){const {game}=Route.useParams();const def=ARCADE_GAMES.find(g=>g.id===game);const [ready,setReady]=useState(false);const [loggedIn,setLoggedIn]=useState(false);const [grade,setGrade]=useState("P3");const [lang,setLang]=useState(DEFAULT_SETTINGS.language);const [round,setRound]=useState(0);const [result,setResult]=useState<{correct:number;total:number;stars:number}|null>(null);
 useEffect(()=>{const s=getState();setGrade(s.grade??"P3");setLang(s.settings.language);setLoggedIn(!!getSession()?.token);setReady(true);setResult(null)},[game]);
 if(!def)return null;const Game=COMPONENTS[def.id as keyof typeof COMPONENTS];const art=WORLD_ART[def.world];
 const complete=(correct:number,total:number)=>{if(result)return;const stars=correct>0?1:0; if(stars)addStars(def.subject==="chi"?"red":def.subject==="eng"?"blue":"green",stars);setResult({correct,total,stars})};
 return <main className="min-h-screen relative px-4 py-7"><img src={art.bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"/><div className="relative max-w-4xl mx-auto"><Button asChild variant="link" className="px-0"><Link to="/world/$world" params={{world:def.world}}>← Back to town</Link></Button><header className="mt-4 mb-8"><h1 className="text-3xl font-bold">{def.name}</h1><p className="text-muted-foreground">{grade}</p></header>
 {!ready?<p>Loading…</p>:!loggedIn?<Button asChild><Link to="/login">Log in to play</Link></Button>:result?<section className="text-center py-12"><Star className="size-20 text-sun fill-current mx-auto"/><h2 className="text-3xl font-bold mt-5">Round complete</h2><p className="text-xl mt-3">{result.correct}/{result.total} correct · +{result.stars} themed star</p><div className="flex flex-wrap justify-center gap-4 mt-8"><Button onClick={()=>{setResult(null);setRound(r=>r+1)}}><RotateCcw/>Play again</Button><Button asChild variant="outline"><Link to="/revision">Revision bank</Link></Button></div></section>:<Game key={`${game}-${round}`} grade={grade} lang={lang} onComplete={complete}/>}
 </div></main>
}