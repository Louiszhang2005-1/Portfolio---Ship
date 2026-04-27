"use client";

interface SprocketAvatarProps {
  size?: number;
  idle?: boolean;
}

export default function SprocketAvatar({ size = 96, idle = false }: SprocketAvatarProps) {
  const flickerDuration = idle ? "3.2s" : "1.6s";

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "radial-gradient(circle at 50% 55%, rgba(0,212,255,0.18) 0%, rgba(0,40,80,0.55) 70%)",
        border: "2px solid rgba(0,212,255,0.55)",
        boxShadow: "0 0 28px rgba(0,212,255,0.45), inset 0 0 16px rgba(0,212,255,0.08)",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,212,255,0.07) 2px, rgba(0,212,255,0.07) 3px)",
          backgroundSize: "100% 3px",
          animation: "scanlines 0.25s linear infinite",
          mixBlendMode: "overlay",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Pixel-art robot SVG — main layer */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        shapeRendering="crispEdges"
        style={{
          position: "absolute",
          inset: 0,
          filter: "drop-shadow(0 0 5px #00d4ff)",
        }}
      >
        {/* Antenna base */}
        <rect x="15" y="2" width="2" height="3" fill="#00d4ff" />
        {/* Antenna dot */}
        <rect x="14" y="1" width="4" height="2" fill="#7dfcff" />
        {/* Head */}
        <rect x="10" y="5" width="12" height="10" fill="#00b8d9" />
        {/* Visor */}
        <rect x="11" y="7" width="10" height="4" fill="#001e2e" />
        {/* Visor glow eyes */}
        <rect x="12" y="8" width="3" height="2" fill="#00d4ff" />
        <rect x="17" y="8" width="3" height="2" fill="#00d4ff" />
        {/* Head bolt left */}
        <rect x="9"  y="7" width="2" height="2" fill="#7dfcff" />
        {/* Head bolt right */}
        <rect x="21" y="7" width="2" height="2" fill="#7dfcff" />
        {/* Neck */}
        <rect x="14" y="15" width="4" height="2" fill="#0099b5" />
        {/* Body */}
        <rect x="9" y="17" width="14" height="9" fill="#00b8d9" />
        {/* Chest panel */}
        <rect x="12" y="19" width="8" height="4" fill="#001e2e" />
        {/* Chest LED row */}
        <rect x="13" y="20" width="2" height="2" fill="#00d4ff" />
        <rect x="16" y="20" width="2" height="2" fill="#7dfcff" />
        <rect x="19" y="20" width="1" height="2" fill="#00d4ff" />
        {/* Left arm */}
        <rect x="6"  y="17" width="3" height="7" fill="#0099b5" />
        <rect x="5"  y="22" width="3" height="2" fill="#00b8d9" />
        {/* Right arm */}
        <rect x="23" y="17" width="3" height="7" fill="#0099b5" />
        <rect x="24" y="22" width="3" height="2" fill="#00b8d9" />
        {/* Legs */}
        <rect x="11" y="26" width="4" height="4" fill="#0099b5" />
        <rect x="17" y="26" width="4" height="4" fill="#0099b5" />
        {/* Feet */}
        <rect x="10" y="29" width="5" height="2" fill="#007a8f" />
        <rect x="17" y="29" width="5" height="2" fill="#007a8f" />
      </svg>

      {/* Flicker ghost overlay */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        shapeRendering="crispEdges"
        style={{
          position: "absolute",
          inset: 0,
          mixBlendMode: "screen",
          opacity: 0.6,
          animation: `holoFlicker ${flickerDuration} steps(1) infinite`,
          filter: "blur(0.5px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <rect x="10" y="5"  width="12" height="10" fill="rgba(0,212,255,0.3)" />
        <rect x="11" y="7"  width="10" height="4"  fill="rgba(0,30,60,0.5)"   />
        <rect x="12" y="8"  width="3"  height="2"  fill="rgba(0,212,255,0.9)" />
        <rect x="17" y="8"  width="3"  height="2"  fill="rgba(0,212,255,0.9)" />
        <rect x="9"  y="17" width="14" height="9"  fill="rgba(0,212,255,0.25)" />
      </svg>

      {/* Glitch slice */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "38%",
          height: "4px",
          background: "rgba(0,212,255,0.18)",
          animation: "glitchShift 4.5s steps(1) infinite",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
    </div>
  );
}
