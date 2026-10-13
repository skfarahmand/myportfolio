export type DownloadItem = {
  id: string;
  title: string;
  description: string;
  fileType: string;
  size?: string;
  url?: string;
  files?: Array<{ title: string; url: string; size?: string }>;
  comingSoon?: boolean;
};

export const downloads: DownloadItem[] = [
  {
    id: "maya-models",
    title: "3D Models",
    description:
      "A collection of original 3D models, renders, and project files created in Blender.",
    fileType: "3D Assets",
    size: "2 models",
    url: "/downloads/models/blackrockshooter.glb",
  },
  {
    id: "skate-clips",
    title: "Skate Clips",
    description:
      "Skateboarding clips, edits, and highlights collected from sessions and personal projects.",
    fileType: "Video",
    size: "2 clips",
    files: [
      { title: "Skate Clip 01", url: "/downloads/skate-clips/k5-0.mp4", size: "8.6 MB" },
      { title: "Skate Clip 02", url: "/downloads/skate-clips/btail.mp4", size: "8.3 MB" },
    ],
  },
  {
    id: "piano",
    title: "Piano",
    description: "Piano performances, arrangements, and musical ideas from my personal archive.",
    fileType: "Music Video",
    size: "1 performance",
    files: [
      {
        title: "Piano Performance 01",
        url: "/downloads/piano/IMG_1532.mp4",
        size: "16.6 MB",
      },
    ],
  },
  {
    id: "guitar",
    title: "Guitar",
    description:
      "Guitar performances, practice recordings, and arrangements gathered along the journey.",
    fileType: "Music Video",
    size: "1 performance",
    files: [
      {
        title: "Guitar Performance 01",
        url: "/downloads/guitar/yuyoyuppe_guitar.mp4",
        size: "113.9 MB",
      },
    ],
  },
];
