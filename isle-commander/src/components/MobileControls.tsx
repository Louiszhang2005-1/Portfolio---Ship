"use client";

import { motion } from "framer-motion";

export default function MobileControls() {
  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <div className="relative w-40 h-40">
        {/* Forward (W) */}
        <motion.button
          className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-white/25 backdrop-blur-md rounded-xl border border-white/25 flex flex-col items-center justify-center text-white shadow-lg active:bg-white/40"
          whileTap={{ scale: 0.9 }}
          onTouchStart={() => {
            const event = new KeyboardEvent("keydown", { key: "w" });
            window.dispatchEvent(event);
          }}
          onTouchEnd={() => {
            const event = new KeyboardEvent("keyup", { key: "w" });
            window.dispatchEvent(event);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <span className="text-[7px] font-bold font-label mt-0.5 uppercase tracking-wider opacity-70">FWD</span>
        </motion.button>

        {/* Reverse (S) */}
        <motion.button
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 bg-white/25 backdrop-blur-md rounded-xl border border-white/25 flex flex-col items-center justify-center text-white shadow-lg active:bg-white/40"
          whileTap={{ scale: 0.9 }}
          onTouchStart={() => {
            const event = new KeyboardEvent("keydown", { key: "s" });
            window.dispatchEvent(event);
          }}
          onTouchEnd={() => {
            const event = new KeyboardEvent("keyup", { key: "s" });
            window.dispatchEvent(event);
          }}
        >
          <span className="text-[7px] font-bold font-label mb-0.5 uppercase tracking-wider opacity-70">REV</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>

        {/* Turn Left (A) */}
        <motion.button
          className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/25 backdrop-blur-md rounded-xl border border-white/25 flex items-center justify-center gap-0.5 text-white shadow-lg active:bg-white/40"
          whileTap={{ scale: 0.9 }}
          onTouchStart={() => {
            const event = new KeyboardEvent("keydown", { key: "a" });
            window.dispatchEvent(event);
          }}
          onTouchEnd={() => {
            const event = new KeyboardEvent("keyup", { key: "a" });
            window.dispatchEvent(event);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-[6px] font-bold font-label uppercase tracking-wider opacity-70">L</span>
        </motion.button>

        {/* Turn Right (D) */}
        <motion.button
          className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/25 backdrop-blur-md rounded-xl border border-white/25 flex items-center justify-center gap-0.5 text-white shadow-lg active:bg-white/40"
          whileTap={{ scale: 0.9 }}
          onTouchStart={() => {
            const event = new KeyboardEvent("keydown", { key: "d" });
            window.dispatchEvent(event);
          }}
          onTouchEnd={() => {
            const event = new KeyboardEvent("keyup", { key: "d" });
            window.dispatchEvent(event);
          }}
        >
          <span className="text-[6px] font-bold font-label uppercase tracking-wider opacity-70">R</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>

        {/* Center helm icon */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 rounded-full border border-white/15 flex items-center justify-center">
          <span className="text-lg">⛵</span>
        </div>
      </div>
    </div>
  );
}
