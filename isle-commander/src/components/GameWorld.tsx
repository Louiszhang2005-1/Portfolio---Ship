"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { missions, collectibles, Mission, fogZones, barrels } from "@/data/missions";
import { EnemyHUD } from "@/hooks/useGameEngine";
import Island from "./Island";

interface GameWorldProps {
  worldRef: React.RefObject<HTMLDivElement | null>;
  paralaxBgRef: React.RefObject<HTMLDivElement | null>;
  paralaxMidRef: React.RefObject<HTMLDivElement | null>;
  nearbyIsland: Mission | null;
  visitedIds: Set<string>;
  collectedItems: Set<string>;
  fogRevealedZones: Set<number>;
  onIslandClick: (mission: Mission) => void;
  hudEnemies: EnemyHUD[];
  explodedBarrels: Set<string>;
}

const WORLD_SIZE = 3000;
const HALF = WORLD_SIZE / 2;
// Parallax layer sizes (match useGameEngine constants)
const BG_SIZE = 8000;
const MID_SIZE = 6000;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* Memoize the entire GameWorld — only re-renders when props change */
const GameWorld = React.memo(function GameWorld({
  worldRef,
  paralaxBgRef,
  paralaxMidRef,
  nearbyIsland,
  visitedIds,
  collectedItems,
  fogRevealedZones,
  onIslandClick,
  hudEnemies,
  explodedBarrels,
}: GameWorldProps) {

  const decorations = useMemo(() => {
    const rng = seededRandom(42);
    const trees: { x: number; y: number; emoji: string; size: number }[] = [];
    const treeEmojis = ['🌲', '🌳', '🌴', '🌿'];
    for (let i = 0; i < 50; i++) {
      trees.push({
        x: (rng() - 0.5) * 2400, y: (rng() - 0.5) * 2400,
        emoji: treeEmojis[Math.floor(rng() * treeEmojis.length)],
        size: 16 + rng() * 14,
      });
    }
    const flowers: { x: number; y: number; emoji: string; size: number }[] = [];
    const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌼'];
    for (let i = 0; i < 20; i++) {
      flowers.push({
        x: (rng() - 0.5) * 2200, y: (rng() - 0.5) * 2200,
        emoji: flowerEmojis[Math.floor(rng() * flowerEmojis.length)],
        size: 10 + rng() * 8,
      });
    }
    const rocks: { x: number; y: number; size: number; color: string }[] = [];
    for (let i = 0; i < 15; i++) {
      const shade = 140 + rng() * 60;
      rocks.push({
        x: (rng() - 0.5) * 2400, y: (rng() - 0.5) * 2400,
        size: 10 + rng() * 16,
        color: `rgb(${shade}, ${shade - 10}, ${shade - 20})`,
      });
    }
    return { trees, flowers, rocks };
  }, []);

  const clouds = useMemo(() => {
    const rng = seededRandom(77);
    const items: { x: number; y: number; size: number; delay: number; opacity: number }[] = [];
    for (let i = 0; i < 8; i++) {
      items.push({
        x: (rng() - 0.5) * 2700, y: (rng() - 0.5) * 2700,
        size: 70 + rng() * 80, delay: rng() * 20, opacity: 0.5 + rng() * 0.3,
      });
    }
    return items;
  }, []);

  const pathLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
    const sectorGroups: Record<string, Mission[]> = {};
    missions.forEach((m) => {
      if (!sectorGroups[m.sector]) sectorGroups[m.sector] = [];
      sectorGroups[m.sector].push(m);
    });
    Object.values(sectorGroups).forEach((group) => {
      for (let i = 0; i < group.length - 1; i++) {
        lines.push({ x1: group[i].position.x, y1: group[i].position.y, x2: group[i + 1].position.x, y2: group[i + 1].position.y, color: group[i].sectorColor });
      }
    });
    Object.values(sectorGroups).forEach((group) => {
      lines.push({ x1: 0, y1: 0, x2: group[0].position.x, y2: group[0].position.y, color: group[0].sectorColor });
    });
    return lines;
  }, []);

  const edgeFog = useMemo(() => {
    const rng = seededRandom(111);
    const items: { x: number; y: number; size: number }[] = [];
    for (let i = 0; i < 16; i++) {
      const side = i % 4;
      let x = 0, y = 0;
      if (side === 0) { x = -1100 + rng() * 2200; y = -1200; }
      else if (side === 1) { x = -1100 + rng() * 2200; y = 1200; }
      else if (side === 2) { x = -1200; y = -1100 + rng() * 2200; }
      else { x = 1200; y = -1100 + rng() * 2200; }
      items.push({ x, y, size: 120 + rng() * 100 });
    }
    return items;
  }, []);

  // Mechanical Fish — gear bodies with CSS triangle fins
  const mechFish = useMemo(() => {
    const rng = seededRandom(888);
    return Array.from({ length: 10 }, (_, i) => ({
      x: (rng() - 0.5) * 2400,
      y: (rng() - 0.5) * 2400,
      scale: 0.75 + rng() * 0.7,
      speed: 7 + rng() * 9,
      delay: rng() * 12,
      color: `hsl(${185 + rng() * 30}, 70%, ${50 + rng() * 20}%)`,
    }));
  }, []);

  // Mechanical debris items for mid parallax layer
  const mechDebris = useMemo(() => {
    const rng = seededRandom(555);
    const debrisEmojis = ['⚙️', '⚙️', '⚙️', '📐', '🔩', '⚙️', '📋'];
    const driftAnims = ['mechDrift1', 'mechDrift2', 'mechDrift3'];
    const items: { x: number; y: number; size: number; emoji: string; anim: string; delay: number; opacity: number }[] = [];
    for (let i = 0; i < 40; i++) {
      items.push({
        x: (rng() - 0.5) * (MID_SIZE - 200),
        y: (rng() - 0.5) * (MID_SIZE - 200),
        size: 14 + rng() * 18,
        emoji: debrisEmojis[Math.floor(rng() * debrisEmojis.length)],
        anim: driftAnims[Math.floor(rng() * driftAnims.length)],
        delay: rng() * 12,
        opacity: 0.18 + rng() * 0.22,
      });
    }
    return items;
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #4ac6d8 0%, #35a8be 30%, #2890a8 60%, #1a7a94 100%)" }}
    >
      {/* ── PARALLAX LAYER 1: Deep Ocean Background (0.3× speed) ── */}
      <div
        ref={paralaxBgRef}
        className="absolute pointer-events-none"
        style={{
          width: BG_SIZE,
          height: BG_SIZE,
          left: "50%",
          top: "50%",
          willChange: "transform",
          zIndex: 1,
        }}
      >
        {/* Deep-sea horizontal wave bands */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(255,255,255,0.8) 39px, transparent 40px)",
            animation: "deepWave 8s ease-in-out infinite",
          }}
        />
        {/* Subtle cross-hatch for depth */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.6) 80px)",
          }}
        />
      </div>

      {/* ── PARALLAX LAYER 2: Mechanical Debris (0.65× speed) ── */}
      <div
        ref={paralaxMidRef}
        className="absolute pointer-events-none"
        style={{
          width: MID_SIZE,
          height: MID_SIZE,
          left: "50%",
          top: "50%",
          willChange: "transform",
          zIndex: 2,
        }}
      >
        {mechDebris.map((item, i) => (
          <div
            key={`debris-${i}`}
            className="absolute select-none"
            style={{
              left: item.x + MID_SIZE / 2,
              top: item.y + MID_SIZE / 2,
              fontSize: item.size,
              opacity: item.opacity,
              transform: "translate(-50%, -50%)",
              animation: `${item.anim} ${18 + (i % 7) * 4}s linear infinite`,
              animationDelay: `${item.delay}s`,
              filter: "grayscale(40%) brightness(1.4)",
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* ── World container — positioned via ref from game loop (no React re-render) ── */}
      <div
        ref={worldRef}
        className="absolute"
        style={{
          width: WORLD_SIZE,
          height: WORLD_SIZE,
          left: "50%",
          top: "50%",
          willChange: "transform",
          transform: "translate3d(0,0,0)",
          zIndex: 3,
        }}
      >
        {/* Biome patches */}
        <div className="absolute rounded-[50%]" style={{ left: HALF - 648, top: HALF - 540, width: 500, height: 360, background: "radial-gradient(ellipse, rgba(126,200,80,0.5) 0%, rgba(95,166,54,0.3) 50%, transparent 80%)" }} />
        <div className="absolute rounded-[50%]" style={{ left: HALF + 252, top: HALF - 432, width: 580, height: 400, background: "radial-gradient(ellipse, rgba(242,217,138,0.45) 0%, rgba(212,184,90,0.25) 50%, transparent 80%)" }} />
        <div className="absolute rounded-[50%]" style={{ left: HALF - 684, top: HALF + 144, width: 470, height: 360, background: "radial-gradient(ellipse, rgba(255,107,157,0.4) 0%, rgba(232,85,119,0.2) 50%, transparent 80%)" }} />
        <div className="absolute rounded-[50%]" style={{ left: HALF + 144, top: HALF + 180, width: 580, height: 470, background: "radial-gradient(ellipse, rgba(192,132,252,0.35) 0%, rgba(168,85,247,0.2) 50%, transparent 80%)" }} />
        <div className="absolute rounded-full" style={{ left: HALF - 130, top: HALF - 130, width: 260, height: 260, background: "radial-gradient(circle, rgba(245,230,192,0.45) 0%, transparent 70%)" }} />

        {/* Wave dot texture */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

        {/* Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${WORLD_SIZE} ${WORLD_SIZE}`}>
          {pathLines.map((line, i) => (
            <g key={i}>
              <line x1={line.x1 + HALF} y1={line.y1 + HALF + 3} x2={line.x2 + HALF} y2={line.y2 + HALF + 3} stroke="rgba(0,0,0,0.12)" strokeWidth="16" strokeLinecap="round" />
              <line x1={line.x1 + HALF} y1={line.y1 + HALF} x2={line.x2 + HALF} y2={line.y2 + HALF} stroke={line.color} strokeWidth="12" strokeLinecap="round" opacity="0.45" />
              <line x1={line.x1 + HALF} y1={line.y1 + HALF} x2={line.x2 + HALF} y2={line.y2 + HALF} stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 16" />
            </g>
          ))}
        </svg>

        {/* Trees */}
        {decorations.trees.map((t, i) => (
          <div key={`t${i}`} className="absolute select-none pointer-events-none" style={{ left: t.x + HALF, top: t.y + HALF, fontSize: t.size, transform: "translate(-50%, -50%)" }}>{t.emoji}</div>
        ))}

        {/* Flowers */}
        {decorations.flowers.map((f, i) => (
          <div key={`f${i}`} className="absolute select-none pointer-events-none" style={{ left: f.x + HALF, top: f.y + HALF, fontSize: f.size, transform: "translate(-50%, -50%)" }}>{f.emoji}</div>
        ))}

        {/* Rocks */}
        {decorations.rocks.map((r, i) => (
          <div key={`r${i}`} className="absolute select-none pointer-events-none" style={{ left: r.x + HALF, top: r.y + HALF, width: r.size, height: r.size * 0.65, borderRadius: "35% 40% 45% 30%", background: r.color, boxShadow: "1px 2px 4px rgba(0,0,0,0.15)" }} />
        ))}

        {/* ── Mechanical Fish — gear bodies with fin decorations ── */}
        {mechFish.map((f, i) => (
          <div
            key={`fish-${i}`}
            className="absolute pointer-events-none select-none"
            style={{
              left: f.x + HALF,
              top: f.y + HALF,
              transform: `translate(-50%, -50%) scale(${f.scale})`,
              animation: `fishSwim ${f.speed}s linear infinite`,
              animationDelay: `${f.delay}s`,
              zIndex: 12,
            }}
          >
            <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
              {/* Gear body — blue-tinted to look aquatic */}
              <span style={{ fontSize: 14, filter: "hue-rotate(160deg) brightness(1.15)" }}>⚙️</span>
              {/* Tail fin */}
              <div style={{
                width: 0, height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: `9px solid ${f.color}`,
                marginLeft: 1,
              }} />
              {/* Dorsal fin */}
              <div style={{
                position: "absolute",
                top: -7,
                left: "30%",
                width: 0, height: 0,
                borderLeft: "3px solid transparent",
                borderRight: "3px solid transparent",
                borderBottom: `7px solid ${f.color}`,
              }} />
              {/* Pectoral fin (side) */}
              <div style={{
                position: "absolute",
                bottom: -5,
                left: "45%",
                width: 0, height: 0,
                borderTop: "4px solid transparent",
                borderRight: "5px solid transparent",
                borderLeft: `5px solid ${f.color}`,
              }} />
            </div>
          </div>
        ))}

        {/* Collectibles — coins & treasure chests */}
        {collectibles.map((item) => {
          if (collectedItems.has(item.id)) return null;
          const isCoin = item.type === "coin";
          return (
            <div
              key={item.id}
              className="absolute pointer-events-none select-none"
              style={{
                left: item.position.x + HALF,
                top: item.position.y + HALF,
                transform: "translate(-50%, -50%)",
                animation: isCoin
                  ? `float ${2.8 + ((item.position.x * 7) % 1.5)}s ease-in-out infinite`
                  : `float ${3.5 + ((item.position.y * 5) % 1.2)}s ease-in-out infinite`,
                zIndex: 15,
              }}
            >
              {isCoin ? (
                <div className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: "radial-gradient(circle at 35% 35%, #ffd700, #c8860a)", boxShadow: "0 0 8px rgba(255,215,0,0.7), 0 2px 4px rgba(0,0,0,0.3)", border: "2px solid rgba(255,255,255,0.4)" }}>
                  <span className="text-[9px] font-black text-yellow-900 leading-none">$</span>
                </div>
              ) : (
                <div className="w-10 h-8 rounded-lg flex items-center justify-center shadow-xl"
                  style={{ background: "linear-gradient(145deg, #8B6914, #5c440d)", boxShadow: "0 0 14px rgba(255,200,50,0.8), 0 3px 6px rgba(0,0,0,0.4)", border: "2px solid rgba(255,215,0,0.5)" }}>
                  <span className="text-lg">💎</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Clouds */}
        {clouds.map((c, i) => (
          <div key={`c${i}`} className="absolute pointer-events-none select-none" style={{ left: c.x + HALF, top: c.y + HALF, width: c.size, height: c.size * 0.45, opacity: c.opacity, animation: `cloudDrift ${22 + (i % 4) * 4}s linear infinite`, animationDelay: `${c.delay}s`, zIndex: 25 }}>
            <div className="relative w-full h-full">
              <div className="absolute rounded-full bg-white/80" style={{ left: '10%', top: '30%', width: '45%', height: '70%' }} />
              <div className="absolute rounded-full bg-white/90" style={{ left: '30%', top: '10%', width: '50%', height: '80%' }} />
              <div className="absolute rounded-full bg-white/75" style={{ left: '55%', top: '25%', width: '35%', height: '60%' }} />
            </div>
          </div>
        ))}

        {/* Boundary fog */}
        {edgeFog.map((ec, i) => (
          <div key={`ec${i}`} className="absolute pointer-events-none rounded-full" style={{ left: ec.x + HALF - ec.size / 2, top: ec.y + HALF - ec.size / 2, width: ec.size, height: ec.size * 0.6, background: "radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 50%, transparent 70%)", zIndex: 26 }} />
        ))}

        {/* ── FOG OF WAR ZONES ── */}
        {fogZones.map((zone, i) => (
          <div
            key={`fog-${i}`}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: zone.x + HALF - zone.size / 2,
              top: zone.y + HALF - zone.size / 2,
              width: zone.size,
              height: zone.size,
              background: "radial-gradient(ellipse, rgba(220,235,255,0.88) 0%, rgba(200,220,255,0.65) 40%, rgba(170,200,240,0.3) 70%, transparent 100%)",
              transition: "opacity 1.8s ease-out",
              opacity: fogRevealedZones.has(i) ? 0 : 0.92,
              zIndex: 24,
            }}
          />
        ))}

        {/* Spawn port */}
        <div className="absolute flex flex-col items-center" style={{ left: HALF, top: HALF, transform: "translate(-50%, -50%)", zIndex: 10 }}>
          <div className="w-28 h-28 rounded-full flex items-center justify-center" style={{ background: "radial-gradient(circle, #f5e6c0 0%, #e0cc8a 50%, #c9b06a 80%, transparent 100%)", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
            <div className="w-18 h-18 rounded-full bg-white/40 flex items-center justify-center border-2 border-white/30">
              <span className="text-3xl">🏠</span>
            </div>
          </div>
          <span className="mt-2 text-white text-[11px] font-label uppercase tracking-widest font-bold drop-shadow-lg bg-black/25 px-3 py-1 rounded-full">Polytechnique Port</span>
        </div>

        {/* Islands */}
        {missions.map((mission, index) => (
          <div key={mission.id} style={{ position: "absolute", left: HALF, top: HALF }}>
            <Island
              mission={mission}
              isNearby={nearbyIsland?.id === mission.id}
              isVisited={visitedIds.has(mission.id)}
              index={index}
              onClick={() => onIslandClick(mission)}
            />
          </div>
        ))}

        {/* Sector labels */}
        <SectorLabel label="Internship Shores" x={-468} y={-374} color="#e65100" emoji="⚡" />
        <SectorLabel label="Aero Atoll" x={504} y={-288} color="#b8860b" emoji="🚀" />
        <SectorLabel label="Robotics & IoT" x={-432} y={360} color="#c62828" emoji="🤖" />
        <SectorLabel label="Code Cove" x={360} y={432} color="#6a1b9a" emoji="💻" />

        {/* ── Explosive Barrels ── */}
        {barrels.map((b) => {
          const gone = explodedBarrels.has(b.id);
          return (
            <div
              key={b.id}
              className="absolute pointer-events-none select-none"
              style={{
                left: b.position.x + HALF,
                top: b.position.y + HALF,
                transform: "translate(-50%,-50%)",
                zIndex: 18,
              }}
            >
              <AnimatePresence>
                {!gone && (
                  <motion.span
                    key="barrel"
                    style={{
                      fontSize: 22,
                      display: "block",
                      filter: "drop-shadow(0 0 7px #f59e0b) drop-shadow(0 0 3px #ea580c)",
                    }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🛢️
                  </motion.span>
                )}
                {gone && (
                  <motion.div
                    key="explosion"
                    initial={{ scale: 0.3, opacity: 1 }}
                    animate={{ scale: 3.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    style={{
                      fontSize: 28,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      pointerEvents: "none",
                    }}
                  >
                    💥
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* ── Enemy Ships (Goblin Pirates) ── */}
        {hudEnemies.map((e) => (
          <div
            key={e.id}
            className="absolute pointer-events-none select-none"
            style={{
              left: HALF,
              top: HALF,
              transform: `translate(calc(${e.x}px - 50%), calc(${e.y}px - 50%))`,
              willChange: "transform",
              zIndex: 20,
              transition: "transform 0.18s linear",
            }}
          >
            <div style={{ transform: `rotate(${e.heading}deg)`, transition: "transform 0.18s linear" }}>
              <span
                style={{
                  fontSize: 22,
                  display: "block",
                  filter: e.state === "chase"
                    ? "drop-shadow(0 0 10px #ef4444) saturate(200%)"
                    : "drop-shadow(0 0 5px #f97316) saturate(120%)",
                  animation: e.state === "chase" ? "enemyChaseWobble 0.4s ease-in-out infinite" : undefined,
                }}
              >
                🏴‍☠️
              </span>
            </div>
            {e.state === "chase" && (
              <div
                style={{
                  position: "absolute",
                  top: -17,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 9,
                  color: "#ef4444",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  whiteSpace: "nowrap",
                  textShadow: "0 0 4px #ef4444",
                }}
              >
                ⚠️ CHASE
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default GameWorld;

function SectorLabel({ label, x, y, color, emoji }: { label: string; x: number; y: number; color: string; emoji: string }) {
  return (
    <div className="absolute font-headline flex flex-col items-center gap-1 select-none pointer-events-none" style={{ left: x + WORLD_SIZE / 2, top: y + WORLD_SIZE / 2, transform: "translate(-50%, -50%)" }}>
      <span className="text-4xl" style={{ opacity: 0.25 }}>{emoji}</span>
      <span className="text-2xl font-black uppercase tracking-[0.25em]" style={{ color, opacity: 0.15, textShadow: `0 0 20px ${color}` }}>{label}</span>
    </div>
  );
}
