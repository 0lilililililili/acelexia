import { Star } from "lucide-react";
import { STAR_HEX, type StarColor } from "@/lib/leveling";

/** A coloured star with a count next to it. */
export function StarCount({ color, n, size = 20 }: { color: StarColor; n: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-extrabold" title={`${n} ${color} stars`}>
      <Star size={size} style={{ color: STAR_HEX[color], fill: STAR_HEX[color] }} aria-hidden />
      <span>{n}</span>
    </span>
  );
}

export function StarRow({ stars, size = 20 }: { stars: Record<StarColor, number>; size?: number }) {
  const order: StarColor[] = ["red", "blue", "green", "yellow"];
  return (
    <div className="flex items-center gap-3">
      {order.map((c) => (
        <StarCount key={c} color={c} n={stars[c] ?? 0} size={size} />
      ))}
    </div>
  );
}
