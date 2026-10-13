export type Track = {
  id: string;
  title: string;
  artist: string;
  cover?: string;
  link?: string;
  /** Optional audio file URL. Leave empty until you add real audio. */
  src?: string;
};

// Edit this list with whatever you're listening to.
export const soundtrack: Track[] = [
  { id: "t1", title: "Dearly Beloved", artist: "Yoko Shimomura", link: "https://www.youtube.com/watch?v=sihC5l_gIak&list=RDsihC5l_gIak&start_radio=1" },
  { id: "t2", title: "Toui Sora He", artist: "Manabu Miwa & Bruno Wen-li", link: "https://www.youtube.com/watch?v=A1JXvaulbVI&list=RDA1JXvaulbVI&start_radio=1" },
  { id: "t3", title: "十 五 少 女", artist: "死にたいと言ってくれ。", link: "https://www.youtube.com/watch?v=X_x4xNmZn44&list=RDX_x4xNmZn44&start_radio=1" },
  { id: "t4", title: "愛するように", artist: "MIMI【Covered by Kotoha】", link: "https://www.youtube.com/watch?v=6vqG32gEmzA&list=RD6vqG32gEmzA&start_radio=1" },
  { id: "t5", title: "ELIS", artist: "Yuyoyuppe", link: "https://www.youtube.com/watch?v=oWiSx66M7YU&list=PL0BCEB00B962E03B8" },
  { id: "t6", title: "Glassy Sky", artist: "Yutaka Yamada", link: "https://www.youtube.com/watch?v=vvvvcpwFw5o&list=RDvvvvcpwFw5o&start_radio=1" },
  { id: "t7", title: "Void", artist: "DIAMOND DUST", link: "https://www.youtube.com/watch?v=6YT4eGC1tYI&list=RD6YT4eGC1tYI&start_radio=1" },
];
