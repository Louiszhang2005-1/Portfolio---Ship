"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MissionBriefing() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const dismiss = () => setOpen(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") dismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="mb-bg"
            className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            key="mb-panel"
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.3, y: 80, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: "spring", stiffness: 500, damping: 24 }}
          >
            <div
              className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: "linear-gradient(145deg, #0d1f3c, #0a1628)",
                border: "2px solid rgba(0,200,255,0.3)",
                boxShadow: "0 0 60px rgba(0,150,255,0.12)",
              }}
            >
              <div
                className="px-6 py-3 flex items-center gap-3 border-b"
                style={{
                  background: "linear-gradient(90deg, rgba(0,80,120,0.5), rgba(0,40,80,0.5))",
                  borderBottomColor: "rgba(0,200,255,0.2)",
                }}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: "rgba(0,212,255,0.7)" }}>
                  Mission Briefing · Mechanical Engineering Simulator
                </span>
                <div className="ml-auto flex gap-1.5">
                  {["#ef4444", "#fbbf24", "#22c55e"].map((c) => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.6 }} />
                  ))}
                </div>
              </div>

              <div className="p-7 space-y-5">
                <div className="flex justify-center">
                  <motion.div
                    animate={{ y: [0, -14, 0], scale: [1, 1.08, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div
                      className="relative w-24 h-24 rounded-full flex items-center justify-center"
                      style={{
                        background: "radial-gradient(circle, rgba(0,212,255,0.18), rgba(0,80,120,0.4))",
                        border: "2px solid rgba(0,212,255,0.4)",
                        boxShadow: "0 0 24px rgba(0,212,255,0.2)",
                      }}
                    >
                      <span style={{ fontSize: 44, filter: "drop-shadow(0 0 12px #00d4ff)" }}>⚙️</span>
                    </div>
                  </motion.div>
                </div>

                <div className="text-center -mt-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color: "rgba(0,212,255,0.6)" }}>
                    Sprocket · Physics Engine AI
                  </span>
                </div>

                <div className="space-y-3 text-sm leading-relaxed">
                  <p style={{ color: "#e0f7ff" }}>
                    Welcome, <span style={{ color: "#fbbf24", fontWeight: 700 }}>Captain Louis Zhang</span>.
                  </p>
                  <p style={{ color: "rgba(180,220,255,0.8)" }}>
                    This is a{" "}
                    <span style={{ color: "#00d4ff", fontWeight: 700 }}>physics-driven engineering simulator</span> — use{" "}
                    <span style={{ color: "#22c55e", fontWeight: 700 }}>gravitational slingshots</span> to navigate between
                    Louis&apos;s engineering milestones.
                  </p>
                  <p style={{ color: "rgba(180,220,255,0.8)" }}>
                    🌀 Each node has a <span style={{ color: "#00d4ff", fontWeight: 700 }}>gravitational field</span> — use momentum to slingshot efficiently.{" "}
                    🔧 <span style={{ color: "#fb923c", fontWeight: 700 }}>Avoid thermal vents</span> and watch your{" "}
                    <span style={{ color: "#ef4444", fontWeight: 700 }}>hull stress</span>.{" "}
                    🧩 Some projects have <span style={{ color: "#22c55e", fontWeight: 700 }}>Assembly Mode</span> — build the machine!
                  </p>
                  <p style={{ color: "rgba(180,220,255,0.8)" }}>
                    Dock at the <span style={{ color: "#fcd34d" }}>Home Port</span> to repair & upgrade.
                    Spend <span style={{ color: "#fbbf24", fontWeight: 700 }}>Perseverance Points</span> wisely!
                  </p>
                </div>

                <div
                  className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[10px] font-mono rounded-xl p-3"
                  style={{ background: "rgba(0,0,0,0.3)", color: "rgba(100,180,220,0.7)" }}
                >
                  <span>WASD / Arrows — Thrust & Steer</span>
                  <span>ENTER — Inspect / Dock</span>
                  <span>M — Treasure map</span>
                  <span>ESC — Close panels</span>
                </div>

                <motion.button
                  onClick={dismiss}
                  className="w-full py-4 rounded-2xl font-bold text-lg tracking-wide cursor-pointer flex items-center justify-center gap-3"
                  style={{
                    background: "linear-gradient(135deg, #0891b2, #0e7490)",
                    border: "2px solid rgba(0,212,255,0.45)",
                    color: "#e0f7ff",
                    boxShadow: "0 0 20px rgba(0,212,255,0.25)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 32px rgba(0,212,255,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  ⚙️ Initialize Engine
                  <kbd className="text-[10px] font-label bg-black/25 px-2 py-0.5 rounded border border-white/20">ENTER</kbd>
                </motion.button>

                <p className="text-center text-[9px] font-mono" style={{ color: "rgba(0,212,255,0.35)" }}>
                  — Sprocket, your Physics Engine AI, signing off —
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
