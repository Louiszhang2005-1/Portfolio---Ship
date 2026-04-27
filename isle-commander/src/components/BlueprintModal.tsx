"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mission } from "@/data/missions";

interface BlueprintModalProps {
  mission: Mission | null;
  isOpen: boolean;
  onClose: () => void;
}

/* Blueprint-mode color palette */
const BP = {
  bg: "#050f1e",
  panel: "#061525",
  border: "rgba(0, 200, 255, 0.25)",
  borderBright: "rgba(0, 200, 255, 0.6)",
  text: "#ffffff",
  textDim: "rgba(180, 225, 255, 0.65)",
  accent: "#00d4ff",
  accentDim: "rgba(0, 212, 255, 0.3)",
  grid: "rgba(255, 255, 255, 0.045)",
  gridBright: "rgba(255, 255, 255, 0.07)",
};

const GRID_STYLE = {
  backgroundImage: `linear-gradient(${BP.grid} 1px, transparent 1px), linear-gradient(90deg, ${BP.grid} 1px, transparent 1px)`,
  backgroundSize: "32px 32px",
};

const GRID_BRIGHT_STYLE = {
  backgroundImage: `linear-gradient(${BP.gridBright} 1px, transparent 1px), linear-gradient(90deg, ${BP.gridBright} 1px, transparent 1px)`,
  backgroundSize: "32px 32px",
};

export default function BlueprintModal({ mission, isOpen, onClose }: BlueprintModalProps) {
  if (!mission) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Blueprint Backdrop — zooms out slightly as modal zooms in ── */}
          <motion.div
            key="blueprint-backdrop"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[100]"
            style={{
              background: `linear-gradient(135deg, rgba(2, 8, 22, 0.97) 0%, rgba(4, 14, 32, 0.97) 100%)`,
              backdropFilter: "blur(12px)",
              ...GRID_STYLE,
            }}
            onClick={onClose}
          />

          {/* Animated scan line across the backdrop */}
          <motion.div
            key="blueprint-scanline"
            className="fixed left-0 right-0 z-[101] pointer-events-none h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${BP.accent}, transparent)`, opacity: 0.4 }}
            initial={{ top: 0 }}
            animate={{ top: "100vh" }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
          />

          {/* ── Blueprint Modal — camera zooms in from far away ── */}
          <motion.div
            key="blueprint-modal"
            initial={{ opacity: 0, scale: 0.12, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1,    filter: "blur(0px)"  }}
            exit={{   opacity: 0, scale: 0.8,   filter: "blur(6px)"  }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="fixed inset-0 z-[102] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
              style={{
                background: BP.panel,
                border: `1px solid ${BP.border}`,
                boxShadow: `0 0 40px rgba(0, 212, 255, 0.15), 0 0 80px rgba(0, 100, 180, 0.08)`,
                ...GRID_STYLE,
              }}
            >
              {/* ── Header ── */}
              <div
                className="relative px-6 py-6 overflow-hidden rounded-t-2xl"
                style={{
                  background: BP.bg,
                  borderBottom: `1px solid ${BP.border}`,
                  ...GRID_BRIGHT_STYLE,
                }}
              >
                {/* Corner brackets (CAD style) */}
                {[
                  "top-0 left-0 border-t-2 border-l-2",
                  "top-0 right-0 border-t-2 border-r-2",
                  "bottom-0 left-0 border-b-2 border-l-2",
                  "bottom-0 right-0 border-b-2 border-r-2",
                ].map((cls, i) => (
                  <div key={i} className={`absolute w-6 h-6 ${cls} pointer-events-none`} style={{ borderColor: BP.accentDim }} />
                ))}

                {/* Schematic label */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2">
                  <span className="font-label text-[8px] uppercase tracking-[0.35em] font-bold" style={{ color: BP.accentDim }}>
                    Technical Schematic · Classified
                  </span>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                  style={{ background: `${BP.accentDim}`, border: `1px solid ${BP.border}`, color: BP.accent }}
                >
                  ✕
                </button>

                {/* Mission stamp */}
                <motion.div
                  className="absolute top-3 right-14 rotate-12"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 12 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
                >
                  <div className="px-2.5 py-0.5 rounded text-[9px] font-label font-bold uppercase tracking-widest"
                    style={{ border: `2px solid #fbbf24`, color: "#fbbf24" }}>
                    ✓ Verified
                  </div>
                </motion.div>

                <div className="relative flex items-center gap-5 mt-4">
                  {/* Blueprint-tinted mission icon */}
                  <motion.div
                    className="relative w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${BP.accentDim}, rgba(0, 60, 100, 0.6))`,
                      border: `1px solid ${BP.border}`,
                      boxShadow: `0 0 20px rgba(0, 212, 255, 0.2)`,
                    }}
                    animate={{ rotate: [0, 3, 0, -3, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    {mission.logo ? (
                      <img src={mission.logo} alt={`${mission.title} logo`} className="max-h-14 max-w-16 rounded bg-white/95 object-contain p-1" />
                    ) : (
                      <span className="text-5xl" style={{ filter: "sepia(100%) hue-rotate(165deg) saturate(400%) brightness(1.3)" }}>
                        {mission.emoji}
                      </span>
                    )}
                    {/* Cross-hair overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: `${BP.accent}30` }} />
                      <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: `${BP.accent}30` }} />
                    </div>
                  </motion.div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-label font-bold text-xs px-2 py-0.5 rounded" style={{ background: `${BP.accentDim}`, color: BP.accent, border: `1px solid ${BP.border}` }}>
                        {mission.id}
                      </span>
                      <span className="font-label text-[10px] uppercase tracking-widest" style={{ color: BP.textDim }}>
                        {mission.sector}
                      </span>
                    </div>
                    <h2 className="text-2xl font-headline font-black leading-tight" style={{ color: BP.text }}>
                      {mission.title}
                    </h2>
                    <p className="text-sm font-body mt-0.5" style={{ color: BP.textDim }}>{mission.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="px-6 py-5 space-y-5">
                {/* Tech Stack */}
                <div>
                  <h3 className="flex items-center gap-2 text-[10px] font-label font-bold uppercase tracking-widest mb-3" style={{ color: BP.textDim }}>
                    <span className="text-sm">🔧</span> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mission.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="text-xs font-label font-bold px-3 py-1.5 rounded-full"
                        style={{
                          background: `rgba(0, 212, 255, 0.08)`,
                          border: `1px solid rgba(0, 212, 255, 0.3)`,
                          color: BP.accent,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: BP.border }} />

                {/* Project Brief */}
                <div>
                  <h3 className="flex items-center gap-2 text-[10px] font-label font-bold uppercase tracking-widest mb-3" style={{ color: BP.textDim }}>
                    <span className="text-sm">📋</span> Mission Brief
                  </h3>
                  <p className="text-sm leading-relaxed font-body" style={{ color: BP.text, opacity: 0.85 }}>
                    {mission.details}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: BP.border }} />

                {/* Technical Data Grid */}
                <div className="rounded-xl p-4" style={{ background: BP.bg, border: `1px solid ${BP.border}` }}>
                  <div className="grid grid-cols-2 gap-3">
                    <BPDataField label="Mission Code" value={mission.id} />
                    <BPDataField label="Sector" value={mission.sector} />
                    <BPDataField label="Systems" value={`${mission.skills.length} modules`} />
                    <BPDataField label="Status" value="VERIFIED ✓" highlight />
                  </div>
                </div>

                {/* Action links */}
                <div className="flex gap-3">
                  {mission.github ? (
                    <a href={mission.github} target="_blank" rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-headline font-bold text-sm transition-all hover:brightness-110 active:scale-95"
                      style={{ background: `linear-gradient(135deg, ${BP.accentDim}, rgba(0, 80, 120, 0.6))`, border: `1px solid ${BP.border}`, color: BP.text }}>
                      💻 GitHub
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-headline font-bold text-sm cursor-not-allowed"
                      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.08)`, color: "rgba(255,255,255,0.25)" }}>
                      🔒 CLASSIFIED
                    </div>
                  )}

                  {mission.demo ? (
                    <a href={mission.demo} target="_blank" rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-headline font-bold text-sm transition-all hover:brightness-110 active:scale-95"
                      style={{ border: `1px solid ${BP.borderBright}`, color: BP.accent }}>
                      🚀 Live Demo
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-headline font-bold text-sm cursor-not-allowed"
                      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.08)`, color: "rgba(255,255,255,0.25)" }}>
                      🔜 Coming Soon
                    </div>
                  )}
                </div>

                {/* Return to Ship */}
                <motion.button
                  onClick={onClose}
                  className="w-full py-4 rounded-xl font-headline font-black text-lg cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, rgba(0, 100, 140, 0.7), rgba(0, 60, 90, 0.7))`,
                    border: `1px solid ${BP.borderBright}`,
                    color: BP.text,
                    boxShadow: `0 0 14px rgba(0, 212, 255, 0.15)`,
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  ⛵ Return to Ship
                </motion.button>

                {/* ESC hint */}
                <div className="text-center">
                  <span className="text-[10px] font-label uppercase tracking-widest" style={{ color: BP.textDim }}>
                    Press <kbd className="px-1.5 py-0.5 rounded font-bold mx-0.5" style={{ background: "rgba(0,212,255,0.1)", color: BP.accent, border: `1px solid ${BP.border}` }}>ESC</kbd> to close
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function BPDataField({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[9px] font-label uppercase tracking-wider mb-0.5" style={{ color: "rgba(160, 210, 240, 0.4)" }}>
        {label}
      </div>
      <div className="text-xs font-bold font-label" style={{ color: highlight ? "#00ff88" : "#c8eeff" }}>
        {value}
      </div>
    </div>
  );
}
