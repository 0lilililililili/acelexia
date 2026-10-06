import { translate } from "@/lib/i18n";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Settings as Gear, Star, Check, X, Lock } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { generateLevelItems } from "@/lib/qb.functions";
import { useSpeech } from "@/hooks/use-speech";
import { markCleared } from "@/lib/progress";
import { evaluateBadges, markDailyDone } from "@/lib/badges";
import {
  addExp,
  addRevisionItem,
  addStars,
  consumeItem,
  DEFAULT_SETTINGS,
  getState,
  recordAnswer,
  recordLevelStars,
  type ItemKey,
} from "@/lib/store";
import { WORLD_ART, mutedBgStyle } from "@/lib/world-art";
import { LETTERS, parseCommand } from "@/lib/answer-match";
import { answerOutcome } from "@/lib/answer-outcome";
import { answerFormat } from "@/lib/answer-format";
import { playerLv, requiredLv, starsForWrong, worldStarColor, STAR_HEX } from "@/lib/leveling";
import hourglassImg from "@/assets/icon-hourglass.png";
import potionImg from "@/assets/icon-potion.png";
import torchImg from "@/assets/icon-torch.png";
import { FightingAvatar } from "@/components/fighting-avatar";

export const Route = createFileRoute("/play/$grade/$world/$subject/$level")({
  head: ({ params }) => ({
    meta: [
      { title: `Acelexia — ${params.grade} ${params.subject.toUpperCase()} Level ${params.level}` },
      { name: "description", content: "Practise reading and maths with your own fighting avatar in Acelexia." },
      { property: "og:title", content: `Acelexia — ${params.grade} ${params.subject.toUpperCase()} Level ${params.level}` },
      { property: "og:description", content: "Practise reading and maths with your own fighting avatar in Acelexia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): { daily?: number } => (s.daily ? { daily: 1 } : {}),
  component: PlayPage,
});

type Item = { prompt: string; answer: string; hint?: string; topic?: string; choices?: string[] };

const GLASS_SECONDS: Record<"A" | "B" | "C", number> = { A: 15, B: 20, C: 25 };
const GLASS_KEY: Record<"A" | "B" | "C", ItemKey> = { A: "glassA", B: "glassB", C: "glassC" };
const QUESTIONS_PER_LEVEL = 8;

function PlayPage() {
  const { grade, world, subject, level } = Route.useParams();
  const isDaily = !!Route.useSearch().daily;
  const nav = useNavigate();
  const art = WORLD_ART[world] ?? WORLD_ART.forest;
  const levelNum = Math.min(500, Math.max(1, parseInt(level, 10) || 1));

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [wallet, setWallet] = useState(() => getState().wallet);
  useEffect(() => {
    const sync = () => {
      setSettings(getState().settings);
      setWallet(getState().wallet);
    };
    sync();
    window.addEventListener("wq-updated", sync);
    return () => window.removeEventListener("wq-updated", sync);
  }, []);

  const lv = playerLv(wallet.exp);
  const lang = subject === "eng" || subject === "math" && settings.language === "en"
    ? "en-US"
    : settings.language === "zh-CN" ? "zh-CN" : "zh-HK";
  const needLv = requiredLv(levelNum);
  const lvLocked = lv < needLv;

  const generate = useServerFn(generateLevelItems);
  const { data, isLoading, error } = useQuery({
    queryKey: ["qb", subject, grade, world, level, settings.language],
    queryFn: () =>
      generate({
        data: {
          subject: subject as "chi" | "eng" | "math",
          grade,
          theme: art.label,
          level: levelNum,
          count: 14, // 8 for the level + spares for POTION swaps
          language: settings.language,
        },
      }),
    staleTime: Infinity,
    enabled: !lvLocked,
  });

  const [queue, setQueue] = useState<Item[]>([]);
  const [spares, setSpares] = useState<Item[]>([]);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [phase, setPhase] = useState<"enter" | "active" | "defeat" | "escape" | "back" | "offer">("enter");
  const [transcript, setTranscript] = useState("");
  const [tick, setTick] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [usedItem, setUsedItem] = useState(false);
  const [offered, setOffered] = useState(false);
  const [buffetUntil, setBuffetUntil] = useState(0);
  const [feedback, setFeedback] = useState<"none" | "wrong">("none");
  const [note, setNote] = useState<string | null>(null);
  const itemKeyRef = useRef(0);
  const awardedRef = useRef<string | null>(null);
  const answeredRef = useRef(false);

  const current = queue[idx];
  const timeLimit = settings.timeLimit + bonus;

  const flash = (t: string) => {
    setNote(t);
    setTimeout(() => setNote(null), 1600);
  };

  // Load / reset the level whenever the route or the generated items change
  useEffect(() => {
    const all = data?.items ?? [];
    setQueue(all.slice(0, QUESTIONS_PER_LEVEL));
    setSpares(all.slice(QUESTIONS_PER_LEVEL));
    setIdx(0);
    setCorrect(0);
    setWrong(0);
    setPhase("enter");
    setTranscript("");
    setTick(0);
    setBonus(0);
    setUsedItem(false);
    setOffered(false);
    setBuffetUntil(0);
    awardedRef.current = null;
    itemKeyRef.current++;
    answeredRef.current = false;
  }, [data, level, subject, world, grade]);

  const advance = useCallback(() => {
    answeredRef.current = false;
    itemKeyRef.current++;
    setTranscript("");
    setTick(0);
    setBonus(0);
    setUsedItem(false);
    setOffered(false);
    setBuffetUntil(0);
    setPhase("enter");
    setIdx((i) => i + 1);
  }, []);

  // Boss slides in from the left, then the countdown starts
  useEffect(() => {
    if (phase !== "enter") return;
    const t = setTimeout(() => setPhase("active"), 700);
    return () => clearTimeout(t);
  }, [phase, idx, itemKeyRef.current]);

  const toRevision = useCallback(
    (item: Item, reason: "wrong" | "glass" | "potion" | "torch" = "wrong") => {
      addRevisionItem(subject, {
        prompt: item.prompt,
        answer: item.answer,
        topic: item.topic?.trim() || `${art.label} practice`,
        ts: Date.now(),
        reason,
        ...(item.choices && item.choices.length > 1 ? { choices: item.choices.slice(0, 4) } : {}),
      });
    },
    [subject, art.label],
  );

  /** Swap the current question for a fresh spare (POTION). */
  const swapQuestion = useCallback(() => {
    if (!current) return;
    toRevision(current, "potion");
    const spare = spares[0];
    setSpares((s) => s.slice(1));
    setPhase("back");
    setTimeout(() => {
      setQueue((q) => {
        const next = [...q];
        next[idx] = spare ?? { prompt: current.prompt, answer: current.answer, topic: current.topic };
        return next;
      });
      itemKeyRef.current++;
      setTick(0);
      setTranscript("");
      setPhase("enter");
    }, 620);
  }, [current, spares, idx, toRevision]);

  const useTorch = useCallback(() => {
    if (!consumeItem("torch")) {
      flash("You don't own a PASS torch.");
      return;
    }
    if (current) toRevision(current, "torch");
    setUsedItem(true);
    setCorrect((c) => c + 1);
    setPhase("defeat");
    flash("PASS used — question passed!");
  }, [current, toRevision]);

  const usePotion = useCallback(
    (which: "A" | "B") => {
      const buffetActive = Date.now() < buffetUntil;
      if (buffetActive) {
        swapQuestion();
        return;
      }
      const key: ItemKey = which === "A" ? "potionA" : "potionB";
      if (!consumeItem(key)) {
        flash(`You don't own POTION ${which}.`);
        return;
      }
      setUsedItem(true);
      if (which === "B") {
        setBuffetUntil(Date.now() + 7000);
        flash("POTION B — change questions freely for 7s!");
      } else {
        flash("POTION A — question changed!");
      }
      swapQuestion();
    },
    [buffetUntil, swapQuestion],
  );

  const useGlass = useCallback(
    (which: "A" | "B" | "C") => {
      if (!consumeItem(GLASS_KEY[which])) {
        flash(`You don't own HOUR-GLASS ${which}.`);
        return;
      }
      if (current) toRevision(current, "glass");
      setUsedItem(true);
      setBonus((b) => b + GLASS_SECONDS[which]);
      setPhase("active");
      flash(`HOUR-GLASS ${which} — +${GLASS_SECONDS[which]}s!`);
    },
    [current, toRevision],
  );

  const failQuestion = useCallback(() => {
    if (current) toRevision(current, "wrong");
    recordAnswer(subject, false);
    setWrong((w) => w + 1);
    setPhase("escape");
  }, [current, toRevision, subject]);

  const submit = useCallback(
    (text: string, spoken: boolean) => {
      if (!current || phase !== "active" || answeredRef.current) return;
      const outcome = answerOutcome(text, current.answer, current.choices, spoken);
      if (outcome === "correct") {
        answeredRef.current = true;
        setPhase("defeat");
        setCorrect((c) => c + 1);
        recordAnswer(subject, true);
        if (!usedItem) addExp(1);
      } else if (outcome === "wrong") {
        answeredRef.current = true;
        failQuestion();
      } else {
        setFeedback("wrong");
        setTimeout(() => setFeedback("none"), 400);
      }
    },
    [current, phase, usedItem, subject, failQuestion],
  );

  const ownedGlasses = (["A", "B", "C"] as const).filter((w) => (wallet.items[GLASS_KEY[w]] ?? 0) > 0);

  const handleResult = useCallback(
    (t: string) => {
      setTranscript(t);
      const cmd = parseCommand(t);
      if (phase === "offer") {
        if (cmd?.kind === "glass") useGlass(cmd.which);
        else if (cmd?.kind === "yes" && ownedGlasses[0]) useGlass(ownedGlasses[0]);
        else if (cmd?.kind === "no") failQuestion();
        return;
      }
      const mentionsItem = /item|potion|torch|glass|pass/i.test(t);
      if (phase === "active" && cmd && mentionsItem) {
        if (cmd.kind === "potion") return usePotion(cmd.which);
        if (cmd.kind === "torch") return useTorch();
        if (cmd.kind === "glass") return flash("HOUR-GLASS only works after the timer runs out.");
      }
      submit(t, true);
    },
    [phase, submit, usePotion, useTorch, useGlass, failQuestion, ownedGlasses],
  );

  const { listening, supported, start } = useSpeech({ lang, onResult: handleResult });

  // Countdown attached to the question bubble (paused while the offer is showing)
  useEffect(() => {
    if (phase !== "active") return;
    const id = setInterval(() => setTick((t) => t + 0.1), 100);
    return () => clearInterval(id);
  }, [phase, idx]);

  // Time up → offer an HOUR-GLASS if owned, otherwise the boss escapes
  useEffect(() => {
    if (phase !== "active" || tick < timeLimit || !current) return;
    if (!offered && ownedGlasses.length > 0) {
      setOffered(true);
      setPhase("offer");
      return;
    }
    failQuestion();
  }, [tick, phase, current, timeLimit, offered, ownedGlasses.length, failQuestion]);

  // Once the boss has left (defeated or escaped), bring in the next question
  useEffect(() => {
    if (phase !== "escape" && phase !== "defeat") return;
    const t = setTimeout(advance, phase === "defeat" ? 700 : 600);
    return () => clearTimeout(t);
  }, [phase, idx, advance]);

  const finished = !isLoading && queue.length > 0 && idx >= queue.length;
  const starsEarned = starsForWrong(wrong);
  const passed = starsEarned > 0;
  const starColor = worldStarColor(world);

  useEffect(() => {
    if (!finished) return;
    const tag = `${grade}:${world}:${subject}:${level}`;
    if (awardedRef.current === tag) return;
    awardedRef.current = tag;
    if (starsEarned > 0) {
      markCleared(grade, world, subject, levelNum);
      recordLevelStars(grade, world, subject, levelNum, starsEarned);
      if (isDaily) {
        // Daily practice: each star has a ~10% chance to turn yellow.
        let yellow = 0;
        for (let i = 0; i < starsEarned; i++) if (Math.random() < 0.1) yellow++;
        if (starsEarned - yellow > 0) addStars(starColor, starsEarned - yellow);
        if (yellow > 0) addStars("yellow", yellow);
        markDailyDone(subject, world);
      } else {
        addStars(starColor, starsEarned);
      }
    }
    evaluateBadges();
  }, [finished, grade, world, subject, level, levelNum, starsEarned, starColor, isDaily]);

  const remaining = Math.max(0, timeLimit - tick);
  const pctLeft = Math.max(0, Math.min(100, (remaining / timeLimit) * 100));

  if (lvLocked) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <Lock size={56} className="text-muted-foreground" aria-hidden />
        <h1 className="text-3xl font-extrabold mt-4">Not enough LV</h1>
        <p className="text-muted-foreground mt-2">
          LV {levelNum} needs LV{needLv}. You are LV{lv} — answer more questions without items to level up.
        </p>
        <Link to="/tower/$grade/$world/$subject" params={{ grade, world, subject }} className="text-primary font-semibold mt-6">
          ← Back to tower
        </Link>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img src={art.boss} alt="" className="w-24 h-24 mx-auto animate-bounce object-contain" />
          <p className="mt-3 text-muted-foreground">{translate(settings.language, "summoning")}</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-destructive font-semibold">Couldn't load this level.</p>
          <Link to="/tower/$grade/$world/$subject" params={{ grade, world, subject }} className="text-primary font-semibold mt-3 inline-block">
            ← Back to tower
          </Link>
        </div>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <img src={art.boss} alt="" className={`w-32 h-32 object-contain ${passed ? "" : "grayscale opacity-70"}`} />
        <h1 className="text-4xl font-extrabold mt-3">
          {passed ? `LV ${level} cleared!` : `LV ${level} failed`}
        </h1>
        <div className="mt-3 flex gap-2 justify-center">
          {[1, 2, 3].map((n) => (
            <Star
              key={n}
              size={44}
              aria-hidden
              style={{
                color: n <= starsEarned ? STAR_HEX[starColor] : "var(--color-muted-foreground)",
                fill: n <= starsEarned ? STAR_HEX[starColor] : "transparent",
              }}
            />
          ))}
        </div>
        <p className="text-muted-foreground mt-2">
          Correct {correct} / {queue.length} • Wrong {wrong}
        </p>
        <p className="mt-1 font-bold">
          {passed
            ? `You earned ${starsEarned} ${starColor} star${starsEarned > 1 ? "s" : ""}!`
            : "4 or more wrong — try this level again to move on."}
        </p>

        <div className="mt-8 flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => {
              setIdx(0); setCorrect(0); setWrong(0); setPhase("enter"); setTick(0);
              setBonus(0); setUsedItem(false); setOffered(false); awardedRef.current = null;
            }}
            className="rounded-2xl bg-card border-2 border-border px-6 py-3 font-bold"
          >
            Play again
          </button>
          {passed && (
            <button
              onClick={() => nav({ to: "/play/$grade/$world/$subject/$level", params: { grade, world, subject, level: String(levelNum + 1) } })}
              className="rounded-2xl bg-primary text-primary-foreground px-6 py-3 font-bold shadow"
            >
              Next level →
            </button>
          )}
        </div>
        <div className="mt-6 flex gap-4">
          <Link to="/tower/$grade/$world/$subject" params={{ grade, world, subject }} className="text-primary font-semibold">
            ← Back to tower
          </Link>
          <Link to="/revision" className="text-primary font-semibold">Revision bank →</Link>
        </div>
      </main>
    );
  }

  const bossAnim =
    phase === "enter"
      ? "animate-enter-left"
      : phase === "escape"
        ? "animate-exit-right"
        : phase === "back"
          ? "animate-exit-left"
          : phase === "defeat"
            ? "animate-defeated"
            : "";

  const readAloud =
    !!current &&
    !current.choices &&
    ((subject === "eng" && !/\s/.test(current.prompt)) || subject === "chi");
  const buffetLeft = Math.max(0, Math.ceil((buffetUntil - Date.now()) / 1000));

  return (
    <main
      className="h-[100svh] min-h-[320px] relative overflow-hidden flex flex-col"
      style={{ ...mutedBgStyle(art.bg), backgroundAttachment: "fixed", fontSize: `${settings.fontScale}rem` }}
    >
      <div className="absolute inset-0 bg-background/40 pointer-events-none" />
      {/* HUD */}
      <header className="relative flex items-center justify-between px-5 py-3 [@media(max-height:500px)]:py-1 bg-black/40 backdrop-blur text-white">
        <Link to="/tower/$grade/$world/$subject" params={{ grade, world, subject }} className="font-bold">← Exit</Link>
        <div className="text-center">
          <div className="text-xs opacity-90 uppercase tracking-wider">{art.label} • {subject.toUpperCase()} • {grade}</div>
          <div className="font-extrabold">LV {level} • Correct {correct} • Wrong {wrong} • LV{lv}</div>
        </div>
        <Link to="/settings" aria-label="Settings" title="Settings" className="font-bold"><Gear size={22} aria-hidden /></Link>
      </header>

      {/* Item bag */}
      <div className="relative flex items-center justify-center gap-4 py-2 [@media(max-height:500px)]:py-0.5 bg-black/25 text-white text-xs font-bold">
        <span className="inline-flex items-center gap-1"><img src={hourglassImg} alt="Hour-glass" width={512} height={512} loading="lazy" className="w-6 h-6 object-contain" />{(wallet.items.glassA ?? 0) + (wallet.items.glassB ?? 0) + (wallet.items.glassC ?? 0)}</span>
        <span className="inline-flex items-center gap-1"><img src={potionImg} alt="Potion" width={512} height={512} loading="lazy" className="w-6 h-6 object-contain" />{(wallet.items.potionA ?? 0) + (wallet.items.potionB ?? 0)}</span>
        <span className="inline-flex items-center gap-1"><img src={torchImg} alt="Pass torch" width={512} height={512} loading="lazy" className="w-6 h-6 object-contain" />{wallet.items.torch ?? 0}</span>
        <span className="opacity-80">Say “item potion A/B” or “item torch”</span>
      </div>

      {/* Boss enters from the left and waits in the middle */}
      <div className="relative flex-1 min-h-0 flex flex-col items-center justify-center overflow-y-auto py-3">
        <FightingAvatar striking={phase === "defeat"} />
        {current && (
          <div
            key={itemKeyRef.current}
            className={`flex flex-col items-center ${bossAnim}`}
          >
            <img
              src={art.boss}
              alt="boss"
              className={`w-40 h-40 sm:w-48 sm:h-48 object-contain drop-shadow-2xl ${phase === "defeat" ? "grayscale opacity-70" : ""}`}
            />
            <div className="relative mt-2">
              <div
                className="absolute -inset-1 rounded-3xl"
                style={{ background: `conic-gradient(var(--color-primary) ${pctLeft}%, transparent ${pctLeft}%)` }}
                aria-hidden
              />
              <div className="relative bg-card border-4 border-foreground/80 rounded-2xl px-6 py-3 shadow-2xl max-w-[92vw]">
                {readAloud && (
                  <div className="text-base font-extrabold text-foreground text-center">Read out loud:</div>
                )}
                <div className="text-3xl sm:text-4xl font-extrabold tracking-wide text-center">
                  {current.prompt}
                </div>
                 {!current.choices?.length && <p className="mt-2 text-center text-sm font-bold text-muted-foreground">Answer format: {answerFormat(subject, current.prompt, current.answer)}</p>}
                {current.choices && current.choices.length > 0 && (
                  <>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {current.choices.slice(0, 4).map((c, i) => (
                        <button
                          key={i}
                          onClick={() => submit(c, false)}
                          disabled={phase !== "active"}
                          className="rounded-xl border-2 border-border bg-background hover:border-primary px-3 py-2 text-lg font-bold text-left disabled:opacity-50"
                        >
                          <span className="text-primary mr-2 uppercase font-extrabold">{LETTERS[i]}.</span>{c}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-center text-sm font-extrabold">
                      Say it like this: <span className="text-primary">“letter A”</span> — “letter B”, “letter C”, “letter D”
                    </p>
                  </>
                )}
                <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary transition-[width] duration-100" style={{ width: `${pctLeft}%` }} />
                </div>
                <div className="text-center text-xs font-bold text-muted-foreground mt-1">
                  {Math.ceil(remaining)}s{buffetLeft > 0 ? ` • POTION B ${buffetLeft}s` : ""}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HOUR-GLASS offer once the timer runs out */}
        {phase === "offer" && (
          <div className="absolute inset-0 grid place-items-center bg-black/50 p-6">
            <div className="bg-card border-4 border-border rounded-3xl p-6 text-center max-w-sm shadow-2xl animate-pop">
              <img src={hourglassImg} alt="" width={512} height={512} loading="lazy" className="w-20 h-20 mx-auto object-contain" />
              <h2 className="text-2xl font-extrabold mt-2">Use?</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Time is up. Say “yes item glass A/B/C” to add more time.
              </p>
              <div className="mt-4 flex justify-center gap-6">
                <button
                  onClick={() => ownedGlasses[0] && useGlass(ownedGlasses[0])}
                  className="grid place-items-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow"
                  aria-label="Use hour-glass"
                >
                  <Check size={30} aria-hidden />
                </button>
                <button
                  onClick={failQuestion}
                  className="grid place-items-center w-16 h-16 rounded-full bg-card border-4 border-border shadow"
                  aria-label="Don't use"
                >
                  <X size={30} aria-hidden />
                </button>
              </div>
              <div className="mt-3 text-xs font-bold text-muted-foreground">
                You own: {ownedGlasses.map((w) => `${w} ×${wallet.items[GLASS_KEY[w]]}`).join("  ") || "none"}
              </div>
            </div>
          </div>
        )}
      </div>

      {note && <div className="text-center pb-1 font-extrabold text-primary">{note}</div>}

      {transcript && (
        <div className="flex justify-center px-4 pt-2">
          <div
            className={`speech-readout font-extrabold text-center rounded-2xl px-4 py-2 bg-black/45 ${feedback === "wrong" ? "animate-pulse" : ""}`}
          >
            You said: “{transcript.split("|")[0]}”
          </div>
        </div>
      )}

      {/* Mic */}
      <footer className="px-4 pb-3 pt-2 sm:px-6 sm:pb-8 sm:pt-4 bg-background/80 backdrop-blur flex items-center justify-center gap-6">
        {!supported ? (
          <div className="text-destructive font-semibold text-center">
            Voice input isn't supported in this browser. Try Chrome.
          </div>
        ) : (
          <>
            <button
              onClick={start}
              disabled={listening || (phase !== "active" && phase !== "offer")}
              className={`rounded-full w-24 h-24 [@media(max-height:500px)]:w-16 [@media(max-height:500px)]:h-16 bg-primary text-primary-foreground text-4xl font-extrabold shadow-2xl flex items-center justify-center ${listening ? "mic-pulse" : "hover:scale-105"}`}
              aria-label="Speak your answer"
            >
              <MicIcon />
            </button>
            <div className="w-[88px] text-xs text-muted-foreground text-center">
              {listening ? "Listening…" : "Tap & speak"}
            </div>
          </>
        )}
      </footer>
    </main>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" stroke="none" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
      <path d="M8 21h8" />
    </svg>
  );
}
