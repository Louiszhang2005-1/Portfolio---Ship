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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Gold star for visited */}
        {isVisited && !isLocked && (
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div className="relative">
              <span className="text-3xl drop-shadow-lg">⭐</span>
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ boxShadow: ["0 0 0px #ffd700", "0 0 20px #ffd700", "0 0 0px #ffd700"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}

        {/* Locked badge */}
        {isLocked && (
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="bg-red-900 text-yellow-300 px-3 py-1 rounded-full text-[9px] font-label font-bold uppercase tracking-widest shadow-lg border border-red-700">
              🔒 Initializing · Summer 2026
            </div>
          </motion.div>
        )}

        {/* Proximity glow ring */}
        {isNearby && !isLocked && (
          <motion.div
            className="absolute inset-0 -m-4 rounded-2xl z-0"
            animate={{
              boxShadow: [
                `0 0 0px ${mission.color}00`,
                `0 0 30px ${mission.color}88`,
                `0 0 0px ${mission.color}00`,
              ],
            }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}

        {/* Island base */}
        <div
          className={`relative w-44 h-44 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
            isLocked ? "grayscale-[60%] opacity-80" : ""
          } ${isNearby ? "ring-4 ring-white/60 shadow-[0_0_40px_rgba(255,255,255,0.3)]" : ""}`}
          style={{
            background: `linear-gradient(145deg, ${mission.color}22, ${mission.color}44)`,
            borderBottom: `6px solid ${mission.color}`,
          }}
        >
          {/* Island terrain texture */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 40%, ${mission.color}66 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, ${mission.color}44 0%, transparent 40%)`,
            }}
          />

          {/* Emoji landmark (fills island center) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-6xl drop-shadow-lg select-none"
              animate={
                !isLocked
                  ? {
                      y: [0, -4, 0],
                      rotate: [0, 3, 0, -3, 0],
                    }
                  : {}
              }
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {mission.emoji}
            </motion.span>
          </div>

          {/* Sector indicator */}
          <div
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-label font-bold shadow-md"
            style={{ background: mission.sectorColor }}
          >
            {mission.id}
          </div>

          {/* Animated gear decorations for mechanical feel */}
          <motion.div
            className="absolute bottom-2 left-2 text-lg opacity-30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            ⚙️
          </motion.div>
        </div>

        {/* Island name label */}
        <div className="mt-2 flex flex-col items-center">
          <div
            className="px-4 py-1.5 rounded-full shadow-lg text-sm font-headline font-bold"
            style={{
              background: isLocked
                ? "rgba(50,50,50,0.9)"
                : "rgba(255,255,255,0.95)",
              color: isLocked ? "#999" : mission.color,
              border: `2px solid ${isLocked ? "#666" : mission.color}40`,
            }}
          >
            {mission.title}
          </div>
          <span
            className="text-[10px] font-label uppercase tracking-widest mt-1 px-2 py-0.5 rounded-full"
            style={{
              color: mission.sectorColor,
              background: `${mission.sectorColor}15`,
            }}
          >
            {mission.sector}
          </span>
        </div>

        {/* "Press ENTER" indicator when nearby */}
        {isNearby && !isLocked && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-label font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-widest">
              ↵ Enter to inspect
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
