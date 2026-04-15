"use client";

import { motion } from "framer-motion";
import { missions, Mission, WORLD_BOUNDS, collectibles, MAX_COLLECTIBLE_SCORE } from "@/data/missions";

interface HUDProps {
  visitedCount: number;
  speed: number;
  nearbyIsland: Mission | null;
  gameState: string;
  boatPosition: { x: number; y: number };
  boatHeading: number;
  onIslandClick: (mission: Mission) => void;
  onToggleMap: () => void;
  score: number;
  collectedItems: Set<string>;
}

/* Sector quadrant definitions — each maps to a region on the minimap */
const SECTORS = [
  { name: "Internship Shores", color: "#e65100", quadrant: "NW", labelX: "13%", labelY: "6%" },
  { name: "Aero Atoll",        color: "#b8860b", quadrant: "NE", labelX: "63%", labelY: "6%" },
  { name: "Medi-Bay",          color: "#c62828", quadrant: "SW", labelX: "13%", labelY: "56%" },
  { name: "Code Cove",         color: "#6a1b9a", quadrant: "SE", labelX: "63%", labelY: "56%" },
] as const;

const QUADRANT_BG: Record<string, string> = {
  NW: "linear-gradient(135deg, rgba(230,81,0,0.22) 0%, transparent 80%)",
  NE: "linear-gradient(225deg, rgba(184,134,11,0.22) 0%, transparent 80%)",
  SW: "linear-gradient(45deg,  rgba(198,40,40,0.22) 0%, transparent 80%)",
  SE: "linear-gradient(315deg, rgba(106,27,154,0.22) 0%, transparent 80%)",
};

export default function HUD({
  visitedCount, speed, nearbyIsland, gameState, boatPosition, boatHeading,
  onIslandClick, onToggleMap, score, collectedItems,
}: HUDProps) {
  const totalActive = missions.filter((m) => m.status === "active").length;
  const scorePercent = MAX_COLLECTIBLE_SCORE > 0 ? (score / MAX_COLLECTIBLE_SCORE) * 100 : 0;

  const boatMinimapX = ((boatPosition.x + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100;
  const boatMinimapY = ((boatPosition.y + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100;

  return (
    <>
      {/* ── Top Bar ── */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-6 py-3">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <h1 className="text-xl md:text-2xl font-black text-white italic font-headline tracking-tight drop-shadow-lg">
            Isle Commander
          </h1>
          <p className="text-[9px] font-label uppercase tracking-[0.3em] text-cyan-200/60 -mt-0.5">
            The Kinetic Odyssey
          </p>
        </motion.div>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        >
          {/* Progress counter */}
          <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-white/10">
            <span className="text-lg">⭐</span>
            <span className="font-headline font-bold text-white text-sm tracking-tight">
              {visitedCount}/{totalActive} Discovered
            </span>
          </div>

          {/* Score pill */}
          <div className="hidden sm:flex bg-yellow-500/25 backdrop-blur-md px-4 py-2 rounded-full shadow-lg items-center gap-2 border border-yellow-300/30">
            <span className="text-base">💰</span>
            <span className="font-headline font-bold text-yellow-100 text-sm tracking-tight">
              {score} pts
            </span>
          </div>

          {/* Speed indicator */}
          <div className="hidden md:flex bg-white/15 backdrop-blur-md px-3 py-2 rounded-full shadow-lg items-center gap-2 border border-white/10">
            <span className="text-sm" style={{ animation: speed > 0.5 ? "gearSpin 2s linear infinite" : "none" }}>⚙️</span>
            <span className="font-label font-bold text-white text-xs">
              {(speed * 20).toFixed(0)} kn
            </span>
          </div>

          {/* Map button */}
          <button
            onClick={onToggleMap}
            className="bg-amber-500/80 hover:bg-amber-500 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-amber-300/30 transition-colors cursor-pointer"
          >
            <span className="text-base">🗺️</span>
            <span className="font-label font-bold text-white text-xs uppercase tracking-wider hidden sm:inline">Map</span>
            <kbd className="hidden md:inline text-[8px] font-label text-amber-200/60 bg-black/20 px-1 rounded">M</kbd>
          </button>
        </motion.div>
      </header>

      {/* ── Terminal Box (Bottom Left) ── */}
      <div className="fixed bottom-4 left-4 w-64 z-40 hidden md:block">
        <div className="bg-black/50 backdrop-blur-md p-3 rounded-xl shadow-xl border border-white/10">
          <div className="flex items-center gap-2 mb-2 text-cyan-400">
            <span className="text-xs">💻</span>
            <span className="font-label text-[9px] uppercase font-bold tracking-widest">
              System Output
            </span>
          </div>
          <div className="font-label text-[10px] text-cyan-200/70 leading-relaxed space-y-0.5">
            <p className="animate-pulse text-cyan-300">&gt; SHIP_SCAN: NOMINAL...</p>
            {nearbyIsland ? (
              <p className="text-yellow-300 font-bold">&gt; PROXIMITY_ALERT: {nearbyIsland.title.toUpperCase()}</p>
            ) : (
              <p>&gt; NO_TARGETS_IN_RANGE</p>
            )}
            <p className="text-emerald-400 font-bold">&gt; ENGINES: {speed > 0.5 ? "FULL POWER" : "IDLE"}</p>
            <p>&gt; HEADING: {Math.round(boatHeading)}°</p>
            <p>&gt; MISSIONS_COMPLETE: {visitedCount}/{totalActive}</p>
            <p className="text-yellow-300">&gt; SCORE: {score} / {MAX_COLLECTIBLE_SCORE}</p>
          </div>
        </div>
      </div>

      {/* ── Score Panel (Bottom Centre) ── */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden md:block">
        <div className="bg-black/50 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-yellow-400/20 min-w-[220px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-label text-[9px] uppercase font-bold tracking-widest text-yellow-300/70">Treasure Score</span>
            <span className="font-headline font-black text-yellow-300 text-sm">{score} <span className="text-yellow-500/60 font-normal text-[10px]">/ {MAX_COLLECTIBLE_SCORE}</span></span>
          </div>
          {/* Progress bar */}
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${scorePercent}%`,
                background: "linear-gradient(90deg, #f59e0b, #fbbf24, #fde68a)",
                boxShadow: "0 0 6px rgba(251,191,36,0.6)",
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-label text-[8px] text-white/30">
              🪙 {collectedItems.size} collected
            </span>
            <span className="font-label text-[8px] text-white/30">
              {scorePercent.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* ── MiniMap (Top Right) ── */}
      <div className="fixed top-16 right-4 z-40 hidden lg:block">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-white/15 overflow-hidden shadow-2xl" style={{ width: 288, height: 288 }}>

          {/* Sector quadrant backgrounds */}
          <div className="absolute inset-0 pointer-events-none">
            {/* NW — Internship Shores */}
            <div className="absolute" style={{ left: 0, top: 0, width: "50%", height: "50%", background: QUADRANT_BG.NW }} />
            {/* NE — Aero Atoll */}
            <div className="absolute" style={{ left: "50%", top: 0, width: "50%", height: "50%", background: QUADRANT_BG.NE }} />
            {/* SW — Medi-Bay */}
            <div className="absolute" style={{ left: 0, top: "50%", width: "50%", height: "50%", background: QUADRANT_BG.SW }} />
            {/* SE — Code Cove */}
            <div className="absolute" style={{ left: "50%", top: "50%", width: "50%", height: "50%", background: QUADRANT_BG.SE }} />
          </div>

          {/* Quadrant divider lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 bottom-0" style={{ left: "50%", width: 1, background: "rgba(255,255,255,0.08)" }} />
            <div className="absolute left-0 right-0" style={{ top: "50%", height: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Sector corner labels */}
          {SECTORS.map((s) => (
            <div
              key={s.name}
              className="absolute pointer-events-none"
              style={{ left: s.labelX, top: s.labelY }}
            >
              <span
                className="font-label text-[7px] uppercase font-black tracking-wider px-1 py-0.5 rounded"
                style={{ color: s.color, background: `${s.color}18` }}
              >
                {s.name.split(" ")[0]}
              </span>
            </div>
          ))}

          {/* Header label */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 font-label text-[8px] uppercase tracking-widest text-white/40 font-bold z-10">
            Radar
          </div>

          {/* Uncollected coins on minimap (tiny gold dots) */}
          {collectibles.filter((c) => !collectedItems.has(c.id)).map((item) => {
            const mx = ((item.position.x + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100;
            const my = ((item.position.y + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100;
            return (
              <div
                key={item.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${mx}%`,
                  top: `${my}%`,
                  width: item.type === "chest" ? 6 : 4,
                  height: item.type === "chest" ? 6 : 4,
                  transform: "translate(-50%, -50%)",
                  background: item.type === "chest" ? "#fbbf24" : "#fde68a",
                  boxShadow: item.type === "chest" ? "0 0 4px #fbbf24" : "none",
                  opacity: 0.7,
                }}
              />
            );
          })}

          {/* Minimap islands */}
          {missions.map((m) => (
            <button
              key={m.id}
              className="absolute w-3 h-3 rounded-full transition-all cursor-pointer hover:scale-150 z-10"
              style={{
                left: `${((m.position.x + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100}%`,
                top: `${((m.position.y + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100}%`,
                backgroundColor: nearbyIsland?.id === m.id ? "#fff" : m.sectorColor,
                opacity: m.status === "locked" ? 0.3 : 0.85,
                boxShadow: nearbyIsland?.id === m.id ? "0 0 8px white" : "none",
              }}
              onClick={() => onIslandClick(m)}
              title={m.title}
            />
          ))}

          {/* Spawn center dot */}
          <div className="absolute w-2 h-2 rounded-full bg-white/50 z-10" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />

          {/* Boat position indicator */}
          <div
            className="absolute w-3 h-3 z-20"
            style={{
              left: `${boatMinimapX}%`,
              top: `${boatMinimapY}%`,
              transform: `translate(-50%, -50%) rotate(${boatHeading}deg)`,
            }}
          >
            <div className="w-0 h-0" style={{
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderBottom: "8px solid #00ff88",
              filter: "drop-shadow(0 0 3px #00ff88)",
            }} />
          </div>

          {/* Radar sweep */}
          <div
            className="absolute inset-0"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(0,255,200,0.08) 10%, transparent 30%)",
              animation: "gearSpin 4s linear infinite",
            }}
          />

          {/* Score footer on minimap */}
          <div className="absolute bottom-0 left-0 right-0 px-2 py-1 flex justify-between items-center bg-black/30 z-10">
            <span className="font-label text-[7px] text-yellow-300/70 font-bold">💰 {score}pts</span>
            <span className="font-label text-[7px] text-white/40">{visitedCount}/{totalActive} islands</span>
          </div>
        </div>
      </div>

      {/* ── Compass (Bottom Right) ── */}
      <div className="fixed bottom-4 right-4 z-40 hidden md:block">
        <div className="bg-white/10 backdrop-blur-md w-16 h-16 rounded-full border border-white/20 flex items-center justify-center shadow-lg relative overflow-hidden">
          <div style={{ transform: `rotate(${-boatHeading}deg)`, transition: "transform 0.15s ease-out" }}>
            <div className="text-white/60 font-label text-[8px] font-bold leading-none text-center">
              <div className="text-cyan-300">N</div>
              <div className="flex gap-3"><span>W</span><span>E</span></div>
              <div>S</div>
            </div>
          </div>
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0 h-0"
            style={{ borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderTop: "5px solid #00ffcc" }}
          />
        </div>
      </div>
    </>
  );
}
