import { useState } from "react";
import { Map, Castle, Mic, Star, Store, User, BookOpen, Award, Flame, Settings, Volume2, ListChecks, RotateCcw } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { tr } from "@/lib/tr";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const STEPS: { icon: typeof Map; t: [string, string, string]; d: [string, string, string] }[] = [
  { icon: Map, t: ["The map", "地圖", "地图"], d: ["Tap a land on the map to visit it.", "按地圖上的國家進入。", "按地图上的国家进入。"] },
  { icon: Castle, t: ["Towers", "塔", "塔"], d: ["Each land has 3 towers: 中, ENG and MATH. Climb level by level.", "每個國家有3座塔：中、ENG、MATH。一級一級往上爬。", "每个国家有3座塔：中、ENG、MATH。一级一级往上爬。"] },
  { icon: Mic, t: ["Speak", "說出答案", "说出答案"], d: ["Press the big mic button and read the answer out loud.", "按大咪高峰按鈕，大聲讀出答案。", "按大麦克风按钮，大声读出答案。"] },
  { icon: Volume2, t: ["Listen", "聽題目", "听题目"], d: ["Press the speaker button next to a question to hear it read out loud.", "按題目旁的喇叭按鈕，就會讀出題目。", "按题目旁的喇叭按钮，就会读出题目。"] },
  { icon: ListChecks, t: ["Choice questions", "選擇題", "选择题"], d: ["Tap an answer or say “letter A”. Only your first choice counts, so think first!", "按答案或說「letter A」。只計第一次選擇，先想清楚！", "按答案或说「letter A」。只计第一次选择，先想清楚！"] },
  { icon: RotateCcw, t: ["Re-quiz plan", "重溫計劃", "重温计划"], d: ["Open the Revision bank and tap Re-quiz plan to practise the topics you find hardest.", "打開溫習庫，按「重溫計劃」練習最難的題目。", "打开复习库，按「重温计划」练习最难的题目。"] },
  { icon: Star, t: ["Stars", "星星", "星星"], d: ["Win 1–3 stars each level. Stars are money.", "每關贏1–3粒星。星星就是金錢。", "每关赢1–3颗星。星星就是金钱。"] },
  { icon: Store, t: ["Shop", "商店", "商店"], d: ["Buy tools (hour-glass, potion, torch) or avatar gear.", "買道具（沙漏、藥水、火炬）或角色裝備。", "买道具（沙漏、药水、火炬）或角色装备。"] },
  { icon: User, t: ["Avatar", "角色", "角色"], d: ["Dress up your explorer with items you unlock.", "用解鎖的物品打扮你的角色。", "用解锁的物品打扮你的角色。"] },
  { icon: BookOpen, t: ["Revision bank", "溫習庫", "复习库"], d: ["Wrong answers are saved here to practise again.", "答錯的題目會存在這裡，方便再練習。", "答错的题目会存在这里，方便再练习。"] },
  { icon: Award, t: ["Badges", "徽章", "徽章"], d: ["Earn badges for right-answer runs, towers and streaks.", "連續答對、過塔、連續登入都可得徽章。", "连续答对、过塔、连续登录都可得徽章。"] },
  { icon: Flame, t: ["Daily streak", "每日連續", "每日连续"], d: ["Come back every day. Daily practice can give yellow stars!", "每天回來玩。每日練習有機會得黃星！", "每天回来玩。每日练习有机会得黄星！"] },
  { icon: Settings, t: ["Settings", "設定", "设置"], d: ["Change text size, time limit and language.", "更改字體大小、時間限制和語言。", "更改字体大小、时间限制和语言。"] },
];

export function Tutorial({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLang();
  const [i, setI] = useState(0);
  const step = STEPS[i];
  const Icon = step.icon;
  const close = () => { setI(0); onClose(); };
  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="max-w-md rounded-2xl border-2">
        <DialogHeader>
          <div className="mx-auto grid place-items-center w-20 h-20 rounded-full bg-accent"><Icon size={40} aria-hidden /></div>
          <DialogTitle className="text-2xl font-extrabold text-center">{tr(lang, ...step.t)}</DialogTitle>
          <DialogDescription className="text-lg text-center text-foreground">{tr(lang, ...step.d)}</DialogDescription>
        </DialogHeader>
        <p className="text-center text-sm font-bold text-muted-foreground">{i + 1} / {STEPS.length}</p>
        <DialogFooter className="gap-2 sm:justify-between">
          <Button variant="ghost" onClick={close}>{tr(lang, "Skip", "跳過", "跳过")}</Button>
          <div className="flex gap-2">
            <Button variant="outline" disabled={i === 0} onClick={() => setI(i - 1)}>{tr(lang, "Back", "上一步", "上一步")}</Button>
            {i < STEPS.length - 1
              ? <Button onClick={() => setI(i + 1)}>{tr(lang, "Next", "下一步", "下一步")}</Button>
              : <Button onClick={close}>{tr(lang, "Done", "完成", "完成")}</Button>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
