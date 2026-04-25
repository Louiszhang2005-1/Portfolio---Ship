"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { missions, collectibles, Mission, fogZones } from "@/data/missions";
import Island from "./Island";

interface GameWorldProps {
  worldRef: React.RefObject<HTMLDivElement | null>;
  paralaxBgRef: React.RefObject<HTMLDivElement | null>;
  paralaxMidRef: React.RefObject<HTMLDivElement | null>;
  paralaxFgRef: React.RefObject<HTMLDivElement | null>;
  nearbyIsland: Mission | null;
  visitedIds: Set<string>;
  collectedItems: Set<string>;
  fogRevealedZones: Set<number>;
  onIslandClick: (mission: Mission) => void;
}

const WORLD_SIZE = 5000;
const HALF = WORLD_SIZE / 2;
const BG_SIZE = 12000;
const MID_SIZE = 10000;
const FG_SIZE = 7000;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const GameWorld = React.memo(function GameWorld({
  worldRef,
  paralaxBgRef,
  paralaxMidRef,
  paralaxFgRef,
  nearbyIsland,
  visitedIds,
  collectedItems,
  fogRevealedZones,
  onIslandClick,
}: GameWorldProps) {

  const decorations = useMemo(() => {
    const rng = seededRandom(42);
    const trees: { x: number; y: number; emoji: string; size: number }[] = [];
    const treeEmojis = ['🌲', '🌳', '🌴', '🌿'];
    for (let i = 0; i < 80; i++) {
      trees.push({
        x: (rng() - 0.5) * 4200, y: (rng() - 0.5) * 4200,
        emoji: treeEmojis[Math.floor(rng() * treeEmojis.length)],
        size: 16 + rng() * 14,
      });
    }
    const flowers: { x: number; y: number; emoji: string; size: number }[] = [];
    const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌼'];
    for (let i = 0; i < 30; i++) {
      flowers.push({
        x: (rng() - 0.5) * 3800, y: (rng() - 0.5) * 3800,
        emoji: flowerEmojis[Math.floor(rng() * flowerEmojis.length)],
        size: 10 + rng() * 8,
      });
    }
    const rocks: { x: number; y: number; size: number; color: string }[] = [];
    for (let i = 0; i < 15; i++) {
      const shade = 140 + rng() * 60;
      rocks.push({
        x: (rng() - 0.5) * 4200, y: (rng() - 0.5) * 4200,
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
        x: (rng() - 0.5) * 4500, y: (rng() - 0.5) * 4500,
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

  // Foreground hazard debris (1.2x speed layer)
  const fgDebris = useMemo(() => {
    const rng = seededRandom(666);
    const items: { x: number; y: number; size: number; emoji: string; delay: number; opacity: number }[] = [];
    const hazardEmojis = ['🔥', '💨', '⚡', '🌡️', '💧'];
    for (let i = 0; i < 20; i++) {
      items.push({
        x: (rng() - 0.5) * (FG_SIZE - 200),
        y: (rng() - 0.5) * (FG_SIZE - 200),
        size: 12 + rng() * 14,
        emoji: hazardEmojis[Math.floor(rng() * hazardEmojis.length)],
        delay: rng() * 10,
        opacity: 0.12 + rng() * 0.15,
      });
    }
    return items;
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #3db8d4 0%, #2a9ab8 20%, #1a7a94 45%, #0d4a5c 75%, #0a3040 100%)" }}
    >
      {/* ── PARALLAX LAYER 1: Starfield Background (0.5× speed) ── */}
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
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(255,255,255,0.8) 39px, transparent 40px)",
            animation: "deepWave 8s ease-in-out infinite",
          }}
        />
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

      {/* ── PARALLAX LAYER 3: Foreground Hazard Debris (1.2× speed) ── */}
      <div
        ref={paralaxFgRef}
        className="absolute pointer-events-none"
        style={{
          width: FG_SIZE,
          height: FG_SIZE,
          left: "50%",
          top: "50%",
          willChange: "transform",
          zIndex: 5,
        }}
      >
        {fgDebris.map((item, i) => (
          <div
            key={`fg-${i}`}
            className="absolute select-none"
            style={{
              left: item.x + FG_SIZE / 2,
              top: item.y + FG_SIZE / 2,
              fontSize: item.size,
              opacity: item.opacity,
              transform: "translate(-50%, -50%)",
              animation: `mechDrift${(i % 3) + 1} ${15 + (i % 5) * 3}s linear infinite`,
              animationDelay: `${item.delay}s`,
              filter: "blur(1px)",
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* ── World container ── */}
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
        {/* Biome patches — darker, more industrial */}
        <div className="absolute rounded-[50%]" style={{ left: HALF - 1200, top: HALF - 1100, width: 700, height: 500, background: "radial-gradient(ellipse, rgba(0,100,120,0.25) 0%, rgba(0,80,100,0.12) 50%, transparent 80%)" }} />
        <div className="absolute rounded-[50%]" style={{ left: HALF + 500, top: HALF - 1100, width: 800, height: 600, background: "radial-gradient(ellipse, rgba(184,134,11,0.18) 0%, rgba(140,100,0,0.08) 50%, transparent 80%)" }} />
        <div className="absolute rounded-[50%]" style={{ left: HALF - 1200, top: HALF + 200, width: 650, height: 500, background: "radial-gradient(ellipse, rgba(198,40,40,0.18) 0%, rgba(150,30,30,0.08) 50%, transparent 80%)" }} />
        <div className="absolute rounded-[50%]" style={{ left: HALF + 200, top: HALF + 300, width: 800, height: 650, background: "radial-gradient(ellipse, rgba(106,27,154,0.18) 0%, rgba(80,20,120,0.08) 50%, transparent 80%)" }} />
        <div className="absolute rounded-full" style={{ left: HALF - 150, top: HALF - 150, width: 300, height: 300, background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)" }} />

        {/* Grid dot texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,200,255,0.6) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${WORLD_SIZE} ${WORLD_SIZE}`}>
          {pathLines.map((line, i) => (
            <g key={i}>
              <line x1={line.x1 + HALF} y1={line.y1 + HALF + 3} x2={line.x2 + HALF} y2={line.y2 + HALF + 3} stroke="rgba(0,0,0,0.12)" strokeWidth="16" strokeLinecap="round" />
              <line x1={line.x1 + HALF} y1={line.y1 + HALF} x2={line.x2 + HALF} y2={line.y2 + HALF} stroke={line.color} strokeWidth="12" strokeLinecap="round" opacity="0.3" />
              <line x1={line.x1 + HALF} y1={line.y1 + HALF} x2={line.x2 + HALF} y2={line.y2 + HALF} stroke="rgba(0,200,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 16" />
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

        {/* Mechanical Fish */}
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
              <span style={{ fontSize: 14, filter: "hue-rotate(160deg) brightness(1.15)" }}>⚙️</span>
              <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: `9px solid ${f.color}`, marginLeft: 1 }} />
            </div>
          </div>
        ))}

        {/* Collectibles */}
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
          <div key={`c${i}`} className="absolute pointer-events-none select-none" style={{ left: c.x + HALF, top: c.y + HALF, width: c.size, height: c.size * 0.45, opacity: c.opacity * 0.6, animation: `cloudDrift ${22 + (i % 4) * 4}s linear infinite`, animationDelay: `${c.delay}s`, zIndex: 25 }}>
            <div className="relative w-full h-full">
              <div className="absolute rounded-full bg-white/40" style={{ left: '10%', top: '30%', width: '45%', height: '70%' }} />
              <div className="absolute rounded-full bg-white/50" style={{ left: '30%', top: '10%', width: '50%', height: '80%' }} />
              <div className="absolute rounded-full bg-white/35" style={{ left: '55%', top: '25%', width: '35%', height: '60%' }} />
            </div>
          </div>
        ))}

        {/* Boundary fog */}
        {edgeFog.map((ec, i) => (
          <div key={`ec${i}`} className="absolute pointer-events-none rounded-full" style={{ left: ec.x + HALF - ec.size / 2, top: ec.y + HALF - ec.size / 2, width: ec.size, height: ec.size * 0.6, background: "radial-gradient(ellipse, rgba(10,22,40,0.7) 0%, rgba(10,22,40,0.2) 50%, transparent 70%)", zIndex: 26 }} />
        ))}

        {/* Fog of war */}
        {fogZones.map((zone, i) => (
          <div
            key={`fog-${i}`}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: zone.x + HALF - zone.size / 2,
              top: zone.y + HALF - zone.size / 2,
              width: zone.size,
              height: zone.size,
              background: "radial-gradient(ellipse, rgba(5,15,30,0.88) 0%, rgba(10,22,40,0.65) 40%, rgba(10,20,35,0.3) 70%, transparent 100%)",
              transition: "opacity 1.8s ease-out",
              opacity: fogRevealedZones.has(i) ? 0 : 0.92,
              zIndex: 24,
            }}
          />
        ))}

        {/* Spawn port — Home Port */}
        <div className="absolute flex flex-col items-center" style={{ left: HALF, top: HALF, transform: "translate(-50%, -50%)", zIndex: 10 }}>
          <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(0,100,140,0.1) 50%, transparent 100%)", boxShadow: "0 0 35px rgba(0,212,255,0.15)" }}>
            <div className="w-18 h-18 rounded-full bg-cyan-400/10 flex items-center justify-center border-2 border-cyan-400/20">
              <span className="text-3xl">🏠</span>
            </div>
          </div>
          <span className="mt-2 text-white text-[11px] font-label uppercase tracking-widest font-bold drop-shadow-lg bg-black/40 px-3 py-1 rounded-full border border-cyan-400/20">Home Port</span>
          <span className="mt-1 text-cyan-300/50 text-[8px] font-label uppercase tracking-wider">Press ENTER to dock</span>
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
        <SectorLabel label="Internship Shores" x={-900} y={-780} color="#e65100" emoji="⚡" />
        <SectorLabel label="Aero Atoll" x={1000} y={-700} color="#b8860b" emoji="🚀" />
        <SectorLabel label="Robotics & IoT" x={-800} y={750} color="#c62828" emoji="🤖" />
        <SectorLabel label="Code Cove" x={750} y={800} color="#6a1b9a" emoji="💻" />
      </div>
    </div>
  );
});

export default GameWorld;

function SectorLabel({ label, x, y, color, emoji }: { label: string; x: number; y: number; color: string; emoji: string }) {
  return (
    <div className="absolute font-headline flex flex-col items-center gap-1 select-none pointer-events-none" style={{ left: x + WORLD_SIZE / 2, top: y + WORLD_SIZE / 2, transform: "translate(-50%, -50%)" }}>
      <span className="text-4xl" style={{ opacity: 0.2 }}>{emoji}</span>
      <span className="text-2xl font-black uppercase tracking-[0.25em]" style={{ color, opacity: 0.12, textShadow: `0 0 20px ${color}` }}>{label}</span>
    </div>
  );
}
