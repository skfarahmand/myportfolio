import { createFileRoute } from "@tanstack/react-router";
import { Download, ExternalLink } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Panel } from "@/components/panel";
import { site } from "@/data/site";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — SoraKF" },
      { name: "description", content: "View, preview or download the resume of SoraKF." },
      { property: "og:title", content: "Resume — SoraKF" },
      { property: "og:description", content: "Download or preview the full resume." },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <PageShell title="Resume" intro="Read it here, open it in a new tab, or take a copy with you.">
      <div className="mb-6 flex flex-wrap gap-3">
        <a
          href={site.resumeUrl}
          download
          className="inline-flex items-center gap-2 rounded-sm border border-gold/70 bg-gold/15 px-5 py-2.5 font-display text-xs uppercase tracking-[0.22em] transition-colors hover:bg-gold/30"
        >
          <Download className="h-4 w-4" aria-hidden="true" /> Download Resume
        </a>
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-2.5 font-display text-xs uppercase tracking-[0.22em] transition-colors hover:border-primary hover:text-primary"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" /> Open in new tab
        </a>
      </div>

      <Panel title="Preview">
        <div className="hidden overflow-hidden rounded-sm border border-border md:block">
          <iframe
            src={`${site.resumeUrl}#view=FitH`}
            className="h-[75vh] w-full bg-muted"
            title="Resume preview"
          />
        </div>
        <p className="text-sm text-muted-foreground md:hidden">
          Inline previews aren&apos;t reliable on mobile — use{" "}
          <span className="text-foreground">Open in new tab</span> or{" "}
          <span className="text-foreground">Download Resume</span> above.
        </p>
      </Panel>
    </PageShell>
  );
}
