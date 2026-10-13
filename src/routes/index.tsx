import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SoraLogo } from "@/components/sora-logo";
import { TitleMenu } from "@/components/title-menu";
import { Atmosphere } from "@/components/atmosphere";
import { menuItems, site } from "@/data/site";
import keyblade from "@/assets/keyblade.png";
import oblivionKeyblade from "@/assets/oblivion-keyblade.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SoraKF — Portfolio Title Screen" },
      {
        name: "description",
        content:
          "SoraKF: a Kingdom Hearts inspired portfolio title screen. Explore projects, resume, downloads and contact.",
      },
      { property: "og:title", content: "SoraKF — Portfolio Title Screen" },
      {
        property: "og:description",
        content: "A fantasy JRPG styled portfolio: projects, resume, downloads and contact.",
      },
    ],
  }),
  component: TitleScreen,
});

function TitleScreen() {
  const [hovered, setHovered] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState<"locked" | "unlocking" | "open" | "leaving">(
    "locked",
  );
  const desc = menuItems[hovered]?.desc ?? "";

  useEffect(() => {
    if (window.sessionStorage.getItem("sorakf.realm.intro.seen.v1") === "true") {
      setShowIntro(false);
    }
  }, []);

  const finishIntro = () => {
    window.sessionStorage.setItem("sorakf.realm.intro.seen.v1", "true");
    setIntroPhase("leaving");
    window.setTimeout(() => setShowIntro(false), 650);
  };

  const unlockRealm = () => {
    if (introPhase !== "locked") return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset["reducedMotion"] === "true"
    ) {
      finishIntro();
      return;
    }

    setIntroPhase("unlocking");
    window.setTimeout(() => setIntroPhase("open"), 700);
    window.setTimeout(() => setIntroPhase("leaving"), 1750);
    window.setTimeout(() => {
      window.sessionStorage.setItem("sorakf.realm.intro.seen.v1", "true");
      setShowIntro(false);
    }, 2400);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Atmosphere intense />

      <div className="absolute right-0 top-0 hidden h-full w-1/2 items-center justify-center lg:flex">
        <img
          src={keyblade}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1536}
          className="anim-float h-[68vh] w-auto rotate-6 opacity-75 drop-shadow-[0_0_60px_var(--royal)] dark:hidden"
        />
        <img
          src={oblivionKeyblade}
          alt=""
          aria-hidden="true"
          width={1672}
          height={941}
          className="anim-float hidden w-[40vw] max-w-[48rem] -rotate-[16deg] scale-x-[-1] opacity-90 drop-shadow-[0_0_48px_rgba(120,74,190,0.62)] dark:block"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-14 sm:px-8">
        <div className="anim-fade-up">
          <p className="mb-4 font-display text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
            {site.role}
          </p>
          <SoraLogo size="hero" />
        </div>

        <div className="mt-10 anim-fade-up sm:mt-14" style={{ animationDelay: "0.15s" }}>
          <TitleMenu onHoverChange={setHovered} />
        </div>

        <div className="mt-10 max-w-xl">
          <div className="divider-key mb-3" />
          <p aria-live="polite" className="min-h-10 text-sm text-muted-foreground">
            {desc}
          </p>
          <p className="mt-4 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground/70">
            ↑ ↓ to browse · Enter to select
          </p>
        </div>
      </div>

      {showIntro && (
        <div
          className="realm-intro fixed inset-0 z-[100] flex cursor-pointer items-center justify-center overflow-hidden bg-[#010713] text-white"
          data-phase={introPhase}
          role="button"
          tabIndex={0}
          aria-label="Unlock SoraKF's Realm"
          onClick={unlockRealm}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              unlockRealm();
            }
          }}
        >
          <div className="realm-intro-stars absolute inset-0" aria-hidden="true" />
          <div className="realm-awakening-glow" aria-hidden="true" />
          <div className="realm-awakening relative flex h-full w-full flex-col items-center justify-center px-6 py-10">
            <div className="realm-awakening-sigil" aria-hidden="true">
              <span className="realm-clock-gear realm-clock-gear-outer" />
              <span className="realm-clock-gear realm-clock-gear-inner" />
              <span className="realm-awakening-ring realm-awakening-ring-outer" />
              <span className="realm-awakening-ring realm-awakening-ring-inner" />
              <span className="realm-clock-color-arc" />
              <span className="realm-clock-numeral realm-clock-xii">XII</span>
              <span className="realm-clock-numeral realm-clock-iii">III</span>
              <span className="realm-clock-numeral realm-clock-vi">VI</span>
              <span className="realm-clock-numeral realm-clock-ix">IX</span>
              <span className="realm-clock-hand realm-clock-hand-hour" />
              <span className="realm-clock-hand realm-clock-hand-minute" />
              <span className="realm-clock-pin" />
            </div>
            <div className="realm-awakening-title relative z-10 text-center">
              <p className="realm-awakening-kicker">The Realm Awaits</p>
              <h1 className="kh-title mt-3 text-[clamp(3.4rem,10vw,8rem)] leading-none">{site.name}</h1>
              <div className="realm-awakening-divider" aria-hidden="true"><span /></div>
              <p className="font-display text-[0.62rem] uppercase tracking-[0.42em] text-slate-300 sm:text-xs">
                Journey Through My Realm
              </p>
            </div>
            <div className="realm-book" aria-label="A closed illustrated book sealing the entrance to the Realm">
              <div className="realm-book-light" aria-hidden="true" />
              <div className="realm-book-cover realm-book-cover-left" aria-hidden="true">
                <span className="realm-book-corner realm-book-corner-tl" />
                <span className="realm-book-corner realm-book-corner-bl" />
                <span className="realm-book-star">✦</span>
              </div>
              <div className="realm-book-cover realm-book-cover-right" aria-hidden="true">
                <span className="realm-book-corner realm-book-corner-tr" />
                <span className="realm-book-corner realm-book-corner-br" />
                <span className="realm-book-crown">♛</span>
              </div>
              <div className="realm-book-title">
                <span className="realm-book-kicker">The Story of</span>
                <strong>SoraKF's Realm</strong>
                <span className="realm-book-rule" />
                <span className="realm-book-subtitle">A Journey Through Worlds Yet Unwritten</span>
              </div>
              <div className="realm-book-lock" aria-hidden="true">
                <span />
              </div>
            </div>

            <div className="realm-intro-copy relative z-10 mt-16 text-center">
              <p className="font-display text-lg uppercase tracking-[0.28em] text-gold sm:text-2xl">
                Enter the Realm
              </p>
              <p className="mt-3 text-[0.62rem] uppercase tracking-[0.3em] text-slate-300">
                Click anywhere · or press Enter
              </p>
            </div>

            <img
              src={keyblade}
              alt=""
              aria-hidden="true"
              className="realm-awakening-keyblade pointer-events-none absolute h-[46vh] max-h-[34rem] w-auto drop-shadow-[0_0_30px_rgba(105,180,255,0.8)] dark:hidden"
            />
            <img
              src={oblivionKeyblade}
              alt=""
              aria-hidden="true"
              className="realm-awakening-keyblade realm-awakening-keyblade-oblivion pointer-events-none absolute hidden w-[30vw] max-w-[32rem] drop-shadow-[0_0_34px_rgba(145,88,218,0.85)] dark:block"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              finishIntro();
            }}
            className="absolute bottom-5 right-5 rounded-sm border border-white/25 bg-black/30 px-4 py-2 font-display text-[0.58rem] uppercase tracking-[0.22em] text-slate-300 transition-colors hover:border-gold hover:text-gold"
          >
            Skip Intro
          </button>
        </div>
      )}
    </div>
  );
}
