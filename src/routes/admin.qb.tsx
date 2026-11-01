import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listQuestionBanks } from "@/lib/admin-banks.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, RefreshCw, Search } from "lucide-react";

export const Route = createFileRoute("/admin/qb")({
  head: () => ({ meta: [{ title: "Question Banks — Acelexia Admin" }, { name: "description", content: "Review Acelexia assessment and arcade question banks by grade and subject." }, { property: "og:title", content: "Question Banks — Acelexia Admin" }, { property: "og:description", content: "Admin review of prepared Acelexia practice questions." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] }),
  component: QuestionBanks,
});
type Row = Awaited<ReturnType<typeof listQuestionBanks>>["rows"][number];
function QuestionBanks() {
  const fetchBanks = useServerFn(listQuestionBanks);
  const [rows, setRows] = useState<Row[]>([]);
  const [status, setStatus] = useState("Loading question banks…");
  const [loading, setLoading] = useState(true);
  const [bank, setBank] = useState("All"); const [grade, setGrade] = useState("All"); const [subject, setSubject] = useState("All"); const [search, setSearch] = useState(""); const [page, setPage] = useState(0);
  const load = async () => { const token = window.sessionStorage.getItem("wq_admin_token"); if (!token) { setStatus("Sign in as admin to view question banks."); setLoading(false); return; } setLoading(true); try { const result = await fetchBanks({ data: { adminToken: token } }); setRows(result.rows); setStatus(""); } catch { setRows([]); setStatus("Could not load question banks. Please sign in as admin again."); } finally { setLoading(false); } };
  useEffect(() => { void load(); }, []);
  const filtered = useMemo(() => rows.filter(q => (bank === "All" || q.bank === bank) && (grade === "All" || q.grade === grade) && (subject === "All" || q.subject === subject) && `${q.prompt} ${q.answer} ${q.topic}`.toLowerCase().includes(search.toLowerCase())), [rows, bank, grade, subject, search]);
  useEffect(() => setPage(0), [bank, grade, subject, search]);
  return <main className="min-h-screen p-4 sm:p-8 max-w-6xl mx-auto"><header className="flex flex-wrap justify-between gap-4 items-center"><div><h1 className="text-3xl font-bold">Question banks</h1><p className="text-muted-foreground">{rows.length} prepared questions · Read only</p></div><div className="flex gap-2"><Button asChild variant="outline"><Link to="/admin"><ArrowLeft />Back</Link></Button><Button size="icon" variant="outline" aria-label="Refresh question banks" disabled={loading} onClick={() => void load()}><RefreshCw /></Button></div></header>
    {status && <p role="status" className="mt-6">{status}</p>}{!rows.length && !loading && <Button asChild className="mt-4"><Link to="/login">Admin sign in</Link></Button>}
    {rows.length > 0 && <><div className="grid sm:grid-cols-4 gap-3 my-6">{[{ label: "Bank", value: bank, change: setBank, options: [...new Set(rows.map(q => q.bank))] }, { label: "Grade", value: grade, change: setGrade, options: ["K3","P1","P2","P3","P4","P5","P6","Shared"] }, { label: "Subject", value: subject, change: setSubject, options: ["chi","eng","math"] }].map(f => <label key={f.label} className="text-sm font-bold">{f.label}<select aria-label={f.label} value={f.value} onChange={e => f.change(e.target.value)} className="block w-full mt-1 min-h-11 border border-input bg-background rounded-md px-3"><option>All</option>{f.options.map(v => <option key={v}>{v}</option>)}</select></label>)}<label className="text-sm font-bold">Search<div className="relative mt-1"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><Input aria-label="Search questions" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 min-h-11" /></div></label></div>
      <p className="text-sm text-muted-foreground mb-4">Tower questions and new Word Family requests are generated during play, not stored in a permanent bank. Basket expressions are generated from arithmetic rules.</p><p className="font-bold mb-4">{filtered.length} matching questions</p><div className="space-y-3">{filtered.slice(page*30, page*30+30).map((q,i) => <article key={`${page}-${i}`} className="border border-border rounded-lg p-4 bg-card"><p className="text-xs text-muted-foreground">{q.bank} · {q.grade} · {q.subject.toUpperCase()} · {q.topic}</p><h2 className="text-lg font-bold mt-2 break-words">{q.prompt}</h2><p className="mt-2 text-forest font-bold break-words">Answer: {q.answer}</p>{q.choices.length > 0 && <p className="text-sm mt-2 break-words">Choices: {q.choices.join(" / ")}</p>}{q.detail && <details className="mt-2 text-sm"><summary>Details</summary><p className="whitespace-pre-wrap break-words mt-2">{q.detail}</p></details>}</article>)}</div><div className="flex justify-between items-center mt-6 gap-3"><Button variant="outline" disabled={!page} onClick={() => setPage(p => p-1)}>Previous</Button><span>{page+1} / {Math.max(1,Math.ceil(filtered.length/30))}</span><Button variant="outline" disabled={(page+1)*30>=filtered.length} onClick={() => setPage(p => p+1)}>Next</Button></div></>}
  </main>;
}