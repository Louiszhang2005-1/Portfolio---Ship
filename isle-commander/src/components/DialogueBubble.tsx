"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mission } from "@/data/missions";

interface DialogueBubbleProps {
  nearbyIsland: Mission | null;
  onInspect: () => void;
}

export default function DialogueBubble({ nearbyIsland, onInspect }: DialogueBubbleProps) {
  const isLocked = nearbyIsland?.status === "locked";

  return (
    <AnimatePresence>
      {nearbyIsland && (
        <motion.div
          key={nearbyIsland.id}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_-8px_40px_rgba(0,0,0,0.15)] border-t-4 border-white overflow-hidden">
            {/* Colored accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: nearbyIsland.color }}
            />

            <div className="flex gap-5 items-center p-5">
              {/* Officer avatar area */}
              <div className="flex-shrink-0">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner text-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${nearbyIsland.color}22, ${nearbyIsland.color}44)`,
                    border: `2px solid ${nearbyIsland.color}33`,
                  }}
                >
                  {nearbyIsland.emoji}
                </div>
              </div>

              {/* Dialogue content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label font-bold text-emerald-700 text-[10px] uppercase tracking-widest">
                    Deck Officer
                  </span>
                  <span
                    className="text-[9px] font-label font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${nearbyIsland.sectorColor}15`,
                      color: nearbyIsland.sectorColor,
                    }}
                  >
                    {nearbyIsland.id}
                  </span>
                </div>

                {isLocked ? (
                  nearbyIsland?.id === "I-1" ? (
                    <p className="font-headline text-base font-bold leading-snug" style={{ color: "#d97706" }}>
                      ⚡ <span className="text-yellow-500">Sector Secured!</span> We&apos;re prepping for the{" "}
                      <span className="text-red-500">Summer 2026 deployment</span> at the Nevada Gigafactory.{" "}
                      Systems at <span className="text-green-500">100%!</span>
                    </p>
                  ) : (
                    <p className="font-headline text-base font-bold leading-snug" style={{ color: "#d97706" }}>
                      ⚡ <span className="text-yellow-600">Sector Under Construction.</span>{" "}
                      <span className="text-red-500">Summer 2026 deployment expected.</span>{" "}
                      High-voltage barrier active — do not approach.
                    </p>
                  )
                ) : (
                  <p className="font-headline text-base font-bold text-gray-800 leading-snug">
                    Captain, we&apos;ve arrived at{" "}
                    <span style={{ color: nearbyIsland.color }}>{nearbyIsland.title}</span>. 
                    Inspect the {nearbyIsland.subtitle} blueprints?
                  </p>
                )}
              </div>

              {/* Action button */}
              {!isLocked && (
                <motion.button
                  onClick={onInspect}
                  className="flex-shrink-0 text-white p-4 rounded-2xl shadow-xl border-2 border-white/30 hover:scale-110 transition-all cursor-pointer"
                  style={{ background: `linear-gradient(135deg, ${nearbyIsland.color}, ${nearbyIsland.color}cc)` }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </motion.button>
              )}
            </div>

            {/* Keyboard hint */}
            {!isLocked && (
              <div className="px-5 pb-3 -mt-1">
                <span className="text-[10px] font-label text-gray-400 uppercase tracking-widest">
                  Press <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-bold mx-0.5">ENTER</kbd> to dive in
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
