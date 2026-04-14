"use client";

import { motion } from "framer-motion";

interface BoatProps {
  velocityX: number;
  velocityY: number;
  rotation: number;
  speed: number;
}

export default function Boat({ velocityX, velocityY, rotation, speed }: BoatProps) {
  // Tilt based on horizontal velocity for that "bouncy toy" feel
  const tilt = velocityX * 6;
  const isMoving = speed > 0.4;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
      {/* Wake trail — scales with speed */}
      {isMoving && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -z-10 rounded-full"
          style={{
            width: 60 + speed * 12,
            height: 30 + speed * 6,
            background: "radial-gradient(ellipse, rgba(255,255,255,0.35) 0%, transparent 70%)",
            filter: "blur(8px)",
            transform: `translate(-50%, 20px) rotate(${rotation + 180}deg)`,
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}

      {/* Boat container with rotation + tilt */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{
          rotate: tilt,
          y: [0, -3, 0, 3, 0], // gentle bob
        }}
        transition={{
          rotate: { type: "spring", stiffness: 150, damping: 15 },
          y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Steam puffs */}
        {isMoving && (
          <>
            <SteamPuff delay={0} x={-8} />
            <SteamPuff delay={0.6} x={8} />
          </>
        )}

        {/* Ship body */}
        <div
          className="relative w-28 h-28 flex items-center justify-center"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Hull */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-24 relative">
              {/* Main hull */}
              <div
                className="absolute inset-0 rounded-t-2xl rounded-b-[40%]"
                style={{
                  background: "linear-gradient(180deg, #00838f 0%, #006064 60%, #004d40 100%)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                }}
              />
              {/* Deck stripe */}
              <div
                className="absolute top-3 left-2 right-2 h-3 rounded-sm"
                style={{ background: "#ffab40" }}
              />
              {/* Cabin */}
              <div
                className="absolute top-7 left-4 right-4 h-6 rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #fff3e0, #ffe0b2)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                {/* Windows */}
                <div className="flex justify-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-sm bg-cyan-400 shadow-inner" />
                  <div className="w-2 h-2 rounded-sm bg-cyan-400 shadow-inner" />
                </div>
              </div>
              {/* Smokestack */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-5 rounded-t-sm"
                style={{
                  background: "linear-gradient(180deg, #d32f2f, #b71c1c)",
                  boxShadow: "0 -2px 4px rgba(0,0,0,0.2)",
                }}
              >
                <div className="absolute -top-1 left-0 right-0 h-1 bg-yellow-400 rounded-t-sm" />
              </div>
            </div>
          </div>

          {/* Water ring */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-8 rounded-full opacity-40"
            style={{
              background: "radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Flag */}
        <motion.div
          className="absolute -top-4 -right-1 w-8 h-5 rounded-sm shadow-sm flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #e53935, #c62828)",
            borderLeft: "2px solid #fff",
          }}
          animate={{ rotateY: [0, 15, 0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-[5px] text-white font-bold leading-none text-center select-none">
            POLY
            <br />
            MTL
          </div>
        </motion.div>
      </motion.div>

      {/* WASD hint (fades after movement) */}
      {!isMoving && (
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full font-label tracking-widest uppercase">
            WASD to sail
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ── Steam Puff Particle ── */
function SteamPuff({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="absolute -top-6 rounded-full bg-white/60"
      style={{ left: `calc(50% + ${x}px)`, width: 8, height: 8 }}
      animate={{
        y: [-10, -30, -45],
        opacity: [0, 0.7, 0],
        scale: [0.5, 1.2, 0.3],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    />
  );
}
