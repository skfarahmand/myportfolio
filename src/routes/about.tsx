import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Award, BookOpen, Download, GraduationCap, Lock, UserRound, Wrench } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { about, site } from "@/data/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Profile — SoraKF" },
      {
        name: "description",
        content: "Profile, education, interests, technical skills and achievements of SoraKF.",
      },
      { property: "og:title", content: "Profile — SoraKF" },
      { property: "og:description", content: "Bio, skills and achievements." },
    ],
  }),
  component: ProfilePage,
});

const tabs = ["bio", "skills", "achievements"] as const;
type ProfileTab = (typeof tabs)[number];

function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("bio");

  return (
    <PageShell title="Profile" intro="Choose a record to learn more about the person behind the realm.">
      <section className="project-archive-pattern panel ornate anim-fade-up overflow-hidden rounded-sm">
        <header className="border-b border-border bg-background/55 p-3 backdrop-blur-sm sm:p-4">
          <div className="grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Profile sections">
            {tabs.map((tab) => {
              const label = tab === "bio" ? "Bio" : tab === "skills" ? "Skills" : "Achievements";
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`profile-panel-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative min-h-12 rounded-sm border px-5 py-3 font-display text-sm uppercase tracking-[0.18em] transition-all",
                    activeTab === tab
                      ? "border-primary bg-primary/20 text-foreground shadow-[inset_0_-3px_0_var(--gold),0_0_18px_rgba(53,151,219,0.16)]"
                      : "border-border bg-background/45 text-muted-foreground hover:border-primary/70 hover:bg-primary/10 hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </header>

        <div className="min-h-[34rem] bg-background/42 p-4 backdrop-blur-[1px] sm:p-6 lg:p-8">
          {activeTab === "bio" && <BioPanel />}
          {activeTab === "skills" && <SkillsPanel />}
          {activeTab === "achievements" && <AchievementsPanel />}
        </div>
      </section>
    </PageShell>
  );
}

function RecordCard({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon: typeof UserRound;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("project-archive-record rounded-sm border border-border bg-background/72 p-5 shadow-sm sm:p-6", className)}>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
        <h2 className="font-display text-lg uppercase tracking-[0.18em]">{title}</h2>
      </div>
      <div className="divider-key my-4" />
      {children}
    </section>
  );
}

function BioPanel() {
  return (
    <div id="profile-panel-bio" role="tabpanel" className="grid gap-5 lg:grid-cols-2">
      <RecordCard title="Profile" icon={UserRound}>
        <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
          {about.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-3">
          {[
            ["Name", site.fullName],
            ["Class", site.role],
            ["Location", site.location],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[0.56rem] uppercase tracking-[0.24em] text-gold">{label}</dt>
              <dd className="mt-1 text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </RecordCard>

      <RecordCard title="Objective" icon={BookOpen}>
        <p className="leading-relaxed text-foreground/90">{about.objective}</p>
      </RecordCard>

      <RecordCard title="Education" icon={GraduationCap}>
        <ul className="space-y-5">
          {about.education.filter((entry) => !entry.title.toLowerCase().includes("placeholder")).map((entry) => (
            <li key={entry.title} className="border-l-2 border-gold/70 pl-4">
              <p className="font-display uppercase tracking-[0.13em]">{entry.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{entry.org} · {entry.period}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/85">{entry.note}</p>
            </li>
          ))}
        </ul>
      </RecordCard>

      <RecordCard title="Interests" icon={Award}>
        <ul className="flex flex-wrap gap-3">
          {about.interests.map((interest) => (
            <li key={interest}>
              <button type="button" className="profile-skill-bubble group inline-flex items-center gap-2.5 px-4 py-2.5">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold transition-transform duration-200 group-hover:rotate-[135deg]" aria-hidden="true" />
                {interest}
              </button>
            </li>
          ))}
        </ul>
      </RecordCard>
    </div>
  );
}

function SkillsPanel() {
  return (
    <div id="profile-panel-skills" role="tabpanel" className="grid items-start gap-5 lg:grid-cols-[0.55fr_1.45fr]">
      <RecordCard title="Tools" icon={Wrench} className="self-start">
        <ul className="flex flex-wrap gap-2">
          {about.tools.map((tool) => (
            <li key={tool}>
              <button type="button" className="profile-skill-bubble">{tool}</button>
            </li>
          ))}
        </ul>
      </RecordCard>
      <RecordCard title="Technical Skills" icon={BookOpen}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {about.skills.map((skill) => (
            <div key={skill.group} className="rounded-xl border border-border bg-background/45 p-4 transition-colors hover:border-primary/50 hover:bg-background/65">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">{skill.group}</p>
              <ul className="flex flex-wrap gap-2 text-sm">
                {skill.items.map((item) => (
                  <li key={item}>
                    <button type="button" className="profile-skill-bubble">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </RecordCard>
    </div>
  );
}

function AchievementsPanel() {
  return (
    <div id="profile-panel-achievements" role="tabpanel">
      <RecordCard title="Certifications" icon={Award} className="mx-auto max-w-4xl">
        <ul className="profile-achievement-scroll max-h-[30rem] space-y-4 overflow-y-auto pl-3">
          {about.certifications.map((certification, index) => (
            <li
              key={certification.title}
              className="rounded-sm border border-primary/35 bg-primary/10 p-4 sm:p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-gold/50 bg-gold/10">
                  <Award className="h-5 w-5 text-gold" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-[0.55rem] uppercase tracking-[0.28em] text-gold">
                        Achievement {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 font-display uppercase tracking-[0.13em]">
                        {certification.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{certification.issuer}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg tracking-[0.12em] text-primary">
                        {certification.progress}%
                      </span>
                      {certification.certificateUrl ? (
                        <a
                          href={certification.certificateUrl}
                          download
                          title={`Download ${certification.title} certificate`}
                          aria-label={`Download ${certification.title} certificate`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-gold/60 bg-gold/10 transition-colors hover:border-gold hover:bg-gold/25"
                        >
                          <Download className="h-4 w-4" aria-hidden="true" />
                        </a>
                      ) : (
                        <span
                          title="Certificate unlocks when completed"
                          aria-label="Certificate download locked"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-background/50 text-muted-foreground/60"
                        >
                          <Lock className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-border/70 py-3 text-sm">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <dt className="text-sm font-medium uppercase tracking-[0.14em] text-gold">Start Date</dt>
                      <dd className="text-sm font-medium text-muted-foreground">{certification.startDate}</dd>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <dt className="text-sm font-medium uppercase tracking-[0.14em] text-gold">End Date</dt>
                      <dd className="text-sm font-medium text-muted-foreground">{certification.endDate}</dd>
                    </div>
                  </dl>
                  <div
                    className="mt-4 h-3 overflow-hidden rounded-full border border-primary/40 bg-background/75"
                    role="progressbar"
                    aria-label={`${certification.title} progress`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={certification.progress}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-royal via-primary to-gold shadow-[0_0_12px_rgba(62,158,229,0.7)] transition-[width] duration-500"
                      style={{ width: `${certification.progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-right text-[0.55rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {certification.progress >= 100 ? "Achievement Unlocked" : "In Progress"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </RecordCard>
    </div>
  );
}
