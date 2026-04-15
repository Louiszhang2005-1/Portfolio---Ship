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
    subtitle: "Cell Engineering",
    status: "locked",
    landmark: "A factory with a 'Coming Summer 2026' neon sign",
    position: { x: -800, y: -600 },
    skills: ["Manufacturing", "Automation", "Lean Six Sigma", "Python"],
    details:
      "Manufacturing Engineering Intern at the Nevada Gigafactory. Worked on battery cell production line optimization, reducing cycle time by 12% through targeted automation improvements. Collaborated cross-functionally with cell chemistry and robotics teams.",
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
    position: { x: -450, y: -400 },
    skills: ["CAD", "Structural Analysis", "CATIA", "GD&T"],
    details:
      "Mechanical Engineering Intern focusing on airframe structural design. Performed FEA on composite panels and contributed to design documentation for classified airframe programs. Delivered detailed CAD assemblies with full tolerance stack-up analysis.",
    emoji: "✈️",
    color: "#1a3a6b",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GJnyIpTNceIUOUaWKj2yA16tfchlN9cYnadcCbuuuZQ5C4-ApDELnIMFMUoAHG9X95DjBR0_DOWKFyWrnpLzzkYA_ei38IBp2Hlz5fDKhUtgq2N7rNXSRrE3fph1Wu9M2Ogv3dhZ3hh3294kM9omBYp77--auHbaBqrZcIkiQ_mOt3kqOxAzfHs47wzpJ9xKaSCebvpm5kKiuPAHq5gwhK8PUaH620g3qSJPop9HsHZ1As5-jYosi5FEppzMGh3U5pJmiZucRqPE",
  },

  // ═══════════════════════════════════════════════════
  // 🚀 Aero Atoll (Northeast) — Aerospace & Mechanical
  // ═══════════════════════════════════════════════════
  {
    id: "P-1",
    sector: "Aero Atoll",
    sectorColor: "#b8860b",
    title: "CSA Lunar LEAP",
    subtitle: "Produce Transport",
    status: "active",
    landmark: "A miniature moon-base with a moving lunar wagon",
    position: { x: 500, y: -650 },
    skills: ["Arduino", "CATIA", "Systems Integration", "Prototyping"],
    details:
      "Lunar produce-transport prototype for the Canadian Space Agency (LEAP program). Designed a pressurized cargo module with active thermal regulation. Prototyped and validated in simulated lunar gravity conditions using counterweight rigs.",
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
    position: { x: 900, y: -350 },
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
    position: { x: 650, y: -100 },
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
    sector: "Medi-Bay",
    sectorColor: "#c62828",
    title: "ResQ-Link",
    subtitle: "Digital Triage",
    status: "active",
    landmark: "A medical station with a giant glowing NFC wristband",
    position: { x: -750, y: 400 },
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
    sector: "Medi-Bay",
    sectorColor: "#c62828",
    title: "Nursie Monitoring",
    subtitle: "Fall Detection",
    status: "active",
    landmark: "A futuristic tower with a spinning mmWave radar dish",
    position: { x: -400, y: 650 },
    skills: ["Python", "mmWave Radar", "Signal Processing", "IoT"],
    details:
      "Sensor fusion system using TI mmWave radar and vibration accelerometers for elderly fall detection. Achieves 94% detection accuracy with sub-2s alert latency. Integrates with nurse call systems via MQTT.",
    emoji: "📡",
    color: "#1565c0",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAS80X_XNEuUFS6k-WwWNK4ujFPPuUxPpWvmTVpU1JR5SivSd5oUG2JcVNgHI4epz7XEJI6N7eCpY_5koJUANuAI1BYhptkTPhdi5UGO2lM2yHA1--6_Zdhkuwaf4AXh47aYn5TOW2B8af31QajqbXwz4Ldn2XPUjvQPK0SasCQYVwEJls5ZWv-YsDYabLJ6PaUZtolG1ufVsJARGvsPWji9-J_dMGuf0kpNNEYucYBsS8AG3SpRwrHKSZrvL4alOKLEcgHbwa7a7w",
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
    position: { x: 400, y: 400 },
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
    position: { x: 850, y: 550 },
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
    position: { x: 550, y: 800 },
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
    position: { x: 250, y: 650 },
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
export const WORLD_BOUNDS = 1500;

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
    ids: ["I-1", "I-2"],
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
    name: "Medi-Bay",
    emoji: "🏥",
    color: "#c62828",
    description: "Health & Safety tech",
    quadrant: "Southwest",
    ids: ["P-4", "P-5"],
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
    items.push({ id: `coin-${i}`, type: "coin", position: { x: (rng() - 0.5) * 2800, y: (rng() - 0.5) * 2800 }, points: 10 });
  }
  for (let i = 0; i < 10; i++) {
    items.push({ id: `chest-${i}`, type: "chest", position: { x: (rng() - 0.5) * 2400, y: (rng() - 0.5) * 2400 }, points: 50 });
  }
  return items;
}

export const collectibles: Collectible[] = generateCollectibles();
export const MAX_COLLECTIBLE_SCORE = collectibles.reduce((s, c) => s + c.points, 0);
