import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { GRADES, loadSubmissions, type Grade, type Submission } from "@/lib/input-questions";
import { BackButton } from "@/components/back-button";

export const Route = createFileRoute("/admin/view")({head: () => ({ meta: [{ title: "Test submissions — Acelexia Admin" }, { name: "description", content: "Review submitted assessments by grade and learning cohort." }, { property: "og:title", content: "Test submissions — Acelexia Admin" }, { property: "og:description", content: "Review submitted assessments by grade and learning cohort." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),  component: AdminViewPage });

type SortKey = "time" | "dataId" | "grade" | "dyslexia" | "acc";

function AdminViewPage() {
  const nav = useNavigate();
  const [ok, setOk] = useState(false);
  const [subs, setSubs] = useState<Submission[]>([]);
  const [gradeFilter, setGradeFilter] = useState<Grade | "ALL">("ALL");
  const [dysFilter, setDysFilter] = useState<"ALL" | "yes" | "no" | "unknown">("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("time");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = window.sessionStorage.getItem("wq_admin") === "1";
    if (!flag) { nav({ to: "/login" }); return; }
    setOk(true);
    loadSubmissions().then(setSubs).catch((e) => console.error(e));
  }, [nav]);

  const rows = useMemo(() => {
    const filtered = subs.filter((s) => {
      if (gradeFilter !== "ALL" && s.grade !== gradeFilter) return false;
      if (dysFilter === "yes" && s.dyslexia !== true) return false;
      if (dysFilter === "no" && s.dyslexia !== false) return false;
      if (dysFilter === "unknown" && s.dyslexia !== null) return false;
      return true;
    });
    const withAcc = filtered.map((s) => {
      const total = s.results.length;
      const correct = s.results.filter((r) => r.correct).length;
      return { s, acc: total ? correct / total : 0, correct, total };
    });
    withAcc.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      switch (sortKey) {
        case "time": return (a.s.timestamp - b.s.timestamp) * dir;
        case "dataId": return a.s.dataId.localeCompare(b.s.dataId) * dir;
        case "grade": return a.s.grade.localeCompare(b.s.grade) * dir;
        case "dyslexia": return String(a.s.dyslexia).localeCompare(String(b.s.dyslexia)) * dir;
        case "acc": return (a.acc - b.acc) * dir;
      }
    });
    return withAcc;
  }, [subs, gradeFilter, dysFilter, sortKey, sortDir]);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("desc"); }
  };

  if (!ok) return null;

  return (
    <main className="min-h-screen p-6 bg-background">
      <header className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold">Admin • View submissions</h1>
          <p className="text-sm text-muted-foreground">
            One row per submission. Sort by any column.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link to="/admin" className="rounded-xl bg-card border-2 border-border px-3 py-2 text-sm font-bold">
            ← Stats
          </Link>
          <BackButton className="text-sm text-primary" />
        </div>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold mr-1">Grade:</span>
        {(["ALL", ...GRADES] as const).map((g) => (
          <button
            key={g}
            onClick={() => setGradeFilter(g as any)}
            className={`rounded-xl px-3 py-1 text-sm font-bold border-2 ${gradeFilter === g ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
          >{g}</button>
        ))}
        <span className="text-sm font-semibold ml-4 mr-1">Dyslexia:</span>
        {([
          { k: "ALL", label: "All" },
          { k: "yes", label: "With" },
          { k: "no", label: "Without" },
          { k: "unknown", label: "Unknown" },
        ] as const).map((o) => (
          <button
            key={o.k}
            onClick={() => setDysFilter(o.k)}
            className={`rounded-xl px-3 py-1 text-sm font-bold border-2 ${dysFilter === o.k ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`}
          >{o.label}</button>
        ))}
        <div className="ml-auto text-sm text-muted-foreground">
          {rows.length} submission{rows.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="bg-card border-2 border-border rounded-3xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <SortHead label="Data ID" active={sortKey === "dataId"} dir={sortDir} onClick={() => toggleSort("dataId")} />
              <SortHead label="Datetime" active={sortKey === "time"} dir={sortDir} onClick={() => toggleSort("time")} />
              <SortHead label="Grade" active={sortKey === "grade"} dir={sortDir} onClick={() => toggleSort("grade")} />
              <SortHead label="Dyslexia" active={sortKey === "dyslexia"} dir={sortDir} onClick={() => toggleSort("dyslexia")} />
              <SortHead label="Correct ans rate" active={sortKey === "acc"} dir={sortDir} onClick={() => toggleSort("acc")} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No submissions match these filters.
                </TableCell>
              </TableRow>
            ) : rows.map(({ s, acc, correct, total }) => (
              <TableRow key={`${s.userId}-${s.timestamp}`}>
                <TableCell className="font-mono">{s.dataId}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(s.timestamp).toLocaleString()}
                </TableCell>
                <TableCell className="font-semibold">{s.grade}</TableCell>
                <TableCell>
                  {s.dyslexia === true ? "With" : s.dyslexia === false ? "Without" : "Unknown"}
                </TableCell>
                <TableCell>
                  <span className="font-semibold">{(acc * 100).toFixed(0)}%</span>
                  <span className="text-xs text-muted-foreground ml-2">({correct}/{total})</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

function SortHead({ label, active, dir, onClick }: {
  label: string; active: boolean; dir: "asc" | "desc"; onClick: () => void;
}) {
  return (
    <TableHead>
      <button onClick={onClick} className="font-bold text-foreground inline-flex items-center gap-1">
        {label}
        <span className="text-xs opacity-60">{active ? (dir === "asc" ? "▲" : "▼") : "↕"}</span>
      </button>
    </TableHead>
  );
}
