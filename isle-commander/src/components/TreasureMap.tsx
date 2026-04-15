"use client";

import React, { useState } from "react";
import { missions, sectorInfo, Mission, WORLD_BOUNDS } from "@/data/missions";

interface TreasureMapProps {
  isOpen: boolean;
  onClose: () => void;
  visitedIds: Set<string>;
  onNavigate: (mission: Mission) => void;
}

const TreasureMap = React.memo(function TreasureMap({ isOpen, onClose, visitedIds, onNavigate }: TreasureMapProps) {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalActive = missions.filter((m) => m.status === "active").length;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Map card */}
      <div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl"
        style={{
          background: "linear-gradient(145deg, #f5e6c0, #e8d4a0)",
          border: "4px solid #a08050",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Parchment texture overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, #8B6914 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }} />

        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b-2 border-[#a08050]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🗺️</span>
              <div>
                <h2 className="text-2xl font-headline font-black text-[#4a3520] tracking-tight">
                  Captain&apos;s Treasure Map
                </h2>
                <p className="text-[11px] font-label uppercase tracking-widest text-[#8a6e40] font-bold">
                  ⭐ {visitedIds.size}/{totalActive} locations discovered
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#a08050]/20 hover:bg-[#a08050]/40 flex items-center justify-center text-[#4a3520] font-bold text-lg transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Legend hint */}
          <div className="mt-3 flex items-center gap-4 text-[10px] font-label text-[#8a6e40] uppercase tracking-wider">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#e65100] inline-block" /> Internships</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#b8860b] inline-block" /> Mech/Aero</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#c62828] inline-block" /> Health Tech</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#6a1b9a] inline-block" /> Software/AI</span>
          </div>
        </div>

        {/* Map overview */}
        <div className="relative mx-6 my-4 rounded-2xl overflow-hidden border-2 border-[#a08050]/30" style={{ background: "linear-gradient(135deg, #3db8d4, #2890a8)" }}>
          <div className="relative" style={{ paddingBottom: "65%" }}>
            {/* Territory zones */}
            {/* NW - Internship Shores */}
            <div
              className="absolute rounded-full transition-opacity duration-200"
              style={{
                left: "8%", top: "5%", width: "38%", height: "45%",
                background: "radial-gradient(ellipse, rgba(230,81,0,0.25) 0%, transparent 70%)",
                opacity: hoveredSector === "Internship Shores" ? 1 : 0.6,
              }}
            />
            {/* NE - Aero Atoll */}
            <div
              className="absolute rounded-full transition-opacity duration-200"
              style={{
                left: "50%", top: "0%", width: "48%", height: "55%",
                background: "radial-gradient(ellipse, rgba(184,134,11,0.25) 0%, transparent 70%)",
                opacity: hoveredSector === "Aero Atoll" ? 1 : 0.6,
              }}
            />
            {/* SW - Medi-Bay */}
            <div
              className="absolute rounded-full transition-opacity duration-200"
              style={{
                left: "5%", top: "45%", width: "40%", height: "50%",
                background: "radial-gradient(ellipse, rgba(198,40,40,0.25) 0%, transparent 70%)",
                opacity: hoveredSector === "Medi-Bay" ? 1 : 0.6,
              }}
            />
            {/* SE - Code Cove */}
            <div
              className="absolute rounded-full transition-opacity duration-200"
              style={{
                left: "45%", top: "40%", width: "52%", height: "58%",
                background: "radial-gradient(ellipse, rgba(106,27,154,0.25) 0%, transparent 70%)",
                opacity: hoveredSector === "Code Cove" ? 1 : 0.6,
              }}
            />

            {/* Center port */}
            <div className="absolute" style={{ left: "49%", top: "48%", transform: "translate(-50%,-50%)" }}>
              <div className="w-4 h-4 rounded-full bg-white/50 border border-white/80" />
            </div>

            {/* Island markers */}
            {missions.map((m) => {
              const x = ((m.position.x + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100;
              const y = ((m.position.y + WORLD_BOUNDS) / (WORLD_BOUNDS * 2)) * 100;
              const isVisited = visitedIds.has(m.id);
              const isLocked = m.status === "locked";
              return (
                <button
                  key={m.id}
                  className="absolute flex flex-col items-center cursor-pointer group"
                  style={{
                    left: `${x}%`, top: `${y}%`,
                    transform: "translate(-50%,-50%)",
                  }}
                  onClick={() => { onNavigate(m); onClose(); }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border-2 shadow-md transition-transform group-hover:scale-125"
                    style={{
                      background: isLocked ? "#555" : `linear-gradient(135deg, ${m.color}, ${m.color}cc)`,
                      borderColor: isLocked ? "#777" : "rgba(255,255,255,0.5)",
                      opacity: isLocked ? 0.5 : 1,
                    }}
                  >
                    <span className="text-sm">{m.emoji}</span>
                  </div>
                  {isVisited && <span className="text-xs -mt-1">⭐</span>}
                  {isLocked && <span className="text-[7px] text-white/60 font-bold">🔒</span>}
                  <span className="text-[7px] font-label font-bold text-white/90 mt-0.5 whitespace-nowrap drop-shadow-lg">
                    {m.title}
                  </span>
                </button>
              );
            })}

            {/* Compass rose */}
            <div className="absolute top-2 right-3 text-white/40 font-label text-[8px] font-bold text-center">
              <div>N</div>
              <div className="flex gap-2"><span>W</span><span className="text-[10px]">🧭</span><span>E</span></div>
              <div>S</div>
            </div>
          </div>
        </div>

        {/* Territory cards */}
        <div className="px-6 pb-6 space-y-3">
          {sectorInfo.map((sector) => {
            const sectorMissions = missions.filter((m) => m.sector === sector.name);
            const discovered = sectorMissions.filter((m) => visitedIds.has(m.id)).length;
            const total = sectorMissions.filter((m) => m.status === "active").length;
            const isInternship = sector.name === "Internship Shores";

            return (
              <div
                key={sector.name}
                className="rounded-xl p-4 transition-colors border-2 cursor-default"
                style={{
                  background: `${sector.color}0a`,
                  borderColor: `${sector.color}25`,
                }}
                onMouseEnter={() => setHoveredSector(sector.name)}
                onMouseLeave={() => setHoveredSector(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sector.emoji}</span>
                    <div>
                      <h3 className="font-headline font-bold text-[#4a3520] text-sm flex items-center gap-2">
                        {sector.name}
                        {isInternship && (
                          <span className="text-[8px] font-label uppercase tracking-wider bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full border border-orange-200">
                            Work Experience
                          </span>
                        )}
                        {!isInternship && (
                          <span className="text-[8px] font-label uppercase tracking-wider bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">
                            Project
                          </span>
                        )}
                      </h3>
                      <p className="text-[10px] font-label text-[#8a6e40]">
                        {sector.description} · {sector.quadrant}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-headline font-bold" style={{ color: sector.color }}>
                      {discovered}/{total}
                    </div>
                    <div className="text-[8px] font-label text-[#8a6e40] uppercase">Discovered</div>
                  </div>
                </div>

                {/* Mission list */}
                <div className="flex flex-wrap gap-2">
                  {sectorMissions.map((m) => {
                    const visited = visitedIds.has(m.id);
                    const locked = m.status === "locked";
                    return (
                      <button
                        key={m.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-label font-bold transition-all hover:scale-105 cursor-pointer"
                        style={{
                          background: locked ? "#eee" : visited ? `${m.color}15` : "white",
                          color: locked ? "#999" : m.color,
                          border: `1.5px solid ${locked ? "#ddd" : m.color}30`,
                          boxShadow: visited ? `0 2px 8px ${m.color}15` : "none",
                        }}
                        onClick={() => { onNavigate(m); onClose(); }}
                      >
                        <span className="text-sm">{m.emoji}</span>
                        {m.title}
                        {visited && <span className="text-xs">⭐</span>}
                        {locked && <span className="text-[8px]">🔒</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="px-6 pb-5 text-center">
          <span className="text-[10px] font-label text-[#8a6e40]/60 uppercase tracking-widest">
            Press <kbd className="bg-[#a08050]/15 px-1.5 py-0.5 rounded font-bold mx-0.5">M</kbd> or <kbd className="bg-[#a08050]/15 px-1.5 py-0.5 rounded font-bold mx-0.5">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
});

export default TreasureMap;
