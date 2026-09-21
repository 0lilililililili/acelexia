import bossAquatic from "@/assets/boss-aquatic.png";
import bossForest from "@/assets/boss-forest.png";
import bossFire from "@/assets/boss-fire.png";
import bossOlympus from "@/assets/boss-olympus.png";
import bossWinter from "@/assets/boss-winter.png";
import bossFestival from "@/assets/boss-festival.png";

import bgAquatic from "@/assets/bg-aquatic.jpg";
import bgForest from "@/assets/bg-forest.jpg";
import bgFire from "@/assets/bg-fire.jpg";
import bgOlympus from "@/assets/bg-olympus.jpg";
import bgWinter from "@/assets/bg-winter.jpg";
import bgFestival from "@/assets/bg-festival.jpg";

export type WorldArt = { boss: string; bg: string; label: string; color: string };

export const WORLD_ART: Record<string, WorldArt> = {
  aquatic:  { boss: bossAquatic,  bg: bgAquatic,  label: "Aquatic",  color: "var(--color-aqua)" },
  forest:   { boss: bossForest,   bg: bgForest,   label: "Forest",   color: "var(--color-forest)" },
  fire:     { boss: bossFire,     bg: bgFire,     label: "Fire",     color: "var(--color-fire)" },
  olympus:  { boss: bossOlympus,  bg: bgOlympus,  label: "Olympus",  color: "var(--color-grape)" },
  winter:   { boss: bossWinter,   bg: bgWinter,   label: "Workshop", color: "var(--color-fire)" },
  festival: { boss: bossFestival, bg: bgFestival, label: "Festival", color: "var(--color-sun)" },
  // Extra seasonal specials reuse bundled artwork so the app stays offline-ready.
  easter:    { boss: bossForest,   bg: bgForest,   label: "Easter",     color: "var(--color-forest)" },
  midautumn: { boss: bossFestival, bg: bgFestival, label: "Mid-Autumn", color: "var(--color-sun)" },
  halloween: { boss: bossFire,     bg: bgFire,     label: "Halloween",  color: "var(--color-grape)" },
};

/** Toned-down (desaturated, dimmer) background style for gameplay/tower pages. */
export const mutedBgStyle = (bg: string): React.CSSProperties => ({
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "saturate(0.55) brightness(0.9)",
});
