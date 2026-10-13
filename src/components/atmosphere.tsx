import { useSettings } from "@/components/settings-provider";
import bgDark from "@/assets/bg-dark.jpg";
import bgLight from "@/assets/bg-light.jpg";

/**
 * Full-bleed atmospheric background: night castle in dark mode,
 * watercolour sky in light mode, plus drifting mist and stars.
 */
export function Atmosphere({ intense = false }: { intense?: boolean }) {
  const { resolvedTheme } = useSettings();
  const src = resolvedTheme === "dark" ? bgDark : bgLight;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <img
        src={src}
        alt=""
        width={1920}
        height={1088}
        className="anim-drift absolute inset-0 h-full w-full scale-110 object-cover"
        style={{ opacity: intense ? 1 : 0.55 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, var(--background) 0%, color-mix(in oklab, var(--background) 78%, transparent) 38%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 120%, color-mix(in oklab, var(--background) 85%, transparent), transparent 60%)",
        }}
      />
      <Motes />
    </div>
  );
}

function Motes() {
  const motes = Array.from({ length: 18 }, (_, i) => ({
    left: (i * 37) % 100,
    top: (i * 61) % 100,
    size: 2 + (i % 3),
    delay: (i % 7) * 0.8,
    dur: 6 + (i % 5),
  }));
  return (
    <div className="absolute inset-0">
      {motes.map((m, i) => (
        <span
          key={i}
          className="anim-float absolute rounded-full bg-moon"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            opacity: 0.5,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.dur}s`,
            boxShadow: "0 0 8px var(--moon)",
          }}
        />
      ))}
    </div>
  );
}
