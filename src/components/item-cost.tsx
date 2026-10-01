import { Star, Lock } from "lucide-react";
import { STAR_HEX, type StarColor } from "@/lib/leveling";
import type { AvatarItem } from "@/lib/avatar";

export function ItemCost({ item }: { item: AvatarItem }) {
  const entries = Object.entries(item.cost) as [StarColor, number][];
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 text-sm font-extrabold">
      <span className="rounded-full bg-muted px-2 py-0.5">LV{item.lv}</span>
      {entries.map(([c, n]) => (
        <span key={c} className="inline-flex items-center gap-0.5">
          {n}<Star size={16} style={{ color: STAR_HEX[c], fill: STAR_HEX[c] }} aria-label={c} />
        </span>
      ))}
    </div>
  );
}

export function LockBadge() {
  return (
    <span className="absolute inset-0 grid place-items-center rounded-2xl bg-background/60">
      <Lock size={30} className="text-foreground/80" aria-hidden />
    </span>
  );
}
