"use client";

import React from "react";
import { motion } from "framer-motion";
import { StressState, FEA_ZONE_COUNT, stressToColor } from "@/systems/StressSystem";

interface ShipRendererProps {
  boatHeadingRef: React.RefObject<HTMLDivElement | null>;
  speed: number;
  boatSquash?: boolean;
  stressState: StressState;
  inHazard?: boolean;
}

const MAX_SPEED = 6;

const Boat = React.memo(function ShipRenderer({
  boatHeadingRef,
  speed,
  boatSquash,
  stressState,
  inHazard,
}: ShipRendererProps) {
  const isMoving = speed > 0.3;
  const throttle = Math.min(1, speed / MAX_SPEED);
  const isHighSpeed = throttle > 0.6;

  const wakeW = 70 + throttle * 60;
  const wakeH = 28 + throttle * 20;

  // Build FEA stress overlay segments
  const feaSegments = [];
  for (let i = 0; i < FEA_ZONE_COUNT; i++) {
    const startAngle = (i / FEA_ZONE_COUNT) * 360;
    const endAngle = ((i + 1) / FEA_ZONE_COUNT) * 360;
    const stress = stressState.zones[i] || 0;
    const color = stressToColor(stress);
    const isImpact = stressState.impactFlash > 0 && stressState.impactZone === i;

    feaSegments.push({
      startAngle,
      endAngle,
      color,
      stress,
      isImpact,
    });
  }

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
      {/* Sea-foam wake */}
      {isMoving && (
        <>
          <div
            className="absolute left-1/2 top-1/2 -z-10 rounded-full"
            style={{
              width: wakeW,
              height: wakeH,
              transform: "translate(-50%, 20%)",
              background: `radial-gradient(ellipse, rgba(255,255,255,${0.25 + throttle * 0.3}) 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -z-10 rounded-full"
            style={{
              width: wakeW * 1.4,
              height: wakeH * 1.3,
              transform: "translate(-50%, 30%)",
              opacity: throttle * 0.45,
              background: "radial-gradient(ellipse, rgba(255,255,255,0.18) 0%, transparent 65%)",
            }}
          />
          {[...Array(isHighSpeed ? 6 : 3)].map((_, fi) => (
            <div
              key={fi}
              className="absolute rounded-full bg-white/60"
              style={{
                width: 4 + fi * 1.5,
                height: 4 + fi * 1.5,
                left: `calc(50% + ${(fi % 2 === 0 ? 1 : -1) * (8 + fi * 5)}px)`,
                top: `calc(50% + ${14 + fi * 8}px)`,
                opacity: 0.5 - fi * 0.06,
                animation: `bubbleRise ${1.5 + fi * 0.4}s ease-out infinite`,
                animationDelay: `${fi * 0.22}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Boat body with squash-and-stretch */}
      <motion.div
        className="relative flex flex-col items-center"
        style={{ animation: "float 2.5s ease-in-out infinite" }}
        animate={
          boatSquash
            ? { scaleX: [1, 1.35, 0.75, 1.1, 1], scaleY: [1, 0.65, 1.25, 0.9, 1] }
            : { scaleX: 1, scaleY: 1 }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Steam puffs */}
        {isMoving && (
          <>
            <div className="absolute -top-6 rounded-full bg-white/50"
              style={{ left: "calc(50% - 10px)", width: 8 + throttle * 4, height: 8 + throttle * 4, animation: "bubbleRise 1.2s ease-out infinite" }}
            />
            <div className="absolute -top-6 rounded-full bg-white/50"
              style={{ left: "calc(50% + 5px)", width: 8 + throttle * 4, height: 8 + throttle * 4, animation: "bubbleRise 1.2s ease-out infinite 0.6s" }}
            />
          </>
        )}

        {/* Ship hull — heading rotation via ref */}
        <div
          ref={boatHeadingRef}
          className="relative w-28 h-28 flex items-center justify-center"
          style={{ willChange: "transform" }}
        >
          {/* FEA Stress Overlay (SVG rings) */}
          <svg
            className="absolute inset-0 pointer-events-none"
            viewBox="-50 -50 100 100"
            width="112"
            height="112"
            style={{ overflow: "visible" }}
          >
            {feaSegments.map((seg, i) => {
              if (seg.stress < 3) return null;
              const r = 32;
              const startRad = ((seg.startAngle - 90) * Math.PI) / 180;
              const endRad = ((seg.endAngle - 90) * Math.PI) / 180;
              const x1 = Math.cos(startRad) * r;
              const y1 = Math.sin(startRad) * r;
              const x2 = Math.cos(endRad) * r;
              const y2 = Math.sin(endRad) * r;
              const largeArc = seg.endAngle - seg.startAngle > 180 ? 1 : 0;

              return (
                <path
                  key={i}
                  d={`M0,0 L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`}
                  fill={seg.color}
                  style={{
                    animation: seg.isImpact ? "stressGlow 0.3s ease-in-out infinite" : undefined,
                  }}
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-24 relative">
              {/* Hull */}
              <div
                className="absolute inset-0 rounded-t-2xl rounded-b-[40%]"
                style={{
                  background: inHazard
                    ? "linear-gradient(180deg, #8f3000 0%, #603000 60%, #402000 100%)"
                    : "linear-gradient(180deg, #00838f 0%, #006064 60%, #004d40 100%)",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                  transition: "background 0.5s ease",
                }}
              />
              {/* Orange stripe */}
              <div className="absolute top-3 left-2 right-2 h-3 rounded-sm" style={{ background: "#ffab40" }} />
              {/* Wheelhouse */}
              <div
                className="absolute top-7 left-4 right-4 h-6 rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #fff3e0, #ffe0b2)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                <div className="flex justify-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-sm bg-cyan-400 shadow-inner" />
                  <div className="w-2 h-2 rounded-sm bg-cyan-400 shadow-inner" />
                </div>
              </div>
              {/* Mast */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-5 rounded-t-sm"
                style={{ background: "linear-gradient(180deg, #d32f2f, #b71c1c)" }}
              >
                <div className="absolute -top-1 left-0 right-0 h-1 bg-yellow-400 rounded-t-sm" />
              </div>
            </div>
          </div>

          {/* Water-line shimmer */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-8 rounded-full opacity-40"
            style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.5) 0%, transparent 70%)" }}
          />
        </div>

        {/* Flag */}
        <div
          className="absolute overflow-hidden rounded-sm shadow-sm flex items-center justify-center"
          style={{
            top: "-16px",
            right: "-4px",
            width: 34,
            height: 20,
            background: "linear-gradient(135deg, #e53935, #c62828)",
            borderLeft: "2px solid #fff",
            transformOrigin: "left center",
            animation: "flagWave 1.8s ease-in-out infinite",
          }}
        >
          <div className="text-[5px] text-white font-bold leading-none text-center select-none">
            L.Z.
          </div>
        </div>
      </motion.div>

      {/* WASD hint */}
      {!isMoving && (
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap animate-pulse">
          <div className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-4 py-2 rounded-full font-label tracking-widest uppercase flex items-center gap-2">
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px]">W/S</span> Thrust
            <span className="text-white/30">·</span>
            <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px]">A/D</span> Steer
            <span className="text-white/30">·</span>
            <span className="text-cyan-300 text-[8px]">🌀 Slingshot around nodes!</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default Boat;
