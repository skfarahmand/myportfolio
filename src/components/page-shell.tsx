import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SoraLogo } from "@/components/sora-logo";
import { Atmosphere } from "@/components/atmosphere";
import { menuItems } from "@/data/site";
import keyblade from "@/assets/keyblade.png";

/** Shared shell for every internal (non-home) page. */
export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <Atmosphere />
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" aria-label="SoraKF — back to title screen" className="shrink-0">
            <SoraLogo size="compact" />
          </Link>
          <nav aria-label="Pages" className="flex flex-wrap justify-end gap-x-4 gap-y-1">
            {menuItems.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                className="font-display text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground sm:text-xs"
                activeProps={{ className: "text-gold" }}
              >
                {m.label === "Downloadable Content" ? "DLC" : m.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6">
        <div className="anim-fade-up mb-8">
          <div className="flex items-center gap-4">
            <img
              src={keyblade}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={1024}
              height={1536}
              className="h-14 w-auto -rotate-12 opacity-80 drop-shadow-[0_0_12px_var(--gold)]"
            />
            <h1 className="page-heading-metal font-display text-3xl uppercase tracking-[0.2em] text-metal sm:text-4xl">
              {title}
            </h1>
          </div>
          {intro && <p className="mt-4 max-w-2xl text-muted-foreground">{intro}</p>}
          <div className="divider-key mt-6" />
        </div>
        {children}
      </main>
    </div>
  );
}
