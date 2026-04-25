/* ─── Assembly Part type for the Mini-Game ─── */
export interface AssemblyPart {
  id: string;
  label: string;
  shape: "rect" | "circle" | "polygon";
  width: number;
  height: number;
  mass: number;
  color: string;
  targetX: number; // blueprint-relative placement target
  targetY: number;
  targetAngle?: number;
}

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
  /* Physics properties */
  gravityMass: number;         // Gravitational pull strength (400-1200)
  assemblyParts?: AssemblyPart[]; // For assembly mini-game
}

export const missions: Mission[] = [
  // ═══════════════════════════════════════════════════
  // ⚡ INTERNSHIP SHORES (Northwest) — Work experience
  // ═══════════════════════════════════════════════════
  {
    id: "I-1",
    sector: "Internship Shores",
    sectorColor: "#e65100",
    title: "Tesla",
    subtitle: "Manufacturing Engineering Intern · Cell Engineering",
    status: "active",
    landmark: "A massive gigafactory with electric arcs and battery cell assembly lines",
    position: { x: -1200, y: -940 },
    skills: ["Manufacturing", "Automation", "Battery Cell Engineering", "Python", "Lean Six Sigma"],
    details:
      "Incoming Manufacturing Engineering Intern at Tesla's Gigafactory, Cell Engineering department (Summer 2026). Focused on battery cell manufacturing processes, production line optimization, and automation systems for next-gen energy storage.",
    emoji: "⚡",
    color: "#e65100",
    gravityMass: 1000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GJnyIpTNceIUOUaWKj2yA16tfchlN9cYnadcCbuuuZQ5C4-ApDELnIMFMUoAHG9X95DjBR0_DOWKFyWrnpLzzkYA_ei38IBp2Hlz5fDKhUtgq2N7rNXSRrE3fph1Wu9M2Ogv3dhZ3hh3294kM9omBYp77--auHbaBqrZcIkiQ_mOt3kqOxAzfHs47wzpJ9xKaSCebvpm5kKiuPAHq5gwhK8PUaH620g3qSJPop9HsHZ1As5-jYosi5FEppzMGh3U5pJmiZucRqPE",
  },
  {
    id: "I-2",
    sector: "Internship Shores",
    sectorColor: "#e65100",
    title: "Lockheed Martin",
    subtitle: "Engineering Intern",
    status: "active",
    landmark: "A high-tech aircraft hangar with a spinning jet turbine",
    position: { x: -600, y: -580 },
    skills: ["3D CAD Modeling", "Structural Design", "CATIA", "GD&T", "FEA"],
    details:
      "Engineering Intern at Lockheed Martin. Worked on 3D CAD modeling and structural design of airframe components. Performed FEA on composite panels for airframe programs. Delivered full CAD assemblies with tolerance stack-up analysis and GD&T documentation.",
    emoji: "✈️",
    color: "#1a3a6b",
    gravityMass: 800,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GJnyIpTNceIUOUaWKj2yA16tfchlN9cYnadcCbuuuZQ5C4-ApDELnIMFMUoAHG9X95DjBR0_DOWKFyWrnpLzzkYA_ei38IBp2Hlz5fDKhUtgq2N7rNXSRrE3fph1Wu9M2Ogv3dhZ3hh3294kM9omBYp77--auHbaBqrZcIkiQ_mOt3kqOxAzfHs47wzpJ9xKaSCebvpm5kKiuPAHq5gwhK8PUaH620g3qSJPop9HsHZ1As5-jYosi5FEppzMGh3U5pJmiZucRqPE",
  },
  {
    id: "I-4",
    sector: "Internship Shores",
    sectorColor: "#e65100",
    title: "City of Montreal",
    subtitle: "Scientific Intern · Water Department",
    status: "active",
    landmark: "A waterfront city hall with flowing blue pipes and a maple leaf flag",
    position: { x: -220, y: -1100 },
    skills: ["Data Analysis", "Environmental Engineering", "Python", "GIS"],
    details:
      "Scientific Intern at the City of Montreal's Water Department (May–Aug 2025). Contributed to water quality monitoring initiatives and geospatial data pipelines for municipal infrastructure management.",
    emoji: "💧",
    color: "#0277bd",
    gravityMass: 600,
  },
  // ── Internship: classified slot (locked) ──
  {
    id: "I-3",
    sector: "Internship Shores",
    sectorColor: "#e65100",
    title: "Classified",
    subtitle: "Secret Mission",
    status: "locked",
    landmark: "A black monolith with a pulsing question mark beacon",
    position: { x: -1400, y: -500 },
    skills: [],
    details: "Classified — mission briefing not yet available. Stay curious.",
    emoji: "❓",
    color: "#e65100",
    gravityMass: 400,
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
    position: { x: 700, y: -1100 },
    skills: ["Arduino", "CATIA", "Systems Integration", "Prototyping"],
    details:
      "PM & systems integration lead for the Canadian Space Agency (LEAP program) lunar produce-transport prototype. Coordinated cross-disciplinary sub-teams, managed milestone tracking, and delivered a pressurized cargo module with active thermal regulation. Validated in simulated lunar gravity conditions using counterweight rigs.",
    emoji: "🌕",
    color: "#b8860b",
    gravityMass: 850,
    github: "https://github.com/Louiszhang2005-1",
    assemblyParts: [
      { id: "leap-frame", label: "Cargo Frame", shape: "rect", width: 100, height: 30, mass: 12, color: "#8B8682", targetX: 0, targetY: 0 },
      { id: "leap-thermal", label: "Thermal Shield", shape: "rect", width: 110, height: 12, mass: 6, color: "#d4a017", targetX: 0, targetY: -25 },
      { id: "leap-wheel-l", label: "Left Wheel", shape: "circle", width: 28, height: 28, mass: 4, color: "#333", targetX: -45, targetY: 25 },
      { id: "leap-wheel-r", label: "Right Wheel", shape: "circle", width: 28, height: 28, mass: 4, color: "#333", targetX: 45, targetY: 25 },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfmEpezBSpneFvCrYKhOLUOseL8Ykp1jo-HSG-ffLWpXFUDPcJaLNQ_yYG5K3rrQojomG93egnxnwooCUeOcPCLWPOTN3DCgnuB1cKbCeyo00IDUBjs5tK3QD_526_Tv0wWlf_J9c26MbyCm2M9Bh0lHMTaYyyp_lR2bOctqYMSHKc0imzdeQ5FArd6MJgX1SS1NDA5WuXGr8-BMg81vmKL76Uzzftusbi3MNmNr5KKskCa3NgMBifjJq1unU1ixty6_658_OlN05p",
  },
  {
    id: "P-2",
    sector: "Aero Atoll",
    sectorColor: "#b8860b",
    title: "Axial Piston Pump",
    subtitle: "Hydraulic System Design",
    status: "active",
    landmark: "A giant, translucent mechanical pump with moving pistons",
    position: { x: 1400, y: -600 },
    skills: ["AutoCAD", "CFD Simulation", "MATLAB", "Manufacturing"],
    details:
      "Modeled and optimized a high-performance axial piston hydraulic pump. Achieved 18% efficiency gain through port geometry optimization. Full CFD simulation pipeline built in ANSYS Fluent with automated parametric sweeps.",
    emoji: "⚙️",
    color: "#4a4a4a",
    gravityMass: 750,
    github: "https://github.com/Louiszhang2005-1",
    assemblyParts: [
      { id: "pump-housing", label: "Housing", shape: "rect", width: 90, height: 70, mass: 15, color: "#5c5c5c" , targetX: 0, targetY: 0 },
      { id: "pump-cylinder", label: "Cylinder Block", shape: "circle", width: 50, height: 50, mass: 10, color: "#7a7a7a", targetX: 0, targetY: 0 },
      { id: "pump-swash", label: "Swashplate", shape: "rect", width: 70, height: 10, mass: 7, color: "#b0b0b0", targetX: 0, targetY: 30, targetAngle: 15 },
      { id: "pump-piston", label: "Piston", shape: "rect", width: 12, height: 35, mass: 3, color: "#c0c0c0", targetX: -15, targetY: -10 },
      { id: "pump-valve", label: "Valve Plate", shape: "rect", width: 55, height: 8, mass: 5, color: "#d4a017", targetX: 0, targetY: -38 },
    ],
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
    position: { x: 900, y: -300 },
    skills: ["C++", "ROS2", "Computer Vision", "Mechatronics"],
    details:
      "5th-place autonomous seed-planting robot at RoboHacks 2024. Implemented SLAM-based navigation with a custom soil auger end-effector. Planted 47 seed pods in 15 minutes during the competition run.",
    emoji: "🌱",
    color: "#2e7d32",
    gravityMass: 650,
    github: "https://github.com/Louiszhang2005-1",
    assemblyParts: [
      { id: "robo-chassis", label: "Chassis", shape: "rect", width: 80, height: 40, mass: 10, color: "#2e7d32", targetX: 0, targetY: 0 },
      { id: "robo-motor", label: "DC Motor", shape: "circle", width: 22, height: 22, mass: 5, color: "#555", targetX: -30, targetY: 15 },
      { id: "robo-auger", label: "Soil Auger", shape: "rect", width: 14, height: 50, mass: 6, color: "#8B6914", targetX: 35, targetY: -20 },
      { id: "robo-wheels", label: "Treads", shape: "rect", width: 90, height: 10, mass: 7, color: "#333", targetX: 0, targetY: 28 },
      { id: "robo-sensor", label: "LIDAR Sensor", shape: "circle", width: 18, height: 18, mass: 2, color: "#00d4ff", targetX: 0, targetY: -28 },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAS80X_XNEuUFS6k-WwWNK4ujFPPuUxPpWvmTVpU1JR5SivSd5oUG2JcVNgHI4epz7XEJI6N7eCpY_5koJUANuAI1BYhptkTPhdi5UGO2lM2yHA1--6_Zdhkuwaf4AXh47aYn5TOW2B8af31QajqbXwz4Ldn2XPUjvQPK0SasCQYVwEJls5ZWv-YsDYabLJ6PaUZtolG1ufVsJARGvsPWji9-J_dMGuf0kpNNEYucYBsS8AG3SpRwrHKSZrvL4alOKLEcgHbwa7a7w",
  },

  // ═══════════════════════════════════════════════════
  // 🏥 Robotics Bay (Southwest) — Health & Safety Tech
  // ═══════════════════════════════════════════════════
  {
    id: "P-4",
    sector: "Robotics & IoT",
    sectorColor: "#c62828",
    title: "ResQ-Link",
    subtitle: "Digital Triage Wristband",
    status: "active",
    landmark: "A medical station with a giant glowing NFC wristband",
    position: { x: -1100, y: 500 },
    skills: ["NFC", "SOLIDWORKS", "Embedded C", "Medical Design"],
    details:
      "Ruggedized medical silicone band for mass casualty triage events. Integrates passive NFC tags with encrypted patient data readable by first responders. Designed for IP68 waterproofing and 72h battery life.",
    emoji: "🏥",
    color: "#c62828",
    gravityMass: 600,
    assemblyParts: [
      { id: "resq-band", label: "Silicone Band", shape: "rect", width: 100, height: 20, mass: 3, color: "#c62828", targetX: 0, targetY: 0 },
      { id: "resq-nfc", label: "NFC Chip", shape: "rect", width: 16, height: 16, mass: 1, color: "#00d4ff", targetX: 0, targetY: 0 },
      { id: "resq-battery", label: "Battery Cell", shape: "rect", width: 24, height: 12, mass: 4, color: "#4caf50", targetX: -25, targetY: 0 },
      { id: "resq-case", label: "IP68 Enclosure", shape: "rect", width: 108, height: 28, mass: 5, color: "#555", targetX: 0, targetY: 0 },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAS80X_XNEuUFS6k-WwWNK4ujFPPuUxPpWvmTVpU1JR5SivSd5oUG2JcVNgHI4epz7XEJI6N7eCpY_5koJUANuAI1BYhptkTPhdi5UGO2lM2yHA1--6_Zdhkuwaf4AXh47aYn5TOW2B8af31QajqbXwz4Ldn2XPUjvQPK0SasCQYVwEJls5ZWv-YsDYabLJ6PaUZtolG1ufVsJARGvsPWji9-J_dMGuf0kpNNEYucYBsS8AG3SpRwrHKSZrvL4alOKLEcgHbwa7a7w",
  },
  {
    id: "P-5",
    sector: "Robotics & IoT",
    sectorColor: "#c62828",
    title: "Nursie",
    subtitle: "Winner — ConUHacks X · Best Use of ElevenLabs",
    status: "active",
    landmark: "A futuristic care facility with a spinning radar dish and AI core",
    position: { x: -500, y: 900 },
    skills: ["Python", "ElevenLabs", "AI", "Real-time Systems", "IoT"],
    details:
      "🏆 Winner at ConUHacks X (Jan 2026) — Best Use of ElevenLabs. A dignity-first AI surveillance system designed for the next generation of elderly care. Uses real-time sensor fusion and voice AI to monitor patient safety while preserving autonomy and privacy.",
    emoji: "🏆",
    color: "#1565c0",
    gravityMass: 700,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAS80X_XNEuUFS6k-WwWNK4ujFPPuUxPpWvmTVpU1JR5SivSd5oUG2JcVNgHI4epz7XEJI6N7eCpY_5koJUANuAI1BYhptkTPhdi5UGO2lM2yHA1--6_Zdhkuwaf4AXh47aYn5TOW2B8af31QajqbXwz4Ldn2XPUjvQPK0SasCQYVwEJls5ZWv-YsDYabLJ6PaUZtolG1ufVsJARGvsPWji9-J_dMGuf0kpNNEYucYBsS8AG3SpRwrHKSZrvL4alOKLEcgHbwa7a7w",
  },
  // ── Robotics & IoT: placeholder (locked) ─────────
  {
    id: "P-10",
    sector: "Robotics & IoT",
    sectorColor: "#c62828",
    title: "Milestone Node",
    subtitle: "Engineering Checkpoint",
    status: "locked",
    landmark: "A glowing milestone pillar with orbiting rings",
    position: { x: -800, y: 1200 },
    skills: [],
    details: "Reserved milestone checkpoint — briefing not yet available.",
    emoji: "🏆",
    color: "#c62828",
    gravityMass: 400,
  },

  // ═══════════════════════════════════════════════════
  // 💻 Code Cove (Southeast) — Software & AI Projects
  // ═══════════════════════════════════════════════════
  {
    id: "P-6",
    sector: "Code Cove",
    sectorColor: "#6a1b9a",
    title: "Saight",
    subtitle: "Winner — DeltaHacks X · AI Assistive Tech",
    status: "active",
    landmark: "A glowing navigation beacon with AI pathfinding rays",
    position: { x: 500, y: 500 },
    skills: ["Computer Vision", "AI", "Mobile Development", "Accessibility"],
    details:
      "🏆 Winner at DeltaHacks X. An AI-powered assistive technology for the visually impaired. Uses a smartphone-mapped white cane for navigation, providing real-time audio feedback about surroundings and obstacles. Built with computer vision and spatial mapping.",
    emoji: "👁️",
    color: "#6a1b9a",
    gravityMass: 700,
    demo: "#",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3y0pe5-zj445NQYKmzbJNwSt6pwKm-RRaSroWdOsq0I9WvDU4tlIf_le6clLEAU1EU_s99pamo_RefOqMxhNv1gYMTs8tPSds7Jkb4ZRhxpEU9UQElEzVJSAoqViv4qiKxxL8YG9QR_aSkWObExq5swckGUTYd52SXI-msGM0W3mwkQaAm_mq0ahm8uaF08K-nIl5jUrIwBV32yVovAyJQHnlDfbkAO7aB-NtTFoGg_DNNFBe_PUARobX_wFyaL9hpiLkuNQrBNF",
  },
  {
    id: "P-7",
    sector: "Code Cove",
    sectorColor: "#6a1b9a",
    title: "STARSCAN.AI",
    subtitle: "AI Document Analysis",
    status: "active",
    landmark: "A floating platform with orbiting satellite imagery and data streams",
    position: { x: 1300, y: 700 },
    skills: ["AI", "NLP", "NASA APIs", "React", "Python"],
    details:
      "AI-powered system designed to analyze technical and scientific documents, including NASA documentation. Uses advanced NLP to extract insights, cross-reference data, and generate summaries from complex engineering specs and research papers.",
    emoji: "🛰️",
    color: "#e65100",
    gravityMass: 600,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3y0pe5-zj445NQYKmzbJNwSt6pwKm-RRaSroWdOsq0I9WvDU4tlIf_le6clLEAU1EU_s99pamo_RefOqMxhNv1gYMTs8tPSds7Jkb4ZRhxpEU9UQElEzVJSAoqViv4qiKxxL8YG9QR_aSkWObExq5swckGUTYd52SXI-msGM0W3mwkQaAm_mq0ahm8uaF08K-nIl5jUrIwBV32yVovAyJQHnlDfbkAO7aB-NtTFoGg_DNNFBe_PUARobX_wFyaL9hpiLkuNQrBNF",
  },
  {
    id: "P-8",
    sector: "Code Cove",
    sectorColor: "#6a1b9a",
    title: "LingoBattles",
    subtitle: "ConUHacks IX · Competitive Language Game",
    status: "active",
    landmark: "An arena with glowing word bubbles and dueling stations",
    position: { x: 700, y: 1200 },
    skills: ["React", "WebSockets", "Real-time Multiplayer", "Game Design"],
    details:
      "A fast-paced, real-time competitive party game for language learning built at ConUHacks IX (Jan 2024). Players battle head-to-head in timed vocabulary challenges with live leaderboards and particle effects.",
    emoji: "🎮",
    color: "#00695c",
    gravityMass: 550,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3y0pe5-zj445NQYKmzbJNwSt6pwKm-RRaSroWdOsq0I9WvDU4tlIf_le6clLEAU1EU_s99pamo_RefOqMxhNv1gYMTs8tPSds7Jkb4ZRhxpEU9UQElEzVJSAoqViv4qiKxxL8YG9QR_aSkWObExq5swckGUTYd52SXI-msGM0W3mwkQaAm_mq0ahm8uaF08K-nIl5jUrIwBV32yVovAyJQHnlDfbkAO7aB-NtTFoGg_DNNFBe_PUARobX_wFyaL9hpiLkuNQrBNF",
  },
  {
    id: "P-9",
    sector: "Code Cove",
    sectorColor: "#6a1b9a",
    title: "CRM AI Outreach",
    subtitle: "Accenture Innovation Program",
    status: "active",
    landmark: "A data-funnel temple with AI circuits",
    position: { x: 200, y: 900 },
    skills: ["Next.js", "Gemini AI", "Google Sheets API", "TypeScript"],
    details:
      "AI-powered CRM outreach tool for La Centrale Agricole urban farming co-op, built for Accenture's innovation program. Parses LinkedIn profiles, generates personalized cold emails with Gemini AI, and auto-logs all correspondence to Google Sheets.",
    emoji: "🤖",
    color: "#ad1457",
    gravityMass: 550,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq3y0pe5-zj445NQYKmzbJNwSt6pwKm-RRaSroWdOsq0I9WvDU4tlIf_le6clLEAU1EU_s99pamo_RefOqMxhNv1gYMTs8tPSds7Jkb4ZRhxpEU9UQElEzVJSAoqViv4qiKxxL8YG9QR_aSkWObExq5swckGUTYd52SXI-msGM0W3mwkQaAm_mq0ahm8uaF08K-nIl5jUrIwBV32yVovAyJQHnlDfbkAO7aB-NtTFoGg_DNNFBe_PUARobX_wFyaL9hpiLkuNQrBNF",
  },
];

/** Half-size of the playable world in world units — EXPANDED for more spacing */
export const WORLD_BOUNDS = 2000;

/** Spawn position (center of map) */
export const SPAWN_POSITION = { x: 0, y: 0 };

/** Collision radius for project zones (smaller) */
export const COLLISION_RADIUS = 110;

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

/* ─── Collectibles (Perseverance Points) ─── */

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
  for (let i = 0; i < 40; i++) {
    items.push({ id: `coin-${i}`, type: "coin", position: { x: (rng() - 0.5) * 3600, y: (rng() - 0.5) * 3600 }, points: 10 });
  }
  for (let i = 0; i < 12; i++) {
    items.push({ id: `chest-${i}`, type: "chest", position: { x: (rng() - 0.5) * 3200, y: (rng() - 0.5) * 3200 }, points: 50 });
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

export const FOG_REVEAL_RADIUS = 550;

function generateFogZones(): FogZone[] {
  const rng = makeRng(777);
  const zones: FogZone[] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2 + rng() * 0.28;
    const radius = 1000 + rng() * 1000;
    zones.push({
      x: Math.cos(angle) * radius + (rng() - 0.5) * 250,
      y: Math.sin(angle) * radius + (rng() - 0.5) * 250,
      size: 380 + rng() * 300,
    });
  }
  return zones;
}

export const fogZones: FogZone[] = generateFogZones();

/* ─── Hazard Zones ─── */

export interface HazardZone {
  id: string;
  type: "thermal" | "pressure";
  position: { x: number; y: number };
  radius: number;
  intensity: number; // 0-1
}

export const hazardZones: HazardZone[] = [
  // Thermal vents — spaced between sectors
  { id: "thermal-1", type: "thermal", position: { x: -100, y: -700 }, radius: 140, intensity: 0.6 },
  { id: "thermal-2", type: "thermal", position: { x: 400, y: -400 }, radius: 120, intensity: 0.5 },
  { id: "thermal-3", type: "thermal", position: { x: -700, y: 200 }, radius: 130, intensity: 0.55 },
  { id: "thermal-4", type: "thermal", position: { x: 900, y: 300 }, radius: 110, intensity: 0.7 },
  // High-pressure zones
  { id: "pressure-1", type: "pressure", position: { x: 200, y: 200 }, radius: 100, intensity: 0.5 },
  { id: "pressure-2", type: "pressure", position: { x: -500, y: -300 }, radius: 110, intensity: 0.45 },
  { id: "pressure-3", type: "pressure", position: { x: 1000, y: -800 }, radius: 100, intensity: 0.6 },
  { id: "pressure-4", type: "pressure", position: { x: -300, y: 800 }, radius: 120, intensity: 0.5 },
];

/* ─── Explosive Barrels ─── */

export interface Barrel {
  id: string;
  position: { x: number; y: number };
}

function generateBarrels(): Barrel[] {
  const rng = makeRng(999);
  return Array.from({ length: 6 }, (_, i) => ({
    id: `barrel-${i}`,
    position: { x: (rng() - 0.5) * 3400, y: (rng() - 0.5) * 3400 },
  }));
}

export const barrels: Barrel[] = generateBarrels();
