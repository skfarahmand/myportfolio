import { createFileRoute } from "@tanstack/react-router";
import { Moon, Sun, Monitor, Volume2, ListMusic, Accessibility, Info } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Panel } from "@/components/panel";
import { SoundtrackPlayer } from "@/components/soundtrack-player";
import { useSettings } from "@/components/settings-provider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — SoraKF" },
      {
        name: "description",
        content: "Configure display theme, sound, soundtrack and accessibility options.",
      },
      { property: "og:title", content: "Settings — SoraKF" },
      { property: "og:description", content: "Theme, sound and accessibility configuration." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const s = useSettings();

  const themes = [
    { key: "light" as const, label: "Light", icon: Sun },
    { key: "dark" as const, label: "Dark", icon: Moon },
    { key: "system" as const, label: "System", icon: Monitor },
  ];

  return (
    <PageShell title="Settings" intro="Configuration menu — every change saves to this device.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Display" icon={<Sun className="h-4 w-4 text-gold" aria-hidden="true" />}>
          <fieldset>
            <legend className="mb-3 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
              Theme
            </legend>
            <div className="flex flex-wrap gap-3">
              {themes.map((t) => {
                const Icon = t.icon;
                const active = s.theme === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => s.setTheme(t.key)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-sm border px-4 py-2 font-display text-xs uppercase tracking-[0.18em] transition-all",
                      active
                        ? "border-gold bg-gold/20 glow-soft"
                        : "border-border hover:border-primary hover:text-primary",
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" /> {t.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <p className="mt-4 text-sm text-muted-foreground">
            Currently showing the <span className="text-foreground">{s.resolvedTheme}</span> world.
          </p>
        </Panel>

        <Panel title="Sound" icon={<Volume2 className="h-4 w-4 text-gold" aria-hidden="true" />}>
          <Row
            label="Music"
            description="Nothing plays until you press play."
            checked={s.musicEnabled}
            onChange={s.setMusicEnabled}
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Turn music on, then use the player below to choose a track.
          </p>
        </Panel>

        <Panel
          title="Accessibility"
          icon={<Accessibility className="h-4 w-4 text-gold" aria-hidden="true" />}
        >
          <Row
            label="Reduced motion"
            description="Disables drifting backgrounds, floating motes and transitions."
            checked={s.reducedMotion}
            onChange={s.setReducedMotion}
          />
          <div className="divider-key my-5" />
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Every control is reachable and operable by keyboard.</li>
            <li>Focus states are always visible.</li>
            <li>
              Your system <code>prefers-reduced-motion</code> setting is respected automatically.
            </li>
          </ul>
        </Panel>

        <Panel title="Info" icon={<Info className="h-4 w-4 text-gold" aria-hidden="true" />}>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-display text-xs uppercase tracking-[0.16em] text-foreground">
                Overview
              </dt>
              <dd className="mt-1 text-muted-foreground">
                A personal portfolio designed as a fantasy JRPG title screen and interactive menu,
                inspired by the atmosphere, emotion, and interface design of Kingdom Hearts.
              </dd>
            </div>
            <div className="divider-key" />
            <div>
              <dt className="font-display text-xs uppercase tracking-[0.16em] text-foreground">
                Frontend stack
              </dt>
              <dd className="mt-1 text-muted-foreground">
                React 19, TypeScript, TanStack Router, TanStack Start, Tailwind CSS 4, Lucide icons,
                and Vite.
              </dd>
            </div>
            <div className="divider-key" />
            <div>
              <dt className="font-display text-xs uppercase tracking-[0.16em] text-foreground">
                Backend stack
              </dt>
              <dd className="mt-1 text-muted-foreground">
                TanStack Start server rendering with a Nitro server runtime and a Cloudflare-compatible
                production build.
              </dd>
            </div>
            <div className="divider-key" />
            <div>
              <dt className="font-display text-xs uppercase tracking-[0.16em] text-foreground">
                Database
              </dt>
              <dd className="mt-1 text-muted-foreground">
                No external database is currently required. Portfolio content lives in local TypeScript
                data files, while user preferences are saved in localStorage on this device.
              </dd>
            </div>
            <div className="divider-key" />
            <div>
              <dt className="font-display text-xs uppercase tracking-[0.16em] text-foreground">
                Disclaimer
              </dt>
              <dd className="mt-1 text-muted-foreground">
                This is an unofficial, fan-inspired portfolio and is not affiliated with or endorsed by
                Disney or Square Enix. Kingdom Hearts and related trademarks belong to their respective
                owners. Embedded media remains hosted and controlled by its original platform and publisher.
              </dd>
            </div>
          </dl>
        </Panel>

        <Panel
          title="Soundtrack"
          icon={<ListMusic className="h-4 w-4 text-gold" aria-hidden="true" />}
          className="lg:col-span-2"
        >
          <SoundtrackPlayer />
        </Panel>
      </div>
    </PageShell>
  );
}

function Row({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <span>
        <span className="block font-display text-sm uppercase tracking-[0.16em]">{label}</span>
        <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-7 w-14 shrink-0 rounded-full border transition-colors",
          checked ? "border-gold bg-gold/30" : "border-border bg-secondary",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full transition-all",
            checked ? "left-8 bg-gold" : "left-1 bg-muted-foreground",
          )}
        />
      </button>
    </div>
  );
}
