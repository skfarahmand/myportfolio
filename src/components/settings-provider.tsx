import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, Youtube } from "lucide-react";
import { soundtrack, type Track } from "@/data/soundtrack";
import { cn } from "@/lib/utils";

type SpotifyPlaybackUpdate = {
  data: { isPaused: boolean };
};

type SpotifyController = {
  loadEntity: (url: string) => void;
  play: () => void;
  pause: () => void;
  addListener: (event: "playback_update", callback: (event: SpotifyPlaybackUpdate) => void) => void;
  destroy: () => void;
};

type SpotifyIframeApi = {
  createController: (
    element: HTMLElement,
    options: { url: string; width: string; height: number },
    callback: (controller: SpotifyController) => void,
  ) => void;
};

type YouTubePlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  cueVideoById: (videoId: string) => void;
  loadVideoById: (videoId: string) => void;
  setVolume: (volume: number) => void;
};

type YouTubeApi = {
  Player: new (
    element: HTMLElement,
    options: {
      videoId?: string;
      playerVars: {
        playsinline: number;
        origin: string;
        widget_referrer: string;
      };
      events: {
        onReady: () => void;
        onStateChange: (event: { data: number }) => void;
      };
    },
  ) => YouTubePlayer;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
    spotifyIframeApi?: SpotifyIframeApi;
    onYouTubeIframeAPIReady?: () => void;
    YT?: YouTubeApi;
  }
}

function getYouTubeVideoId(url?: string) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1).split("/")[0];
    if (parsed.hostname.endsWith("youtube.com")) return parsed.searchParams.get("v") ?? undefined;
  } catch {
    return undefined;
  }
  return undefined;
}

type ThemeChoice = "light" | "dark" | "system";

type SettingsValue = {
  theme: ThemeChoice;
  setTheme: (t: ThemeChoice) => void;
  resolvedTheme: "light" | "dark";
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  // audio
  tracks: Track[];
  current: Track;
  index: number;
  playing: boolean;
  volume: number;
  loop: boolean;
  shuffle: boolean;
  musicEnabled: boolean;
  hasAudio: boolean;
  customTrackUrl: string;
  setCustomTrackUrl: (url: string) => void;
  setMusicEnabled: (v: boolean) => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  select: (i: number) => void;
  setVolume: (v: number) => void;
  setLoop: (v: boolean) => void;
  setShuffle: (v: boolean) => void;
};

const Ctx = createContext<SettingsValue | null>(null);

const KEY = "sorakf.settings.v1";

type Persisted = {
  theme: ThemeChoice;
  reducedMotion: boolean;
  volume: number;
  musicEnabled: boolean;
  loop: boolean;
  shuffle: boolean;
  index: number;
  customTrackUrl: string;
};

const defaults: Persisted = {
  theme: "dark",
  reducedMotion: false,
  volume: 0.6,
  musicEnabled: false,
  loop: true,
  shuffle: false,
  index: 0,
  customTrackUrl: "",
};

function read(): Persisted {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...defaults, ...(JSON.parse(raw) as Partial<Persisted>) } : defaults;
  } catch {
    return defaults;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(defaults);
  const [systemDark, setSystemDark] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [youtubeMinimized, setYoutubeMinimized] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const spotifyHostRef = useRef<HTMLDivElement | null>(null);
  const spotifyControllerRef = useRef<SpotifyController | null>(null);
  const youtubeHostRef = useRef<HTMLIFrameElement | null>(null);
  const youtubePlayerRef = useRef<YouTubePlayer | null>(null);
  const playNextTrackRef = useRef<() => void>(() => undefined);
  const resumeAfterTrackChangeRef = useRef(false);
  const directYouTubeSwitchRef = useRef(false);

  // hydrate from localStorage after mount (SSR safe)
  useEffect(() => {
    setState(read());
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => setSystemDark(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const resolvedTheme: "light" | "dark" =
    state.theme === "system" ? (systemDark ? "dark" : "light") : state.theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    document.documentElement.dataset["reducedMotion"] = String(state.reducedMotion);
  }, [state.reducedMotion]);

  const persist = useCallback((patch: Partial<Persisted>) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const tracks = useMemo<Track[]>(
    () => [
      ...soundtrack,
      {
        id: "custom-youtube",
        title: "Custom YouTube Track",
        artist: "Your selection",
        link: state.customTrackUrl,
      },
    ],
    [state.customTrackUrl],
  );
  const index = Math.min(state.index, Math.max(tracks.length - 1, 0));
  const current = tracks[index] ?? tracks[0]!;
  const spotifyUrl = current?.link?.startsWith("https://open.spotify.com/")
    ? current.link
    : undefined;
  const youtubeVideoId = getYouTubeVideoId(current?.link);
  const youtubeEmbedVideoIdRef = useRef<string | undefined>(youtubeVideoId);
  if (!youtubeEmbedVideoIdRef.current && youtubeVideoId) {
    youtubeEmbedVideoIdRef.current = youtubeVideoId;
  }
  const hasAudio = Boolean(current?.src || spotifyUrl || youtubeVideoId);

  useEffect(() => {
    if (!spotifyUrl || !spotifyHostRef.current) return;

    let cancelled = false;
    const createPlayer = (api: SpotifyIframeApi) => {
      window.spotifyIframeApi = api;
      if (cancelled || !spotifyHostRef.current || spotifyControllerRef.current) return;
      api.createController(
        spotifyHostRef.current,
        { url: spotifyUrl, width: "100%", height: 152 },
        (controller) => {
          if (cancelled) {
            controller.destroy();
            return;
          }
          spotifyControllerRef.current = controller;
          controller.addListener("playback_update", (event) => {
            setPlaying(!event.data.isPaused);
          });
        },
      );
    };

    window.onSpotifyIframeApiReady = createPlayer;
    if (window.spotifyIframeApi) {
      createPlayer(window.spotifyIframeApi);
      return () => {
        cancelled = true;
      };
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://open.spotify.com/embed/iframe-api/v1"]',
    );
    // The API only announces itself once. During a Vite hot reload the old
    // script can remain after that callback has fired, so reload it here.
    existing?.remove();
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [spotifyUrl]);

  useEffect(() => {
    if (!youtubeVideoId || !youtubeHostRef.current) return;

    const createPlayer = () => {
      if (!window.YT || !youtubeHostRef.current || youtubePlayerRef.current) return;
      youtubePlayerRef.current = new window.YT.Player(youtubeHostRef.current, {
        playerVars: {
          playsinline: 1,
          origin: window.location.origin,
          widget_referrer: window.location.href,
        },
        events: {
          onReady: () => youtubePlayerRef.current?.setVolume(state.volume * 100),
          onStateChange: (event) => {
            setPlaying(event.data === 1);
            // YouTube PlayerState.ENDED is 0. Keep the callback in a ref so
            // the API always uses the latest track index and shuffle setting.
            if (event.data === 0) playNextTrackRef.current();
          },
        },
      });
    };

    window.onYouTubeIframeAPIReady = createPlayer;
    if (window.YT?.Player) {
      createPlayer();
      return;
    }

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [youtubeVideoId, state.volume]);

  useEffect(() => {
    if (!youtubeVideoId || !youtubePlayerRef.current) return;
    if (directYouTubeSwitchRef.current) return;
    youtubePlayerRef.current.cueVideoById(youtubeVideoId);
    setPlaying(false);
  }, [youtubeVideoId]);

  useEffect(() => {
    if (!spotifyUrl || !spotifyControllerRef.current) return;
    spotifyControllerRef.current.loadEntity(spotifyUrl);
    setPlaying(false);
  }, [spotifyUrl]);

  useEffect(() => {
    if (directYouTubeSwitchRef.current) {
      directYouTubeSwitchRef.current = false;
      return;
    }
    audioRef.current?.pause();
    spotifyControllerRef.current?.pause();
    youtubePlayerRef.current?.pauseVideo();
    setPlaying(false);

    if (!resumeAfterTrackChangeRef.current) return;
    const timer = window.setTimeout(() => {
      if (current?.src && audioRef.current) {
        audioRef.current.volume = state.volume;
        void audioRef.current.play().then(
          () => {
            resumeAfterTrackChangeRef.current = false;
            setPlaying(true);
          },
          () => setPlaying(false),
        );
      } else if (spotifyUrl && spotifyControllerRef.current) {
        spotifyControllerRef.current.play();
        resumeAfterTrackChangeRef.current = false;
      } else if (youtubeVideoId && youtubePlayerRef.current) {
        youtubePlayerRef.current.loadVideoById(youtubeVideoId);
        resumeAfterTrackChangeRef.current = false;
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [index]);

  // keep <audio> element in sync
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = state.volume;
    audioRef.current.loop = state.loop;
    youtubePlayerRef.current?.setVolume(state.volume * 100);
  }, [state.volume, state.loop]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    spotifyControllerRef.current?.pause();
    youtubePlayerRef.current?.pauseVideo();
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (spotifyUrl) {
      spotifyControllerRef.current?.play();
      return;
    }
    if (youtubeVideoId) {
      youtubePlayerRef.current?.playVideo();
      return;
    }
    const el = audioRef.current;
    if (!el || !current?.src) return;
    el.volume = state.volume;
    void el.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [current, spotifyUrl, youtubeVideoId, state.volume]);

  const toggle = useCallback(() => {
    if (playing) stop();
    else play();
  }, [playing, play, stop]);

  const goto = useCallback(
    (i: number) => {
      const len = tracks.length;
      if (!len) return;
      const nextIndex = ((i % len) + len) % len;
      const nextTrack = tracks[nextIndex];
      const nextYouTubeId = getYouTubeVideoId(nextTrack?.link);
      const canSwitchYouTubeDirectly = Boolean(
        playing && nextYouTubeId && youtubePlayerRef.current,
      );

      if (canSwitchYouTubeDirectly && nextYouTubeId) {
        directYouTubeSwitchRef.current = true;
        youtubePlayerRef.current?.loadVideoById(nextYouTubeId);
      } else {
        resumeAfterTrackChangeRef.current = playing;
      }
      persist({ index: nextIndex });
      if (!canSwitchYouTubeDirectly) setPlaying(false);
    },
    [persist, playing, tracks],
  );

  const next = useCallback(() => {
    if (state.shuffle && tracks.length > 1) {
      let r = index;
      while (r === index) r = Math.floor(Math.random() * tracks.length);
      goto(r);
    } else goto(index + 1);
  }, [goto, index, state.shuffle, tracks.length]);

  playNextTrackRef.current = next;

  const prev = useCallback(() => goto(index - 1), [goto, index]);

  const value = useMemo<SettingsValue>(
    () => ({
      theme: state.theme,
      setTheme: (t) => persist({ theme: t }),
      resolvedTheme,
      reducedMotion: state.reducedMotion,
      setReducedMotion: (v) => persist({ reducedMotion: v }),
      tracks,
      current,
      index,
      playing,
      volume: state.volume,
      loop: state.loop,
      shuffle: state.shuffle,
      musicEnabled: state.musicEnabled,
      hasAudio,
      customTrackUrl: state.customTrackUrl,
      setCustomTrackUrl: (url) => {
        const videoId = getYouTubeVideoId(url);
        if (videoId && youtubePlayerRef.current) {
          directYouTubeSwitchRef.current = true;
          youtubePlayerRef.current.loadVideoById(videoId);
        }
        persist({
          customTrackUrl: url,
          index: tracks.length - 1,
          musicEnabled: true,
        });
      },
      setMusicEnabled: (v) => {
        persist({ musicEnabled: v });
        if (!v) stop();
      },
      toggle,
      next,
      prev,
      select: goto,
      setVolume: (v) => persist({ volume: v }),
      setLoop: (v) => persist({ loop: v }),
      setShuffle: (v) => persist({ shuffle: v }),
    }),
    [
      state,
      resolvedTheme,
      tracks,
      current,
      index,
      playing,
      hasAudio,
      persist,
      stop,
      toggle,
      next,
      prev,
      goto,
    ],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {/* Never autoplays: playback starts only from a user action. */}
      <audio ref={audioRef} src={current?.src} preload="none" onEnded={next} />
      <div
        className={cn(
          "fixed bottom-4 right-4 z-50 w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-xl shadow-2xl",
          !spotifyUrl && "hidden",
        )}
      >
        <div ref={spotifyHostRef} aria-label={`Spotify player for ${current.title}`} />
      </div>
      <div
        className={cn(
          "fixed bottom-4 right-4 z-50 overflow-hidden rounded-xl border border-border bg-black shadow-2xl",
          youtubeMinimized
            ? "w-[min(30rem,calc(100vw-2rem))]"
            : "aspect-video w-[min(24rem,calc(100vw-2rem))]",
          !youtubeVideoId && "hidden",
        )}
      >
        <button
          type="button"
          onClick={() => setYoutubeMinimized((value) => !value)}
          className={cn(
            "z-10 flex items-center justify-between gap-3 bg-background/95 px-3 py-2 text-left text-xs text-foreground backdrop-blur",
            youtubeMinimized ? "w-full pb-9 pr-32" : "absolute right-2 top-2 rounded-md border border-border",
          )}
          aria-label={youtubeMinimized ? "Show YouTube video" : "Minimize YouTube player"}
        >
          {youtubeMinimized && <span className="shrink-0 text-2xl leading-none text-gold" aria-hidden="true">𝄞</span>}
          <span className={cn(!youtubeMinimized && "sr-only", youtubeMinimized && "mr-auto text-sm font-medium")}>
            {youtubeMinimized ? `Now playing: ${current.title}` : "Minimize"}
          </span>
          {youtubeMinimized ? (
            <span className="flex shrink-0 flex-col items-center gap-0.5 text-[0.5rem] uppercase tracking-wide text-muted-foreground">
              <Youtube className="h-5 w-5 text-red-500" aria-hidden="true" />
              <span aria-hidden="true">Show video</span>
            </span>
          ) : (
            <span aria-hidden="true">−</span>
          )}
        </button>
        {youtubeMinimized && (
          <>
            <div className="absolute right-3 top-2 z-20 flex items-center gap-1">
              <button type="button" onClick={prev} className="rounded p-1.5 hover:bg-secondary" aria-label="Previous song">
                <SkipBack className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={toggle}
                disabled={!state.musicEnabled || !hasAudio}
                className="rounded border border-gold/60 bg-gold/15 p-1.5 hover:bg-gold/30 disabled:opacity-40"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              </button>
              <button type="button" onClick={next} className="rounded p-1.5 hover:bg-secondary" aria-label="Next song">
                <SkipForward className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <Volume2
              className="absolute bottom-1.5 left-4 z-20 h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="absolute bottom-1.5 right-4 z-20 flex h-4 w-8 items-center justify-end font-display text-xs tracking-wider tabular-nums text-primary [text-shadow:0_0_6px_rgba(220,230,255,0.8)]">
              {Math.round(state.volume * 100)}
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={state.volume}
              onChange={(event) => persist({ volume: Number(event.target.value) })}
              className="absolute bottom-3 left-10 right-14 z-20 h-1 w-auto cursor-pointer accent-primary"
              aria-label="Music volume"
            />
          </>
        )}
        {youtubeEmbedVideoIdRef.current && (
          <iframe
            ref={youtubeHostRef}
            src={`https://www.youtube.com/embed/${youtubeEmbedVideoIdRef.current}?enablejsapi=1&playsinline=1`}
            title={`YouTube player for ${current.title}`}
            className={cn("h-full w-full", youtubeMinimized && "hidden")}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </Ctx.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
