"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PortfolioItem } from "@/lib/portfolio";

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  item: PortfolioItem;
};

export default function PhysicsConstellation({ projects }: { projects: PortfolioItem[] }) {
  const pointer = useRef({ x: 50, y: 45, active: false });
  const seed = useMemo(
    () =>
      projects.slice(0, 8).map((item, index) => ({
        x: 18 + ((index * 17) % 64),
        y: 18 + ((index * 23) % 58),
        vx: (index % 2 === 0 ? 0.06 : -0.05) * (1 + index * 0.05),
        vy: (index % 3 === 0 ? 0.05 : -0.04) * (1 + index * 0.04),
        size: 58 + (index % 3) * 10,
        item,
      })),
    [projects]
  );
  const [bodies, setBodies] = useState<Body[]>(() => seed);

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      setBodies((current) =>
        current.map((body) => {
          const dx = body.x - pointer.current.x;
          const dy = body.y - pointer.current.y;
          const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 8);
          const force = pointer.current.active ? 2.4 / distance : 0;
          let vx = (body.vx + dx * force * 0.012) * 0.992;
          let vy = (body.vy + dy * force * 0.012 + 0.002) * 0.992;
          let x = body.x + vx;
          let y = body.y + vy;

          if (x < 8 || x > 92) {
            vx *= -0.92;
            x = Math.min(92, Math.max(8, x));
          }
          if (y < 10 || y > 88) {
            vy *= -0.92;
            y = Math.min(88, Math.max(10, y));
          }

          return { ...body, x, y, vx, vy };
        })
      );
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="relative min-h-[420px] overflow-hidden border-y border-white/10 bg-[#07131a] text-white"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.current = {
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
          active: true,
        };
      }}
      onMouseLeave={() => {
        pointer.current.active = false;
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,150,105,0.18),transparent_32%,rgba(14,165,233,0.16)_68%,rgba(248,113,113,0.16))]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <div className="mb-4 text-xs font-label uppercase tracking-widest text-cyan-200/70">
            Project Physics
          </div>
          <h2 className="font-headline text-3xl font-extrabold leading-tight sm:text-5xl">
            A live map of the work, pulled by your cursor.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/62">
            Each node is a project from the same portfolio data used by the game. The motion is intentionally small:
            enough to feel alive without stealing attention from the work.
          </p>
        </div>

        <div className="relative h-[360px] rounded-[2rem] border border-white/10 bg-black/20">
          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/20 bg-cyan-200/5" />
          {bodies.map((body) => (
            <a
              key={body.item.id}
              href={`/portfolio/${body.item.slug}`}
              className="absolute grid place-items-center rounded-full border border-white/20 bg-white/12 text-center text-[10px] font-bold uppercase tracking-wide shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform hover:scale-110"
              style={{
                left: `${body.x}%`,
                top: `${body.y}%`,
                width: body.size,
                height: body.size,
                transform: "translate(-50%, -50%)",
                boxShadow: `0 0 34px ${body.item.accent}55`,
              }}
            >
              <span className="px-2">{body.item.emoji}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
