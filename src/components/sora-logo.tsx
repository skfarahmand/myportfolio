import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import { MoonStar, Sun } from "lucide-react";

/** Crown + heart + keyhole ornament used above the wordmark. */
function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true" fill="none">
      <path
        d="M60 88C42 74 22 62 22 44c0-11 8-19 18-19 8 0 15 5 20 13 5-8 12-13 20-13 10 0 18 8 18 19 0 18-20 30-38 44Z"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.75"
      />
      <path
        d="M28 30 22 8l16 12L60 4l22 16 16-12-6 22Z"
        fill="currentColor"
        opacity="0.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="60" cy="46" r="7" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
      <path d="M60 53v16" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
    </svg>
  );
}

type Size = "hero" | "compact";

export function SoraLogo({
  size = "hero",
  showSubtitle = true,
  className,
}: {
  size?: Size;
  showSubtitle?: boolean;
  className?: string;
}) {
  const hero = size === "hero";
  return (
    <div className={cn("select-none", hero ? "text-center sm:text-left" : "", className)}>
      {hero && (
        <Crest className="mx-auto mb-3 h-16 w-20 text-gold drop-shadow-[0_0_14px_var(--gold)] sm:mx-0" />
      )}
      <div className="inline-flex items-center gap-2.5">
        <div
          className={cn(
            "kh-title inline-block pr-[0.12em] leading-[0.95]",
            hero ? "text-[clamp(3.2rem,11vw,7.5rem)]" : "text-2xl",
          )}
        >
          {site.name}
        </div>
        {!hero && (
          <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center" aria-hidden="true">
            <span className="absolute inset-1 rounded-full bg-gold/15 blur-sm dark:hidden" />
            <Sun className="relative h-5 w-5 text-gold drop-shadow-[0_0_6px_var(--gold)] dark:hidden" strokeWidth={1.5} />
            <span className="absolute inset-1 hidden rounded-full bg-primary/20 blur-sm dark:block" />
            <MoonStar className="relative hidden h-5 w-5 text-silver drop-shadow-[0_0_7px_var(--primary)] dark:block" strokeWidth={1.5} />
          </span>
        )}
      </div>
      {showSubtitle && (
        <div
          className={cn(
            "mt-2 flex items-center gap-3",
            hero ? "justify-center sm:justify-start" : "",
          )}
        >
          <span className="h-px w-8 bg-gold/70" />
          <span
            className={cn(
              "font-display uppercase tracking-[0.42em] text-gold",
              hero ? "text-[clamp(0.8rem,2.4vw,1.5rem)]" : "text-[0.6rem]",
            )}
          >
            {site.subtitle}
          </span>
          <span className="h-px w-8 bg-gold/70" />
        </div>
      )}
    </div>
  );
}
