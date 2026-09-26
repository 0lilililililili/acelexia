// Avatar catalogue: every wearable item, its LV gate and star price.
// Items at LV20+ each carry their own unique extra star requirement.
import type { StarColor } from "./leveling";
import type { AvatarState, Gender } from "./store";

export type Slot = "skin" | "hair" | "face" | "shirt" | "bottom" | "shoes" | "hat" | "belt" | "weapon";
export const SLOTS: Slot[] = ["skin", "hair", "face", "shirt", "bottom", "shoes", "hat", "belt", "weapon"];
/** Slots that may be left empty. */
export const OPTIONAL_SLOTS: Slot[] = ["hat", "belt", "weapon"];

export type Cost = Partial<Record<StarColor, number>>;
export type AvatarItem = {
  id: string;
  slot: Slot;
  name: { en: string; zh: string };
  color: string;
  variant: string;
  lv: number;
  cost: Cost;
  gender?: Gender;
};

const I = (
  slot: Slot, id: string, en: string, zh: string, color: string, variant: string, lv = 1, cost: Cost = {}, gender?: Gender,
): AvatarItem => ({ id: `${slot}.${id}`, slot, name: { en, zh }, color, variant, lv, cost, gender });

export const ITEMS: AvatarItem[] = [
  // Skin — all free
  I("skin", "light", "Light", "淺色", "#f6d3b3", "base"),
  I("skin", "tan", "Tan", "小麥色", "#e0a878", "base"),
  I("skin", "brown", "Brown", "棕色", "#b07245", "base"),
  I("skin", "dark", "Dark", "深色", "#7a4a2a", "base"),
  // Hair
  I("hair", "short", "Short hair", "短髮", "#3b2a1e", "short", 1, {}, "boy"),
  I("hair", "long", "Long hair", "長髮", "#3b2a1e", "long", 1, {}, "girl"),
  I("hair", "spiky", "Spiky hair", "刺蝟頭", "#1f1a17", "spiky", 3, { red: 3 }),
  I("hair", "ponytail", "Ponytail", "馬尾", "#6b3b1f", "ponytail", 5, { blue: 4 }),
  I("hair", "golden", "Golden locks", "金髮", "#e3b341", "long", 12, { green: 8 }),
  I("hair", "fire", "Flame hair", "火焰髮", "#e2483d", "spiky", 22, { red: 5, yellow: 1 }),
  // Face
  I("face", "smile", "Smile", "微笑", "#3a2418", "smile"),
  I("face", "grin", "Big grin", "大笑", "#3a2418", "grin", 2, { green: 2 }),
  I("face", "cool", "Cool shades", "墨鏡", "#1b1b1b", "shades", 15, { blue: 10 }),
  I("face", "hero", "Hero mask", "英雄面罩", "#2e86de", "mask", 26, { blue: 6, green: 3 }),
  // Shirt
  I("shirt", "plain", "Plain tee", "普通T恤", "#c9c2b0", "tee"),
  I("shirt", "red", "Red tee", "紅T恤", "#e2483d", "tee", 2, { red: 3 }),
  I("shirt", "sailor", "Sailor top", "水手服", "#2e86de", "sailor", 6, { blue: 6 }),
  I("shirt", "ranger", "Ranger vest", "遊俠背心", "#2ea44f", "vest", 10, { green: 10 }),
  I("shirt", "armor", "Knight armour", "騎士盔甲", "#9aa4ad", "armor", 20, { red: 3 }),
  I("shirt", "royal", "Royal robe", "皇家長袍", "#7b3fa0", "robe", 35, { red: 3, blue: 3, green: 3 }),
  // Bottom
  I("bottom", "pants", "Plain pants", "普通長褲", "#6d6a60", "pants", 1, {}, "boy"),
  I("bottom", "skirt", "Plain dress", "普通裙", "#6d6a60", "skirt", 1, {}, "girl"),
  I("bottom", "jeans", "Blue jeans", "牛仔褲", "#3d5a80", "pants", 4, { blue: 3 }),
  I("bottom", "tutu", "Flower dress", "花裙", "#e87fa8", "skirt", 4, { green: 3 }),
  I("bottom", "shorts", "Explorer shorts", "探險短褲", "#a0784a", "shorts", 8, { green: 6 }),
  I("bottom", "greaves", "Iron greaves", "鐵護腿", "#8a939b", "pants", 24, { red: 4, blue: 1 }),
  // Shoes
  I("shoes", "plain", "Plain shoes", "普通鞋", "#4a3b2c", "shoe"),
  I("shoes", "sneakers", "Sneakers", "波鞋", "#f2f2f2", "shoe", 3, { red: 2 }),
  I("shoes", "boots", "Adventure boots", "冒險靴", "#6b3b1f", "boot", 9, { green: 5 }),
  I("shoes", "wing", "Winged boots", "飛翼靴", "#f2b705", "boot", 28, { blue: 4, yellow: 1 }),
  // Hats
  I("hat", "cap", "Cap", "鴨舌帽", "#e2483d", "cap", 2, { red: 2 }),
  I("hat", "pirate", "Pirate hat", "海盜帽", "#1f1a17", "pirate", 7, { blue: 6 }),
  I("hat", "wizard", "Wizard hat", "巫師帽", "#3d3a8c", "wizard", 14, { blue: 8, green: 4 }),
  I("hat", "crown", "Crown", "皇冠", "#f2b705", "crown", 30, { red: 2, green: 2 }),
  // Belts
  I("belt", "rope", "Rope belt", "繩腰帶", "#b08a55", "belt", 3, { green: 2 }),
  I("belt", "leather", "Leather belt", "皮腰帶", "#5a3a22", "belt", 8, { red: 4 }),
  I("belt", "gold", "Golden belt", "金腰帶", "#f2b705", "belt", 21, { green: 4, yellow: 1 }),
  // Weapons
  I("weapon", "dagger", "Dagger", "匕首", "#b9c2c9", "dagger", 5, { red: 4 }),
  I("weapon", "bow", "Bow", "弓", "#8a5a2b", "bow", 10, { green: 8 }),
  I("weapon", "sword", "Sword", "劍", "#cfd6dc", "sword", 18, { red: 12 }),
  I("weapon", "staff", "Magic staff", "魔法杖", "#7b3fa0", "staff", 25, { blue: 5 }),
];

export const byId = (id?: string) => ITEMS.find((i) => i.id === id);
export const itemsFor = (slot: Slot, gender: Gender) => ITEMS.filter((i) => i.slot === slot && (!i.gender || i.gender === gender));

/** LV1 items with no price are free for everyone. */
export const isStarter = (i: AvatarItem) => i.lv <= 1 && Object.keys(i.cost).length === 0;

export function isOwned(a: AvatarState, i: AvatarItem) {
  return isStarter(i) || a.owned.includes(i.id);
}

const DEFAULTS: Record<Gender, Partial<Record<Slot, string>>> = {
  boy: { skin: "skin.light", hair: "hair.short", face: "face.smile", shirt: "shirt.plain", bottom: "bottom.pants", shoes: "shoes.plain" },
  girl: { skin: "skin.light", hair: "hair.long", face: "face.smile", shirt: "shirt.plain", bottom: "bottom.skirt", shoes: "shoes.plain" },
};

/** Equipped items with beginner defaults filled in. */
export function resolveLook(a: AvatarState): Partial<Record<Slot, AvatarItem>> {
  const out: Partial<Record<Slot, AvatarItem>> = {};
  for (const slot of SLOTS) {
    const id = a.equipped[slot] ?? DEFAULTS[a.gender][slot];
    const item = byId(id);
    if (item && isOwned(a, item)) out[slot] = item;
    else if (DEFAULTS[a.gender][slot]) out[slot] = byId(DEFAULTS[a.gender][slot]);
  }
  return out;
}

export const itemName = (i: AvatarItem, lang: string) => (lang === "en" ? i.name.en : i.name.zh);
