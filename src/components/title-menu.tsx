import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { menuItems } from "@/data/site";
import { cn } from "@/lib/utils";

/** Kingdom Hearts style vertical title-screen menu with keyboard support. */
export function TitleMenu({ onHoverChange }: { onHoverChange?: (i: number) => void }) {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const refs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    onHoverChange?.(active);
  }, [active, onHoverChange]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => {
          const n = menuItems.length;
          const next = (i + (e.key === "ArrowDown" ? 1 : -1) + n) % n;
          refs.current[next]?.focus();
          return next;
        });
      }
      if (e.key === "Enter") {
        const item = menuItems[active];
        if (item && document.activeElement === document.body) {
          void navigate({ to: item.to });
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  return (
    <nav aria-label="Main menu" className="w-full max-w-lg">
      <ul className="flex flex-col">
        {menuItems.map((item, i) => {
          const selected = i === active;
          return (
            <li key={item.to} className="relative">
              <Link
                to={item.to}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={selected ? "true" : undefined}
                className={cn(
                  "group relative flex items-center gap-3 border-b border-border/70 py-2.5 pl-6 pr-3 font-display text-lg uppercase tracking-[0.16em] transition-all duration-300 sm:text-xl",
                  selected ? "text-primary-foreground" : "text-foreground/85",
                )}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 -z-10 rounded-r-sm transition-all duration-300"
                  style={{
                    backgroundImage: "var(--gradient-select)",
                    width: selected ? "100%" : "0%",
                    opacity: selected ? 1 : 0,
                  }}
                />
                {selected && (
                  <span
                    aria-hidden="true"
                    className="anim-pulse-orb absolute -left-6 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-gold"
                    style={{ boxShadow: "0 0 14px var(--gold), 0 0 28px var(--gold)" }}
                  />
                )}
                <span
                  className={cn(
                    "transition-transform duration-300",
                    selected ? "translate-x-1" : "",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
