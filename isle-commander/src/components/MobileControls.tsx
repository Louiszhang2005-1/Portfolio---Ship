"use client";

import { motion } from "framer-motion";

export default function MobileControls({
  onMove,
}: {
  onMove: (dir: { x: number; y: number }) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <div className="relative w-36 h-36">
        {/* Up */}
        <motion.button
          className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center text-white shadow-lg active:bg-white/40"
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>

        {/* Down */}
        <motion.button
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center text-white shadow-lg active:bg-white/40"
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>

        {/* Left */}
        <motion.button
          className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center text-white shadow-lg active:bg-white/40"
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </motion.button>

        {/* Right */}
        <motion.button
          className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center text-white shadow-lg active:bg-white/40"
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>

        {/* Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 rounded-full border border-white/10" />
      </div>
    </div>
  );
}
