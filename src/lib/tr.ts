// Inline three-language text helper for newer screens.
import type { Lang } from "./i18n";

export function tr(lang: Lang, en: string, tw: string, cn?: string) {
  if (lang === "en") return en;
  if (lang === "zh-CN") return cn ?? tw;
  return tw;
}
