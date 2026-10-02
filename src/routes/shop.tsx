import { createFileRoute, Link } from "@tanstack/react-router";
import { Shirt } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { tr } from "@/lib/tr";
import hourglassImg from "@/assets/icon-hourglass.png";
import stallImg from "@/assets/bg-shop-stall.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Acelexia" },
      { name: "description", content: "Choose the Tools shop for hour-glasses and potions, or the Avatar Shop for clothes and weapons." },
      { property: "og:title", content: "Shop — Acelexia" },
      { property: "og:description", content: "Tools and avatar gear for your stars." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ShopHub,
});

function ShopHub() {
  const { lang, t } = useLang();
  const door = "bg-card border-4 border-border rounded-3xl p-8 shadow-xl text-center hover:border-primary hover:scale-[1.02] transition";
  return (
    <main className="min-h-screen px-6 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${stallImg})` }} aria-hidden />
      <div className="relative max-w-3xl mx-auto">
        <Link to="/game" className="text-primary font-semibold">{t("back_map")}</Link>
        <h1 className="mt-3 text-4xl font-extrabold">{t("star_shop")}</h1>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Link to="/tools" className={door}>
            <img src={hourglassImg} alt="" width={512} height={512} className="w-28 h-28 mx-auto object-contain" />
            <h2 className="mt-3 text-2xl font-extrabold">{tr(lang, "Tools", "道具", "道具")}</h2>
          </Link>
          <Link to="/avatarshop" className={door}>
            <Shirt size={112} className="mx-auto text-primary" aria-hidden />
            <h2 className="mt-3 text-2xl font-extrabold">{tr(lang, "Avatar Shop", "角色商店", "角色商店")}</h2>
          </Link>
        </div>
      </div>
    </main>
  );
}
