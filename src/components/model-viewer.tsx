import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

type ModelViewerProps = {
  src: string;
  alt: string;
};

export function ModelViewer({ src, alt }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerReady, setViewerReady] = useState(false);

  useEffect(() => {
    let active = true;
    void import("@google/model-viewer").then(() => {
      if (active) setViewerReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await containerRef.current?.requestFullscreen();
    }
  };

  return (
    <div ref={containerRef} className="model-viewer-shell relative bg-[#dce8f2] dark:bg-[#020916]">
      {!viewerReady && (
        <div className="flex h-[28rem] items-center justify-center bg-[radial-gradient(circle_at_center,#f1f6fa,#c7d8e6)] font-display text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground dark:bg-[radial-gradient(circle_at_center,rgba(64,118,181,0.2),rgba(2,9,22,0.82))]">
          Loading 3D model…
        </div>
      )}
      {viewerReady && <model-viewer
        src={src}
        alt={alt}
        loading="eager"
        reveal="auto"
        camera-controls
        touch-action="pan-y"
        interaction-prompt="auto"
        shadow-intensity="0.65"
        shadow-softness="0.8"
        environment-image="neutral"
        exposure="0.42"
        camera-orbit={isFullscreen ? "0deg 78deg 125%" : "0deg 78deg 105%"}
        camera-target="0m auto auto"
        field-of-view={isFullscreen ? "34deg" : "32deg"}
        min-camera-orbit="auto auto 35%"
        max-camera-orbit="auto auto 250%"
        class="h-[28rem] w-full bg-[radial-gradient(circle_at_center,#f1f6fa,#c7d8e6)] dark:bg-[radial-gradient(circle_at_center,rgba(64,118,181,0.2),rgba(2,9,22,0.82))]"
      >
        <div slot="progress-bar" className="h-0.5 bg-gold" />
      </model-viewer>}
      <button
        type="button"
        onClick={toggleFullscreen}
        title={isFullscreen ? "Exit full screen" : "Maximize model viewer"}
        className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-sm border border-gold/70 bg-[#020916]/90 text-slate-100 shadow-lg backdrop-blur-sm transition-colors hover:border-gold hover:bg-[#11213a] hover:text-white"
        aria-label={isFullscreen ? "Exit full screen model viewer" : "Maximize model viewer"}
      >
        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": {
        src: string;
        alt: string;
        class?: string;
        "camera-controls"?: boolean;
        loading?: "auto" | "lazy" | "eager";
        reveal?: "auto" | "interaction" | "manual";
        "touch-action"?: string;
        "interaction-prompt"?: string;
        "shadow-intensity"?: string;
        "shadow-softness"?: string;
        "environment-image"?: string;
        exposure?: string;
        "camera-orbit"?: string;
        "camera-target"?: string;
        "field-of-view"?: string;
        "min-camera-orbit"?: string;
        "max-camera-orbit"?: string;
        children?: React.ReactNode;
      };
    }
  }
}
