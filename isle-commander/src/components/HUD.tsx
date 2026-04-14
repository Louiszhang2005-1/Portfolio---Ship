"use client";

import { motion } from "framer-motion";
import { missions } from "@/data/missions";
import { Mission } from "@/data/missions";

interface HUDProps {
  visitedCount: number;
  speed: number;
  nearbyIsland: Mission | null;
  gameState: string;
  onIslandClick: (mission: Mission) => void;
}

export default function HUD({ visitedCount, speed, nearbyIsland, gameState, onIslandClick }: HUDProps) {
  const totalActive = missions.filter((m) => m.status === "active").length;

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

          {/* Speed indicator */}
          <div className="hidden md:flex bg-white/15 backdrop-blur-md px-3 py-2 rounded-full shadow-lg items-center gap-2 border border-white/10">
            <motion.span
              className="text-sm"
              animate={{ rotate: speed > 0.5 ? 360 : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ⚙️
            </motion.span>
            <span className="font-label font-bold text-white text-xs">
              {(speed * 20).toFixed(0)} kn
            </span>
          </div>
        </motion.div>
      </header>

      {/* ── Terminal Box (Bottom Left) ── */}
      <motion.div
        className="fixed bottom-4 left-4 w-64 z-40 hidden md:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
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
              <p className="text-yellow-300 font-bold">
                &gt; PROXIMITY_ALERT: {nearbyIsland.title.toUpperCase()}
              </p>
            ) : (
              <p>&gt; NO_TARGETS_IN_RANGE</p>
            )}
            <p className="text-emerald-400 font-bold">&gt; ENGINES: {speed > 0.5 ? "FULL POWER" : "IDLE"}</p>
            <p>&gt; MISSIONS_COMPLETE: {visitedCount}/{totalActive}</p>
          </div>
        </div>
      </motion.div>

      {/* ── MiniMap (Top Right) ── */}
      <motion.div
        className="fixed top-16 right-4 z-40 hidden lg:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-black/40 backdrop-blur-md w-48 h-48 rounded-xl border border-white/10 overflow-hidden relative">
          <div className="absolute top-1 left-2 font-label text-[8px] uppercase tracking-widest text-white/40 font-bold">
            Radar
          </div>

          {/* Minimap islands */}
          {missions.map((m) => (
            <button
              key={m.id}
              className="absolute w-3 h-3 rounded-full transition-all cursor-pointer hover:scale-150"
              style={{
                left: `${((m.position.x + 1600) / 3200) * 100}%`,
                top: `${((m.position.y + 1600) / 3200) * 100}%`,
                backgroundColor: nearbyIsland?.id === m.id ? "#fff" : m.sectorColor,
                opacity: m.status === "locked" ? 0.3 : 0.8,
                boxShadow: nearbyIsland?.id === m.id ? "0 0 8px white" : "none",
              }}
              onClick={() => onIslandClick(m)}
              title={m.title}
            />
          ))}

          {/* Spawn center dot */}
          <div
            className="absolute w-2 h-2 rounded-full bg-white/50"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Radar sweep */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(0,255,200,0.1) 10%, transparent 30%)",
              transformOrigin: "center",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* ── Compass (Bottom Right) ── */}
      <motion.div
        className="fixed bottom-4 right-4 z-40 hidden md:block"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-white/10 backdrop-blur-md w-16 h-16 rounded-full border border-white/20 flex items-center justify-center shadow-lg">
          <div className="text-white/60 font-label text-[8px] font-bold leading-none text-center">
            <div className="text-cyan-300">N</div>
            <div className="flex gap-3">
              <span>W</span>
              <span>E</span>
            </div>
            <div>S</div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
