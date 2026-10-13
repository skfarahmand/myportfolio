export type Project = {
  id: string;
  title: string;
  world: string; // flavour label, e.g. "World 01"
  summary: string;
  details?: string;
  tech: string[];
  image?: string;
  github?: string;
  demo?: string;
  demoLabel?: string;
};

// Edit this array to manage your projects.
export const projects: Project[] = [
  {
    id: "keybearer",
    title: "Piano Midi Visualizer",
    world: "Record I",
    summary:
      "An interactive browser-based piano visualizer that transforms MIDI files into synchronized falling-note animations and piano playback.",
    details:
      "Built with TypeScript, Tone.js, and @tonejs/midi. MIDI data is parsed into note timing, pitch, duration, velocity, and track information to generate an 88-key piano visualization synchronized with sampled piano audio. Users can upload their own MIDI files and control playback, volume, speed, and song position.",
    tech: ["TypeScript", "Tone.js", "@tonejs/midi", "Vite"],
    image: "/projects/weapons/piano-midi-visualizer-v3.png",
    github: "https://github.com/placeholder/keybearer",
  },
  {
    id: "atlas",
    title: "Self Hosted Gaming Server",
    world: "Record II",
    summary:
      "A self-hosted Cobblemon Minecraft server built for a persistent multiplayer world with friends.",
    details:
      "Running Ubuntu Server in a VirtualBox virtual machine, I configured networking, remote access, automated services, and live backups. This Linux homelab project focused on virtualization, networking, Linux system administration, Bash automation, remote management, troubleshooting, and server reliability.",
    tech: ["Ubuntu Server", "VirtualBox", "Bash", "systemd", "cron", "SSH", "RCON", "Playit"],
    image: "/projects/weapons/self-hosted-gaming-server-v3.png",
    github: "https://github.com/placeholder/atlas",
    demo: "https://example.com",
    demoLabel: "Project Details",
  },
];
