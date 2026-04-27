"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SprocketAvatar from "./SprocketAvatar";

// ── Content ──────────────────────────────────────────────────────────────────

type Line = { text: string; color?: string; indent?: boolean; tag?: string; tagColor?: string };

const PART1_LINES: Line[] = [
  { text: "Welcome, Captain. Syncing professional coordinates..." },
  { text: "Mapping career sectors in chronological order:" },
  { text: "› Sector 2025 (Summer) · City of Montreal", tag: "Water Testing", tagColor: "#0277bd", indent: true },
  { text: "  Scientific Intern. Hands-on water testing, lab analysis,", color: "rgba(180,220,255,0.7)", indent: true },
  { text: "  and environmental monitoring for municipal infrastructure.", color: "rgba(180,220,255,0.7)", indent: true },
  { text: "› Sector 2026 (Winter) · Lockheed Martin", tag: "Ship Integration", tagColor: "#1a3a6b", indent: true },
  { text: "  Mechanical Engineering Intern. Ship systems integration,", color: "rgba(180,220,255,0.7)", indent: true },
  { text: "  CAD modeling, FEA validation for naval platforms.", color: "rgba(180,220,255,0.7)", indent: true },
  { text: "› Sector 2026 (Summer–Fall) · Tesla", tag: "Cell Engineering", tagColor: "#e65100", indent: true },
  { text: "  Manufacturing Engineering Intern. Battery cell production,", color: "rgba(180,220,255,0.7)", indent: true },
  { text: "  process optimization, and automation at the Gigafactory.", color: "rgba(180,220,255,0.7)", indent: true },
];

const PART2_LINES: Line[] = [
  { text: "Scanning project history... chronological log retrieved:" },
  { text: "› CSA Lunar LEAP  [Jan – May 2025]", color: "#fbbf24" },
  { text: "  PM & Systems Integrator · Lunar transport prototype for the Canadian Space Agency.", color: "rgba(180,220,255,0.7)", indent: true },
  { text: "› RoboHacks Reforestation  [Feb 2025]", color: "#22c55e" },
  { text: "  5th Place · Autonomous reforestation robot built in 24h from recycled materials.", color: "rgba(180,220,255,0.7)", indent: true },
  { text: "› Oronos Polytechnique  [Sept 2025 – Jan 2026]", color: "#b8860b" },
  { text: "  Payload integration & structural modeling for high-power rocketry.", color: "rgba(180,220,255,0.7)", indent: true },
  { text: "› ConUHacks 'Nursie'  [Jan 2026]", color: "#00d4ff" },
  { text: "  Winner: Best Use of ElevenLabs · AI-mechatronics healthcare assistant.", color: "rgba(180,220,255,0.7)", indent: true },
  { text: "› AOTC Accenture  [Jan – Apr 2026]", color: "#ad1457" },
  { text: "  Technical CRM & marketing strategy for La Centrale Agricole.", color: "rgba(180,220,255,0.7)", indent: true },
];

const PART3_LINES: Line[] = [
  { text: "Briefing complete. Preparing engine systems..." },
  { text: "Use Matter.js physics to navigate the islands." },
  { text: "Monitor Hull Stress (FEA) and Boiler Pressure." },
  { text: "Avoid thermal vents · they'll cook your hull.", color: "#fb923c" },
  { text: "Collect Perseverance Points to upgrade at Polytechnique Port." },
  { text: "Controls:" },
  { text: "  WASD / Arrows — Thrust & Steer", color: "rgba(100,180,220,0.8)", indent: true },
  { text: "  ENTER — Inspect / Dock", color: "rgba(100,180,220,0.8)", indent: true },
  { text: "  M — Treasure map", color: "rgba(100,180,220,0.8)", indent: true },
  { text: "  ESC — Close panels", color: "rgba(100,180,220,0.8)", indent: true },
  { text: "Good luck, Captain. Sprocket out. ⚙️" },
];

const SHORT_LINES: Line[] = [
  { text: "Captain, quick sitrep from Sprocket:" },
  { text: "› Montreal (water testing) → Lockheed (ship integrations)", color: "rgba(180,220,255,0.7)" },
  { text: "  → Tesla (cell engineering) — NW sector, chronological.", color: "rgba(180,220,255,0.7)" },
  { text: "› Projects span NE, SW, SE — also in chronological order.", color: "rgba(180,220,255,0.7)" },
  { text: "WASD to thrust · ENTER to dock · M for map · ESC to close." },
  { text: "Watch your Hull Stress and Boiler Pressure. ⚙️" },
];

const PHASES = ["booting", "part1", "part2", "part3", "outro", "closed"] as const;
type Phase = (typeof PHASES)[number];

const PHASE_LINES: Record<string, Line[]> = {
  part1: PART1_LINES,
  part2: PART2_LINES,
  part3: PART3_LINES,
};

const PHASE_LABELS: Record<string, string> = {
  booting: "SYSTEM BOOT",
  part1: "INTERNSHIP MAP",
  part2: "PROJECT CHRONOLOGY",
  part3: "MISSION INSTRUCTIONS",
};

const CHAR_DELAY = 18;
const PUNCT_PAUSE = 140;
const STORAGE_KEY = "isle-commander.briefing.v1";

// ── Typewriter hook ───────────────────────────────────────────────────────────

function useTypewriter(
  lines: Line[],
  active: boolean,
  onComplete: () => void,
) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => { if (timerRef.current) clearTimeout(timerRef.current); };

  // advance one character
  useEffect(() => {
    if (!active || allDone) return;
    const line = lines[lineIdx];
    if (!line) return;

    if (charIdx < line.text.length) {
      const ch = line.text[charIdx];
      const delay = /[.,!?:]/.test(ch) ? PUNCT_PAUSE : CHAR_DELAY;
      timerRef.current = setTimeout(() => setCharIdx((c) => c + 1), delay);
    } else {
      // line done — pause then move to next line
      timerRef.current = setTimeout(() => {
        if (lineIdx + 1 < lines.length) {
          setLineIdx((i) => i + 1);
          setCharIdx(0);
        } else {
          setAllDone(true);
          onComplete();
        }
      }, 350);
    }
    return clear;
  });

  const skipToEnd = useCallback(() => {
    clear();
    setLineIdx(lines.length - 1);
    setCharIdx(lines[lines.length - 1]?.text.length ?? 0);
    setAllDone(true);
    onComplete();
  }, [lines, onComplete]);

  const reset = useCallback(() => {
    clear();
    setLineIdx(0);
    setCharIdx(0);
    setAllDone(false);
  }, []);

  const visibleLines: (Line & { partial: string })[] = lines.slice(0, lineIdx + 1).map((l, i) => ({
    ...l,
    partial: i < lineIdx ? l.text : l.text.slice(0, charIdx),
  }));

  return { visibleLines, allDone, skipToEnd, reset };
}

// ── Main Modal ────────────────────────────────────────────────────────────────

export default function MissionBriefing() {
  const alreadySeen = typeof window !== "undefined"
    ? localStorage.getItem(STORAGE_KEY) === "1"
    : true;

  const [phase, setPhase] = useState<Phase>(alreadySeen ? "closed" : "booting");
  const [phaseReady, setPhaseReady] = useState(false); // current phase typing finished

  const phaseIdx = PHASES.indexOf(phase);
  const currentLines = PHASE_LINES[phase] ?? [];

  const handlePhaseComplete = useCallback(() => setPhaseReady(true), []);

  const { visibleLines, allDone, skipToEnd, reset } = useTypewriter(
    currentLines,
    phase !== "booting" && phase !== "outro" && phase !== "closed",
    handlePhaseComplete,
  );

  // Booting — short delay then advance to part1
  useEffect(() => {
    if (phase !== "booting") return;
    const t = setTimeout(() => { setPhase("part1"); reset(); setPhaseReady(false); }, 900);
    return () => clearTimeout(t);
  }, [phase, reset]);

  // Auto-advance after each phase when done (700ms breath)
  useEffect(() => {
    if (!phaseReady) return;
    const nextPhase = PHASES[phaseIdx + 1];
    if (!nextPhase || nextPhase === "closed") return;
    if (nextPhase === "outro") return; // outro triggered only by user action
  }, [phaseReady, phaseIdx]);

  const advance = useCallback(() => {
    if (phase === "booting") return;
    if (phase === "outro" || phase === "closed") return;

    if (!allDone && currentLines.length > 0) {
      skipToEnd();
      return;
    }

    const next = PHASES[phaseIdx + 1];
    if (next === "outro" || next === "closed") {
      setPhase("outro");
      setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, "1");
        setPhase("closed");
      }, 700);
    } else if (next) {
      setPhase(next);
      reset();
      setPhaseReady(false);
    }
  }, [phase, allDone, currentLines.length, phaseIdx, skipToEnd, reset]);

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    setPhase("closed");
  }, []);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === "closed") return;
      if (e.key === "Escape") { dismiss(); return; }
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); advance(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, advance, dismiss]);

  const isOpen = phase !== "closed";
  const isOutro = phase === "outro";
  const label = PHASE_LABELS[phase] ?? "";

  const stepDots = (["part1", "part2", "part3"] as Phase[]).map((p) => ({
    p,
    done: phaseIdx > PHASES.indexOf(p),
    active: p === phase,
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mb-bg"
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOutro ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Panel */}
          <motion.div
            key="mb-panel"
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.35, y: 60 }}
            animate={{ opacity: isOutro ? 0 : 1, scale: isOutro ? 0.92 : 1, y: 0, filter: isOutro ? "blur(2px)" : "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: "spring", stiffness: 480, damping: 26 }}
            onClick={advance}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 520,
                borderRadius: 24,
                overflow: "hidden",
                background: "linear-gradient(155deg, #0a1826, #061020)",
                border: "1.5px solid rgba(0,212,255,0.35)",
                boxShadow: "0 0 60px rgba(0,150,255,0.14), inset 0 0 40px rgba(0,30,60,0.5)",
                position: "relative",
              }}
            >
              {/* Scanline overlay across whole panel */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,212,255,0.03) 3px, rgba(0,212,255,0.03) 4px)",
                  backgroundSize: "100% 4px",
                  animation: "scanlines 0.4s linear infinite",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              />

              {/* CRT vignette */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
                  pointerEvents: "none",
                  zIndex: 9,
                }}
              />

              {/* Header */}
              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  borderBottom: "1px solid rgba(0,212,255,0.18)",
                  background: "rgba(0,40,80,0.4)",
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.32em",
                    color: "rgba(0,212,255,0.65)",
                    fontFamily: "monospace",
                  }}
                >
                  {label}
                </span>
                {/* Progress dots */}
                <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
                  {stepDots.map(({ p, done, active }) => (
                    <div
                      key={p}
                      style={{
                        width: active ? 20 : 6,
                        height: 6,
                        borderRadius: 3,
                        background: done ? "rgba(0,212,255,0.8)" : active ? "rgba(0,212,255,0.6)" : "rgba(0,212,255,0.18)",
                        transition: "width 0.3s ease",
                      }}
                    />
                  ))}
                </div>
                {/* MacOS dots */}
                <div style={{ display: "flex", gap: 5, marginLeft: 8 }}>
                  {(["#ef4444", "#fbbf24", "#22c55e"] as const).map((c) => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.55 }} />
                  ))}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "24px 24px 20px" }}>
                {/* Avatar */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                  <SprocketAvatar size={110} />
                </div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    color: "rgba(0,212,255,0.55)",
                    margin: "0 0 16px",
                    fontFamily: "monospace",
                  }}
                >
                  Sprocket · Physics Engine AI
                </p>

                {/* Typed text */}
                <div
                  style={{
                    minHeight: 200,
                    maxHeight: 240,
                    overflowY: "auto",
                    fontFamily: "monospace",
                    fontSize: 12,
                    lineHeight: 1.7,
                    paddingRight: 4,
                    scrollbarWidth: "thin",
                  }}
                >
                  {phase === "booting" && (
                    <p style={{ color: "rgba(0,212,255,0.6)", animation: "holoFlicker 0.8s steps(1) infinite" }}>
                      ▌ INITIALIZING MISSION CORE...
                    </p>
                  )}
                  {visibleLines.map((line, i) => (
                    <p
                      key={i}
                      style={{
                        margin: "0 0 2px",
                        paddingLeft: line.indent ? 12 : 0,
                        color: line.color ?? "#c8e8ff",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {line.tag && (
                        <span
                          style={{
                            display: "inline-block",
                            marginRight: 6,
                            padding: "1px 6px",
                            borderRadius: 4,
                            fontSize: 9,
                            fontWeight: 700,
                            background: line.tagColor ?? "#004060",
                            color: "#e0f7ff",
                            verticalAlign: "middle",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {line.tag}
                        </span>
                      )}
                      {line.partial}
                      {i === visibleLines.length - 1 && !allDone && (
                        <span style={{ animation: "holoFlicker 0.7s steps(1) infinite" }}>▌</span>
                      )}
                    </p>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  onClick={(e) => { e.stopPropagation(); advance(); }}
                  style={{
                    marginTop: 16,
                    width: "100%",
                    padding: "14px 0",
                    borderRadius: 14,
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #0891b2, #0e7490)",
                    border: "1.5px solid rgba(0,212,255,0.45)",
                    color: "#e0f7ff",
                    boxShadow: "0 0 18px rgba(0,212,255,0.22)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 28px rgba(0,212,255,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  {phase === "part3" && allDone ? (
                    <>⚙️ Initialize Engine</>
                  ) : allDone ? (
                    <>Next ›</>
                  ) : (
                    <>Skip to end ›</>
                  )}
                  <kbd
                    style={{
                      fontSize: 9,
                      fontFamily: "monospace",
                      background: "rgba(0,0,0,0.3)",
                      padding: "2px 6px",
                      borderRadius: 4,
                      border: "1px solid rgba(255,255,255,0.18)",
                    }}
                  >
                    ENTER / SPACE
                  </kbd>
                </motion.button>

                <p
                  style={{
                    textAlign: "center",
                    fontSize: 9,
                    marginTop: 8,
                    color: "rgba(0,212,255,0.28)",
                    fontFamily: "monospace",
                  }}
                >
                  ESC to skip briefing entirely
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Corner Button ─────────────────────────────────────────────────────────────

export function SprocketCornerButton() {
  const [open, setOpen] = useState(false);
  const [typedIdx, setTypedIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  const close = () => { setOpen(false); setTypedIdx(0); setCharIdx(0); };

  // Typewriter for short summary
  useEffect(() => {
    if (!open) return;
    const line = SHORT_LINES[typedIdx];
    if (!line) return;
    if (charIdx < line.text.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 20);
      return () => clearTimeout(t);
    } else {
      if (typedIdx + 1 < SHORT_LINES.length) {
        const t = setTimeout(() => { setTypedIdx((i) => i + 1); setCharIdx(0); }, 380);
        return () => clearTimeout(t);
      }
    }
  });

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Corner trigger button */}
      <motion.button
        onClick={() => { setOpen(true); setTypedIdx(0); setCharIdx(0); }}
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 50,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "linear-gradient(145deg, #0a1826, #061020)",
          border: "1.5px solid rgba(0,212,255,0.45)",
          boxShadow: "0 0 16px rgba(0,212,255,0.3)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
        whileHover={{ scale: 1.12, boxShadow: "0 0 24px rgba(0,212,255,0.55)" }}
        whileTap={{ scale: 0.93 }}
        title="Re-open Sprocket briefing"
      >
        <SprocketAvatar size={36} idle />
      </motion.button>

      {/* Short summary popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="sprocket-short"
            style={{
              position: "fixed",
              bottom: 68,
              left: 16,
              zIndex: 51,
              width: 280,
              borderRadius: 16,
              background: "linear-gradient(155deg, #0a1826, #061020)",
              border: "1.5px solid rgba(0,212,255,0.35)",
              boxShadow: "0 0 32px rgba(0,150,255,0.18)",
              padding: "14px 16px",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 440, damping: 24 }}
          >
            {/* Scanline */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,212,255,0.03) 3px, rgba(0,212,255,0.03) 4px)",
                animation: "scanlines 0.4s linear infinite",
                pointerEvents: "none",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <SprocketAvatar size={32} idle />
              <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(0,212,255,0.6)", fontFamily: "monospace" }}>
                Sprocket · Quick Brief
              </span>
              <button
                onClick={close}
                style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(0,212,255,0.5)", cursor: "pointer", fontSize: 14, lineHeight: 1 }}
              >
                ×
              </button>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 11, lineHeight: 1.65 }}>
              {SHORT_LINES.slice(0, typedIdx + 1).map((line, i) => (
                <p key={i} style={{ margin: "0 0 2px", color: line.color ?? "#c8e8ff" }}>
                  {i < typedIdx ? line.text : line.text.slice(0, charIdx)}
                  {i === typedIdx && charIdx < line.text.length && (
                    <span style={{ animation: "holoFlicker 0.7s steps(1) infinite" }}>▌</span>
                  )}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
