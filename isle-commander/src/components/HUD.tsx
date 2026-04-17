"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { missions, Mission, WORLD_BOUNDS, collectibles, MAX_COLLECTIBLE_SCORE } from "@/data/missions";

interface HUDProps {
  visitedCount: number;
  speed: number;
  coreTemp: number;
  nearbyIsland: Mission | null;
  gameState: string;
  boatPosition: { x: number; y: number };
  boatHeading: number;
  nearestUnvisitedAngle: number;
  onIslandClick: (mission: Mission) => void;
  onToggleMap: () => void;
  score: number;
  collectedItems: Set<string>;
  hudBoilerHit?: boolean;
  deckBoundaryWarning?: boolean;
}

const SECTORS = [
  { name: "Internship Shores", color: "#e65100", quadrant: "NW", labelX: "13%", labelY: "6%" },
  { name: "Aero Atoll",        color: "#b8860b", quadrant: "NE", labelX: "63%", labelY: "6%" },
  { name: "Robotics & IoT",    color: "#c62828", quadrant: "SW", labelX: "13%", labelY: "56%" },
  { name: "Code Cove",         color: "#6a1b9a", quadrant: "SE", labelX: "63%", labelY: "56%" },
] as const;

const QUADRANT_BG: Record<string, string> = {
  NW: "linear-gradient(135deg, rgba(230,81,0,0.22) 0%, transparent 80%)",
  NE: "linear-gradient(225deg, rgba(184,134,11,0.22) 0%, transparent 80%)",
  SW: "linear-gradient(45deg,  rgba(198,40,40,0.22) 0%, transparent 80%)",
  SE: "linear-gradient(315deg, rgba(106,27,154,0.22) 0%, transparent 80%)",
};

const MAX_SPEED = 5.5;

/* ── Gauge sub-component — horizontal bar style ── */
function Gauge({
  value, label, color, isActive,
  unit, baseTemp, tempRange,
}: {
  value: number; label: string; color: string; isActive: boolean;
  unit?: string; baseTemp?: number; tempRange?: number;
}) {
  const pct = Math.max(0, Math.min(1, value));
  const zoneColor = pct < 0.5 ? "#22c55e" : pct < 0.8 ? "#eab308" : "#ef4444";
  const displayVal = unit === "°C"
    ? `${Math.round((baseTemp ?? 0) + pct * (tempRange ?? 100))}°C`
    : `${Math.round(pct * 100)}%`;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="font-label text-[7px] text-white/40 uppercase tracking-wider">{label}</span>
        <span className="font-label text-[8px] font-bold tabular-nums" style={{ color: zoneColor }}>
          {displayVal}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-visible relative" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${pct * 100}%`,
            background: `linear-gradient(90deg, #22c55e, ${zoneColor})`,
            boxShadow: isActive ? `0 0 5px ${zoneColor}` : "none",
          }}
        />
        {/* Needle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white rounded-full"
          style={{
            left: `calc(${pct * 100}% - 1px)`,
            boxShadow: "0 0 3px white",
            animation: isActive ? "needleJitter 0.25s ease-in-out infinite" : "none",
          }}
        />
      </div>
    </div>
  );
}

export default function HUD({
  visitedCount, speed, coreTemp, nearbyIsland, gameState, boatPosition, boatHeading,
  nearestUnvisitedAngle, onIslandClick, onToggleMap, score, collectedItems, hudBoilerHit, deckBoundaryWarning,
}: HUDProps) {
  const totalActive = missions.filter((m) => m.status === "active").length;
  const scorePercent = MAX_COLLECTIBLE_SCORE > 0 ? (score / MAX_COLLECTIBLE_SCORE) * 100 : 0;
  const isMoving = speed > 0.5;

  const IDLE_TIPS = [
    "🎯 Find all 12 project islands to complete the Odyssey",
    "💰 Collect coins + chests to boost your treasure score",
    "🏴‍☠️ Goblin ships patrol the outer sectors — stay sharp",
    "🗺️ Press M to open the full Treasure Map",
    "⚓ Press ENTER near an island to inspect it",
    "⚙️ This map is Louis Zhang's interactive résumé — have fun!",
  ];
  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTipIndex((i) => (i + 1) % IDLE_TIPS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const isAlert = !!(hudBoilerHit || deckBoundaryWarning);
  const statusColor = isAlert ? "#ef4444" : nearbyIsland ? "#eab308" : "#22c55e";
  const statusLabel = isAlert ? "ALERT" : nearbyIsland ? "PROXIMITY" : "SAILING";
  const logLine = deckBoundaryWarning
    ? "🗺️ Edge of the known world — turn back!"
    : hudBoilerHit
    ? "💥 Hull breach! Reduce speed!"
    : nearbyIsland
    ? `📍 ${nearbyIsland.title} detected — press ENTER`
    : speed > 2
    ? "⚡ Full steam ahead! Core temp rising..."
    : IDLE_TIPS[tipIndex];

  const boatMinimapX = ((boatPosition.x + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100;
  const boatMinimapY = ((boatPosition.y + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100;

  // Boiler pressure: direct speed ratio
  const boilerPressure = Math.min(1, speed / MAX_SPEED);

  return (
    <>
      {/* ── Deck Officer Warning Banner ── */}
      <AnimatePresence>
        {hudBoilerHit && (
          <motion.div
            key="deck-warning"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="fixed top-14 left-1/2 z-[80] pointer-events-none"
            style={{ transform: "translateX(-50%)" }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm"
              style={{
                background: "linear-gradient(90deg, rgba(180,20,20,0.92), rgba(220,40,40,0.92))",
                border: "1.5px solid rgba(255,80,80,0.7)",
                color: "#fff",
                boxShadow: "0 0 18px rgba(255,60,60,0.4)",
              }}
            >
              ⚠️ DECK OFFICER: Hull breach! Boiler pressure dropping!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Deck Officer Boundary Warning (amber) ── */}
      <AnimatePresence>
        {deckBoundaryWarning && (
          <motion.div
            key="boundary-warning"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="fixed top-14 left-1/2 z-[79] pointer-events-none"
            style={{ transform: "translateX(-50%)" }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm"
              style={{
                background: "linear-gradient(90deg, rgba(160,80,0,0.92), rgba(200,100,0,0.92))",
                border: "1.5px solid rgba(251,146,60,0.7)",
                color: "#fff7ed",
                boxShadow: "0 0 18px rgba(251,146,60,0.4)",
              }}
            >
              ⚓ DECK OFFICER: Captain! Uncharted waters. Turn back to the fleet!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <span className="text-sm" style={{ animation: isMoving ? "gearSpin 2s linear infinite" : "none" }}>⚙️</span>
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

      {/* ── Captain's Log (Bottom Left) ── */}
      <div className="fixed bottom-4 left-4 w-64 z-40 hidden md:block">
        <div className="bg-black/50 backdrop-blur-md p-3 rounded-xl shadow-xl border border-white/10">
          {/* Header row */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-xs">📟</span>
            <span className="font-label text-[9px] uppercase font-bold tracking-widest text-cyan-300/80">Captain&apos;s Log</span>
            {/* Status dot */}
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor, boxShadow: `0 0 5px ${statusColor}`, animation: isAlert ? "animate-pulse" : "none" }} />
              <span className="font-label text-[8px] font-bold" style={{ color: statusColor }}>{statusLabel}</span>
            </div>
          </div>

          {/* Live log line */}
          <div className="font-label text-[10px] leading-snug mb-2.5 min-h-[2.4em]">
            <AnimatePresence mode="wait">
              <motion.p
                key={logLine}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="font-bold"
                style={{ color: isAlert ? "#fca5a5" : nearbyIsland ? "#fde68a" : "#a5f3fc" }}
              >
                {logLine}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Static telemetry */}
          <div className="font-label text-[9px] text-white/35 leading-relaxed space-y-0.5 border-t border-white/10 pt-2">
            <div className="flex justify-between">
              <span>HDG</span><span className="text-white/55">{Math.round(boatHeading)}°</span>
            </div>
            <div className="flex justify-between">
              <span>SPEED</span><span className="text-white/55">{(speed * 20).toFixed(0)} kn</span>
            </div>
            <div className="flex justify-between">
              <span>PROGRESS</span><span className="text-white/55">{visitedCount}/{totalActive} islands</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ENGINE BAY — Boiler Pressure + Core Temp Gauges (above score) ── */}
      <div className="fixed bottom-36 left-4 w-64 z-40 hidden md:block">
        <div className="bg-black/50 backdrop-blur-md p-3 rounded-xl shadow-xl border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs" style={{ animation: isMoving ? "gearSpin 1.5s linear infinite" : "none" }}>⚙️</span>
            <span className="font-label text-[9px] uppercase font-bold tracking-widest text-orange-300/80">Engine Bay</span>
            <span className={`ml-auto text-[8px] font-label font-bold ${isMoving ? "text-green-400" : "text-white/30"}`}>
              {isMoving ? "● RUNNING" : "● IDLE"}
            </span>
          </div>
          <div className="space-y-2.5">
            <Gauge
              value={boilerPressure}
              label="Boiler Pressure"
              color="#ff6b35"
              isActive={isMoving}
            />
            <Gauge
              value={coreTemp}
              label="Core Temp"
              color="#00d4ff"
              isActive={isMoving}
              unit="°C"
              baseTemp={32}
              tempRange={63}
            />
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
            <span className="font-label text-[8px] text-white/30">🪙 {collectedItems.size} collected</span>
            <span className="font-label text-[8px] text-white/30">{scorePercent.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* ── MiniMap (Top Right) ── */}
      <div className="fixed top-16 right-4 z-40 hidden lg:block">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-white/15 overflow-hidden shadow-2xl" style={{ width: 288, height: 288 }}>
          {/* Sector quadrant backgrounds */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute" style={{ left: 0, top: 0, width: "50%", height: "50%", background: QUADRANT_BG.NW }} />
            <div className="absolute" style={{ left: "50%", top: 0, width: "50%", height: "50%", background: QUADRANT_BG.NE }} />
            <div className="absolute" style={{ left: 0, top: "50%", width: "50%", height: "50%", background: QUADRANT_BG.SW }} />
            <div className="absolute" style={{ left: "50%", top: "50%", width: "50%", height: "50%", background: QUADRANT_BG.SE }} />
          </div>

          {/* Quadrant dividers */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 bottom-0" style={{ left: "50%", width: 1, background: "rgba(255,255,255,0.08)" }} />
            <div className="absolute left-0 right-0" style={{ top: "50%", height: 1, background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Sector corner labels */}
          {SECTORS.map((s) => (
            <div key={s.name} className="absolute pointer-events-none" style={{ left: s.labelX, top: s.labelY }}>
              <span className="font-label text-[7px] uppercase font-black tracking-wider px-1 py-0.5 rounded" style={{ color: s.color, background: `${s.color}18` }}>
                {s.name.split(" ")[0]}
              </span>
            </div>
          ))}

          {/* Header label */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 font-label text-[8px] uppercase tracking-widest text-white/40 font-bold z-10">
            Radar
          </div>

          {/* Collectibles on minimap */}
          {collectibles.filter((c) => !collectedItems.has(c.id)).map((item) => {
            const mx = ((item.position.x + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100;
            const my = ((item.position.y + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100;
            return (
              <div key={item.id} className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${mx}%`, top: `${my}%`,
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

          {/* Island dots */}
          {missions.map((m) => (
            <button key={m.id} className="absolute w-3 h-3 rounded-full transition-all cursor-pointer hover:scale-150 z-10"
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

          {/* Spawn center */}
          <div className="absolute w-2 h-2 rounded-full bg-white/50 z-10" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />

          {/* Boat indicator */}
          <div className="absolute w-3 h-3 z-20"
            style={{ left: `${boatMinimapX}%`, top: `${boatMinimapY}%`, transform: `translate(-50%, -50%) rotate(${boatHeading}deg)` }}>
            <div className="w-0 h-0" style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderBottom: "8px solid #00ff88", filter: "drop-shadow(0 0 3px #00ff88)" }} />
          </div>

          {/* Radar sweep */}
          <div className="absolute inset-0"
            style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(0,255,200,0.08) 10%, transparent 30%)", animation: "gearSpin 4s linear infinite" }}
          />

          {/* Score footer */}
          <div className="absolute bottom-0 left-0 right-0 px-2 py-1 flex justify-between items-center bg-black/30 z-10">
            <span className="font-label text-[7px] text-yellow-300/70 font-bold">💰 {score}pts</span>
            <span className="font-label text-[7px] text-white/40">{visitedCount}/{totalActive} islands</span>
          </div>
        </div>
      </div>

      {/* ── Compass: Gold Gear pointing to nearest unvisited island (Bottom Right) ── */}
      <div className="fixed bottom-4 right-4 z-40 hidden md:block">
        <div className="relative bg-black/50 backdrop-blur-md w-20 h-20 rounded-full border border-amber-400/30 flex items-center justify-center shadow-lg overflow-hidden"
          style={{ boxShadow: "0 0 12px rgba(251,191,36,0.2)" }}>

          {/* Outer ring tick marks */}
          {[...Array(8)].map((_, ti) => (
            <div key={ti} className="absolute rounded-full"
              style={{
                width: 3, height: 3,
                background: "rgba(251,191,36,0.4)",
                top: "50%",
                left: "50%",
                transform: `rotate(${ti * 45}deg) translateY(-34px) translate(-50%, -50%)`,
                transformOrigin: "center center",
              }}
            />
          ))}

          {/* Spinning gold gear (decorative, always rotates) */}
          <div
            className="absolute text-3xl"
            style={{
              animation: "gearSpin 8s linear infinite",
              color: "#fbbf24",
              opacity: 0.35,
              filter: "drop-shadow(0 0 4px #fbbf24)",
            }}
          >
            ⚙️
          </div>

          {/* Heading-corrected compass rose (small) */}
          <div className="absolute text-[8px] font-label font-black"
            style={{ transform: `rotate(${-boatHeading}deg)`, color: "rgba(255,255,255,0.4)" }}>
            <div className="flex flex-col items-center" style={{ marginTop: "-28px" }}>
              <span className="text-cyan-300 text-[9px]">N</span>
            </div>
          </div>

          {/* Arrow pointing to nearest unvisited island */}
          <div
            className="absolute z-10"
            style={{
              transform: `rotate(${nearestUnvisitedAngle - boatHeading}deg)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Arrow shape */}
            <div className="relative flex flex-col items-center" style={{ height: 36 }}>
              {/* Arrowhead */}
              <div style={{
                width: 0, height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderBottom: "12px solid #fbbf24",
                filter: "drop-shadow(0 0 4px #fbbf24)",
                marginBottom: 2,
              }} />
              {/* Arrow shaft */}
              <div style={{ width: 2, height: 14, background: "#fbbf24", borderRadius: 2, opacity: 0.8 }} />
            </div>
          </div>

          {/* Center dot */}
          <div className="absolute w-2 h-2 rounded-full z-20"
            style={{ background: "#fbbf24", boxShadow: "0 0 6px #fbbf24" }} />
        </div>
        <div className="text-center mt-1">
          <span className="font-label text-[7px] text-amber-300/50 uppercase tracking-widest">Nearest</span>
        </div>
      </div>
    </>
  );
}
