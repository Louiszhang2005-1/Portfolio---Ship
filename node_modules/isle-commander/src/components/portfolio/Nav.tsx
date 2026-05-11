"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Anchor } from "lucide-react";

const sections = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-surface)]/90 backdrop-blur-md shadow-sm border-b border-[var(--color-outline-variant)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-headline font-bold text-[var(--color-on-surface)] hover:text-[var(--color-primary)] transition-colors">
          <span className="text-lg">Louis</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <Link
          href="/game"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-on-primary)] transition-all hover:opacity-90 hover:shadow-md"
        >
          <Anchor className="h-3.5 w-3.5" />
          Play Game
        </Link>
      </div>
    </header>
  );
}
