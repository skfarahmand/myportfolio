import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  ExternalLink,
  Music,
} from "lucide-react";
import { useState } from "react";
import { useSettings } from "@/components/settings-provider";
import { cn } from "@/lib/utils";

export function SoundtrackPlayer() {
  const s = useSettings();
  const [customUrl, setCustomUrl] = useState(s.customTrackUrl);
  const [customError, setCustomError] = useState("");

  const loadCustomTrack = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = customUrl.trim();
    if (!/^https:\/\/(www\.)?(youtube\.com\/watch\?[^\s]*v=|youtu\.be\/)[^\s]+/i.test(url)) {
      setCustomError("Paste a valid YouTube video link.");
      return;
    }
    setCustomError("");
    s.setCustomTrackUrl(url);
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
            Now selected
          </p>
          <p className="mt-1 font-display uppercase tracking-[0.14em]">{s.current?.title}</p>
          <p className="text-sm text-muted-foreground">{s.current?.artist}</p>
        </div>

        <div className="flex items-center gap-2">
          <IconBtn label="Previous track" onClick={s.prev}>
            <SkipBack className="h-4 w-4" />
          </IconBtn>
          <IconBtn
            label={s.playing ? "Pause" : "Play"}
            onClick={s.toggle}
            disabled={!s.musicEnabled || !s.hasAudio}
            primary
          >
            {s.playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </IconBtn>
          <IconBtn label="Next track" onClick={s.next}>
            <SkipForward className="h-4 w-4" />
          </IconBtn>
          <IconBtn label="Loop" onClick={() => s.setLoop(!s.loop)} active={s.loop}>
            <Repeat className="h-4 w-4" />
          </IconBtn>
          <IconBtn label="Shuffle" onClick={() => s.setShuffle(!s.shuffle)} active={s.shuffle}>
            <Shuffle className="h-4 w-4" />
          </IconBtn>
        </div>
      </div>

      <label className="flex items-center gap-4 text-sm">
        <span className="w-20 shrink-0 text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
          Volume
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={s.volume}
          onChange={(e) => s.setVolume(Number(e.target.value))}
          className="h-1 w-full max-w-xs cursor-pointer appearance-none rounded-full bg-border accent-primary"
        />
        <span className="w-10 text-right tabular-nums text-muted-foreground">
          {Math.round(s.volume * 100)}
        </span>
      </label>

      {!s.hasAudio && (
        <p className="mt-4 text-xs text-muted-foreground">
          No audio file is attached to this track yet — add a <code>src</code> to any entry in{" "}
          <code>src/data/soundtrack.ts</code> to enable playback. Nothing ever plays automatically.
        </p>
      )}

      <div className="divider-key my-6" />

      <form onSubmit={loadCustomTrack} className="mb-6 rounded-sm border border-border bg-secondary/30 p-4">
        <label htmlFor="custom-youtube-track" className="block font-display text-xs uppercase tracking-[0.18em]">
          Play your own YouTube track
        </label>
        <p className="mt-1 text-xs text-muted-foreground">
          Paste a YouTube video link to load it into the custom soundtrack slot.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            id="custom-youtube-track"
            type="url"
            value={customUrl}
            onChange={(event) => setCustomUrl(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="min-h-11 flex-1 rounded-sm border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            aria-describedby={customError ? "custom-youtube-error" : undefined}
          />
          <button
            type="submit"
            className="min-h-11 rounded-sm border border-gold/70 bg-gold/15 px-4 font-display text-xs uppercase tracking-[0.16em] hover:bg-gold/30"
          >
            Load track
          </button>
        </div>
        {customError && (
          <p id="custom-youtube-error" className="mt-2 text-xs text-destructive" role="alert">
            {customError}
          </p>
        )}
      </form>

      <ul className="space-y-1">
        {s.tracks.map((t, i) => {
          const selected = i === s.index;
          return (
            <li key={t.id}>
              <div
                className={cn(
                  "group flex items-center gap-3 rounded-sm border border-transparent px-3 py-2 transition-colors",
                  selected ? "border-border bg-secondary/60" : "hover:bg-secondary/40",
                )}
              >
                <button
                  type="button"
                  onClick={() => s.select(i)}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border",
                      selected ? "text-gold" : "text-muted-foreground",
                    )}
                  >
                    {t.cover ? (
                      <img src={t.cover} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <Music className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm">{t.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{t.artist}</span>
                  </span>
                </button>
                {t.link && (
                  <a
                    href={t.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${t.title} externally`}
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  active,
  primary,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  primary?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border transition-colors disabled:opacity-40",
        primary && "border-gold/70 bg-gold/15 hover:bg-gold/30",
        active && "border-primary text-primary",
        !primary && !active && "hover:border-primary hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
