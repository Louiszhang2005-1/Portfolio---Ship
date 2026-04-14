"use client";

import { useMemo } from "react";
import { missions } from "@/data/missions";
import Island from "./Island";
import { Mission } from "@/data/missions";

interface GameWorldProps {
  cameraOffset: { x: number; y: number };
  nearbyIsland: Mission | null;
  visitedIds: Set<string>;
  onIslandClick: (mission: Mission) => void;
}

/* World dimensions */
const WORLD_SIZE = 4000;

export default function GameWorld({
  cameraOffset,
  nearbyIsland,
  visitedIds,
  onIslandClick,
}: GameWorldProps) {
  /* Generate decorative wave dots */
  const waveElements = useMemo(() => {
    const elements: { x: number; y: number; size: number; delay: number }[] = [];
    for (let i = 0; i < 60; i++) {
      elements.push({
        x: Math.random() * WORLD_SIZE - WORLD_SIZE / 2,
        y: Math.random() * WORLD_SIZE - WORLD_SIZE / 2,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 5,
      });
    }
    return elements;
  }, []);

  /* Generate sector path connections (SVG) */
  const pathLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];

    // Connect islands within sectors
    const sectorGroups: Record<string, Mission[]> = {};
    missions.forEach((m) => {
      if (!sectorGroups[m.sector]) sectorGroups[m.sector] = [];
      sectorGroups[m.sector].push(m);
    });

    Object.values(sectorGroups).forEach((group) => {
      for (let i = 0; i < group.length - 1; i++) {
        lines.push({
          x1: group[i].position.x,
          y1: group[i].position.y,
          x2: group[i + 1].position.x,
          y2: group[i + 1].position.y,
          color: group[i].sectorColor,
        });
      }
    });

    // Connect spawn (0,0) to first island of each sector
    Object.values(sectorGroups).forEach((group) => {
      lines.push({
        x1: 0,
        y1: 0,
        x2: group[0].position.x,
        y2: group[0].position.y,
        color: group[0].sectorColor,
      });
    });

    return lines;
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #00919e 0%, #006570 30%, #003d45 70%, #001f25 100%)",
      }}
    >
      {/* World container — moves opposite to camera */}
      <div
        className="absolute transition-none"
        style={{
          width: WORLD_SIZE,
          height: WORLD_SIZE,
          left: `calc(50% - ${cameraOffset.x}px - ${WORLD_SIZE / 2}px)`,
          top: `calc(50% - ${cameraOffset.y}px - ${WORLD_SIZE / 2}px)`,
        }}
      >
        {/* Ocean foam texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Animated wave dots */}
        {waveElements.map((w, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 animate-pulse"
            style={{
              left: w.x + WORLD_SIZE / 2,
              top: w.y + WORLD_SIZE / 2,
              width: w.size,
              height: w.size,
              animationDelay: `${w.delay}s`,
              animationDuration: "3s",
            }}
          />
        ))}

        {/* Dotted path lines (SVG overlay) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${WORLD_SIZE} ${WORLD_SIZE}`}
        >
          {pathLines.map((line, i) => (
            <line
              key={i}
              x1={line.x1 + WORLD_SIZE / 2}
              y1={line.y1 + WORLD_SIZE / 2}
              x2={line.x2 + WORLD_SIZE / 2}
              y2={line.y2 + WORLD_SIZE / 2}
              stroke={line.color}
              strokeWidth="4"
              strokeDasharray="16 12"
              strokeLinecap="round"
              opacity="0.35"
            />
          ))}
        </svg>

        {/* Spawn port marker (center) */}
        <div
          className="absolute flex flex-col items-center"
          style={{
            left: WORLD_SIZE / 2,
            top: WORLD_SIZE / 2,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-24 h-24 rounded-full border-4 border-dashed border-white/30 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <span className="text-2xl">🏠</span>
            </div>
          </div>
          <span className="mt-2 text-white/50 text-[10px] font-label uppercase tracking-widest font-bold">
            Polytechnique Port
          </span>
        </div>

        {/* Island nodes */}
        {missions.map((mission, index) => (
          <div
            key={mission.id}
            style={{
              position: "absolute",
              left: WORLD_SIZE / 2,
              top: WORLD_SIZE / 2,
            }}
          >
            <Island
              mission={mission}
              isNearby={nearbyIsland?.id === mission.id}
              isVisited={visitedIds.has(mission.id)}
              index={index}
              onClick={() => onIslandClick(mission)}
            />
          </div>
        ))}

        {/* Sector labels (large, faded, positioned at sector centers) */}
        <SectorLabel label="Internship Harbor" x={-700} y={-550} color="#cc0000" />
        <SectorLabel label="Aero Archipelago" x={650} y={-420} color="#b8860b" />
        <SectorLabel label="Robotics Reef" x={-625} y={475} color="#c62828" />
        <SectorLabel label="Digital Delta" x={500} y={550} color="#6a1b9a" />
      </div>
    </div>
  );
}

function SectorLabel({ label, x, y, color }: { label: string; x: number; y: number; color: string }) {
  return (
    <div
      className="absolute font-headline text-3xl font-black uppercase tracking-[0.3em] select-none pointer-events-none"
      style={{
        left: x + 2000,
        top: y + 2000,
        transform: "translate(-50%, -50%)",
        color,
        opacity: 0.08,
        textShadow: `0 0 40px ${color}`,
      }}
    >
      {label}
    </div>
  );
}
