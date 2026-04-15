"use client";

import { motion } from "framer-motion";
import { Mission } from "@/data/missions";

interface IslandProps {
  mission: Mission;
  isNearby: boolean;
  isVisited: boolean;
  index: number;
  onClick?: () => void;
}

export default function Island({ mission, isNearby, isVisited, index, onClick }: IslandProps) {
  const isLocked = mission.status === "locked";

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        left: mission.position.x,
        top: mission.position.y,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.08,
      }}
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Gold star for visited */}
        {isVisited && !isLocked && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20">
            <span className="text-3xl drop-shadow-lg">⭐</span>
          </div>
        )}

        {/* Locked badge */}
        {isLocked && (
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
            <div className="bg-red-900 text-yellow-300 px-3 py-1 rounded-full text-[9px] font-label font-bold uppercase tracking-widest shadow-lg border border-red-700 animate-pulse">
              🔒 Initializing · Summer 2026
            </div>
          </div>
        )}

        {/* Proximity glow ring (only when nearby — cheap CSS shadow) */}
        {isNearby && !isLocked && (
          <div
            className="absolute -inset-5 rounded-3xl z-0 animate-pulse"
            style={{ boxShadow: `0 0 30px ${mission.color}88` }}
          />
        )}

        {/* Small nature decorations */}
        {!isLocked && (
          <>
            <div className="absolute -left-5 -top-1 text-sm select-none pointer-events-none">🌿</div>
            <div className="absolute -right-4 bottom-14 text-xs select-none pointer-events-none">🌾</div>
          </>
        )}

        {/* Island base card */}
        <div
          className={`relative w-44 h-44 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
            isLocked ? "grayscale-[60%] opacity-80" : ""
          } ${isNearby ? "ring-4 ring-white/60 shadow-[0_0_40px_rgba(255,255,255,0.3)]" : ""}`}
          style={{
            background: `linear-gradient(145deg, ${mission.color}30, ${mission.color}50)`,
            borderBottom: `7px solid ${mission.color}`,
          }}
        >
          {/* Terrain texture (static gradient) */}
          <div className="absolute inset-0 opacity-25" style={{
            backgroundImage: `radial-gradient(circle at 30% 40%, ${mission.color}77 0%, transparent 45%), radial-gradient(circle at 70% 60%, ${mission.color}55 0%, transparent 40%)`,
          }} />

          {/* Emoji landmark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl drop-shadow-lg select-none"
              style={{ animation: isLocked ? "none" : "float 3s ease-in-out infinite" }}
            >
              {mission.emoji}
            </span>
          </div>

          {/* Sector badge */}
          <div
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-label font-bold shadow-md"
            style={{ background: mission.sectorColor }}
          >
            {mission.id}
          </div>

          {/* Gear decoration (CSS animation, not framer-motion) */}
          <div className="absolute bottom-2 left-2 text-lg opacity-25"
            style={{ animation: "gearSpin 8s linear infinite" }}
          >
            ⚙️
          </div>
        </div>

        {/* Island name */}
        <div className="mt-2 flex flex-col items-center">
          <div
            className="px-4 py-1.5 rounded-full shadow-lg text-sm font-headline font-bold"
            style={{
              background: isLocked ? "rgba(50,50,50,0.9)" : "rgba(255,255,255,0.95)",
              color: isLocked ? "#999" : mission.color,
              border: `2px solid ${isLocked ? "#666" : mission.color}40`,
            }}
          >
            {mission.title}
          </div>
          <span
            className="text-[10px] font-label uppercase tracking-widest mt-1 px-2 py-0.5 rounded-full"
            style={{ color: mission.sectorColor, background: `${mission.sectorColor}15` }}
          >
            {mission.sector}
          </span>
        </div>

        {/* Enter hint when nearby */}
        {isNearby && !isLocked && (
          <div className="mt-2">
            <div className="bg-white/90 text-emerald-700 text-[10px] font-label font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-widest animate-bounce">
              ↵ Enter to inspect
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
