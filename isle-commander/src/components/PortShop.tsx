"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PortShopProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  thrustLevel: number;
  hullStress: number;
  onRepairHull: () => void;
  onUpgradeThrust: () => void;
}

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
};

const GRID_STYLE = {
  backgroundImage: `linear-gradient(${BP.grid} 1px, transparent 1px), linear-gradient(90deg, ${BP.grid} 1px, transparent 1px)`,
  backgroundSize: "32px 32px",
};

export default function PortShop({
  isOpen, onClose, score, thrustLevel, hullStress, onRepairHull, onUpgradeThrust,
}: PortShopProps) {
  if (!isOpen) return null;

  const canRepair = score >= 50 && hullStress > 5;
  const canUpgrade = score >= 100 && thrustLevel < 3;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="port-bg"
            className="fixed inset-0 z-[95]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "rgba(2, 8, 22, 0.92)", backdropFilter: "blur(12px)", ...GRID_STYLE }}
            onClick={onClose}
          />
          <motion.div
            key="port-panel"
            className="fixed inset-0 z-[96] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div
              className="w-full max-w-md rounded-2xl shadow-2xl"
              style={{ background: BP.panel, border: `1px solid ${BP.border}`, ...GRID_STYLE }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 py-5 border-b" style={{ borderColor: BP.border, background: BP.bg }}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🏠</span>
                  <div>
                    <h2 className="text-xl font-headline font-black" style={{ color: BP.text }}>
                      Home Port
                    </h2>
                    <p className="text-[10px] font-label uppercase tracking-widest" style={{ color: BP.textDim }}>
                      Engineering Bay · Repair & Upgrade
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                    style={{ background: BP.accentDim, border: `1px solid ${BP.border}`, color: BP.accent }}
                  >
                    ✕
                  </button>
                </div>

                {/* Balance */}
                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)" }}>
                  <span className="text-lg">💰</span>
                  <span className="font-headline font-bold text-yellow-300">{score}</span>
                  <span className="text-[10px] font-label text-yellow-300/60 uppercase tracking-wider">Perseverance Points</span>
                </div>
              </div>

              {/* Shop items */}
              <div className="p-6 space-y-4">
                {/* Repair Hull */}
                <div className="rounded-xl p-4" style={{ background: BP.bg, border: `1px solid ${BP.border}` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: BP.accentDim }}>
                      🔧
                    </div>
                    <div className="flex-1">
                      <h3 className="font-headline font-bold text-sm" style={{ color: BP.text }}>Repair Hull</h3>
                      <p className="text-[10px] font-label" style={{ color: BP.textDim }}>
                        Reduce all FEA zone stress by 50%
                      </p>
                      <p className="text-[9px] mt-1" style={{ color: hullStress > 30 ? "#ef4444" : "#22c55e" }}>
                        Current stress: {Math.round(hullStress)}%
                      </p>
                    </div>
                    <motion.button
                      onClick={onRepairHull}
                      disabled={!canRepair}
                      className="px-4 py-2 rounded-lg font-label font-bold text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
                      style={{
                        background: canRepair ? "linear-gradient(135deg, #0891b2, #0e7490)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${canRepair ? BP.borderBright : "rgba(255,255,255,0.1)"}`,
                        color: canRepair ? BP.text : "rgba(255,255,255,0.3)",
                      }}
                      whileHover={canRepair ? { scale: 1.05 } : {}}
                      whileTap={canRepair ? { scale: 0.95 } : {}}
                    >
                      💰 50 pts
                    </motion.button>
                  </div>
                </div>

                {/* Upgrade Thrust */}
                <div className="rounded-xl p-4" style={{ background: BP.bg, border: `1px solid ${BP.border}` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: BP.accentDim }}>
                      🚀
                    </div>
                    <div className="flex-1">
                      <h3 className="font-headline font-bold text-sm" style={{ color: BP.text }}>Upgrade Engine</h3>
                      <p className="text-[10px] font-label" style={{ color: BP.textDim }}>
                        +15% thrust power (permanent)
                      </p>
                      <div className="flex gap-1 mt-1">
                        {[0, 1, 2].map(i => (
                          <div
                            key={i}
                            className="w-4 h-2 rounded-sm"
                            style={{
                              background: i < thrustLevel ? "#22c55e" : "rgba(255,255,255,0.1)",
                              boxShadow: i < thrustLevel ? "0 0 4px #22c55e" : "none",
                            }}
                          />
                        ))}
                        <span className="text-[8px] font-label ml-1" style={{ color: BP.textDim }}>
                          Lv.{thrustLevel}/3
                        </span>
                      </div>
                    </div>
                    <motion.button
                      onClick={onUpgradeThrust}
                      disabled={!canUpgrade}
                      className="px-4 py-2 rounded-lg font-label font-bold text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
                      style={{
                        background: canUpgrade ? "linear-gradient(135deg, #16a34a, #15803d)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${canUpgrade ? "#22c55e" : "rgba(255,255,255,0.1)"}`,
                        color: canUpgrade ? BP.text : "rgba(255,255,255,0.3)",
                      }}
                      whileHover={canUpgrade ? { scale: 1.05 } : {}}
                      whileTap={canUpgrade ? { scale: 0.95 } : {}}
                    >
                      💰 100 pts
                    </motion.button>
                  </div>
                </div>

                {/* Return button */}
                <motion.button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl font-headline font-bold text-sm cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, rgba(0,100,140,0.7), rgba(0,60,90,0.7))`,
                    border: `1px solid ${BP.borderBright}`,
                    color: BP.text,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  ⛵ Set Sail
                </motion.button>

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
