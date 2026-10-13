// Central place to edit personal info, links and page copy.

export const site = {
  name: "SoraKF",
  subtitle: "JOURNEY THROUGH MY REALM",
  fullName: "Sora Kokoro Farahmand",
  role: "IT / Software Developer",
  email: "contact@sorakf.dev",
  location: "Chicago",
  github: "https://github.com/placeholder",
  linkedin: "https://www.linkedin.com/in/sora-farahmand-10b448308/",
  resumeUrl: "/resume.pdf",
};

export const menuItems = [
  { label: "Profile", to: "/about", desc: "Bio, education, skills and achievements." },
  { label: "Projects", to: "/projects", desc: "A record of the worlds I've built and explored." },
  { label: "Resume", to: "/resume", desc: "View or download my full resume." },
  { label: "Settings", to: "/settings", desc: "Theme, sound, soundtrack and accessibility." },
  {
    label: "Downloadable Content",
    to: "/dlc",
    desc: "Bonus files, documents, case studies and extras.",
  },
  { label: "Credits", to: "/credits", desc: "Thanks for visiting — and how to reach me." },
] as const;

export const about = {
  intro: [
    "I'm a recent Information Technology graduate based in Chicago with interests in software development, computer vision, networking, databases, and information security. I speak English and Japanese, along with some French.",
    "I enjoy building projects that combine technology with my interests, and I'm currently open to opportunities where I can contribute, continue learning, and grow as a developer.",
  ],
  education: [
    {
      title: "B.Sc. in Information Technology",
      org: "DePaul University",
      period: "June 2026",
      note: "Relevant coursework: Data Structures & Algorithms, Database Systems, Computer Networks, and Information Security.",
    },
    {
      title: "Placeholder Certification",
      org: "Issuing Body",
      period: "2025",
      note: "Replace with your certifications as you earn them.",
    },
  ],
  skills: [
    { group: "Programming", items: ["Java", "Python", "JavaScript", "SQL"] },
    { group: "Web", items: ["React", "HTML", "CSS", "Node.js", "Express"] },
    { group: "Databases", items: ["SQLite", "MySQL", "PostgreSQL"] },
    { group: "Cloud", items: ["AWS EC2", "Docker", "Nginx", "Certbot"] },
    { group: "Networking", items: ["TCP/IP", "DNS", "VPN", "Routing & Switching"] },
    { group: "Security", items: ["Hardening", "Access Control", "Input Validation", "TLS/HTTPS"] },
  ],
  tools: ["VS Code", "Git & GitHub", "Oracle SQL Developer", "Blender", "Command Line", "VirtualBox"],
  certifications: [
    {
      title: "CompTIA A+",
      issuer: "CompTIA",
      progress: 0,
      startDate: "Not started",
      endDate: "TBD",
      certificateUrl: null,
    },
    {
      title: "CompTIA Network+",
      issuer: "CompTIA",
      progress: 0,
      startDate: "Not started",
      endDate: "TBD",
      certificateUrl: null,
    },
    {
      title: "CompTIA Security+",
      issuer: "CompTIA",
      progress: 0,
      startDate: "Not started",
      endDate: "TBD",
      certificateUrl: null,
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      progress: 0,
      startDate: "Not started",
      endDate: "TBD",
      certificateUrl: null,
    },
    {
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      progress: 0,
      startDate: "Not started",
      endDate: "TBD",
      certificateUrl: null,
    },
  ],
  objective:
    "To turn ideas into useful, well-crafted technology while continuing to learn, take on challenging problems, and grow as a developer.",
  interests: [
    "Video Games",
    "Anime",
    "Skateboarding",
    "Guitar",
    "Piano",
    "Digital Illustration and Anime Art",
    "3D Modeling",
  ],
};
