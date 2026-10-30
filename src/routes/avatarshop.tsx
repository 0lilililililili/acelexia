import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { SLOTS } from "@/lib/avatar";
import { SLOT_LABEL } from "@/lib/avatar-shop";
import { useLang } from "@/lib/i18n";
import { tr } from "@/lib/tr";
import { StarRow } from "@/components/stars";
import { useGameState } from "./avatar";
import { Button } from "@/components/ui/button";
import { Store, UserRound } from "lucide-react";

export const Route = createFileRoute("/avatarshop")({
  head: () => ({
    meta: [
      { title: "Avatar Shop — Acelexia" },
      { name: "description", content: "Unlock clothes, hats and weapons for your avatar with LV and stars." },
      { property: "og:title", content: "Avatar Shop — Acelexia" },
      { property: "og:description", content: "Unlock gear for your avatar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AvatarShopLayout,
});

function AvatarShopLayout() {
  const { lang } = useLang();
  const s = useGameState();
  return (
    <main className="min-h-screen px-4 py-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center gap-6 flex-wrap">
        <Button asChild variant="ghost"><Link to="/shop"><Store />← {tr(lang, "Shop", "商店", "商店")}</Link></Button>
        <Button asChild variant="outline" className="border-2 border-primary"><Link to="/avatar"><UserRound />{tr(lang, "My Avatar", "我的角色", "我的角色")}</Link></Button>
      </div>
      <header className="mt-3 flex items-center gap-3 flex-wrap">
        <h1 className="text-4xl font-extrabold">{tr(lang, "Avatar Shop", "角色商店", "角色商店")}</h1>
        <div className="ml-auto bg-card border-2 border-border rounded-2xl px-4 py-2 shadow">{s && <StarRow stars={s.wallet.stars} />}</div>
      </header>
      <nav className="mt-4 flex flex-wrap gap-2">
        {SLOTS.filter((x) => x !== "skin").map((sl) => (
          <Link key={sl} to="/avatarshop/$category" params={{ category: sl }}
            className="rounded-2xl border-2 border-border bg-card px-4 py-2 font-bold"
            activeProps={{ className: "rounded-2xl border-2 border-primary bg-primary text-primary-foreground px-4 py-2 font-bold" }}>
            {tr(lang, ...SLOT_LABEL[sl])}
          </Link>
        ))}
      </nav>
      <Outlet />
    </main>
  );
}
