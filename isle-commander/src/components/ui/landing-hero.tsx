"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Anchor, Briefcase, Compass, Gamepad2 } from "lucide-react";
import { useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";

/* ── Words Pull-Up Animation ── */
interface WordsPullUpProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const WordsPullUp = ({ text, className = "", style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
          style={{ marginRight: i < words.length - 1 ? "0.3em" : 0 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

/* ── Nav ── */
const navItems = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Projects", href: "/portfolio#projects" },
  { label: "Experience", href: "/portfolio#experience" },
  { label: "Contact", href: "/portfolio#contact" },
];

/* ── Mini Game Canvas (cursor-tracking boat + ocean) ── */
function MiniGameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const boatRef = useRef({ x: 0.5, y: 0.55, vx: 0, vy: 0 });
  const wakeRef = useRef<Array<{ x: number; y: number; age: number; maxAge: number }>>([]);
  const frameRef = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Island data (normalized 0-1 coords)
    const islands = [
      { x: 0.18, y: 0.3, w: 0.12, h: 0.07, color: "#7ec850", label: "Robotics" },
      { x: 0.75, y: 0.25, w: 0.14, h: 0.08, color: "#f2d98a", label: "Aerospace" },
      { x: 0.5, y: 0.7, w: 0.11, h: 0.065, color: "#ff9734", label: "Software" },
      { x: 0.25, y: 0.72, w: 0.09, h: 0.055, color: "#a855f7", label: "Physics" },
      { x: 0.82, y: 0.65, w: 0.1, h: 0.06, color: "#59eafb", label: "IoT" },
    ];

    // Wave data
    const waves: Array<{ offset: number; amplitude: number; speed: number; y: number }> = [];
    for (let i = 0; i < 5; i++) {
      waves.push({
        offset: Math.random() * Math.PI * 2,
        amplitude: 2 + Math.random() * 3,
        speed: 0.3 + Math.random() * 0.4,
        y: 0.15 + i * 0.18,
      });
    }

    let animId: number;
    const render = () => {
      const W = canvas.width;
      const H = canvas.height;
      const t = frameRef.current++ * 0.016;
      const boat = boatRef.current;
      const mouse = mouseRef.current;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Ocean gradient
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#0c2a3a");
      grad.addColorStop(0.4, "#1a5c6e");
      grad.addColorStop(1, "#0f3040");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Grid overlay
      ctx.strokeStyle = "rgba(89,234,251,0.06)";
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Waves
      for (const wave of waves) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(89,234,251,0.12)";
        ctx.lineWidth = 1.5;
        for (let x = 0; x < W; x += 3) {
          const nx = x / W;
          const wy = wave.y * H + Math.sin(nx * 8 + t * wave.speed + wave.offset) * wave.amplitude;
          if (x === 0) ctx.moveTo(x, wy);
          else ctx.lineTo(x, wy);
        }
        ctx.stroke();
      }

      // Islands
      for (const isl of islands) {
        const ix = isl.x * W;
        const iy = isl.y * H + Math.sin(t * 0.5 + isl.x * 10) * 2;
        const iw = isl.w * W;
        const ih = isl.h * H;

        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.beginPath();
        ctx.ellipse(ix, iy + ih * 0.6, iw * 0.55, ih * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Island body
        ctx.fillStyle = isl.color;
        ctx.beginPath();
        ctx.ellipse(ix, iy, iw * 0.5, ih * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.shadowColor = isl.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = isl.color + "44";
        ctx.beginPath();
        ctx.ellipse(ix, iy, iw * 0.35, ih * 0.35, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.font = "bold 9px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(isl.label, ix, iy + ih * 0.5 + 14);
      }

      // Boat physics — spring toward mouse
      if (mouse.active) {
        const dx = mouse.x - boat.x;
        const dy = mouse.y - boat.y;
        boat.vx += dx * 0.015;
        boat.vy += dy * 0.015;
      } else {
        // Idle drift
        boat.vx += Math.sin(t * 0.3) * 0.0003;
        boat.vy += Math.cos(t * 0.25) * 0.0002;
      }
      boat.vx *= 0.96;
      boat.vy *= 0.96;
      boat.x += boat.vx;
      boat.y += boat.vy;
      boat.x = Math.max(0.05, Math.min(0.95, boat.x));
      boat.y = Math.max(0.05, Math.min(0.95, boat.y));

      // Wake particles
      const speed = Math.sqrt(boat.vx * boat.vx + boat.vy * boat.vy);
      if (speed > 0.002 && frameRef.current % 3 === 0) {
        wakeRef.current.push({ x: boat.x, y: boat.y, age: 0, maxAge: 40 });
      }
      if (wakeRef.current.length > 30) wakeRef.current.splice(0, wakeRef.current.length - 30);

      // Draw wake
      for (let i = wakeRef.current.length - 1; i >= 0; i--) {
        const p = wakeRef.current[i];
        p.age++;
        if (p.age > p.maxAge) { wakeRef.current.splice(i, 1); continue; }
        const progress = p.age / p.maxAge;
        const radius = 3 + progress * 12;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(89,234,251,${0.3 * (1 - progress)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw boat
      const bx = boat.x * W;
      const by = boat.y * H;
      const heading = Math.atan2(boat.vy, boat.vx);

      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(heading);

      // Hull
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(14, 0);
      ctx.lineTo(-8, -7);
      ctx.quadraticCurveTo(-12, 0, -8, 7);
      ctx.closePath();
      ctx.fill();
      ctx.shadowColor = "#59eafb";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Mast
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillRect(-2, -12, 1.5, 10);

      // Flag
      ctx.fillStyle = "#ff6b6b";
      ctx.beginPath();
      ctx.moveTo(-0.5, -12);
      ctx.lineTo(6, -10);
      ctx.lineTo(-0.5, -8);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Compass indicator (top-right)
      const cx = W - 28;
      const cy = 28;
      ctx.strokeStyle = "rgba(89,234,251,0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(89,234,251,0.6)";
      ctx.font = "bold 7px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("N", cx, cy - 7);
      // Needle
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(heading);
      ctx.fillStyle = "#ff6b6b";
      ctx.beginPath();
      ctx.moveTo(0, -9);
      ctx.lineTo(-3, 4);
      ctx.lineTo(3, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      // Reset scale for next frame
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    render();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
}

/* ── Main Landing Hero ── */
export const LandingHero = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [hoveredPanel, setHoveredPanel] = useState<"portfolio" | "game" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGlobalMouse = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  return (
    <section className="h-screen w-full" id="landing-hero">
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden"
        onMouseMove={handleGlobalMouse}
      >
        {/* ── Animated gradient background ── */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 80%, rgba(0,101,111,0.5) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 80% 20%, rgba(89,234,251,0.12) 0%, transparent 60%),
              linear-gradient(160deg, #06080f 0%, #0b1220 40%, #0f1a1c 70%, #110e02 100%)
            `,
          }}
        />

        {/* ── Mouse-reactive ambient glow ── */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${
              hoveredPanel === "portfolio"
                ? "rgba(255,246,221,0.06)"
                : hoveredPanel === "game"
                ? "rgba(89,234,251,0.06)"
                : "rgba(89,234,251,0.03)"
            }, transparent 60%)`,
          }}
        />

        {/* ── Stars (parallax-reactive) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate(${(mousePos.x - 0.5) * -8}px, ${(mousePos.y - 0.5) * -8}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${(i * 17.3 + 7) % 100}%`,
                top: `${(i * 13.7 + 3) % 55}%`,
                width: `${1 + (i % 3) * 0.5}px`,
                height: `${1 + (i % 3) * 0.5}px`,
                opacity: 0.25 + (i % 5) * 0.1,
                animation: `nightStarTwinkle ${2.5 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i % 7) * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* ── Noise overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ── Nav ── */}
        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black/80 backdrop-blur-md px-4 py-2 sm:gap-6 md:gap-10 md:rounded-b-3xl md:px-8 border-x border-b border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[10px] sm:text-xs md:text-sm transition-colors text-white/60 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* ── Hero content ── */}
        <div className="absolute inset-0 flex flex-col items-center px-4 sm:px-6 pt-16 sm:pt-20">
          {/* Title block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-2 text-[10px] sm:text-xs font-label tracking-widest uppercase text-[#59eafb]/70"
          >
            Mechanical &amp; Software Engineer
          </motion.div>

          <h1
            className="font-headline font-extrabold leading-[0.9] tracking-[-0.04em] text-white mb-3 text-center"
            style={{ fontSize: "clamp(2.2rem, 8vw, 6rem)" }}
          >
            <WordsPullUp text="Louis Zhang" />
          </h1>

          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-white/50 leading-relaxed max-w-md text-center mb-6 sm:mb-8"
          >
            I build things that fly, sail, and ship — from lunar transport systems to hackathon robots.
          </motion.p>

          {/* ── Choose your experience label ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-4 sm:mb-5 text-[10px] font-label tracking-[0.3em] uppercase text-white/30"
          >
            Choose your experience
          </motion.div>

          {/* ── Split panels ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl flex-1 flex flex-col lg:flex-row gap-3 sm:gap-4 pb-12 sm:pb-14 min-h-0"
          >
            {/* ── LEFT: Portfolio Preview ── */}
            <Link
              href="/portfolio"
              className="landing-panel landing-panel--portfolio group relative flex-1 min-h-[200px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredPanel("portfolio")}
              onMouseLeave={() => setHoveredPanel(null)}
            >
              {/* Browser frame mockup — constrained to top area */}
              <div className="absolute top-3 left-3 right-3 bottom-[130px] sm:top-4 sm:left-4 sm:right-4 sm:bottom-[140px] rounded-xl overflow-hidden border border-white/8">
                {/* Browser chrome bar */}
                <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 border-b border-white/8">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  <div className="ml-2 flex-1 h-4 rounded bg-white/8 flex items-center px-2">
                    <span className="text-[8px] text-white/30 font-mono">louiszhang.dev/portfolio</span>
                  </div>
                </div>

                {/* Screenshot with scroll animation */}
                <div className="relative w-full h-full overflow-hidden bg-[#fff6dd]">
                  <img
                    src="/preview-portfolio.png"
                    alt="Portfolio preview"
                    className="w-full object-cover object-top transition-transform duration-[4s] ease-in-out group-hover:translate-y-[-15%]"
                    style={{ minHeight: "120%" }}
                  />
                  {/* Scan line on hover */}
                  <div
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#59eafb]/40 to-transparent opacity-0 group-hover:opacity-100"
                    style={{ animation: "scanLineDown 2.5s linear infinite", top: "-10%" }}
                  />
                </div>
              </div>

              {/* Label overlay — solid bottom area */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-[#0a0f18] via-[#0a0f18]/95 to-[#0a0f18]/70" style={{ paddingTop: '20px' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff6dd]/15">
                    <Briefcase className="h-3.5 w-3.5 text-[#fff6dd]" />
                  </div>
                  <span className="text-[10px] font-label tracking-widest uppercase text-[#fff6dd]/60">
                    The Website
                  </span>
                </div>
                <div className="text-white font-headline font-bold text-base sm:text-lg">
                  View Portfolio
                </div>
                <p className="text-white/40 text-xs mt-1 max-w-xs">
                  Clean, detailed project breakdowns with internship history and technical deep-dives.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#fff6dd]/70 group-hover:text-[#fff6dd] transition-colors">
                  Explore
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* ── Glowing center divider (desktop only) ── */}
            <div className="hidden lg:flex items-center justify-center w-4 relative">
              <div
                className="w-[1px] bg-gradient-to-b from-transparent via-[#59eafb]/50 to-transparent"
                style={{ animation: "dividerPulse 3s ease-in-out infinite", position: "absolute" }}
              />
              <div className="relative z-10 w-6 h-6 rounded-full border border-[#59eafb]/30 bg-black/60 backdrop-blur grid place-items-center">
                <Compass className="w-3 h-3 text-[#59eafb]/60" style={{ animation: "gearSpin 12s linear infinite" }} />
              </div>
            </div>

            {/* ── RIGHT: Game Preview ── */}
            <Link
              href="/game"
              className="landing-panel landing-panel--game group relative flex-1 min-h-[200px] rounded-2xl border border-[#59eafb]/15 bg-[#59eafb]/[0.03] backdrop-blur-sm overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredPanel("game")}
              onMouseLeave={() => setHoveredPanel(null)}
            >
              {/* Interactive canvas */}
              <MiniGameCanvas />

              {/* HUD overlay elements */}
              <div className="absolute top-3 left-3 flex items-center gap-2 rounded-lg border border-[#59eafb]/20 bg-black/50 px-3 py-1.5 backdrop-blur-sm pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[9px] font-label tracking-wider uppercase text-[#59eafb]/70">
                  Live Preview
                </span>
              </div>

              {/* "Move cursor to steer" hint */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 backdrop-blur-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[8px] font-label tracking-wider text-white/50">
                  Move cursor to sail
                </span>
              </div>

              {/* Label overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-[#061520] via-[#061520]/95 to-[#061520]/60 pointer-events-none" style={{ paddingTop: '20px' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#59eafb]/15">
                    <Gamepad2 className="h-3.5 w-3.5 text-[#59eafb]" />
                  </div>
                  <span className="text-[10px] font-label tracking-widest uppercase text-[#59eafb]/60">
                    The Game
                  </span>
                </div>
                <div className="text-white font-headline font-bold text-base sm:text-lg">
                  Play Isle Commander
                </div>
                <p className="text-white/40 text-xs mt-1 max-w-xs">
                  Sail a steamboat between project islands — same data, different adventure.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#59eafb]/70 group-hover:text-[#59eafb] transition-colors pointer-events-auto">
                  Set sail
                  <Anchor className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* ── Footnote ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-3 left-0 right-0 text-center text-[9px] text-white/20 px-4"
        >
          * Same projects, same data — two ways to explore. The game is an interactive version of the portfolio.
        </motion.p>
      </div>
    </section>
  );
};
