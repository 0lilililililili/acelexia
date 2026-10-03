import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import pirateMap from "@/assets/pirate-map.jpg";
import mascot from "@/assets/mascot-dragon.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Acelexia — Reading & Math Adventure for Dyslexic Kids" },
      { name: "description", content: "A friendly game that helps K3–P6 dyslexic kids in Hong Kong practice Chinese, English and Math through voice." },
      { property: "og:title", content: "Acelexia" },
      { property: "og:description", content: "Reading & math adventure for dyslexic kids." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),

  component: Home1,
});

function Home1() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{
        backgroundImage: `url(${pirateMap})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Warm parchment veil for readability */}
      <div className="absolute inset-0 bg-background/80" />
      <Link to="/about" aria-label="About us" title="About us" className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-card border-2 border-border shadow hover:border-primary px-3 py-2 font-extrabold">
        <HelpCircle className="text-primary" size={28} aria-hidden />
        <span>About us</span>
      </Link>

      <div className="relative z-10 text-center max-w-2xl">
        <img
          src={mascot}
          alt="Acelexia dragon mascot"
          width={220}
          height={220}
          className="mx-auto drop-shadow-xl"
        />
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight brand-outline">
          Acelexia
        </h1>

        <p className="mt-4 inline-block rounded-lg bg-background/90 px-4 py-2 text-lg font-extrabold text-foreground shadow">
          知識 = power, literally
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            to="/signup"
            className="rounded-2xl bg-primary text-primary-foreground px-6 py-5 text-lg font-bold shadow-lg hover:scale-[1.03] transition"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className="rounded-2xl bg-card border-2 border-primary text-primary px-6 py-5 text-lg font-bold hover:scale-[1.03] transition"
          >
            Log in
          </Link>
        </div>


        <p className="mt-8 text-sm text-foreground/70">
          Designed for dyslexic kids • K3 to P6 • Hong Kong
        </p>
      </div>
    </main>
  );
}
