import data from "@/data/portfolio.json";

export type PortfolioItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  sector: string;
  status: "active" | "locked";
  emoji: string;
  skills: string[];
  details: string;
  github: string | null;
  demo: string | null;
  image: string | null;
  gallery: string[];
  documents: { label: string; href: string }[];
  metrics: string[];
  accent: string;
  date: string;
  sortOrder: number;
};

type RawPortfolioItem = Omit<PortfolioItem, "slug" | "gallery" | "documents" | "metrics" | "accent" | "date" | "sortOrder">;

const slugById: Record<string, string> = {
  "I-4": "city-of-montreal",
  "I-2": "lockheed-martin",
  "I-1": "tesla",
  "P-1": "csa-lunar-leap",
  "P-2": "axial-piston-pump",
  "P-3": "reforestation-robot",
  "P-4": "resq-link",
  "P-5": "nursie",
  "P-9": "crm-outreach-tool",
  "P-11": "mechprep",
  "P-12": "lazycare",
  "P-13": "interview-assistant",
};

const mediaById: Record<
  string,
  Partial<Pick<PortfolioItem, "image" | "gallery" | "documents" | "metrics" | "accent" | "emoji" | "date" | "sortOrder">>
> = {
  "I-4": { accent: "#178f9a", emoji: "Water", date: "May-Aug 2025", sortOrder: 3 },
  "I-2": { accent: "#1f4f99", emoji: "Aero", date: "Winter 2026", sortOrder: 2 },
  "I-1": { accent: "#d3222a", emoji: "Cell", date: "Summer-Fall 2026", sortOrder: 1 },
  "P-1": {
    image: "/media/csa/prototype-overview.jpg",
    gallery: [
      "/media/csa/prototype-overview.jpg",
      "/media/csa/isometric-view.webp",
      "/media/csa/section-view.webp",
      "/media/csa/tube-interior.jpg",
    ],
    metrics: ["3.1m deployable tube", "50+ interfaces", "12% mass reduction", "2.5x safety factor"],
    accent: "#1b6fff",
    emoji: "Moon",
  },
  "P-2": {
    image: "/media/axial-piston-pump/exploded-drawing.jpg",
    gallery: ["/media/axial-piston-pump/exploded-drawing.jpg"],
    metrics: ["9 piston assemblies", "Bilingual BOM", "Full exploded drawing"],
    accent: "#a15c18",
    emoji: "CAD",
  },
  "P-3": {
    image: "/media/robohacks/robot-held.jpg",
    gallery: ["/media/robohacks/robot-held.jpg", "/media/robohacks/robot-top.jpg"],
    metrics: ["24 hour build", "5th overall", "Autonomous line following"],
    accent: "#4f9d32",
    emoji: "Robot",
  },
  "P-4": {
    image: "/media/generated/resq-link.svg",
    gallery: ["/media/generated/resq-link.svg"],
    documents: [
      { label: "Pitch deck", href: "/media/resq-link/pitch-deck.pdf" },
      { label: "Drawings", href: "/media/resq-link/drawings-dashboard.pdf" },
      { label: "Business model", href: "/media/resq-link/business-model-canvas.pdf" },
    ],
    metrics: ["Passive NFC", "IP68 band", "$1.50 hardware target", "Offline mesh sync"],
    accent: "#c73655",
    emoji: "Rescue",
  },
  "P-5": {
    image: "/media/nursie/dashboard.png",
    gallery: [
      "/media/nursie/dashboard.png",
      "/media/nursie/fall-sensor.jpg",
      "/media/nursie/lidar-movement.jpg",
      "/media/nursie/door-sensor.jpg",
    ],
    metrics: ["3x sensor redundancy", "No cameras", "Local OpenWRT LAN", "Best Use of ElevenLabs"],
    accent: "#7b4fd6",
    emoji: "Care",
  },
  "P-9": {
    image: "/media/generated/crm-outreach.svg",
    gallery: ["/media/generated/crm-outreach.svg"],
    metrics: ["3 audience segments", "Gemini email generation", "Google Sheets sync", "~$0/month"],
    accent: "#0f766e",
    emoji: "CRM",
  },
  "P-11": {
    image: "/media/generated/mechprep.svg",
    gallery: ["/media/generated/mechprep.svg"],
    metrics: ["Interactive CAD models", "AI question evaluation", "Mechanical interview prep"],
    accent: "#5865f2",
    emoji: "Prep",
  },
  "P-12": {
    image: "/media/generated/lazycare.svg",
    gallery: ["/media/generated/lazycare.svg"],
    metrics: ["FastAPI service", "Fine-tuned TinyLlama", "Conversation history"],
    accent: "#2f855a",
    emoji: "AI",
  },
  "P-13": {
    image: "/media/generated/interview-assistant.svg",
    gallery: ["/media/generated/interview-assistant.svg"],
    metrics: ["Voice interface", "NLP evaluation", "Team of 3"],
    accent: "#b45309",
    emoji: "Voice",
  },
};

const repairs: [string | RegExp, string][] = [
  [/Â·/g, "·"],
  [/â€“/g, "–"],
  [/â€”/g, "—"],
  [/â€™/g, "'"],
  [/Ã©/g, "é"],
  [/Ã˜/g, "Ø"],
  [/Ã—/g, "x"],
  [/ðŸ†/g, "Winner"],
  [/ðŸŒ•/g, "Moon"],
  [/ðŸŒ±/g, "Robot"],
  [/âš™ï¸/g, "CAD"],
  [/ðŸ”§/g, "Tools"],
  [/ðŸ¥/g, "Rescue"],
  [/ðŸ’Š/g, "Health"],
  [/ðŸŽ¤/g, "Voice"],
  [/ðŸ¤–/g, "AI"],
  [/ðŸ’§/g, "Water"],
  [/âœˆï¸/g, "Aero"],
  [/âš¡/g, "Cell"],
  [/Montreal0s/g, "Montreal's"],
];

const clean = (value: string) =>
  repairs.reduce((text, [from, to]) => text.replace(from, to), value);

const hydrate = (item: RawPortfolioItem): PortfolioItem => {
  const media = mediaById[item.id] ?? {};

  return {
    ...item,
    slug: slugById[item.id] ?? item.id.toLowerCase(),
    title: clean(item.title),
    subtitle: clean(item.subtitle),
    sector: clean(item.sector),
    emoji: media.emoji ?? clean(item.emoji),
    skills: item.skills.map(clean),
    details: clean(item.details),
    image: media.image ?? item.image,
    gallery: media.gallery ?? (media.image ? [media.image] : item.image ? [item.image] : []),
    documents: media.documents ?? [],
    metrics: media.metrics ?? [],
    accent: media.accent ?? "#00656f",
    date: media.date ?? "",
    sortOrder: media.sortOrder ?? 99,
  };
};

export const internships: PortfolioItem[] = (data.internships as RawPortfolioItem[])
  .map(hydrate)
  .sort((a, b) => a.sortOrder - b.sortOrder);

const rawProjects = [
  ...(data.aerospace as RawPortfolioItem[]),
  ...(data.robotics as RawPortfolioItem[]),
  ...(data.software as RawPortfolioItem[]),
].filter((p) => p.status === "active");

export const activeProjects: PortfolioItem[] = rawProjects.map(hydrate);
export const projects = activeProjects;
export const featuredProjects: PortfolioItem[] = activeProjects.slice(0, 5);
export const allPortfolioItems: PortfolioItem[] = [...activeProjects, ...internships].filter(
  (item) => item.status === "active"
);

export const getPortfolioItemBySlug = (slug: string) =>
  allPortfolioItems.find((item) => item.slug === slug);

export const getRelatedPortfolioItems = (item: PortfolioItem) =>
  allPortfolioItems
    .filter((candidate) => candidate.slug !== item.slug && candidate.sector === item.sector)
    .slice(0, 3);
