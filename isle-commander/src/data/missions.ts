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
  logo?: string;
  image?: string;
  github?: string;
  demo?: string;
  /* Physics properties */
  gravityMass: number;         // Gravitational pull strength (400-1200)
  fieldType: "typhoon" | "gravity";  // Visual field effect type
  fieldRadius?: number;        // Override default field radius (default ~250)
  assemblyParts?: AssemblyPart[]; // For assembly mini-game
}

export const missions: Mission[] = [
  // ═══════════════════════════════════════════════════
  // ⚡ INTERNSHIP SHORES (Northwest) — Work experience
  // ═══════════════════════════════════════════════════
  {
    id: "I-4",
    sector: "Internship Shores",
    sectorColor: "#e65100",
    title: "City of Montreal",
    subtitle: "Scientific Intern · Water Testing · May–Aug 2025",
    status: "active",
    landmark: "A waterfront city hall with municipal water-testing labs and bubbling sample beakers",
    position: { x: -560, y: -420 },
    skills: ["Water Quality Testing", "Lab Analysis", "Environmental Monitoring", "Data Analysis", "Python"],
    details:
      "Scientific Intern at the City of Montreal's Water Department (May–Aug 2025). Performed hands-on water testing across municipal sources — collected and analyzed samples for chemical, physical, and microbiological parameters to validate compliance with Quebec drinking-water standards. Operated lab instrumentation, logged results into the city's monitoring pipelines, and supported the data analysis workflow that informs distribution-network decisions.",
    emoji: "💧",
    color: "#0277bd",
    logo: "/logo/city-of-montreal.gif",
    gravityMass: 600,
    fieldType: "typhoon",
    fieldRadius: 220,
  },
  {
    id: "I-2",
    sector: "Internship Shores",
    sectorColor: "#e65100",
    title: "Lockheed Martin",
    subtitle: "Mechanical Engineering Intern · Ship Integrations · Winter 2026",
    status: "active",
    landmark: "A naval shipyard with a docked frigate, gantry cranes, and integration scaffolding",
    position: { x: -1050, y: -760 },
    skills: ["Ship Systems Integration", "3D CAD Modeling", "Mechanical Design", "GD&T", "FEA", "CATIA"],
    details:
      "Mechanical Engineering Intern at Lockheed Martin on the Ship Integrations team (Winter 2026). Supported the mechanical integration of subsystems aboard naval platforms — 3D CAD modeling, structural layouts, fit-checks, and tolerance/GD&T documentation for shipboard hardware. Worked on FEA validation for mounting structures and contributed to the assembly drawings and interface documentation that govern how subsystems are physically integrated into the ship.",
    emoji: "⚓",
    color: "#1a3a6b",
    logo: "/logo/lockheed-martin.jpg",
    gravityMass: 800,
    fieldType: "gravity",
    fieldRadius: 260,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GJnyIpTNceIUOUaWKj2yA16tfchlN9cYnadcCbuuuZQ5C4-ApDELnIMFMUoAHG9X95DjBR0_DOWKFyWrnpLzzkYA_ei38IBp2Hlz5fDKhUtgq2N7rNXSRrE3fph1Wu9M2Ogv3dhZ3hh3294kM9omBYp77--auHbaBqrZcIkiQ_mOt3kqOxAzfHs47wzpJ9xKaSCebvpm5kKiuPAHq5gwhK8PUaH620g3qSJPop9HsHZ1As5-jYosi5FEppzMGh3U5pJmiZucRqPE",
  },
  {
    id: "I-1",
    sector: "Internship Shores",
    sectorColor: "#e65100",
    title: "Tesla",
    subtitle: "Manufacturing Engineering Intern · Cell Engineering · Summer–Fall 2026",
    status: "active",
    landmark: "A massive gigafactory with electric arcs and battery cell assembly lines",
    position: { x: -1500, y: -1180 },
    skills: ["Manufacturing Engineering", "Battery Cell Engineering", "Process Optimization", "Automation", "Python", "Lean Six Sigma"],
    details:
      "Incoming Manufacturing Engineering Intern at Tesla on the Cell Engineering team (Summer–Fall 2026, Nevada Gigafactory). Will work on the manufacturing processes behind Tesla's battery cells — production-line optimization, process improvement, and automation systems supporting next-generation cell architectures and high-volume cell output.",
    emoji: "⚡",
    color: "#e65100",
    logo: "/logo/tesla.jpg",
    gravityMass: 1000,
    fieldType: "typhoon",
    fieldRadius: 280,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GJnyIpTNceIUOUaWKj2yA16tfchlN9cYnadcCbuuuZQ5C4-ApDELnIMFMUoAHG9X95DjBR0_DOWKFyWrnpLzzkYA_ei38IBp2Hlz5fDKhUtgq2N7rNXSRrE3fph1Wu9M2Ogv3dhZ3hh3294kM9omBYp77--auHbaBqrZcIkiQ_mOt3kqOxAzfHs47wzpJ9xKaSCebvpm5kKiuPAHq5gwhK8PUaH620g3qSJPop9HsHZ1As5-jYosi5FEppzMGh3U5pJmiZucRqPE",
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
    position: { x: -1540, y: -430 },
    skills: [],
    details: "Classified — mission briefing not yet available. Stay curious.",
    emoji: "❓",
    color: "#e65100",
    gravityMass: 400,
    fieldType: "gravity",
    fieldRadius: 200,
  },

  // ═══════════════════════════════════════════════════
  // 🚀 Aero Atoll (Northeast) — Aerospace & Mechanical
  // ═══════════════════════════════════════════════════
  {
    id: "P-1",
    sector: "Aero Atoll",
    sectorColor: "#b8860b",
    title: "CSA Lunar LEAP",
    subtitle: "PM & Systems Integrator · CSA LEAP · Jan–May 2025 · Polytechnique Montréal",
    status: "active",
    landmark: "A miniature moon-base with a moving lunar wagon",
    position: { x: 1300, y: -400 },
    skills: ["CATIA V6", "Fusion 360", "GD&T", "MS Project", "Cold Welding", "Systems Integration", "FEA", "Arduino", "Raspberry Pi Pico"],
    details:
      "PM & Systems Integrator for the Canadian Space Agency Lunar Exploration Accelerator Program (LEAP) — OASIS Mission (Jan–May 2025, Polytechnique Montréal). Directed end-to-end design of a 3.1m telescopic lunar produce-transport tube (Ø540mm, 3080mm deployed length) fully compliant with CSA performance and safety standards. Managed 50+ part interfaces, achieved a 12% system mass reduction while sustaining a 2.5× structural safety factor. Ran thermal FEA over the 14-day lunar night cycle and validated zero mechanical interference across the full telescopic deployment sweep. Developed the rail-guided transport wagon's control logic on an Arduino microcontroller — ensuring precision positioning along the telescopic support tube. Designed and programmed a Raspberry Pi Pico–driven belt conveyor for seamless vegetable transfer from lunar greenhouse to habitat module. Led physical integration: AL-6061 machining, MLI fabrication, PCB prototyping, wiring harnesses, and cold-welding of tab-to-tube joints.",
    emoji: "🌕",
    color: "#b8860b",
    gravityMass: 850,
    fieldType: "typhoon",
    fieldRadius: 270,
    github: "https://github.com/Louiszhang2005-1",
    assemblyParts: [
      { id: "leap-tube", label: "Transport Tube (Ø540mm)", shape: "rect", width: 110, height: 28, mass: 14, color: "#8B8A9A", targetX: 0, targetY: 0 },
      { id: "leap-mli", label: "MLI Thermal Wrap", shape: "rect", width: 114, height: 10, mass: 3, color: "#d4a017", targetX: 0, targetY: -24 },
      { id: "leap-rail", label: "Carbon Rail", shape: "rect", width: 100, height: 8, mass: 5, color: "#222", targetX: 0, targetY: 12 },
      { id: "leap-wagon", label: "Arduino Wagon", shape: "rect", width: 32, height: 22, mass: 6, color: "#c62828", targetX: -35, targetY: 0 },
      { id: "leap-conveyor", label: "Pi Pico Conveyor", shape: "rect", width: 30, height: 14, mass: 4, color: "#1565c0", targetX: 35, targetY: 0 },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfmEpezBSpneFvCrYKhOLUOseL8Ykp1jo-HSG-ffLWpXFUDPcJaLNQ_yYG5K3rrQojomG93egnxnwooCUeOcPCLWPOTN3DCgnuB1cKbCeyo00IDUBjs5tK3QD_526_Tv0wWlf_J9c26MbyCm2M9Bh0lHMTaYyyp_lR2bOctqYMSHKc0imzdeQ5FArd6MJgX1SS1NDA5WuXGr8-BMg81vmKL76Uzzftusbi3MNmNr5KKskCa3NgMBifjJq1unU1ixty6_658_OlN05p",
  },
  {
    id: "P-2",
    sector: "Aero Atoll",
    sectorColor: "#b8860b",
    title: "Axial Piston Pump",
    subtitle: "Hydraulic System Design · Nov–Dec 2024 · Polytechnique Montréal",
    status: "active",
    landmark: "A giant, translucent mechanical pump with moving pistons",
    position: { x: 400, y: -400 },
    skills: ["3D CAD", "SolidWorks", "Mechanical Design", "GD&T", "Assembly Modeling"],
    details:
      "3D CAD modeling project at Polytechnique Montréal (Nov–Dec 2024). Fully modeled a high-performance axial piston hydraulic pump from the ground up. The assembly consists of a Cylinder Block (Bloc-cylindre) housing 9 individual Piston Assemblies — each comprising a Piston and a Slipper Pad (Patin) — retained by a Retaining Plate (Plaque de retenue) and centered via a Spherical Nut (Noix sphérique). Optimized component geometry and assembly parameters to enhance mechanical durability and functionality. Produced a full exploded-view drawing with bilingual French/English BOM following standard drafting conventions.",
    emoji: "⚙️",
    color: "#4a4a4a",
    gravityMass: 750,
    fieldType: "gravity",
    fieldRadius: 260,
    assemblyParts: [
      { id: "pump-cylinder", label: "Bloc-cylindre", shape: "circle", width: 60, height: 60, mass: 15, color: "#5c5c5c", targetX: 0, targetY: 10 },
      { id: "pump-retainer", label: "Plaque de retenue", shape: "circle", width: 52, height: 52, mass: 8, color: "#909090", targetX: 0, targetY: -28 },
      { id: "pump-nut", label: "Noix sphérique", shape: "circle", width: 20, height: 20, mass: 3, color: "#b0b0b0", targetX: 0, targetY: -48 },
      { id: "pump-piston", label: "Piston (×9)", shape: "rect", width: 10, height: 32, mass: 4, color: "#c0c0c0", targetX: -20, targetY: -5 },
      { id: "pump-slipper", label: "Patin (×9)", shape: "circle", width: 14, height: 14, mass: 2, color: "#d4a017", targetX: 20, targetY: -30 },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfmEpezBSpneFvCrYKhOLUOseL8Ykp1jo-HSG-ffLWpXFUDPcJaLNQ_yYG5K3rrQojomG93egnxnwooCUeOcPCLWPOTN3DCgnuB1cKbCeyo00IDUBjs5tK3QD_526_Tv0wWlf_J9c26MbyCm2M9Bh0lHMTaYyyp_lR2bOctqYMSHKc0imzdeQ5FArd6MJgX1SS1NDA5WuXGr8-BMg81vmKL76Uzzftusbi3MNmNr5KKskCa3NgMBifjJq1unU1ixty6_658_OlN05p",
  },
  {
    id: "P-3",
    sector: "Aero Atoll",
    sectorColor: "#b8860b",
    title: "Reforestation Robot",
    subtitle: "RoboHacks Feb 2025 · Unexpected Expedition Award · 5th Overall",
    status: "active",
    landmark: "A tiny forest with a robot planting low-poly trees",
    position: { x: 1300, y: -1200 },
    skills: ["Arduino C++", "IR Sensors", "Color Sensor", "DC Motors", "Recycled Materials"],
    details:
      "🏆 Winner — Unexpected Expedition Award · 5th Place Overall at RoboHacks (Feb 2025). Built a fully autonomous seed-planting robot in 24 hours using recycled materials — cardboard chassis, plastic bottles, and a paper-engineered seed dispenser. Coded the full navigation and dispensing sequence in C++ on Arduino: two IR sensors fused with a color sensor for line-following, servo-actuated paper dispenser for timed seed placement. Wired all electronics on a breadboard from scratch under competition conditions.",
    emoji: "🌱",
    color: "#2e7d32",
    gravityMass: 650,
    fieldType: "typhoon",
    fieldRadius: 240,
    github: "https://github.com/Louiszhang2005-1/RoboHacks-2025",
    assemblyParts: [
      { id: "robo-chassis", label: "Cardboard Chassis", shape: "rect", width: 80, height: 40, mass: 10, color: "#2e7d32", targetX: 0, targetY: 0 },
      { id: "robo-motor", label: "DC Motor", shape: "circle", width: 22, height: 22, mass: 5, color: "#555", targetX: -30, targetY: 15 },
      { id: "robo-dispenser", label: "Paper Dispenser", shape: "rect", width: 14, height: 35, mass: 3, color: "#c8a84b", targetX: 35, targetY: -15 },
      { id: "robo-wheels", label: "Wheels", shape: "rect", width: 90, height: 10, mass: 7, color: "#333", targetX: 0, targetY: 28 },
      { id: "robo-ir", label: "IR Sensor", shape: "circle", width: 14, height: 14, mass: 1, color: "#ff5722", targetX: -15, targetY: -25 },
      { id: "robo-color", label: "Color Sensor", shape: "circle", width: 14, height: 14, mass: 1, color: "#00d4ff", targetX: 15, targetY: -25 },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAS80X_XNEuUFS6k-WwWNK4ujFPPuUxPpWvmTVpU1JR5SivSd5oUG2JcVNgHI4epz7XEJI6N7eCpY_5koJUANuAI1BYhptkTPhdi5UGO2lM2yHA1--6_Zdhkuwaf4AXh47aYn5TOW2B8af31QajqbXwz4Ldn2XPUjvQPK0SasCQYVwEJls5ZWv-YsDYabLJ6PaUZtolG1ufVsJARGvsPWji9-J_dMGuf0kpNNEYucYBsS8AG3SpRwrHKSZrvL4alOKLEcgHbwa7a7w",
  },

  {
    id: "P-11",
    sector: "Aero Atoll",
    sectorColor: "#b8860b",
    title: "MechPrep",
    subtitle: "McHacks 13 · Jan 2026",
    status: "active",
    landmark: "A holographic workshop with rotating CAD models and quiz stations",
    position: { x: 400, y: -1200 },
    skills: ["SolidWorks", "Blender", "React", "Python", "AI API", "3D Modeling", "CAD Integration"],
    details:
      "Built at McHacks 13 (Jan 2026). As mechanical engineering students who have spent countless hours scrolling Glassdoor and LinkedIn preparing for technical interviews, we built MechPrep — an interactive interview prep platform tailored for mechanical and aerospace engineering students. Designed and modeled 3D components in SolidWorks and Blender, then integrated the CAD models into a React + Python web app to make them interactive and educational. Integrated an AI API to generate and evaluate interview questions. Key challenges: wiring the AI API into the project architecture and embedding interactive CAD models into the browser. Next steps: expand the question bank across more companies and offer a white-label tool to help companies generate their own technical interview questions.",
    emoji: "🔧",
    color: "#5c6bc0",
    gravityMass: 650,
    fieldType: "gravity",
    fieldRadius: 240,
    demo: "https://devpost.com/software/mechie",
    assemblyParts: [
      { id: "mech-cad", label: "CAD Model", shape: "rect", width: 60, height: 40, mass: 8, color: "#8B8682", targetX: 0, targetY: 0 },
      { id: "mech-gear", label: "Gear Component", shape: "circle", width: 30, height: 30, mass: 5, color: "#5c6bc0", targetX: -30, targetY: 15 },
      { id: "mech-bracket", label: "Bracket", shape: "rect", width: 20, height: 50, mass: 4, color: "#b8860b", targetX: 30, targetY: -10 },
      { id: "mech-ui", label: "React Interface", shape: "rect", width: 80, height: 18, mass: 2, color: "#00d4ff", targetX: 0, targetY: -32 },
    ],
  },

  // ═══════════════════════════════════════════════════
  // 🏥 Robotics Bay (Southwest) — Health & Safety Tech
  // ═══════════════════════════════════════════════════
  {
    id: "P-4",
    sector: "Robotics & IoT",
    sectorColor: "#c62828",
    title: "ResQ-Link",
    subtitle: "UpStart 2026 · Digital System for Disaster Management",
    status: "active",
    landmark: "A medical station with a giant glowing NFC wristband",
    position: { x: -1300, y: 400 },
    skills: ["SolidWorks", "Passive NFC", "IP68 Design", "PCB Prototyping", "Next.js", "Medical Design", "Systems Architecture"],
    details:
      "Built at UpStart 2026 (Feb 2026) as part of a multidisciplinary team from Polytechnique Montréal. In Montreal, analog paper triage tags contribute to a 30% triage error rate, $1.7B in annual malpractice losses, and 10.5-hour average ER wait times. ResQ-Link replaces paper tags with a zero-power passive NFC bracelet: inductive copper coil (no battery required), passive NFC chip, IP68 medical-grade silicone band with translucent overmolded seal. Bundled with the SmartTriage companion dashboard — a full Command Center featuring real-time bracelet location maps, tag management (Morgue/Immediate/Delayed/Minor), registered staff tracking, and an offline-mesh data sync protocol so data reaches the hospital even when cellular fails. Business model: hardware 'Blade' at $1.50/unit (80% gross margin at scale) + software 'Razor' SaaS at $10k–$50k/facility/year. Targeting $750k seed round for MUHC 5,000-unit pilot, Health Canada Class I/II certification, and Quebec 'Buy Local' procurement priority.",
    emoji: "🏥",
    color: "#c62828",
    gravityMass: 600,
    fieldType: "gravity",
    fieldRadius: 230,
    github: "https://github.com/Louiszhang2005-1/Band",
    assemblyParts: [
      { id: "resq-band", label: "Silicone Band", shape: "rect", width: 100, height: 20, mass: 3, color: "#3a5080", targetX: 0, targetY: 0 },
      { id: "resq-coil", label: "Copper Coil (Zero-Power)", shape: "circle", width: 24, height: 24, mass: 2, color: "#b87333", targetX: 0, targetY: 0 },
      { id: "resq-nfc", label: "Passive NFC Chip", shape: "rect", width: 14, height: 14, mass: 1, color: "#00d4ff", targetX: 0, targetY: 0 },
      { id: "resq-seal", label: "IP68 Overmold Seal", shape: "rect", width: 36, height: 28, mass: 2, color: "rgba(180,220,255,0.6)", targetX: 0, targetY: 0 },
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
    position: { x: -400, y: 400 },
    skills: ["Python", "C++", "mmWave Radar", "ESP32 / FreeRTOS", "ROS 2", "MongoDB", "Gemini AI", "ElevenLabs", "OpenWRT"],
    details:
      "🏆 Winner at ConUHacks X — Best Use of ElevenLabs (Jan 2026). Co-founded an on-premises AI nurse assistant for Quebec long-term care facilities (CHSLDs). Falls among seniors (65+) have risen 47% between 2008–2019 — Nursie closes the gap between unwitnessed falls and delayed staff response. What it does: (1) detects falls using mmWave radar (IWR6843) fused with a floor vibration mat; (2) tracks room context via magnetic door sensor + PIR presence/occupancy node on ESP32/FreeRTOS; (3) monitors vital signs via smartwatch integration; (4) sends immediate alerts — phone call + dashboard push — to staff on detection; (5) builds a resident profile in MongoDB over time to flag unusual behavior (e.g. leaving the apartment at night); (6) provides a voice interface for residents via ElevenLabs for questions, appointment reminders, and medication prompts. Design principles: fast reliable detection over fancy features; 3× sensor redundancy to reduce false positives (radar + vibration mat + wearable fused for confidence scoring); privacy by architecture — all data stays on the facility's local OpenWRT LAN, no cameras, no cloud.",
    demo: "https://devpost.com/software/nursie",
    emoji: "🏆",
    color: "#1565c0",
    gravityMass: 700,
    fieldType: "typhoon",
    fieldRadius: 250,
    github: "https://github.com/Louiszhang2005-1",
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
    position: { x: -1300, y: 1200 },
    skills: [],
    details: "Reserved milestone checkpoint — briefing not yet available.",
    emoji: "🏆",
    color: "#c62828",
    gravityMass: 400,
    fieldType: "gravity",
    fieldRadius: 180,
  },

  // ═══════════════════════════════════════════════════
  // 💻 Code Cove (Southeast) — Software & AI Projects
  // ═══════════════════════════════════════════════════
  {
    id: "P-12",
    sector: "Code Cove",
    sectorColor: "#6a1b9a",
    title: "LazyCare",
    subtitle: "UdemHacks · Mar 2025 · AI Health Assistant",
    status: "active",
    landmark: "A glowing AI clinic with floating chat bubbles and health charts",
    position: { x: 950, y: 1200 },
    skills: ["Next.js", "Node.js", "Express", "Python", "FastAPI", "Fine-tuning", "TinyLlama", "AI"],
    details:
      "Built at UdemHacks (Mar 2025). LazyCare is an AI health assistant that provides personalized health recommendations via text-based interactions. Backend stack: Next.js frontend, Node.js/Express middleware, and a Python FastAPI service running a fine-tuned TinyLlama model for domain-specific health analysis. Fine-tuning allows the model to give more accurate, context-aware answers than a vanilla LLM. Features: personalized profile management, AI chat interface, and full conversation history so the assistant learns your context over time.",
    emoji: "💊",
    color: "#00897b",
    gravityMass: 550,
    fieldType: "gravity",
    fieldRadius: 220,
    github: "https://github.com/Karencheenn/LazyCare",
  },

  {
    id: "P-13",
    sector: "Code Cove",
    sectorColor: "#6a1b9a",
    title: "Interview Assistant",
    subtitle: "Brebeuf Hacks · Jan 2024 · Voice AI",
    status: "active",
    landmark: "A glowing interview booth with a floating AI avatar and speech waves",
    position: { x: 300, y: 400 },
    skills: ["Python", "NLP", "Voice AI", "API Integration", "Natural Language Processing"],
    details:
      "Built at Brebeuf Hacks (Jan 2024) in a team of 3. A voice-based virtual interviewing assistant designed to help computer science students prepare for technical interviews. The assistant presents personalized interview questions verbally, listens to the interviewee's response, and evaluates the answer using natural language processing algorithms. Developed with Python and integrated an AI/NLP API to power the intelligent question-and-answer pipeline. Features a user-friendly voice interface so students can practice in a realistic spoken-word format rather than typing.",
    emoji: "🎤",
    color: "#7b1fa2",
    gravityMass: 500,
    fieldType: "gravity",
    fieldRadius: 210,
    github: "https://github.com/Louiszhang2005-1/Virtual_interviewing_assistant",
  },

  {
    id: "P-9",
    sector: "Code Cove",
    sectorColor: "#6a1b9a",
    title: "CRM Outreach Tool",
    subtitle: "Accenture · AOTC 2026 · Mar–Apr 2026",
    status: "active",
    landmark: "A data-funnel temple with AI circuits",
    position: { x: 1650, y: 1200 },
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Gemini AI", "Resend", "Apollo.io", "Google Sheets API"],
    details:
      "Fully integrated CRM outreach tool built for a Montreal urban agriculture cooperative (La Centrale Agricole), developed as part of Accenture's AOTC 2026 program. Manages contact lists across 3 audience segments (corporate, schools, institutions & media). Uses Google Gemini AI to generate personalized cold emails tailored to each contact's name, title, and organization — then sends them directly through the app. Tracks every contact through the full sales pipeline, syncs all data to Google Sheets in real time, and centralizes booking requests with auto-calculated revenue estimates. Team can accept, refuse, or cancel reservations — triggering a professional email to the client instantly. Total running cost: ~$0/month on free tiers.",
    emoji: "🤖",
    color: "#ad1457",
    gravityMass: 550,
    fieldType: "typhoon",
    fieldRadius: 230,
    github: "https://github.com/Louiszhang2005-1/Fully-Integrated-CRM-Tool",
    demo: "https://www.youtube.com/watch?v=TVuFauDyA00",
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
    ids: ["I-4", "I-2", "I-1", "I-3"],
  },
  {
    name: "Aero Atoll",
    emoji: "🚀",
    color: "#b8860b",
    description: "Aerospace & Mechanical projects",
    quadrant: "Northeast",
    ids: ["P-1", "P-2", "P-3", "P-11"],
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
    ids: ["P-9", "P-12", "P-13"],
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
