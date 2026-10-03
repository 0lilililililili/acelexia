import { Link, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

/** Return to the previous in-app page; direct visits get a useful destination. */
export function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  return (
    <Button asChild variant="link" className={`p-0 h-auto font-semibold ${className}`}>
      <Link to="/game" onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (typeof window !== "undefined" && window.history.length > 1 && document.referrer.startsWith(window.location.origin)) {
          event.preventDefault();
          router.history.back();
        }
      }}>← Back</Link>
    </Button>
  );
}