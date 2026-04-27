"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HollowAvatar from "./HollowAvatar";
import SprocketAvatar from "./SprocketAvatar";

type Line = { text: string; color?: string; indent?: boolean; tag?: string; tagColor?: string };
type Phase = "booting" | "part1" | "part2" | "part3" | "outro" | "closed";

const PHASES: Phase[] = ["booting", "part1", "part2", "part3", "outro", "closed"];
const CHAR_DELAY = 15;
const PUNCT_PAUSE = 95;

const PHASE_LABELS: Record<string, string> = {
  booting: "PROFILE LINK",
  part1: "IDENTITY",
  part2: "HIGHLIGHTS",
  part3: "LAUNCH",
};

const PART1_LINES: Line[] = [
  { text: "Identity confirmed: Louis Zhang." },
  { text: "Mechanical engineering student building across hardware, manufacturing, aerospace, robotics, and software." },
  { text: "This portfolio is not a slide deck. It is a playable career map." },
  { text: "The internship route begins with City of Montreal, continues to Lockheed Martin, then reaches my upcoming Tesla Cell Engineering internship." },
  { text: "Pilot the ship, inspect islands, read blueprints, collect points, and dock for upgrades." },
];

const PART2_LINES: Line[] = [
  { text: "Signal highlights loaded:" },
  { text: "> City of Montreal", tag: "Water Testing", tagColor: "#0277bd" },
  { text: "Municipal water testing, lab workflows, environmental monitoring, and data analysis.", color: "rgba(199,232,255,0.76)", indent: true },
  { text: "> Lockheed Martin", tag: "Ship Integration", tagColor: "#1d4ed8" },
  { text: "CAD, structural layouts, FEA validation, and shipboard subsystem integration.", color: "rgba(199,232,255,0.76)", indent: true },
  { text: "> Tesla", tag: "Cell Engineering", tagColor: "#dc2626" },
  { text: "Battery manufacturing, automation, process optimization, and production thinking.", color: "rgba(199,232,255,0.76)", indent: true },
  { text: "> CSA Lunar LEAP", tag: "Systems", tagColor: "#b45309" },
  { text: "Lunar transport prototype, project management, controls, thermal and structural validation.", color: "rgba(199,232,255,0.76)", indent: true },
  { text: "> Rapid builds", tag: "Mechatronics", tagColor: "#059669" },
  { text: "Robots, NFC disaster response hardware, AI tools, dashboards, and prototypes.", color: "rgba(199,232,255,0.76)", indent: true },
];

const PART3_LINES: Line[] = [
  { text: "Launch protocol:" },
  { text: "Use Matter.js physics to navigate the islands." },
  { text: "Monitor Hull Stress (FEA) and Boiler Pressure." },
  { text: "Avoid thermal vents. They will cook your hull.", color: "#fb923c" },
  { text: "Collect Perseverance Points to upgrade at Polytechnique Port." },
  { text: "Controls:" },
  { text: "WASD / Arrows - Thrust & Steer", color: "rgba(100,220,220,0.86)", indent: true },
  { text: "ENTER - Inspect / Dock", color: "rgba(100,220,220,0.86)", indent: true },
  { text: "M - Treasure map", color: "rgba(100,220,220,0.86)", indent: true },
  { text: "ESC - Close panels", color: "rgba(100,220,220,0.86)", indent: true },
  { text: "Engine armed. Impress mode: online." },
];

const SHORT_LINES: Line[] = [
  { text: "Louis Zhang: mechanical engineering, systems, CAD, FEA, manufacturing, robotics, and software." },
  { text: "Explore the islands to see internships, aerospace builds, hardware projects, and AI tools.", color: "rgba(199,232,255,0.76)" },
  { text: "WASD to sail. ENTER to inspect. M for map. ESC to close panels.", color: "rgba(125,252,255,0.82)" },
];

const PHASE_LINES: Record<string, Line[]> = {
  part1: PART1_LINES,
  part2: PART2_LINES,
  part3: PART3_LINES,
};

const INTERNSHIP_TIMELINE = [
  { title: "City of Montreal", role: "Scientific Intern - Water Testing", when: "May-Aug 2025", logo: "/logo/city-of-montreal.gif" },
  { title: "Lockheed Martin", role: "Mechanical Engineering Intern - Ship Integrations", when: "Winter 2026", logo: "/logo/lockheed-martin.jpg" },
  { title: "Tesla", role: "Manufacturing Engineering Intern - Cell Engineering", when: "Summer-Fall 2026", logo: "/logo/tesla.jpg" },
];

function useTypewriter(lines: Line[], active: boolean, onComplete: () => void) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (!active || allDone) return;
    const line = lines[lineIdx];
    if (!line) return;

    if (charIdx < line.text.length) {
      const ch = line.text[charIdx];
      const delay = /[.,!?:]/.test(ch) ? PUNCT_PAUSE : CHAR_DELAY;
      timerRef.current = setTimeout(() => setCharIdx((c) => c + 1), delay);
    } else {
      timerRef.current = setTimeout(() => {
        if (lineIdx + 1 < lines.length) {
          setLineIdx((i) => i + 1);
          setCharIdx(0);
        } else {
          setAllDone(true);
          onComplete();
        }
      }, 260);
    }
    return clear;
  });

  const skipToEnd = useCallback(() => {
    clear();
    setLineIdx(Math.max(0, lines.length - 1));
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

  const visibleLines = lines.slice(0, lineIdx + 1).map((line, i) => ({
    ...line,
    partial: i < lineIdx ? line.text : line.text.slice(0, charIdx),
  }));

  return { visibleLines, allDone, skipToEnd, reset };
}

export default function MissionBriefing() {
  const forceSkip = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).has("skipBriefing")
    : false;

  const [phase, setPhase] = useState<Phase>(forceSkip ? "closed" : "booting");
  const [phaseReady, setPhaseReady] = useState(false);
  const phaseIdx = PHASES.indexOf(phase);
  const currentLines = PHASE_LINES[phase] ?? [];

  const handlePhaseComplete = useCallback(() => setPhaseReady(true), []);
  const { visibleLines, allDone, skipToEnd, reset } = useTypewriter(
    currentLines,
    phase !== "booting" && phase !== "outro" && phase !== "closed",
    handlePhaseComplete,
  );

  useEffect(() => {
    if (phase !== "booting") return;
    const t = setTimeout(() => {
      setPhase("part1");
      reset();
      setPhaseReady(false);
    }, 850);
    return () => clearTimeout(t);
  }, [phase, reset]);

  const advance = useCallback(() => {
    if (phase === "booting" || phase === "outro" || phase === "closed") return;
    if (!allDone && currentLines.length > 0) {
      skipToEnd();
      return;
    }

    const next = PHASES[phaseIdx + 1];
    if (next === "outro" || next === "closed") {
      setPhase("outro");
      setTimeout(() => {
        setPhase("closed");
      }, 650);
      return;
    }

    if (next) {
      setPhase(next);
      reset();
      setPhaseReady(false);
    }
  }, [allDone, currentLines.length, phase, phaseIdx, reset, skipToEnd]);

  const dismiss = useCallback(() => {
    setPhase("closed");
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === "closed") return;
      if (e.key === "Escape") dismiss();
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advance, dismiss, phase]);

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
          <motion.div
            key="mb-bg"
            className="fixed inset-0 z-[200] bg-[radial-gradient(circle_at_50%_35%,rgba(17,94,89,0.34),rgba(2,6,23,0.94)_52%,#020617_100%)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOutro ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.36 }}
          />

          <motion.div
            key="mb-panel"
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: isOutro ? 0 : 1, scale: isOutro ? 0.95 : 1, y: 0, filter: isOutro ? "blur(2px)" : "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            onClick={advance}
          >
            <div className="launch-panel relative w-full max-w-[860px] overflow-hidden rounded-lg border border-cyan-200/25 bg-slate-950/88 shadow-[0_0_90px_rgba(34,211,238,0.18)]">
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,transparent,rgba(125,252,255,0.06),transparent)]" />
              <div className="absolute inset-0 pointer-events-none opacity-40 game-scanline" />

              <div className="flex items-center gap-3 border-b border-cyan-200/15 bg-cyan-300/5 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.9)]" />
                <span className="font-label text-[10px] font-black uppercase tracking-[0.32em] text-cyan-100/70">
                  {label}
                </span>
                <div className="ml-auto flex gap-1.5">
                  {stepDots.map(({ p, done, active }) => (
                    <span
                      key={p}
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: active ? 28 : 8,
                        background: done ? "rgba(125,252,255,0.85)" : active ? "rgba(125,252,255,0.62)" : "rgba(125,252,255,0.18)",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid gap-6 p-5 md:grid-cols-[280px_1fr] md:p-7">
                <div className="flex flex-col items-center justify-center rounded-md border border-cyan-200/12 bg-cyan-200/[0.04] p-5">
                  <HollowAvatar size={156} />
                  <h1 className="mt-5 text-center font-headline text-3xl font-black tracking-normal text-white">
                    Louis Zhang
                  </h1>
                  <p className="mt-2 text-center font-label text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-100/58">
                    Mechanical Engineering Portfolio
                  </p>
                  <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center font-label text-[9px] font-black uppercase tracking-wider text-slate-950">
                    <span className="rounded bg-cyan-200 px-2 py-1">CAD</span>
                    <span className="rounded bg-emerald-200 px-2 py-1">FEA</span>
                    <span className="rounded bg-amber-200 px-2 py-1">Robotics</span>
                  </div>
                  <div className="mt-5 w-full space-y-2">
                    {INTERNSHIP_TIMELINE.map((item, index) => (
                      <div key={item.title} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] p-2">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded bg-cyan-200/15 font-label text-[10px] font-black text-cyan-100">
                          {index + 1}
                        </span>
                        <div className="grid h-9 w-12 shrink-0 place-items-center overflow-hidden rounded bg-white p-1">
                          <img src={item.logo} alt={`${item.title} logo`} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-label text-[10px] font-black text-white">{item.title}</p>
                          <p className="truncate font-label text-[8px] font-bold uppercase tracking-wider text-cyan-100/42">{item.role}</p>
                          <p className="truncate font-label text-[8px] font-bold uppercase tracking-wider text-emerald-100/38">{item.when}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex min-h-[410px] flex-col">
                  <div className="mb-4">
                    <p className="font-label text-[10px] font-black uppercase tracking-[0.32em] text-emerald-200/70">
                      Isle Commander
                    </p>
                    <h2 className="mt-1 font-headline text-2xl font-black text-white md:text-4xl">
                      A playable map of what I build.
                    </h2>
                  </div>

                  <div className="min-h-[242px] flex-1 overflow-y-auto rounded-md border border-white/10 bg-black/24 p-4 font-mono text-[12px] leading-7 text-cyan-50/88">
                    {phase === "booting" && (
                      <p className="text-cyan-100/70" style={{ animation: "holoFlicker 0.8s steps(1) infinite" }}>
                        INITIALIZING PORTFOLIO INTERFACE...
                      </p>
                    )}
                    {visibleLines.map((line, i) => (
                      <p
                        key={i}
                        className="mb-1"
                        style={{
                          paddingLeft: line.indent ? 16 : 0,
                          color: line.color ?? "#dff9ff",
                        }}
                      >
                        {line.tag && (
                          <span
                            className="mr-2 inline-block rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white"
                            style={{ background: line.tagColor ?? "#075985" }}
                          >
                            {line.tag}
                          </span>
                        )}
                        {line.partial}
                        {i === visibleLines.length - 1 && !allDone && (
                          <span className="text-cyan-200" style={{ animation: "holoFlicker 0.7s steps(1) infinite" }}>
                            |
                          </span>
                        )}
                      </p>
                    ))}
                  </div>

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      advance();
                    }}
                    className="mt-4 flex min-h-12 w-full items-center justify-center gap-3 rounded-md border border-cyan-100/35 bg-cyan-300 px-4 py-3 font-label text-sm font-black uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_24px_rgba(125,252,255,0.22)]"
                    whileHover={{ scale: 1.01, boxShadow: "0 0 38px rgba(125,252,255,0.35)" }}
                    whileTap={{ scale: 0.985 }}
                  >
                    {phase === "part3" && allDone ? "Launch Game" : allDone ? "Continue" : "Complete Scan"}
                    <kbd className="rounded border border-slate-900/20 bg-slate-950/15 px-2 py-1 text-[9px]">ENTER</kbd>
                  </motion.button>
                  <p className="mt-2 text-center font-label text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-100/28">
                    ESC skips intro
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function SprocketCornerButton() {
  const [open, setOpen] = useState(false);
  const [typedIdx, setTypedIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  const close = () => {
    setOpen(false);
    setTypedIdx(0);
    setCharIdx(0);
  };

  useEffect(() => {
    if (!open) return;
    const line = SHORT_LINES[typedIdx];
    if (!line) return;
    if (charIdx < line.text.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    if (typedIdx + 1 < SHORT_LINES.length) {
      const t = setTimeout(() => {
        setTypedIdx((i) => i + 1);
        setCharIdx(0);
      }, 300);
      return () => clearTimeout(t);
    }
  });

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      <motion.button
        onClick={() => {
          setOpen(true);
          setTypedIdx(0);
          setCharIdx(0);
        }}
        className="fixed bottom-4 left-4 z-50 grid h-12 w-12 place-items-center rounded-md border border-cyan-100/35 bg-slate-950/80 shadow-[0_0_24px_rgba(34,211,238,0.28)] backdrop-blur-md"
        whileHover={{ scale: 1.08, boxShadow: "0 0 34px rgba(34,211,238,0.48)" }}
        whileTap={{ scale: 0.94 }}
        title="Open quick portfolio brief"
      >
        <SprocketAvatar size={38} idle />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sprocket-short"
            className="fixed bottom-20 left-4 z-50 w-[300px] overflow-hidden rounded-lg border border-cyan-100/25 bg-slate-950/90 p-4 shadow-[0_0_44px_rgba(34,211,238,0.2)] backdrop-blur-md"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 440, damping: 24 }}
          >
            <div className="absolute inset-0 pointer-events-none game-scanline opacity-40" />
            <div className="mb-3 flex items-center gap-2">
              <SprocketAvatar size={34} idle />
              <span className="font-label text-[9px] font-black uppercase tracking-[0.26em] text-cyan-100/64">
                Quick Brief
              </span>
              <button
                onClick={close}
                className="ml-auto rounded border border-white/10 px-2 py-0.5 text-xs text-cyan-100/60"
                aria-label="Close quick brief"
              >
                x
              </button>
            </div>
            <div className="font-mono text-[11px] leading-6">
              {SHORT_LINES.slice(0, typedIdx + 1).map((line, i) => (
                <p key={i} className="mb-1" style={{ color: line.color ?? "#dff9ff" }}>
                  {i < typedIdx ? line.text : line.text.slice(0, charIdx)}
                  {i === typedIdx && charIdx < line.text.length && (
                    <span style={{ animation: "holoFlicker 0.7s steps(1) infinite" }}>|</span>
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
