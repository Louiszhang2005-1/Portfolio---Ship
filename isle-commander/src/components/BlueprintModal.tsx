"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mission } from "@/data/missions";

interface BlueprintModalProps {
  mission: Mission | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlueprintModal({ mission, isOpen, onClose }: BlueprintModalProps) {
  if (!mission) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="blueprint-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="blueprint-modal"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl bg-[#faf8f0] border-2 border-stone-200">
              {/* ── Header: Blueprint banner ── */}
              <div
                className="relative px-6 py-6 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${mission.color}dd, ${mission.color}88)`,
                }}
              >
                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>

                {/* Mission Success Stamp */}
                <motion.div
                  className="absolute top-3 right-14 rotate-12"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 12 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
                >
                  <div className="border-3 border-yellow-300 text-yellow-300 px-3 py-1 rounded-lg text-[10px] font-label font-bold uppercase tracking-widest"
                    style={{ borderWidth: "2px" }}
                  >
                    ✓ Mission Success
                  </div>
                </motion.div>

                <div className="relative flex items-center gap-4">
                  {/* Large emoji */}
                  <motion.div
                    className="text-6xl"
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {mission.emoji}
                  </motion.div>

                  <div>
                    {/* ID + Sector */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-black/30 text-white text-xs font-label font-bold px-2.5 py-0.5 rounded-full">
                        {mission.id}
                      </span>
                      <span className="text-white/70 text-xs font-label uppercase">
                        {mission.sector}
                      </span>
                    </div>
                    <h2 className="text-3xl font-headline font-black text-white drop-shadow-lg leading-tight">
                      {mission.title}
                    </h2>
                    <p className="text-white/80 text-sm font-body mt-0.5">{mission.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="px-6 py-5 space-y-5">
                {/* Tech Specs (pill badges) */}
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-label font-bold uppercase tracking-widest text-stone-500 mb-3">
                    <span className="text-base">🔧</span> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mission.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="text-xs font-label font-bold px-3 py-1.5 rounded-full border-2 shadow-sm"
                        style={{
                          borderColor: `${mission.color}44`,
                          backgroundColor: `${mission.color}0a`,
                          color: mission.color,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-stone-200" />

                {/* Project Brief */}
                <div>
                  <h3 className="flex items-center gap-2 text-xs font-label font-bold uppercase tracking-widest text-stone-500 mb-3">
                    <span className="text-base">📋</span> Project Brief
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed font-body">
                    {mission.details}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-stone-200" />

                {/* Technical Data Grid */}
                <div className="bg-stone-100 rounded-xl p-4 border border-stone-200">
                  <div className="grid grid-cols-2 gap-3">
                    <DataField label="Mission Code" value={mission.id} />
                    <DataField label="Sector" value={mission.sector} />
                    <DataField label="Modules" value={`${mission.skills.length} systems`} />
                    <DataField label="Status" value="VERIFIED ✓" highlight />
                  </div>
                </div>

                {/* Action links */}
                <div className="flex gap-3">
                  {mission.github ? (
                    <a
                      href={mission.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-headline font-bold text-sm text-white transition-all hover:brightness-110 active:scale-95"
                      style={{ backgroundColor: mission.color }}
                    >
                      💻 GitHub
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-headline font-bold text-sm text-stone-400 border-2 border-stone-200 cursor-not-allowed">
                      🔒 CLASSIFIED
                    </div>
                  )}

                  {mission.demo ? (
                    <a
                      href={mission.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-headline font-bold text-sm border-2 transition-all hover:brightness-110 active:scale-95"
                      style={{ borderColor: mission.color, color: mission.color }}
                    >
                      🚀 Live Demo
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-headline font-bold text-sm text-stone-400 border-2 border-stone-200 cursor-not-allowed">
                      🔜 Coming Soon
                    </div>
                  )}
                </div>

                {/* Return to Ship button */}
                <motion.button
                  onClick={onClose}
                  className="w-full py-4 rounded-2xl font-headline font-black text-lg text-white shadow-xl cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, #00838f, #006064)`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  ⛵ Return to Ship
                </motion.button>

                {/* ESC hint */}
                <div className="text-center">
                  <span className="text-[10px] font-label text-stone-400 uppercase tracking-widest">
                    Press <kbd className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-600 font-bold mx-0.5">ESC</kbd> to close
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

function DataField({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-[9px] font-label uppercase text-stone-400 tracking-wider mb-0.5">
        {label}
      </div>
      <div
        className={`text-xs font-bold font-label ${
          highlight ? "text-emerald-600" : "text-stone-700"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
