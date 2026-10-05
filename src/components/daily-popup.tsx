import { Link } from "@tanstack/react-router";
import { Flame, Check, Lock, Gift } from "lucide-react";
import { useState } from "react";
import { canSpin, spunToday, spin, type Prize } from "@/lib/lottery";
import { getState, towerKey } from "@/lib/store";
import { daysToNextStreakBadge } from "@/lib/badges";
import { WORLD_ART } from "@/lib/world-art";
import { SUBJECT_LABEL } from "@/lib/subjects";
import { useLang } from "@/lib/i18n";
import { tr } from "@/lib/tr";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LAND: Record<string, [string, string, string]> = {
  aquatic: ["Aquatic", "海洋", "海洋"], forest: ["Forest", "森林", "森林"], fire: ["Fire", "火山", "火山"],
};

export function DailyPopup({ open, onClose, grade }: { open: boolean; onClose: () => void; grade: string }) {
  const { lang } = useLang();
  const s = getState();
  const st = s.streak;
  const left = daysToNextStreakBadge(st.best, st.current);
  const [prize, setPrize] = useState<Prize | null>(null);
  const [spinning, setSpinning] = useState(false);
  const allDone = st.daily.length > 0 && st.daily.every((d) => d.done);
  const doSpin = () => { setSpinning(true); setTimeout(() => { setPrize(spin()); setSpinning(false); }, 1200); };
  const toolName: Record<string, [string, string, string]> = { glassA: ["Hour-glass", "沙漏", "沙漏"], potionA: ["Potion", "藥水", "药水"], torch: ["Torch", "火炬", "火炬"] };
  const prizeText = (p: Prize) =>
    p.kind === "nothing" ? tr(lang, "No prize this time", "這次沒有獎品", "这次没有奖品")
    : p.kind === "exp" ? `+${p.n} EXP`
    : p.kind === "stars" ? tr(lang, `+${p.n} ${p.color} stars`, `+${p.n} 星星`, `+${p.n} 星星`)
    : p.kind === "tool" ? `+1 ${tr(lang, ...toolName[p.item])}`
    : `${tr(lang, "New clothes", "新服飾", "新服饰")}: ${lang === "en" ? p.name.en : p.name.zh}`;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md rounded-2xl border-2">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold flex items-center gap-2">
            <Flame className="text-destructive" aria-hidden /> {tr(lang, "Daily streak", "每日連續", "每日连续")}
          </DialogTitle>
          <DialogDescription>
            {tr(lang, `Next streak badge in ${left} days`, `距離下個連續徽章還有 ${left} 日`, `距离下个连续徽章还有 ${left} 天`)}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-2xl bg-muted p-3"><div className="text-3xl font-extrabold">{st.current}</div><div className="text-sm font-bold">{tr(lang, "Now", "目前", "目前")}</div></div>
          <div className="rounded-2xl bg-muted p-3"><div className="text-3xl font-extrabold">{st.best}</div><div className="text-sm font-bold">{tr(lang, "Best", "最佳", "最佳")}</div></div>
        </div>
        <h3 className="font-extrabold">{tr(lang, "Today's practice", "今日練習", "今日练习")}</h3>
        <ul className="space-y-2">
          {st.daily.map((d) => {
            const level = (s.towers[towerKey(grade, d.world, d.subject)] ?? 0) + 1;
            return (
              <li key={d.subject}>
                {d.done ? <div aria-label={`${SUBJECT_LABEL[d.subject as keyof typeof SUBJECT_LABEL] ?? d.subject} — ${tr(lang, "Quest done", "任務完成", "任务完成")}`} className="flex items-center gap-3 rounded-2xl border-2 border-border bg-muted px-3 py-2 text-muted-foreground">
                  <img src={WORLD_ART[d.world]?.boss} alt="" className="w-10 h-10 object-contain grayscale" />
                  <span className="font-extrabold">{SUBJECT_LABEL[d.subject as keyof typeof SUBJECT_LABEL] ?? d.subject}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-xs font-extrabold"><Lock size={16} aria-hidden />{tr(lang, "Quest done", "任務完成", "任务完成")}</span>
                </div> : <Link
                  to="/play/$grade/$world/$subject/$level"
                  params={{ grade, world: d.world, subject: d.subject, level: String(level) }}
                  search={{ daily: 1 }}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card px-3 py-2 hover:border-primary"
                >
                  <img src={WORLD_ART[d.world]?.boss} alt="" className="w-10 h-10 object-contain" />
                  <span className="font-extrabold">{SUBJECT_LABEL[d.subject as keyof typeof SUBJECT_LABEL] ?? d.subject}</span>
                  <span className="text-sm">{tr(lang, ...(LAND[d.world] ?? [d.world, d.world, d.world]))} · LV{level}</span>
                </Link>
                }
              </li>
            );
          })}
        </ul>
        <div className="rounded-2xl border-2 border-border p-3 text-center">
          <div className="font-extrabold flex items-center justify-center gap-2"><Gift size={20} className="text-primary" aria-hidden /> {tr(lang, "Lottery", "抽獎", "抽奖")}</div>
          {prize ? <p className="mt-2 text-lg font-extrabold">{prizeText(prize)}</p>
            : spunToday() ? <p className="mt-2 text-sm font-bold text-muted-foreground">{tr(lang, "Come back tomorrow", "明天再來", "明天再来")}</p>
            : <Button className="mt-2 gap-2" disabled={!canSpin() || spinning} onClick={doSpin}>
                <Gift size={18} className={spinning ? "animate-spin" : ""} aria-hidden />
                {spinning ? "..." : allDone ? tr(lang, "Spin!", "抽獎！", "抽奖！") : tr(lang, "Finish 3 quests to spin", "完成 3 個任務即可抽獎", "完成 3 个任务即可抽奖")}
              </Button>}
        </div>
        <DialogFooter><Button onClick={onClose}>OK</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
