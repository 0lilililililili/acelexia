import { Link } from "@tanstack/react-router";
import { Flame, Check, Lock } from "lucide-react";
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
        <DialogFooter><Button onClick={onClose}>OK</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
