import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Github,
  KeyRound,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — SoraKF" },
      {
        name: "description",
        content: "Explore SoraKF's projects through an interactive Realm archive.",
      },
      { property: "og:title", content: "Projects — SoraKF" },
      { property: "og:description", content: "Selected projects, technology, code and demos." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = projects[selectedIndex] ?? projects[0]!;

  const selectRelative = (amount: number) => {
    setSelectedIndex((current) => (current + amount + projects.length) % projects.length);
  };

  const selectFromRail = (clientY: number, rail: HTMLElement) => {
    const bounds = rail.getBoundingClientRect();
    const position = Math.min(1, Math.max(0, (clientY - bounds.top) / bounds.height));
    setSelectedIndex(Math.round(position * (projects.length - 1)));
  };

  return (
    <PageShell
      title="Projects"
      intro="Choose a record from the archive to inspect the world, work, and weapon behind it."
    >
      <section className="project-archive-pattern panel ornate anim-fade-up overflow-hidden rounded-sm">
        <header className="px-5 pb-4 pt-6 sm:px-8">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/80" />
            <div className="flex items-center gap-3">
              <KeyRound className="h-5 w-5 text-gold" aria-hidden="true" />
              <h2 className="font-display text-xl uppercase tracking-[0.26em] sm:text-2xl">
                Projects
              </h2>
            </div>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/80" />
          </div>
        </header>

        <div className="grid border-t border-border lg:grid-cols-[17rem_minmax(0,1fr)]">
          <aside className="project-archive-sidebar border-b border-border bg-background/70 p-4 backdrop-blur-[2px] lg:border-b-0 lg:border-r lg:p-5">
            <p className="mb-3 px-3 text-[0.58rem] uppercase tracking-[0.3em] text-muted-foreground">
              Project Archive
            </p>
            <div className="grid grid-cols-[minmax(0,1fr)_1.25rem] gap-2">
              <div
                className="max-h-64 space-y-1 overflow-y-auto pr-1 lg:max-h-[38rem]"
                role="listbox"
                aria-label="Select a project"
                onWheel={(event) => {
                  if (Math.abs(event.deltaY) < 4) return;
                  selectRelative(event.deltaY > 0 ? 1 : -1);
                }}
              >
                {projects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    role="option"
                    aria-selected={index === selectedIndex}
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-sm px-4 py-3 text-left transition-all duration-200",
                      index === selectedIndex
                        ? "border border-primary/70 bg-primary/20 text-foreground shadow-[inset_3px_0_0_var(--gold)]"
                        : "border border-transparent text-muted-foreground hover:border-border hover:bg-secondary/50 hover:text-foreground",
                    )}
                  >
                    <span className="block text-[0.55rem] uppercase tracking-[0.25em] text-gold/85">
                      {project.world}
                    </span>
                    <span className="mt-1 block font-display text-sm uppercase tracking-[0.1em]">
                      {project.title}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex min-h-64 flex-col items-center lg:min-h-[38rem]" aria-label="Project scroll controls">
                <button
                  type="button"
                  onClick={() => selectRelative(-1)}
                  className="text-primary transition-colors hover:text-gold"
                  aria-label="Previous project"
                >
                  <ChevronUp className="h-4 w-4" aria-hidden="true" />
                </button>
                <div
                  className="relative my-1 w-4 flex-1 cursor-pointer touch-none"
                  role="slider"
                  tabIndex={0}
                  aria-label="Selected project"
                  aria-valuemin={1}
                  aria-valuemax={projects.length}
                  aria-valuenow={selectedIndex + 1}
                  onPointerDown={(event) => {
                    event.currentTarget.setPointerCapture(event.pointerId);
                    selectFromRail(event.clientY, event.currentTarget);
                  }}
                  onPointerMove={(event) => {
                    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                      selectFromRail(event.clientY, event.currentTarget);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      selectRelative(-1);
                    }
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      selectRelative(1);
                    }
                  }}
                >
                  <span className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary/40 via-silver to-primary/40" />
                  <span
                    className="pointer-events-none absolute left-1/2 h-14 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-gradient-to-b from-silver via-primary to-royal shadow-[0_0_10px_rgba(75,170,235,0.75)] transition-[top] duration-150"
                    style={{
                      top: `${projects.length > 1 ? 7 + (selectedIndex / (projects.length - 1)) * 86 : 50}%`,
                    }}
                    aria-hidden="true"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => selectRelative(1)}
                  className="text-primary transition-colors hover:text-gold"
                  aria-label="Next project"
                >
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </aside>

          <div className="project-archive-workspace min-w-0 bg-background/45 p-4 backdrop-blur-[1px] sm:p-6 lg:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[0.58rem] uppercase tracking-[0.3em] text-gold">
                  {selected.world} · Selected Project
                </p>
                <h3 className="mt-1 font-display text-2xl uppercase tracking-[0.13em] sm:text-3xl">
                  {selected.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => selectRelative(-1)}
                  className="rounded-sm border border-border p-2.5 transition-colors hover:border-primary hover:bg-primary/15"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="min-w-14 text-center font-display text-xs tracking-[0.2em] text-muted-foreground">
                  {String(selectedIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => selectRelative(1)}
                  className="rounded-sm border border-border p-2.5 transition-colors hover:border-primary hover:bg-primary/15"
                  aria-label="Next project"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[minmax(16rem,0.8fr)_minmax(20rem,1.2fr)]">
              <div className="ornate relative aspect-square overflow-hidden rounded-sm border border-primary/60 bg-[#020813] shadow-[0_0_30px_rgba(45,145,220,0.13)]">
                <img
                  key={selected.image}
                  src={selected.image}
                  alt={`Original fantasy project weapon for ${selected.title}`}
                  className="anim-fade-up h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-primary/5" />
                <span className="absolute bottom-3 left-3 rounded-sm border border-primary/40 bg-background/80 px-3 py-1 text-[0.55rem] uppercase tracking-[0.25em] text-primary backdrop-blur">
                  Project Weapon
                </span>
              </div>

              <div className="project-archive-record flex min-w-0 flex-col rounded-sm border border-border bg-background/30 p-5 sm:p-6">
                <p className="text-[0.58rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Project Record
                </p>
                <p className="mt-3 text-base leading-relaxed text-foreground/95">
                  {selected.summary}
                </p>
                {selected.details && (
                  <>
                    <div className="divider-key my-5" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {selected.details}
                    </p>
                  </>
                )}

                <div className="mt-6">
                  <p className="text-[0.58rem] uppercase tracking-[0.28em] text-gold">
                    Abilities & Tools
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {selected.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-sm border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs tracking-wide"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  {selected.github && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-border px-4 py-2 font-display text-[0.65rem] uppercase tracking-[0.2em] transition-colors hover:border-gold hover:text-gold"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" /> View Code
                    </a>
                  )}
                  {selected.demo && (
                    <a
                      href={selected.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-primary/70 bg-primary/15 px-4 py-2 font-display text-[0.65rem] uppercase tracking-[0.2em] transition-colors hover:bg-primary/30"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" /> {selected.demoLabel ?? "Open Project"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
