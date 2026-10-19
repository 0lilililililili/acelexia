import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DailyStat } from "@/lib/store";
import { SUBJECT_LABEL } from "@/lib/subjects";
import { trendRows, SUBJECT_COLORS } from "@/lib/trend-data";
const TOPIC_COLORS = ["var(--color-chart-1)", "var(--color-chart-3)", "var(--color-chart-2)", "var(--color-chart-4)", "var(--color-chart-5)"];
function Chart({daily, subject, metric}: {daily: Record<string, DailyStat>; subject?: string; metric?: "accuracy" | "latency"}) {
 const {rows, entities} = trendRows(daily,subject);
 const metrics = metric ? [metric] : ["accuracy", "latency"];
 return <div className="min-w-0 py-4">
  <h3 className="text-lg font-bold">{subject ? metric === "accuracy" ? "Accuracy by topic" : "Answer time by topic" : "All subjects"}</h3>
  {!rows.length ? <p className="text-muted-foreground mt-2">{subject ? "No topic records yet." : "No answers yet."}</p> :
   <div className="h-80 mt-3"><ResponsiveContainer width="100%" height="100%"><LineChart data={rows} margin={{top:10,right:8,left:-12,bottom:10}}>
    <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3"/>
    <XAxis dataKey="day" tickFormatter={d=>d.slice(5)} tick={{fontSize:11}}/>
    {(!metric || metric === "accuracy") && <YAxis yAxisId="accuracy" domain={[0,100]} unit="%" tick={{fontSize:11}}/>}
    {(!metric || metric === "latency") && <YAxis yAxisId="latency" orientation={!metric ? "right" : "left"} unit="s" tick={{fontSize:11}}/>}
    <Tooltip formatter={(v:number,name:string)=>[`${v}${name.includes("Accuracy") ? "%" : "s"}`,name]}/><Legend wrapperStyle={{fontSize:11}}/>
    {(subject ? entities : ["chi","eng","math"]).flatMap((entity,i)=> metrics.map(m=><Line key={`${entity}:${m}`} yAxisId={m} dataKey={`${entity}:${m}`} name={`${subject ? entity : SUBJECT_LABEL[entity]} — ${m === "accuracy" ? "Accuracy" : "Answer time"}`} stroke={subject ? TOPIC_COLORS[i%TOPIC_COLORS.length] : SUBJECT_COLORS[entity]} strokeWidth={2.5} strokeDasharray={m === "latency" ? "6 4" : undefined} dot={{r:4}} connectNulls={false} isAnimationActive={false}/>))}
   </LineChart></ResponsiveContainer></div>}
 </div>;
}
export function TrendCharts({daily}:{daily:Record<string,DailyStat>}) {
 return <section className="mt-8"><h2 className="text-2xl font-extrabold">Progress over time</h2><Chart daily={daily}/>
  {["chi","eng","math"].map(subject=><section key={subject} className="border-t border-border mt-5 pt-5"><h2 className="text-xl font-bold">{SUBJECT_LABEL[subject]}</h2><div className="grid gap-5 md:grid-cols-2"><Chart daily={daily} subject={subject} metric="accuracy"/><Chart daily={daily} subject={subject} metric="latency"/></div></section>)}
 </section>;
}
