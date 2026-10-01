// Buying and equipping avatar items.
import { byId, isOwned, type AvatarItem, type Slot, OPTIONAL_SLOTS } from "./avatar";
import { playerLv, type StarColor } from "./leveling";
import { getState, setState } from "./store";
import { evaluateBadges } from "./badges";

export type BuyResult = "ok" | "lv" | "stars" | "owned";

export function canAfford(item: AvatarItem) {
  const s = getState();
  return Object.entries(item.cost).every(([c, n]) => (s.wallet.stars[c as StarColor] ?? 0) >= (n ?? 0));
}

export function buyAvatarItem(item: AvatarItem): BuyResult {
  const s = getState();
  if (isOwned(s.avatar, item)) return "owned";
  if (playerLv(s.wallet.exp) < item.lv) return "lv";
  if (!canAfford(item)) return "stars";
  const stars = { ...s.wallet.stars };
  for (const [c, n] of Object.entries(item.cost)) stars[c as StarColor] = (stars[c as StarColor] ?? 0) - (n ?? 0);
  setState({ ...s, wallet: { ...s.wallet, stars }, avatar: { ...s.avatar, owned: [...s.avatar.owned, item.id] } });
  evaluateBadges();
  return "ok";
}

export function equip(slot: Slot, id: string | null) {
  const s = getState();
  if (id) {
    const it = byId(id);
    if (!it || !isOwned(s.avatar, it)) return;
  } else if (!OPTIONAL_SLOTS.includes(slot)) return;
  const equipped = { ...s.avatar.equipped };
  if (id) equipped[slot] = id;
  else delete equipped[slot];
  setState({ ...s, avatar: { ...s.avatar, equipped } });
  evaluateBadges();
}

export const SLOT_LABEL: Record<Slot, [string, string, string]> = {
  skin: ["Skin", "膚色", "肤色"],
  hair: ["Hair", "髮型", "发型"],
  face: ["Face", "面部", "面部"],
  shirt: ["Shirt", "上衣", "上衣"],
  bottom: ["Pants/Dress", "褲/裙", "裤/裙"],
  shoes: ["Shoes", "鞋", "鞋"],
  hat: ["Hats", "帽子", "帽子"],
  belt: ["Belts", "腰帶", "腰带"],
  weapon: ["Weapons", "武器", "武器"],
};
