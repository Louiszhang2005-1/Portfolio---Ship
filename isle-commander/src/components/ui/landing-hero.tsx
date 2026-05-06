"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Anchor, Briefcase } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";

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

const navItems = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Projects", href: "/portfolio#projects" },
  { label: "Experience", href: "/portfolio#experience" },
  { label: "Contact", href: "/portfolio#contact" },
];

export const LandingHero = () => {
  return (
    <section className="h-screen w-full">
      <div className="relative h-full w-full overflow-hidden">

        {/* Animated gradient background — nautical deep sea */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 80%, rgba(0,101,111,0.6) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 80% 20%, rgba(89,234,251,0.15) 0%, transparent 60%),
              linear-gradient(160deg, #06080f 0%, #0b1220 40%, #0f1a1c 70%, #110e02 100%)
            `,
          }}
        />

        {/* Animated ocean shimmer */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                width: `${200 + i * 80}px`,
                height: `${200 + i * 80}px`,
                left: `${10 + i * 14}%`,
                bottom: `-${60 + i * 20}px`,
                background: "radial-gradient(circle, rgba(89,234,251,0.4) 0%, transparent 70%)",
                animation: `waveShimmer ${4 + i * 0.8}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${(i * 17.3 + 7) % 100}%`,
                top: `${(i * 13.7 + 3) % 60}%`,
                width: `${1 + (i % 3) * 0.5}px`,
                height: `${1 + (i % 3) * 0.5}px`,
                opacity: 0.3 + (i % 5) * 0.12,
                animation: `nightStarTwinkle ${2.5 + (i % 4)}s ease-in-out infinite`,
                animationDelay: `${(i % 7) * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient overlay bottom */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

        {/* Navbar */}
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

        {/* Hero content — centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs font-label tracking-widest uppercase text-[#59eafb]/70"
          >
            Mechanical &amp; Software Engineer
          </motion.div>

          <h1
            className="font-headline font-extrabold leading-[0.9] tracking-[-0.04em] text-white mb-6"
            style={{ fontSize: "clamp(3rem, 11vw, 8.5rem)" }}
          >
            <WordsPullUp text="Louis Zhang" />
          </h1>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-white/55 leading-relaxed max-w-lg mb-10"
          >
            I build things that fly, sail, and ship — from lunar transport systems to hackathon robots.
          </motion.p>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-white py-3 pl-6 pr-3 text-sm font-semibold text-black transition-all hover:gap-3 hover:shadow-[0_0_28px_rgba(89,234,251,0.35)]"
            >
              View Portfolio
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00656f] transition-transform group-hover:scale-110">
                <Briefcase className="h-3.5 w-3.5 text-white" />
              </span>
            </Link>

            <Link
              href="/game"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm py-3 pl-6 pr-3 text-sm font-medium text-white transition-all hover:bg-white/20 hover:gap-3"
            >
              Play the Game
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:scale-110">
                <Anchor className="h-3.5 w-3.5 text-[#59eafb]" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Footnote pinned to bottom */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-white/25 px-4"
        >
          * The game is an interactive version of this portfolio — same projects, same experience, different adventure.
        </motion.p>
      </div>
    </section>
  );
};
