"use client";

import React, { useMemo } from "react";
import { missions, collectibles, Mission } from "@/data/missions";
import Island from "./Island";

interface GameWorldProps {
  worldRef: React.RefObject<HTMLDivElement | null>;
  nearbyIsland: Mission | null;
  visitedIds: Set<string>;
  collectedItems: Set<string>;
  onIslandClick: (mission: Mission) => void;
}

const WORLD_SIZE = 4000;
const HALF = WORLD_SIZE / 2;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* Memoize the entire GameWorld — only re-renders when nearbyIsland, visitedIds, or collectedItems change */
const GameWorld = React.memo(function GameWorld({
  worldRef,
  nearbyIsland,
  visitedIds,
  collectedItems,
  onIslandClick,
}: GameWorldProps) {

  const decorations = useMemo(() => {
    const rng = seededRandom(42);
    const trees: { x: number; y: number; emoji: string; size: number }[] = [];
    const treeEmojis = ['🌲', '🌳', '🌴', '🌿'];
    for (let i = 0; i < 50; i++) {
      trees.push({
        x: (rng() - 0.5) * 3200, y: (rng() - 0.5) * 3200,
        emoji: treeEmojis[Math.floor(rng() * treeEmojis.length)],
        size: 16 + rng() * 14,
      });
    }
    const flowers: { x: number; y: number; emoji: string; size: number }[] = [];
    const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌼'];
    for (let i = 0; i < 20; i++) {
      flowers.push({
        x: (rng() - 0.5) * 3000, y: (rng() - 0.5) * 3000,
        emoji: flowerEmojis[Math.floor(rng() * flowerEmojis.length)],
        size: 10 + rng() * 8,
      });
    }
    const rocks: { x: number; y: number; size: number; color: string }[] = [];
    for (let i = 0; i < 15; i++) {
      const shade = 140 + rng() * 60;
      rocks.push({
        x: (rng() - 0.5) * 3200, y: (rng() - 0.5) * 3200,
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
        x: (rng() - 0.5) * 3600, y: (rng() - 0.5) * 3600,
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
      if (side === 0) { x = -1500 + rng() * 3000; y = -1600; }
      else if (side === 1) { x = -1500 + rng() * 3000; y = 1600; }
      else if (side === 2) { x = -1600; y = -1500 + rng() * 3000; }
      else { x = 1600; y = -1500 + rng() * 3000; }
      items.push({ x, y, size: 120 + rng() * 100 });
    }
    return items;
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #4ac6d8 0%, #35a8be 30%, #2890a8 60%, #1a7a94 100%)" }}
    >
      {/* World container — positioned via ref from game loop (no React re-render) */}
      <div
        ref={worldRef}
        className="absolute"
        style={{
          width: WORLD_SIZE, height: WORLD_SIZE,
          left: "50%", top: "50%",
          willChange: "transform",
        }}
      >
        {/* Biome patches */}
        <div className="absolute rounded-[50%]" style={{ left: HALF - 900, top: HALF - 750, width: 700, height: 500, background: "radial-gradient(ellipse, rgba(126,200,80,0.5) 0%, rgba(95,166,54,0.3) 50%, transparent 80%)" }} />
        <div className="absolute rounded-[50%]" style={{ left: HALF + 350, top: HALF - 600, width: 800, height: 550, background: "radial-gradient(ellipse, rgba(242,217,138,0.45) 0%, rgba(212,184,90,0.25) 50%, transparent 80%)" }} />
        <div className="absolute rounded-[50%]" style={{ left: HALF - 950, top: HALF + 200, width: 650, height: 500, background: "radial-gradient(ellipse, rgba(255,107,157,0.4) 0%, rgba(232,85,119,0.2) 50%, transparent 80%)" }} />
        <div className="absolute rounded-[50%]" style={{ left: HALF + 200, top: HALF + 250, width: 800, height: 650, background: "radial-gradient(ellipse, rgba(192,132,252,0.35) 0%, rgba(168,85,247,0.2) 50%, transparent 80%)" }} />
        <div className="absolute rounded-full" style={{ left: HALF - 180, top: HALF - 180, width: 360, height: 360, background: "radial-gradient(circle, rgba(245,230,192,0.45) 0%, transparent 70%)" }} />

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
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, #ffd700, #c8860a)",
                    boxShadow: "0 0 8px rgba(255,215,0,0.7), 0 2px 4px rgba(0,0,0,0.3)",
                    border: "2px solid rgba(255,255,255,0.4)",
                  }}
                >
                  <span className="text-[9px] font-black text-yellow-900 leading-none">$</span>
                </div>
              ) : (
                <div
                  className="w-10 h-8 rounded-lg flex items-center justify-center shadow-xl"
                  style={{
                    background: "linear-gradient(145deg, #8B6914, #5c440d)",
                    boxShadow: "0 0 14px rgba(255,200,50,0.8), 0 3px 6px rgba(0,0,0,0.4)",
                    border: "2px solid rgba(255,215,0,0.5)",
                  }}
                >
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
            <Island mission={mission} isNearby={nearbyIsland?.id === mission.id} isVisited={visitedIds.has(mission.id)} index={index} onClick={() => onIslandClick(mission)} />
          </div>
        ))}

        {/* Sector labels */}
        <SectorLabel label="Internship Shores" x={-650} y={-520} color="#e65100" emoji="⚡" />
        <SectorLabel label="Aero Atoll" x={700} y={-400} color="#b8860b" emoji="🚀" />
        <SectorLabel label="Medi-Bay" x={-600} y={500} color="#c62828" emoji="🏥" />
        <SectorLabel label="Code Cove" x={500} y={600} color="#6a1b9a" emoji="💻" />
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
