import {createFileRoute,Link,notFound} from "@tanstack/react-router";
import {useEffect,useState} from "react";
import {Star,RotateCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ARCADE_GAMES} from "@/lib/arcade";
import {getState,getSession,addStars,flushProgress,DEFAULT_SETTINGS} from "@/lib/store";
import {CharacterBuilder} from "@/components/arcade/character-builder";
import {Appraiser} from "@/components/arcade/appraiser";
import {VocalArena} from "@/components/arcade/vocal-arena";
import {WordFamily} from "@/components/arcade/word-family";
import {TypoDetective} from "@/components/arcade/typo-detective";
import {Basket} from "@/components/arcade/basket";
import {Bakery} from "@/components/arcade/bakery";
import {WORLD_ART} from "@/lib/world-art";
import {arcadeStars} from "@/lib/arcade-rewards";
const COMPONENTS={"character-builder":CharacterBuilder,"vocal-arena":VocalArena,"appraiser":Appraiser,"typo-detective":TypoDetective,"word-family":WordFamily,"basket":Basket,"bakery":Bakery};
export const Route=createFileRoute("/arcade/$game")({
 beforeLoad:({params})=>{if(!ARCADE_GAMES.some(g=>g.id===params.game))throw notFound()},
 head:({params})=>{const name=ARCADE_GAMES.find(g=>g.id===params.game)?.name??"Arcade";return {meta:[{title:`${name} — Acelexia`},{name:"description",content:`Play ${name}, a freely replayable learning adventure in Acelexia.`},{property:"og:title",content:`${name} — Acelexia`},{property:"og:description",content:"Grade-aware practice in the Acelexia arcade."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"}]};},component:ArcadePage
});
function ArcadePage(){const {game}=Route.useParams();const def=ARCADE_GAMES.find(g=>g.id===game);const [ready,setReady]=useState(false);const [loggedIn,setLoggedIn]=useState(false);const [grade,setGrade]=useState("P3");const [lang,setLang]=useState(DEFAULT_SETTINGS.language);const [aids,setAids]=useState({readingScaffold:DEFAULT_SETTINGS.readingScaffold,soundHelp:DEFAULT_SETTINGS.soundHelp});const [round,setRound]=useState(0);const [saving,setSaving]=useState(false);const [saveError,setSaveError]=useState(false);const [result,setResult]=useState<{correct:number;total:number;stars:number}|null>(null);
 useEffect(()=>{const s=getState();setGrade(s.grade??"P3");setLang(s.settings.language);setAids({readingScaffold:s.settings.readingScaffold,soundHelp:s.settings.soundHelp});setLoggedIn(!!getSession()?.token);setReady(true);setResult(null)},[game]);
 if(!def)return null;const Game=COMPONENTS[def.id as keyof typeof COMPONENTS];const art=WORLD_ART[def.world];
 const complete=async(correct:number,total:number)=>{if(result||saving)return;setSaving(true);const stars=arcadeStars(correct,total); if(stars)addStars(def.subject==="chi"?"red":def.subject==="eng"?"blue":"green",stars);setResult({correct,total,stars});try{await flushProgress();setSaveError(false)}catch{setSaveError(true)}finally{setSaving(false)}};
 return <main className="min-h-screen relative px-4 py-7"><img src={art.bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"/><div className="relative max-w-4xl mx-auto"><Button asChild variant="link" className="px-0"><Link to="/world/$world" params={{world:def.world}}>← Back to town</Link></Button><header className="mt-4 mb-8"><h1 className="text-3xl font-bold">{def.name}</h1><p className="text-muted-foreground">{grade}</p></header>
 {!ready?<p>Loading…</p>:!loggedIn?<Button asChild><Link to="/login">Log in to play</Link></Button>:result?<section className="text-center py-12"><div className="flex justify-center gap-2">{[1,2,3].map(n=><Star key={n} className={`size-16 ${n>result.stars?"text-muted-foreground":def.subject==="chi"?"text-fire fill-current":def.subject==="eng"?"text-primary fill-current":"text-forest fill-current"}`}/>)}</div><h2 className="text-3xl font-bold mt-5">Round complete</h2><p className="text-xl mt-3">{result.correct}/{result.total} correct · +{result.stars} themed star{result.stars===1?"":"s"}</p>{saving&&<p role="status">Saving your stars…</p>}{saveError&&<Button variant="outline" onClick={async()=>{try{await flushProgress();setSaveError(false)}catch{setSaveError(true)}}}>Save again</Button>}<div className="flex flex-wrap justify-center gap-4 mt-8"><Button disabled={saving} onClick={()=>{setResult(null);setRound(r=>r+1)}}><RotateCcw/>Play again</Button><Button asChild variant="outline"><Link to="/revision">Revision bank</Link></Button></div></section>:<Game key={`${game}-${round}`} grade={grade} lang={lang} readingScaffold={aids.readingScaffold} soundHelp={aids.soundHelp} onComplete={complete}/>}
 </div></main>
}