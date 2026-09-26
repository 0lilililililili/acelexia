// Layered cartoon avatar drawn with inline SVG so it works offline.
import type { AvatarItem, Slot } from "@/lib/avatar";
import type { Gender } from "@/lib/store";

type Look = Partial<Record<Slot, AvatarItem>>;
const OUT = "#2b2118";

export function AvatarFigure({ look, gender, size = 220 }: { look: Look; gender: Gender; size?: number }) {
  const skin = look.skin?.color ?? "#f6d3b3";
  const shirt = look.shirt;
  const bottom = look.bottom;
  const shoes = look.shoes;
  const hair = look.hair;
  return (
    <svg viewBox="0 0 200 300" width={size} height={size * 1.5} role="img" aria-label="Avatar">
      <ellipse cx="100" cy="290" rx="55" ry="7" fill="#000" opacity="0.15" />
      {/* long hair behind */}
      {hair && (hair.variant === "long" || hair.variant === "ponytail") && (
        <path d={hair.variant === "long" ? "M58 70 Q56 150 70 160 L130 160 Q144 150 142 70 Z" : "M135 70 Q170 100 150 150 Q140 110 128 90 Z"} fill={hair.color} stroke={OUT} strokeWidth="3" />
      )}
      {/* legs */}
      <rect x="78" y="190" width="18" height="80" rx="8" fill={skin} stroke={OUT} strokeWidth="3" />
      <rect x="104" y="190" width="18" height="80" rx="8" fill={skin} stroke={OUT} strokeWidth="3" />
      {bottom && bottom.variant === "pants" && (
        <path d="M72 180 H128 L126 268 H104 L100 205 L96 268 H74 Z" fill={bottom.color} stroke={OUT} strokeWidth="3" />
      )}
      {bottom && bottom.variant === "shorts" && (
        <path d="M72 180 H128 L126 225 H104 L100 205 L96 225 H74 Z" fill={bottom.color} stroke={OUT} strokeWidth="3" />
      )}
      {bottom && bottom.variant === "skirt" && (
        <path d="M74 175 H126 L144 240 H56 Z" fill={bottom.color} stroke={OUT} strokeWidth="3" />
      )}
      {/* shoes */}
      {shoes && (
        <g fill={shoes.color} stroke={OUT} strokeWidth="3">
          <path d={shoes.variant === "boot" ? "M72 245 H98 V280 H64 Q64 268 72 268 Z" : "M72 265 H98 V282 H62 Q62 268 72 265 Z"} />
          <path d={shoes.variant === "boot" ? "M102 245 H128 V268 Q136 268 136 280 H102 Z" : "M102 265 H128 Q138 268 138 282 H102 Z"} />
        </g>
      )}
      {/* arms */}
      <rect x="48" y="112" width="18" height="70" rx="9" fill={skin} stroke={OUT} strokeWidth="3" transform="rotate(10 57 112)" />
      <rect x="134" y="112" width="18" height="70" rx="9" fill={skin} stroke={OUT} strokeWidth="3" transform="rotate(-10 143 112)" />
      {/* torso */}
      <path
        d={shirt?.variant === "robe" ? "M68 108 H132 L140 230 H60 Z" : "M68 108 H132 L130 190 H70 Z"}
        fill={shirt?.color ?? "#c9c2b0"}
        stroke={OUT}
        strokeWidth="3"
      />
      {shirt?.variant === "sailor" && <path d="M80 108 L100 135 L120 108" fill="none" stroke="#fff" strokeWidth="5" />}
      {shirt?.variant === "vest" && <path d="M100 108 V190" stroke={OUT} strokeWidth="3" />}
      {shirt?.variant === "armor" && <path d="M72 140 H128 M72 165 H128" stroke="#5f6870" strokeWidth="4" />}
      {/* belt */}
      {look.belt && <rect x="68" y="176" width="64" height="12" fill={look.belt.color} stroke={OUT} strokeWidth="3" />}
      {look.belt && <rect x="93" y="174" width="14" height="16" fill="#f2d16b" stroke={OUT} strokeWidth="2" />}
      {/* neck + head */}
      <rect x="90" y="96" width="20" height="16" fill={skin} stroke={OUT} strokeWidth="3" />
      <circle cx="100" cy="70" r="38" fill={skin} stroke={OUT} strokeWidth="3" />
      {/* face */}
      <Face item={look.face} />
      {/* hair on top */}
      {hair && hair.variant === "spiky" && (
        <path d="M62 62 L70 30 L82 48 L92 22 L102 44 L114 22 L122 46 L134 30 L138 62 Q100 44 62 62 Z" fill={hair.color} stroke={OUT} strokeWidth="3" />
      )}
      {hair && hair.variant !== "spiky" && (
        <path d="M62 66 Q64 30 100 30 Q136 30 138 66 Q120 50 100 52 Q80 50 62 66 Z" fill={hair.color} stroke={OUT} strokeWidth="3" />
      )}
      {gender === "girl" && <circle cx="132" cy="48" r="7" fill="#e87fa8" stroke={OUT} strokeWidth="2" />}
      {/* hat */}
      <Hat item={look.hat} />
      {/* weapon */}
      <Weapon item={look.weapon} />
    </svg>
  );
}

function Face({ item }: { item?: AvatarItem }) {
  const v = item?.variant ?? "smile";
  return (
    <g stroke={OUT} strokeWidth="3" fill="none" strokeLinecap="round">
      {v === "shades" ? (
        <g fill="#1b1b1b"><rect x="76" y="62" width="20" height="12" rx="4" /><rect x="104" y="62" width="20" height="12" rx="4" /><path d="M96 66 H104" /></g>
      ) : v === "mask" ? (
        <g><rect x="70" y="58" width="60" height="18" rx="8" fill={item?.color} /><circle cx="86" cy="67" r="4" fill="#fff" stroke="none" /><circle cx="114" cy="67" r="4" fill="#fff" stroke="none" /></g>
      ) : (
        <g fill={OUT} stroke="none"><circle cx="86" cy="68" r="4.5" /><circle cx="114" cy="68" r="4.5" /></g>
      )}
      {v === "grin" ? <path d="M84 84 Q100 100 116 84 Z" fill="#fff" /> : <path d="M86 86 Q100 96 114 86" />}
      <circle cx="78" cy="82" r="5" fill="#f19a9a" stroke="none" opacity="0.6" />
      <circle cx="122" cy="82" r="5" fill="#f19a9a" stroke="none" opacity="0.6" />
    </g>
  );
}

function Hat({ item }: { item?: AvatarItem }) {
  if (!item) return null;
  const s = { fill: item.color, stroke: OUT, strokeWidth: 3 };
  switch (item.variant) {
    case "cap":
      return <g {...s}><path d="M64 52 Q100 14 136 52 Z" /><path d="M120 50 H156 Q150 58 124 56 Z" /></g>;
    case "pirate":
      return <g {...s}><path d="M50 50 Q100 0 150 50 Q100 38 50 50 Z" /><circle cx="100" cy="30" r="5" fill="#fff" /></g>;
    case "wizard":
      return <g {...s}><path d="M60 50 L104 -10 L140 50 Z" /><circle cx="100" cy="30" r="4" fill="#f2b705" /></g>;
    case "crown":
      return <g {...s}><path d="M68 44 L72 18 L86 34 L100 12 L114 34 L128 18 L132 44 Z" /></g>;
    default:
      return null;
  }
}

function Weapon({ item }: { item?: AvatarItem }) {
  if (!item) return null;
  const s = { stroke: OUT, strokeWidth: 3 };
  switch (item.variant) {
    case "dagger":
      return <g {...s}><path d="M160 150 L166 118 L172 150 Z" fill={item.color} /><rect x="156" y="150" width="20" height="6" fill="#8a5a2b" /><rect x="162" y="156" width="8" height="16" fill="#5a3a22" /></g>;
    case "sword":
      return <g {...s}><path d="M160 150 L166 70 L172 150 Z" fill={item.color} /><rect x="152" y="150" width="28" height="7" fill="#f2b705" /><rect x="162" y="157" width="8" height="20" fill="#5a3a22" /></g>;
    case "bow":
      return <g {...s} fill="none"><path d="M162 90 Q192 150 162 210" stroke={item.color} strokeWidth="6" /><path d="M162 90 V210" strokeWidth="1.5" /></g>;
    case "staff":
      return <g {...s}><rect x="162" y="80" width="8" height="140" fill="#8a5a2b" /><circle cx="166" cy="74" r="12" fill={item.color} /><circle cx="162" cy="70" r="3" fill="#fff" stroke="none" /></g>;
    default:
      return null;
  }
}
