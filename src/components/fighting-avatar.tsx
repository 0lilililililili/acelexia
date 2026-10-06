// The player's own avatar fighting next to the boss during a level.
// Uses the equipped weapon's move (slash / shoot / cast); unarmed = punches & kicks.
import { useEffect, useState } from "react";
import { AvatarFigure } from "@/components/avatar-figure";
import { resolveLook } from "@/lib/avatar";
import { getState, type AvatarState } from "@/lib/store";

const MOVE: Record<string, string> = {
  sword: "fight-slash",
  dagger: "fight-slash",
  bow: "fight-shoot",
  staff: "fight-cast",
};

export function FightingAvatar({ striking }: { striking: boolean }) {
  const [avatar, setAvatar] = useState<AvatarState | null>(null);
  const [combo, setCombo] = useState(0);
  useEffect(() => {
    const sync = () => setAvatar(getState().avatar);
    sync();
    window.addEventListener("wq-updated", sync);
    const id = setInterval(() => setCombo((c) => (c + 1) % 3), 1600);
    return () => { window.removeEventListener("wq-updated", sync); clearInterval(id); };
  }, []);
  if (!avatar) return null;
  const look = resolveLook(avatar);
  const weapon = look.weapon?.variant;
  // Unarmed: rotate between punch, kick and a kung-fu spin.
  const bare = ["fight-punch", "fight-kick", "fight-spin"][combo];
  const move = weapon ? MOVE[weapon] ?? "fight-slash" : bare;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-2 bottom-2 sm:left-6 z-10 origin-bottom ${striking ? "fight-strike" : move}`}
    >
      <AvatarFigure look={look} gender={avatar.gender} size={90} />
    </div>
  );
}
