"use client";

import { motion } from "framer-motion";
import { GitBranch, Mail, Anchor } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-xs font-label tracking-widest uppercase text-[var(--color-primary)] mb-4">
            Contact
          </div>
          <h2 className="font-headline text-4xl font-extrabold text-[var(--color-on-surface)] mb-4">
            Let&apos;s connect
          </h2>
          <p className="text-[var(--color-on-surface-variant)] mb-10 max-w-md mx-auto leading-relaxed">
            Whether you&apos;re looking for an engineering intern, want to collaborate on a project, or just want to say hi — reach out.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:zlouis2005@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
            >
              <Mail className="h-4 w-4" />
              zlouis2005@gmail.com
            </a>

            <a
              href="https://github.com/Louiszhang2005-1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] px-6 py-3 text-sm font-semibold text-[var(--color-on-surface)] transition-all hover:bg-[var(--color-surface-container)] hover:shadow"
            >
              <GitBranch className="h-4 w-4" />
              GitHub
            </a>

            <Link
              href="/game"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-6 py-3 text-sm font-semibold text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/20"
            >
              <Anchor className="h-4 w-4" />
              Play the Game Version
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
