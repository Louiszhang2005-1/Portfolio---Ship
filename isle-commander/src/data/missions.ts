export interface Mission {
  id: string;
  sector: string;
  sectorColor: string;
  title: string;
  subtitle: string;
  status: "locked" | "active";
  landmark: string;
  position: { x: number; y: number };
  skills: string[];
  details: string;
  emoji: string;
  color: string;
  image?: string;
  github?: string;
  demo?: string;
}

export const missions: Mission[] = [
  // ═══════════════════════════════════════════════════
  // ⚡ INTERNSHIP SHORES (Northwest) — Work experience
  // ═══════════════════════════════════════════════════
  {
    id: "I-1",
    sector: "Internship Shores",
    sectorColor: "#e65100",
    title: "Tesla Nevada",
    subtitle: "Cell Engineering Intern",
    status: "locked",
    landmark: "A factory with a 'CLASSIFIED: COMING SUMMER 2026' neon sign",
    position: { x: -576, y: -432 },
    skills: ["Manufacturing", "Automation", "Lean Six Sigma", "Python"],
    details:
      "🔒 CLASSIFIED — Incoming Summer 2026. Cell Engineering Intern at the Nevada Gigafactory. Mission details are under wraps until deployment. Stay tuned.",
    emoji: "⚡",
    color: "#e65100",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GJnyIpTNceIUOUaWKj2yA16tfchlN9cYnadcCbuuuZQ5C4-ApDELnIMFMUoAHG9X95DjBR0_DOWKFyWrnpLzzkYA_ei38IBp2Hlz5fDKhUtgq2N7rNXSRrE3fph1Wu9M2Ogv3dhZ3hh3294kM9omBYp77--auHbaBqrZcIkiQ_mOt3kqOxAzfHs47wzpJ9xKaSCebvpm5kKiuPAHq5gwhK8PUaH620g3qSJPop9HsHZ1As5-jYosi5FEppzMGh3U5pJmiZucRqPE",
  },
  {
    id: "I-2",
    sector: "Internship Shores",
    sectorColor: "#e65100",
    title: "Lockheed Martin",
    subtitle: "Mechanical Design",
    status: "active",
    landmark: "A high-tech aircraft hangar with a spinning jet turbine",
    position: { x: -324, y: -288 },
    skills: ["3D CAD Modeling", "Structural Design", "CATIA", "GD&T", "FEA"],
    details:
      "Mechanical Engineering Intern specializing in 3D CAD modeling and structural design of airframe components. Performed FEA on composite panels for classified airframe programs. Delivered full CAD assemblies with tolerance stack-up analysis and GD&T documentation.",
    emoji: "✈️",
    color: "#1a3a6b",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GJnyIpTNceIUOUaWKj2yA16tfchlN9cYnadcCbuuuZQ5C4-ApDELnIMFMUoAHG9X95DjBR0_DOWKFyWrnpLzzkYA_ei38IBp2Hlz5fDKhUtgq2N7rNXSRrE3fph1Wu9M2Ogv3dhZ3hh3294kM9omBYp77--auHbaBqrZcIkiQ_mOt3kqOxAzfHs47wzpJ9xKaSCebvpm5kKiuPAHq5gwhK8PUaH620g3qSJPop9HsHZ1As5-jYosi5FEppzMGh3U5pJmiZucRqPE",
  },

  {
    id: "I-4",
    sector: "Internship Shores",
    sectorColor: "#e65100",
    title: "City of Montréal",
    subtitle: "Scientific Intern · Water Dept.",
    status: "active",
    landmark: "A waterfront city hall with flowing blue pipes and a maple leaf flag",
    position: { x: -130, y: -360 },
    skills: ["Data Analysis", "Environmental Engineering", "Python", "GIS"],
    details:
      "Stagiaire scientifique (Scientific Intern) at the City of Montréal's Service de l'eau (Water Department), May–Aug 2025. Contributed to water quality monitoring initiatives and geospatial data pipelines for municipal infrastructure management.",
    emoji: "💧",
    color: "#0277bd",
  },

  // ── Internship Shores: A3 classified slot (locked) ──
  {
    id: "I-3",
    sector: "Internship Shores",
    sectorColor: "#e65100",
    title: "Classified",
    subtitle: "Secret Mission",
    status: "locked",
    landmark: "A black monolith with a pulsing question mark beacon",
    position: { x: -202, y: -518 },
    skills: [],
    details: "Classified — mission briefing not yet available. Stay curious.",
    emoji: "❓",
    color: "#e65100",
  },

  // ═══════════════════════════════════════════════════
  // 🚀 Aero Atoll (Northeast) — Aerospace & Mechanical
  // ═══════════════════════════════════════════════════
  {
    id: "P-1",
    sector: "Aero Atoll",
    sectorColor: "#b8860b",
    title: "CSA Lunar LEAP",
    subtitle: "PM / Systems Integration",
    status: "active",
    landmark: "A miniature moon-base with a moving lunar wagon",
    position: { x: 360, y: -468 },
    skills: ["Arduino", "CATIA", "Systems Integration", "Prototyping"],
    details:
      "PM & systems integration lead for the Canadian Space Agency (LEAP program) lunar produce-transport prototype. Coordinated cross-disciplinary sub-teams, managed milestone tracking, and delivered a pressurized cargo module with active thermal regulation. Validated in simulated lunar gravity conditions using counterweight rigs.",
    emoji: "🌕",
    color: "#b8860b",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfmEpezBSpneFvCrYKhOLUOseL8Ykp1jo-HSG-ffLWpXFUDPcJaLNQ_yYG5K3rrQojomG93egnxnwooCUeOcPCLWPOTN3DCgnuB1cKbCeyo00IDUBjs5tK3QD_526_Tv0wWlf_J9c26MbyCm2M9Bh0lHMTaYyyp_lR2bOctqYMSHKc0imzdeQ5FArd6MJgX1SS1NDA5WuXGr8-BMg81vmKL76Uzzftusbi3MNmNr5KKskCa3NgMBifjJq1unU1ixty6_658_OlN05p",
  },
  {
    id: "P-2",
    sector: "Aero Atoll",
    sectorColor: "#b8860b",
    title: "Axial Piston Pump",
    subtitle: "Hydraulic System",
    status: "active",
    landmark: "A giant, translucent mechanical pump with moving pistons",
    position: { x: 648, y: -252 },
    skills: ["AutoCAD", "CFD Simulation", "MATLAB", "Manufacturing"],
    details:
      "Modeled and optimized a high-performance axial piston hydraulic pump. Achieved 18% efficiency gain through port geometry optimization. Full CFD simulation pipeline built in ANSYS Fluent with automated parametric sweeps.",
    emoji: "⚙️",
    color: "#4a4a4a",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfmEpezBSpneFvCrYKhOLUOseL8Ykp1jo-HSG-ffLWpXFUDPcJaLNQ_yYG5K3rrQojomG93egnxnwooCUeOcPCLWPOTN3DCgnuB1cKbCeyo00IDUBjs5tK3QD_526_Tv0wWlf_J9c26MbyCm2M9Bh0lHMTaYyyp_lR2bOctqYMSHKc0imzdeQ5FArd6MJgX1SS1NDA5WuXGr8-BMg81vmKL76Uzzftusbi3MNmNr5KKskCa3NgMBifjJq1unU1ixty6_658_OlN05p",
  },
  {
    id: "P-3",
    sector: "Aero Atoll",
    sectorColor: "#b8860b",
    title: "Reforestation Robot",
    subtitle: "RoboHacks 2024",
    status: "active",
    landmark: "A tiny forest with a robot planting low-poly trees",
    position: { x: 468, y: -72 },
    skills: ["C++", "ROS2", "Computer Vision", "Mechatronics"],
    details:
      "5th-place autonomous seed-planting robot at RoboHacks 2024. Implemented SLAM-based navigation with a custom soil auger end-effector. Planted 47 seed pods in 15 minutes during the competition run.",
    emoji: "🌱",
    color: "#2e7d32",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAS80X_XNEuUFS6k-WwWNK4ujFPPuUxPpWvmTVpU1JR5SivSd5oUG2JcVNgHI4epz7XEJI6N7eCpY_5koJUANuAI1BYhptkTPhdi5UGO2lM2yHA1--6_Zdhkuwaf4AXh47aYn5TOW2B8af31QajqbXwz4Ldn2XPUjvQPK0SasCQYVwEJls5ZWv-YsDYabLJ6PaUZtolG1ufVsJARGvsPWji9-J_dMGuf0kpNNEYucYBsS8AG3SpRwrHKSZrvL4alOKLEcgHbwa7a7w",
  },

  // ═══════════════════════════════════════════════════
  // 🏥 Medi-Bay (Southwest) — Health & Safety Tech
  // ═══════════════════════════════════════════════════
  {
    id: "P-4",
    sector: "Robotics & IoT",
    sectorColor: "#c62828",
    title: "ResQ-Link",
    subtitle: "Digital Triage",
    status: "active",
    landmark: "A medical station with a giant glowing NFC wristband",
    position: { x: -540, y: 288 },
    skills: ["NFC", "SOLIDWORKS", "Embedded C", "Medical Design"],
    details:
      "Ruggedized medical silicone band for mass casualty triage events. Integrates passive NFC tags with encrypted patient data readable by first responders. Designed for IP68 waterproofing and 72h battery life.",
    emoji: "🏥",
    color: "#c62828",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAS80X_XNEuUFS6k-WwWNK4ujFPPuUxPpWvmTVpU1JR5SivSd5oUG2JcVNgHI4epz7XEJI6N7eCpY_5koJUANuAI1BYhptkTPhdi5UGO2lM2yHA1--6_Zdhkuwaf4AXh47aYn5TOW2B8af31QajqbXwz4Ldn2XPUjvQPK0SasCQYVwEJls5ZWv-YsDYabLJ6PaUZtolG1ufVsJARGvsPWji9-J_dMGuf0kpNNEYucYBsS8AG3SpRwrHKSZrvL4alOKLEcgHbwa7a7w",
  },
  {
    id: "P-5",
    sector: "Robotics & IoT",
    sectorColor: "#c62828",
    title: "Nursie Monitoring",
    subtitle: "Fall Detection",
    status: "active",
    landmark: "A futuristic tower with a spinning mmWave radar dish",
    position: { x: -288, y: 468 },
    skills: ["Python", "mmWave Radar", "Signal Processing", "IoT"],
    details:
      "Sensor fusion system using TI mmWave radar and vibration accelerometers for elderly fall detection. Achieves 94% detection accuracy with sub-2s alert latency. Integrates with nurse call systems via MQTT. 🏆 Winner, ConUHacks 2024 hackathon — best hardware/IoT hack.",
    emoji: "📡",
    color: "#1565c0",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAS80X_XNEuUFS6k-WwWNK4ujFPPuUxPpWvmTVpU1JR5SivSd5oUG2JcVNgHI4epz7XEJI6N7eCpY_5koJUANuAI1BYhptkTPhdi5UGO2lM2yHA1--6_Zdhkuwaf4AXh47aYn5TOW2B8af31QajqbXwz4Ldn2XPUjvQPK0SasCQYVwEJls5ZWv-YsDYabLJ6PaUZtolG1ufVsJARGvsPWji9-J_dMGuf0kpNNEYucYBsS8AG3SpRwrHKSZrvL4alOKLEcgHbwa7a7w",
  },

  // ── Robotics & IoT: C3 placeholder (locked) ─────────
  {
    id: "P-10",
    sector: "Robotics & IoT",
    sectorColor: "#c62828",
    title: "Milestone Node",
    subtitle: "Engineering Checkpoint",
    status: "locked",
    landmark: "A glowing milestone pillar with orbiting rings",
    position: { x: -418, y: 590 },
    skills: [],
    details: "Reserved milestone checkpoint — briefing not yet available.",
    emoji: "🏆",
    color: "#c62828",
  },

  // ═══════════════════════════════════════════════════
  // 💻 Code Cove (Southeast) — Software & AI Projects
  // ═══════════════════════════════════════════════════
  {
    id: "P-6",
    sector: "Code Cove",
    sectorColor: "#6a1b9a",
    title: "CRM AI Outreach",
    subtitle: "Accenture / AOTC",
    status: "active",
    landmark: "A jungle temple with a data-funnel glowing in the center",
    position: { x: 288, y: 288 },
    skills: ["Next.js", "Gemini AI", "Google Sheets API", "TypeScript"],
    details:
      "AI-powered CRM outreach tool for La Centrale Agricole urban farming co-op. Parses LinkedIn profiles, generates personalized cold emails with Gemini, and auto-logs all correspondence to Google Sheets. Built for Accenture's innovation program.",
    emoji: "🤖",
    color: "#6a1b9a",
    demo: "#",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3y0pe5-zj445NQYKmzbJNwSt6pwKm-RRaSroWdOsq0I9WvDU4tlIf_le6clLEAU1EU_s99pamo_RefOqMxhNv1gYMTs8tPSds7Jkb4ZRhxpEU9UQElEzVJSAoqViv4qiKxxL8YG9QR_aSkWObExq5swckGUTYd52SXI-msGM0W3mwkQaAm_mq0ahm8uaF08K-nIl5jUrIwBV32yVovAyJQHnlDfbkAO7aB-NtTFoGg_DNNFBe_PUARobX_wFyaL9hpiLkuNQrBNF",
  },
  {
    id: "P-7",
    sector: "Code Cove",
    sectorColor: "#6a1b9a",
    title: "MechPrep 3D",
    subtitle: "Interview Prep",
    status: "active",
    landmark: "A floating platform with spinning CAD models of engines",
    position: { x: 612, y: 396 },
    skills: ["React", "Three.js", "Blender", "Node.js"],
    details:
      "Interactive 3D CAD platform for mechanical engineering interview preparation. Features real-time 3D model manipulation, timed design challenges, and AI-powered feedback on engineering drawings.",
    emoji: "🎯",
    color: "#e65100",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3y0pe5-zj445NQYKmzbJNwSt6pwKm-RRaSroWdOsq0I9WvDU4tlIf_le6clLEAU1EU_s99pamo_RefOqMxhNv1gYMTs8tPSds7Jkb4ZRhxpEU9UQElEzVJSAoqViv4qiKxxL8YG9QR_aSkWObExq5swckGUTYd52SXI-msGM0W3mwkQaAm_mq0ahm8uaF08K-nIl5jUrIwBV32yVovAyJQHnlDfbkAO7aB-NtTFoGg_DNNFBe_PUARobX_wFyaL9hpiLkuNQrBNF",
  },
  {
    id: "P-8",
    sector: "Code Cove",
    sectorColor: "#6a1b9a",
    title: "LazyCare Assistant",
    subtitle: "Health AI",
    status: "active",
    landmark: "A giant floating tablet/pill bottle station",
    position: { x: 396, y: 576 },
    skills: ["FastAPI", "NLP", "Fine-tuning", "React Native"],
    details:
      "AI health assistant with a fine-tuned LLM for personalized symptom triage and lifestyle coaching. HIPAA-compliant data handling. Integrated with wearable APIs for passive health monitoring.",
    emoji: "💊",
    color: "#00695c",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3y0pe5-zj445NQYKmzbJNwSt6pwKm-RRaSroWdOsq0I9WvDU4tlIf_le6clLEAU1EU_s99pamo_RefOqMxhNv1gYMTs8tPSds7Jkb4ZRhxpEU9UQElEzVJSAoqViv4qiKxxL8YG9QR_aSkWObExq5swckGUTYd52SXI-msGM0W3mwkQaAm_mq0ahm8uaF08K-nIl5jUrIwBV32yVovAyJQHnlDfbkAO7aB-NtTFoGg_DNNFBe_PUARobX_wFyaL9hpiLkuNQrBNF",
  },
  {
    id: "P-9",
    sector: "Code Cove",
    sectorColor: "#6a1b9a",
    title: "Virtual Interview",
    subtitle: "AI Coach",
    status: "active",
    landmark: "A floating stage with a glowing microphone",
    position: { x: 180, y: 468 },
    skills: ["React", "WebRTC", "OpenAI API", "Speech-to-Text"],
    details:
      "AI-powered mock interview platform with real-time video analysis. Uses speech-to-text for response evaluation and provides instant feedback on technical communication skills, body language, and answer structure.",
    emoji: "🎙️",
    color: "#ad1457",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3y0pe5-zj445NQYKmzbJNwSt6pwKm-RRaSroWdOsq0I9WvDU4tlIf_le6clLEAU1EU_s99pamo_RefOqMxhNv1gYMTs8tPSds7Jkb4ZRhxpEU9UQElEzVJSAoqViv4qiKxxL8YG9QR_aSkWObExq5swckGUTYd52SXI-msGM0W3mwkQaAm_mq0ahm8uaF08K-nIl5jUrIwBV32yVovAyJQHnlDfbkAO7aB-NtTFoGg_DNNFBe_PUARobX_wFyaL9hpiLkuNQrBNF",
  },
];

/** Half-size of the playable world in world units */
export const WORLD_BOUNDS = 1100;

/** Spawn position (center of map) */
export const SPAWN_POSITION = { x: 0, y: 0 };

/** Sector info for the treasure map */
export const sectorInfo = [
  {
    name: "Internship Shores",
    emoji: "⚡",
    color: "#e65100",
    description: "Professional work experience",
    quadrant: "Northwest",
    ids: ["I-1", "I-2", "I-3", "I-4"],
  },
  {
    name: "Aero Atoll",
    emoji: "🚀",
    color: "#b8860b",
    description: "Aerospace & Mechanical projects",
    quadrant: "Northeast",
    ids: ["P-1", "P-2", "P-3"],
  },
  {
    name: "Robotics & IoT",
    emoji: "🤖",
    color: "#c62828",
    description: "Robotics & IoT systems",
    quadrant: "Southwest",
    ids: ["P-4", "P-5", "P-10"],
  },
  {
    name: "Code Cove",
    emoji: "💻",
    color: "#6a1b9a",
    description: "Software & AI projects",
    quadrant: "Southeast",
    ids: ["P-6", "P-7", "P-8", "P-9"],
  },
];

/** Get active missions only */
export function getActiveMissions(): Mission[] {
  return missions.filter((m) => m.status === "active");
}

/** Get a mission by ID */
export function getMissionById(id: string): Mission | undefined {
  return missions.find((m) => m.id === id);
}

/** All unique sectors */
export const sectors = [...new Set(missions.map((m) => m.sector))];

/* ─── Collectibles ─── */

export interface Collectible {
  id: string;
  type: "coin" | "chest";
  position: { x: number; y: number };
  points: number;
}

function makeRng(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

function generateCollectibles(): Collectible[] {
  const rng = makeRng(314159);
  const items: Collectible[] = [];
  for (let i = 0; i < 35; i++) {
    items.push({ id: `coin-${i}`, type: "coin", position: { x: (rng() - 0.5) * 2000, y: (rng() - 0.5) * 2000 }, points: 10 });
  }
  for (let i = 0; i < 10; i++) {
    items.push({ id: `chest-${i}`, type: "chest", position: { x: (rng() - 0.5) * 1700, y: (rng() - 0.5) * 1700 }, points: 50 });
  }
  return items;
}

export const collectibles: Collectible[] = generateCollectibles();
export const MAX_COLLECTIBLE_SCORE = collectibles.reduce((s, c) => s + c.points, 0);

/* ─── Fog of War Zones ─── */

export interface FogZone {
  x: number;
  y: number;
  size: number;
}

export const FOG_REVEAL_RADIUS = 480;

function generateFogZones(): FogZone[] {
  const rng = makeRng(777);
  const zones: FogZone[] = [];
  for (let i = 0; i < 24; i++) {
    // Spread evenly around the outer ring with slight randomness
    const angle = (i / 24) * Math.PI * 2 + rng() * 0.28;
    const radius = 690 + rng() * 640;
    zones.push({
      x: Math.cos(angle) * radius + (rng() - 0.5) * 180,
      y: Math.sin(angle) * radius + (rng() - 0.5) * 180,
      size: 270 + rng() * 200,
    });
  }
  return zones;
}

export const fogZones: FogZone[] = generateFogZones();

/* ─── Explosive Barrels ─── */

export interface Barrel {
  id: string;
  position: { x: number; y: number };
}

function generateBarrels(): Barrel[] {
  const rng = makeRng(999);
  return Array.from({ length: 12 }, (_, i) => ({
    id: `barrel-${i}`,
    position: { x: (rng() - 0.5) * 1900, y: (rng() - 0.5) * 1900 },
  }));
}

export const barrels: Barrel[] = generateBarrels();
