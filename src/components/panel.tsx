import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Panel({
  children,
  className,
  title,
  icon,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
}) {
  return (
    <section className={cn("panel ornate anim-fade-up rounded-sm p-6 sm:p-8", className)}>
      {title && (
        <header className="mb-5">
          <h2 className="flex items-center gap-3 text-lg uppercase tracking-[0.28em] text-foreground sm:text-xl">
            {icon}
            {title}
          </h2>
          <div className="divider-key mt-3" />
        </header>
      )}
      {children}
    </section>
  );
}
