import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings as Gear, BookOpen, Waves, Trees, Flame, Lock, Sparkles, Star, Send } from "lucide-react";
import { isFestivalOpen, nextOpening } from "@/lib/festivals";
import { WORLD_ART } from "@/lib/world-art";
import { getSession, getState, setState, type SubjectStat, type Wallet } from "@/lib/store";
import { playerLv, lvProgressPct, EXP_PER_LV } from "@/lib/leveling";
import { StarRow } from "@/components/stars";
import continentMap from "@/assets/continent-map.jpg";
import shopIcon from "@/assets/icon-shop.png";
import { SUBJECTS } from "@/lib/subjects";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/game")({
  head: () => ({
    meta: [
      { title: "World Map — Acelexia" },
      { name: "description", content: "Sail the Acelexia continent: aquatic, forest and fire lands, plus limited festival islands." },
      { property: "og:title", content: "World Map — Acelexia" },
      { property: "og:description", content: "Pick a land and challenge its boss towers." },
    ],
  }),
  component: GameMap,
});

/** Countries of the continent — positioned as % over the map illustration. */
const COUNTRIES = [
  { id: "aquatic", name: "Aquatic Bay", Icon: Waves, x: 30, y: 55 },
  { id: "forest", name: "Forest Land", Icon: Trees, x: 56, y: 32 },
  { id: "fire", name: "Fire Land", Icon: Flame, x: 78, y: 52 },
];

const EVENTS = ["olympus", "winter", "festival"];


function formatDate(d: Date) {
  return d.toLocaleDateString("en-HK", { month: "short", day: "numeric" });
}

/** Icon button with a hover label (dyslexia-friendly: picture first, word on hover). */
function IconAction({ to, label, children }: { to: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      aria-label={label}
      title={label}
      className="group relative grid place-items-center w-14 h-14 rounded-full bg-card border-4 border-border shadow-lg hover:border-primary hover:scale-105 transition"
    >
      {children}
      <span className="pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded-lg bg-foreground text-background text-xs font-bold px-2 py-1 opacity-0 group-hover:opacity-100 transition">
        {label}
      </span>
    </Link>
  );
}

function GameMap() {
  const [player, setPlayer] = useState<{ name: string; grade: string } | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [stats, setStats] = useState<Record<string, SubjectStat>>({});
  const [account, setAccount] = useState<string | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("player");
      if (raw) setPlayer(JSON.parse(raw));
    } catch {}
    setAccount(getSession()?.username ?? null);
    const sync = () => {
      const st = getState();
      setWallet(st.wallet);
      setStats(st.stats ?? {});
    };
    sync();
    const state = getState();
    const answers = Object.values(state.stats ?? {}).reduce((sum, stat) => sum + stat.total, 0);
    const lastShown = state.settings.lastFeedbackAt ?? 0;
    if (answers >= 8 && Date.now() - lastShown > 7 * 24 * 60 * 60 * 1000 && Math.random() < 0.35) {
      const timer = window.setTimeout(() => setReviewOpen(true), 1200);
      return () => window.clearTimeout(timer);
    }
    window.addEventListener("wq-updated", sync);
    return () => window.removeEventListener("wq-updated", sync);
  }, []);

  const closeReview = () => {
    const state = getState();
    setState({ ...state, settings: { ...state.settings, lastFeedbackAt: Date.now() } });
    setReviewOpen(false);
  };

  const sendReview = () => {
    if (!rating) return;
    const state = getState();
    setState({
      ...state,
      settings: {
        ...state.settings,
        lastFeedbackAt: Date.now(),
        feedbackRating: rating,
        feedbackComment: comment.trim().slice(0, 500),
      },
    });
    setReviewOpen(false);
  };

  const openEvents = EVENTS.filter((id) => isFestivalOpen(id));
  const exp = wallet?.exp ?? 0;

  return (
    <main className="min-h-screen px-4 py-6">
      <header className="flex items-center justify-between max-w-6xl mx-auto mb-4 gap-4 flex-wrap">
        <div>
          <div className="text-sm text-muted-foreground">
            {player?.name ? `${player.name} • ` : "Player • "}Grade {player?.grade ?? "—"}
          </div>
          <h1 className="text-4xl font-extrabold brand-outline">Acelexia</h1>
        </div>

        <div className="flex items-center gap-3">
          <IconAction to="/revision" label="Revision bank">
            <BookOpen className="text-primary" size={26} aria-hidden />
          </IconAction>
          <IconAction to="/settings" label="Settings">
            <Gear className="text-primary" size={26} aria-hidden />
          </IconAction>
        </div>
      </header>

      {/* Stars + LV */}
      <div className="max-w-6xl mx-auto mb-4 grid gap-3 sm:grid-cols-2">
        <div className="bg-card border-2 border-border rounded-3xl px-5 py-4 shadow">
          <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Profile</div>
          <div className="mt-1 text-lg font-extrabold">{account ?? player?.name ?? "Explorer"}</div>
          <div className="text-sm font-bold">Grade <strong>{player?.grade ?? "—"}</strong></div>
          <ul className="mt-2 space-y-0.5 text-sm font-semibold">
            {SUBJECTS.map(({ key, label }) => {
              const s = stats[key];
              const pct = s && s.total > 0 ? Math.round((s.correct / s.total) * 100) : null;
              return (
                <li key={key} className="flex items-center justify-between gap-2">
                  <span>{label}</span>
                  <strong>{pct === null ? "—" : `${pct}%`}</strong>
                </li>
              );
            })}
          </ul>
          <div className="mt-1 text-[11px] text-muted-foreground font-semibold">Avg correct %</div>
        </div>
        <div className="bg-card border-2 border-border rounded-3xl px-5 py-4 shadow">
          <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Your stars</div>
          <div className="mt-2">{wallet && <StarRow stars={wallet.stars} size={24} />}</div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">LV</span>
            <span className="text-xl font-extrabold">Lv{playerLv(exp)}</span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${lvProgressPct(exp)}%` }} />
          </div>
          <div className="mt-1 text-xs text-muted-foreground font-semibold">
            {exp % EXP_PER_LV} / {EXP_PER_LV} EXP to next LV
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-[2rem] overflow-hidden border-4 border-border shadow-2xl"
          style={{ aspectRatio: "3 / 2" }}
        >
          <img
            src={continentMap}
            alt="Map of the Acelexia continent with three lands and a festival island"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-background/15 pointer-events-none" aria-hidden />

          {/* Countries of the continent */}
          {COUNTRIES.map(({ id, name, Icon, x, y }) => {
            const art = WORLD_ART[id];
            return (
              <Link
                key={id}
                to="/world/$world"
                params={{ world: id }}
                aria-label={name}
                title={name}
                className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span
                  className="grid place-items-center w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white/90 shadow-2xl hover:scale-110 transition overflow-hidden"
                  style={{ background: art.color }}
                >
                  <img src={art.boss} alt="" loading="lazy" className="w-16 h-16 object-contain drop-shadow" />
                </span>
                <span className="mt-1 grid place-items-center w-8 h-8 rounded-full bg-white/90 shadow">
                  <Icon size={18} className="text-foreground" aria-hidden />
                </span>
                <span className="mt-1 rounded-full bg-black/60 text-white text-xs font-bold px-2 py-0.5 opacity-0 group-hover:opacity-100 transition">
                  {name}
                </span>
              </Link>
            );
          })}

          {/* Shop — top right of the map */}
          <Link
            to="/shop"
            aria-label="Star shop"
            title="Star shop"
            className="group absolute right-[4%] top-[6%] flex flex-col items-center"
          >
            <span className="grid place-items-center w-24 h-24 rounded-[1.5rem] bg-white/90 border-4 border-white shadow-2xl hover:scale-105 transition overflow-hidden">
              <img src={shopIcon} alt="" loading="lazy" width={512} height={512} className="w-20 h-20 object-contain" />
            </span>
            <span className="mt-1 rounded-full bg-black/60 text-white text-xs font-extrabold px-2 py-0.5">Shop</span>
          </Link>

          {/* Event isle — bottom left, below Aquatic Bay */}
          <div className="absolute left-[3%] bottom-[4%] w-[26%] min-w-[150px]">
            <div className="rounded-[2rem] bg-[oklch(0.95_0.06_90)]/90 border-4 border-white/80 shadow-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles size={14} aria-hidden /> Event Isle
              </div>

              {openEvents.length === 0 ? (
                <div className="mt-3 flex flex-col items-center gap-1" title="No event is open right now">
                  <Lock size={28} className="text-foreground/70" aria-hidden />
                  <span className="text-[11px] font-semibold text-foreground/70">Locked</span>
                  {(() => {
                    const next = EVENTS.map((id) => nextOpening(id)).filter(Boolean).sort((a, b) => a!.getTime() - b!.getTime())[0];
                    return next ? (
                      <span className="text-[11px] text-foreground/60">Opens {formatDate(next)}</span>
                    ) : null;
                  })()}
                </div>
              ) : (
                <div className="mt-2 space-y-2">
                  {openEvents.map((id) => {
                    const art = WORLD_ART[id];
                    return (
                      <Link
                        key={id}
                        to="/world/$world"
                        params={{ world: id }}
                        title={art.label}
                        className="flex items-center gap-2 rounded-2xl bg-white/90 border-2 border-border px-2 py-1.5 hover:border-primary transition"
                      >
                        <img src={art.boss} alt="" loading="lazy" className="w-9 h-9 object-contain" />
                        <span className="text-xs font-extrabold">{art.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={reviewOpen} onOpenChange={(open) => !open && closeReview()}>
        <DialogContent className="max-w-md rounded-2xl border-2">
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold">How is Acelexia?</DialogTitle>
            <DialogDescription>What can we do to improve?</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2" role="radiogroup" aria-label="Rating out of five">
            {[1, 2, 3, 4, 5].map((value) => (
              <Button
                key={value}
                variant="ghost"
                size="icon"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value} out of 5 stars`}
                onClick={() => setRating(value)}
                className="h-12 w-12"
              >
                <Star className={value <= rating ? "fill-accent text-accent" : "text-muted-foreground"} size={32} aria-hidden />
              </Button>
            ))}
          </div>
          <label htmlFor="ux-comment" className="font-bold">Comment <span className="text-muted-foreground font-normal">(optional)</span></label>
          <textarea
            id="ux-comment"
            value={comment}
            maxLength={500}
            onChange={(event) => setComment(event.target.value)}
            placeholder="What can we do to improve?"
            className="min-h-28 w-full resize-y rounded-xl border-2 border-input bg-background px-4 py-3"
          />
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeReview}>Later</Button>
            <Button onClick={sendReview} disabled={!rating}><Send aria-hidden /> Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
