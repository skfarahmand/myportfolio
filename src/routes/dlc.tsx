import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Download, Lock, FileText } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ModelViewer } from "@/components/model-viewer";
import { downloads } from "@/data/downloads";

export const Route = createFileRoute("/dlc")({
  head: () => ({
    meta: [
      { title: "Downloadable Content — SoraKF" },
      {
        name: "description",
        content: "Bonus creations: 3D models, skate clips, piano and guitar.",
      },
      { property: "og:title", content: "Downloadable Content — SoraKF" },
      { property: "og:description", content: "A library of downloadable creative extras." },
    ],
    links: [
      {
        rel: "preload",
        href: "/downloads/models/kirby2.glb",
        as: "fetch",
        type: "model/gltf-binary",
        crossOrigin: "anonymous",
      },
    ],
  }),
  component: DlcPage,
});

const modelEntries = [
  {
    title: "Kirby",
    credit: "Model by SoraKF",
    url: "/downloads/models/kirby2.glb",
    alt: "Interactive 3D model of Kirby",
  },
  {
    title: "Black Rock Shooter",
    credit: "Model by Digitrevx",
    url: "/downloads/models/blackrockshooter.glb",
    alt: "Interactive 3D model of Black Rock Shooter",
  },
] as const;

function DlcPage() {
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const selectedModel = modelEntries[selectedModelIndex];

  const changeModel = (direction: number) => {
    setSelectedModelIndex((current) =>
      (current + direction + modelEntries.length) % modelEntries.length,
    );
  };

  return (
    <PageShell
      title="Downloadable Content"
      intro="A personal archive of 3D art, skate clips, and music. New entries unlock over time."
    >
      <div className="grid items-stretch gap-5 md:grid-cols-2">
        {downloads.map((d) => (
          <article
            key={d.id}
            className="panel ornate anim-fade-up flex h-full flex-col rounded-sm p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-lg uppercase tracking-[0.14em]">{d.title}</h2>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.24em] text-gold">
                  {d.fileType}
                  {d.size ? ` · ${d.size}` : ""}
                </p>
              </div>
              <span className="rounded-sm border border-border p-2 text-muted-foreground">
                {d.comingSoon ? (
                  <Lock className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <FileText className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
            </div>
            <div className="divider-key my-4" />
            <p className="text-sm leading-relaxed text-foreground/90">{d.description}</p>
            {d.id === "maya-models" && d.url && (
              <div className="mt-5">
              <div className="overflow-hidden rounded-sm border border-royal/35 bg-card shadow-[0_14px_35px_-28px_rgba(28,78,135,0.65)] dark:border-border dark:bg-black/35 dark:shadow-none">
                <div className="relative border-b border-gold/70 bg-gradient-to-r from-sky-50 via-white to-blue-50 px-4 py-3 pr-16 dark:border-border dark:bg-none dark:bg-transparent">
                  <p className="font-display text-xs uppercase tracking-[0.16em]" aria-live="polite">
                    {selectedModel.title}
                  </p>
                  <p className="mt-1 text-[0.58rem] uppercase tracking-[0.2em] text-gold">
                    {selectedModel.credit}
                  </p>
                  <p className="mt-1 text-[0.58rem] uppercase tracking-[0.2em] text-muted-foreground">
                    Drag to rotate · Scroll or pinch to zoom
                  </p>
                  <a
                    href={selectedModel.url}
                    download
                    title={`Download ${selectedModel.title} model`}
                    aria-label={`Download ${selectedModel.title} model`}
                    className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm border border-gold/60 bg-gold/10 text-foreground transition-colors hover:border-gold hover:bg-gold/25"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
                <div className="flex items-center justify-between border-b border-border bg-background/55 px-3 py-2">
                  <button
                    type="button"
                    onClick={() => changeModel(-1)}
                    aria-label="View previous 3D model"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-gold hover:bg-gold/15"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="font-display text-[0.62rem] tracking-[0.2em] text-muted-foreground">
                    {String(selectedModelIndex + 1).padStart(2, "0")} / {String(modelEntries.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() => changeModel(1)}
                    aria-label="View next 3D model"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-gold hover:bg-gold/15"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <ModelViewer key={selectedModel.url} src={selectedModel.url} alt={selectedModel.alt} />
              </div>
              </div>
            )}
            {d.files && (
              <div
                className={
                  d.files.length > 1 ? "mt-5 grid gap-6 sm:grid-cols-2" : "mt-5 grid gap-6"
                }
              >
                {d.files.map((file) => (
                  <div
                    key={file.url}
                    className="flex flex-col overflow-hidden rounded-sm border border-royal/30 bg-background/35 shadow-[0_12px_30px_-26px_rgba(28,78,135,0.75)] dark:border-border dark:bg-black/25 dark:shadow-none"
                  >
                    <div className="flex min-h-14 w-full items-center justify-between gap-2 border-b border-gold/55 bg-gradient-to-r from-sky-50/80 via-white/60 to-blue-50/70 px-3 py-2 dark:bg-none dark:bg-black/20">
                    <p className="font-display text-xs uppercase tracking-[0.16em]">
                      {file.title}
                      {file.size && (
                        <span className="ml-2 text-[0.58rem] text-muted-foreground">
                          {file.size}
                        </span>
                      )}
                    </p>
                    <a
                      href={file.url}
                      download
                      title={`Download ${file.title}`}
                      aria-label={`Download ${file.title}`}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-gold/60 bg-gold/10 text-foreground transition-colors hover:border-gold hover:bg-gold/25"
                    >
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                    </div>
                    <div
                      className={
                        file.url.includes("/guitar/")
                          ? "mx-auto aspect-[9/16] w-full max-w-[14.5rem] overflow-hidden bg-black"
                          : "flex w-full items-center justify-center overflow-hidden bg-black/95"
                      }
                    >
                      <video
                        controls
                        preload="metadata"
                        playsInline
                        className={
                          file.url.includes("/piano/")
                            ? "h-auto max-h-[32rem] w-full bg-black object-contain"
                            : file.url.includes("/guitar/")
                              ? "h-full w-full scale-x-[1.06] object-cover"
                            : file.url.endsWith("k5-0.mp4")
                            ? "dlc-skate-clip-primary aspect-[9/16] max-h-[32rem] w-full bg-black object-cover"
                            : "aspect-[9/16] max-h-[32rem] w-full bg-black object-cover"
                        }
                      >
                        <source src={file.url} type="video/mp4" />
                        Your browser does not support MP4 video playback.
                      </video>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!d.files && d.id !== "maya-models" && <div className="mt-5">
              {d.comingSoon || !d.url ? (
                <span className="inline-flex items-center gap-2 rounded-sm border border-dashed border-border px-4 py-2 font-display text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Coming soon
                </span>
              ) : (
                <a
                  href={d.url}
                  download
                  title={`Download ${d.title}`}
                  aria-label={`Download ${d.title}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-gold/60 bg-gold/10 text-foreground transition-colors hover:border-gold hover:bg-gold/25"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>}
          </article>
        ))}
      </div>
    </PageShell>
  );
}
