import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Trash2, Heading, Type, ImageIcon, Save } from "lucide-react";
import { getAboutBlocks, saveAboutBlocks, type AboutBlock } from "@/lib/about.functions";
import { DEFAULT_ABOUT } from "@/lib/about-defaults";
import { AboutView } from "@/components/about-view";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/about")({
  head: () => ({ meta: [{ title: "Edit About page — Acelexia" }, { name: "robots", content: "noindex" }] }),
  component: AdminAbout,
});

/** Shrinks a picture to max 900px wide and returns a JPEG data URL. */
function toDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 900 / img.width);
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", 0.8));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function AdminAbout() {
  const nav = useNavigate();
  const [blocks, setBlocks] = useState<AboutBlock[] | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem("wq_admin") !== "1") { nav({ to: "/login" }); return; }
    getAboutBlocks().then((r) => setBlocks(r.blocks.length ? r.blocks : DEFAULT_ABOUT)).catch(() => setBlocks(DEFAULT_ABOUT));
  }, [nav]);

  if (!blocks) return null;
  const upd = (i: number, patch: Partial<AboutBlock>) => setBlocks(blocks.map((b, j) => (j === i ? { ...b, ...patch } : b)));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= blocks.length) return;
    const n = [...blocks];
    [n[i], n[j]] = [n[j], n[i]];
    setBlocks(n);
  };
  const save = async () => {
    setMsg("Saving…");
    try {
      await saveAboutBlocks({ data: { adminPassword: window.sessionStorage.getItem("wq_admin_pw") ?? "", blocks } });
      setMsg("Saved.");
    } catch {
      setMsg("Save failed — log in again as admin.");
    }
  };

  return (
    <main className="min-h-screen p-6 bg-background">
      <Link to="/admin" className="text-primary font-semibold">← Admin</Link>
      <div className="flex items-center gap-3 mt-2 flex-wrap">
        <h1 className="text-3xl font-extrabold">Edit About page</h1>
        <Button onClick={save}><Save aria-hidden /> Save</Button>
        <span className="font-bold text-primary">{msg}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <section className="space-y-3">
          {blocks.map((b, i) => (
            <div key={i} className="bg-card border-2 border-border rounded-2xl p-3">
              <div className="flex items-center gap-2 text-sm font-bold">
                <span className="uppercase">{b.kind}</span>
                <span className="ml-auto" />
                <Button size="icon" variant="ghost" onClick={() => move(i, -1)} aria-label="Move up"><ArrowUp /></Button>
                <Button size="icon" variant="ghost" onClick={() => move(i, 1)} aria-label="Move down"><ArrowDown /></Button>
                <Button size="icon" variant="ghost" onClick={() => setBlocks(blocks.filter((_, j) => j !== i))} aria-label="Delete"><Trash2 /></Button>
              </div>
              {b.kind === "image" && (
                <div className="mt-2 space-y-2">
                  {b.image_url && <img src={b.image_url} alt="" className="max-h-32 rounded-lg" />}
                  <input type="file" accept="image/*" onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (f) upd(i, { image_url: await toDataUrl(f) });
                  }} />
                  <input className="w-full rounded-lg border-2 border-input bg-background px-2 py-1" placeholder="…or paste an https picture link"
                    value={b.image_url?.startsWith("data:") ? "" : (b.image_url ?? "")} onChange={(e) => upd(i, { image_url: e.target.value })} />
                </div>
              )}
              <textarea
                className="mt-2 w-full rounded-lg border-2 border-input bg-background px-2 py-1 min-h-16"
                placeholder={b.kind === "image" ? "Caption" : "Text"}
                value={b.content}
                maxLength={5000}
                onChange={(e) => upd(i, { content: e.target.value })}
              />
            </div>
          ))}
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={() => setBlocks([...blocks, { kind: "heading", content: "New heading" }])}><Heading /> Heading</Button>
            <Button variant="outline" onClick={() => setBlocks([...blocks, { kind: "text", content: "" }])}><Type /> Text box</Button>
            <Button variant="outline" onClick={() => setBlocks([...blocks, { kind: "image", content: "", image_url: null }])}><ImageIcon /> Picture</Button>
          </div>
        </section>
        <section className="bg-card border-2 border-border rounded-3xl p-6">
          <p className="text-xs font-bold uppercase text-muted-foreground mb-3">Preview</p>
          <AboutView blocks={blocks} />
        </section>
      </div>
    </main>
  );
}
