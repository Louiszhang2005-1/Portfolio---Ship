"use client";

import React from "react";

interface BoatProps {
  boatHeadingRef: React.RefObject<HTMLDivElement | null>;
  speed: number;
}

/* Memoize — only re-renders when speed crosses the moving threshold */
const Boat = React.memo(function Boat({ boatHeadingRef, speed }: BoatProps) {
  const isMoving = speed > 0.4;

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
      {/* Wake trail */}
      {isMoving && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -z-10 rounded-full opacity-30"
          style={{
            width: 70,
            height: 30,
            background: "radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Boat body with bob */}
      <div className="relative flex flex-col items-center" style={{ animation: "float 2.5s ease-in-out infinite" }}>
        {/* Steam puffs */}
        {isMoving && (
          <>
            <div className="absolute -top-6 rounded-full bg-white/50"
              style={{ left: "calc(50% - 8px)", width: 8, height: 8, animation: "bubbleRise 1.2s ease-out infinite" }}
            />
            <div className="absolute -top-6 rounded-full bg-white/50"
              style={{ left: "calc(50% + 4px)", width: 8, height: 8, animation: "bubbleRise 1.2s ease-out infinite 0.6s" }}
            />
          </>
        )}

        {/* Ship — heading rotation controlled via ref by game loop */}
        <div
          ref={boatHeadingRef}
          className="relative w-28 h-28 flex items-center justify-center"
          style={{ willChange: "transform" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-24 relative">
              <div className="absolute inset-0 rounded-t-2xl rounded-b-[40%]"
                style={{ background: "linear-gradient(180deg, #00838f 0%, #006064 60%, #004d40 100%)", boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)" }}
              />
              <div className="absolute top-3 left-2 right-2 h-3 rounded-sm" style={{ background: "#ffab40" }} />
              <div className="absolute top-7 left-4 right-4 h-6 rounded-sm" style={{ background: "linear-gradient(180deg, #fff3e0, #ffe0b2)", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                <div className="flex justify-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-sm bg-cyan-400 shadow-inner" />
                  <div className="w-2 h-2 rounded-sm bg-cyan-400 shadow-inner" />
                </div>
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-5 rounded-t-sm" style={{ background: "linear-gradient(180deg, #d32f2f, #b71c1c)" }}>
                <div className="absolute -top-1 left-0 right-0 h-1 bg-yellow-400 rounded-t-sm" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-8 rounded-full opacity-40"
            style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)" }}
          />
        </div>

        {/* Flag */}
        <div className="absolute -top-4 -right-1 w-8 h-5 rounded-sm shadow-sm flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #e53935, #c62828)", borderLeft: "2px solid #fff" }}
        >
          <div className="text-[5px] text-white font-bold leading-none text-center select-none">POLY<br/>MTL</div>
        </div>
      </div>

      {/* WASD hint */}
      {!isMoving && (
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap animate-pulse">
          <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-4 py-2 rounded-full font-label tracking-widest uppercase flex items-center gap-2">
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px]">W/S</span> Throttle
            <span className="text-white/30">·</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px]">A/D</span> Steer
          </div>
        </div>
      )}
    </div>
  );
});

export default Boat;
