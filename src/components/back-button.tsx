import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

/** Players go back toward /game; admins always land back on /admin. */
export function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  return (
    <Button asChild variant="link" className={`p-0 h-auto font-semibold ${className}`}>
      <Link to="/game" onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (typeof window === "undefined") return;
        const isAdmin = !!window.sessionStorage.getItem("wq_admin");
        const path = window.location.pathname.replace(/\/$/, "");
        if (isAdmin && path !== "/admin") {
          event.preventDefault();
          router.navigate({ to: "/admin" });
          return;
        }
        if (window.history.length > 1 && document.referrer.startsWith(window.location.origin)) {
          event.preventDefault();
          router.history.back();
        }
      }}>← Back</Link>
    </Button>
  );
}
