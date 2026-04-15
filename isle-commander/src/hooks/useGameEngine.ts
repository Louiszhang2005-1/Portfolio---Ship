"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { missions, Mission, SPAWN_POSITION, WORLD_BOUNDS, collectibles } from "@/data/missions";

/* ─── Constants ─── */
const THRUST_POWER = 0.32;
const REVERSE_POWER = 0.18;
const TURN_RATE = 3.2;
const MAX_SPEED = 5.5;
const FRICTION = 0.93;
const CAMERA_LERP = 0.07;
const COLLISION_RADIUS = 160;
const STORAGE_KEY = "isle-commander-visited";
const STORAGE_KEY_COLLECTED = "isle-commander-collected";
const BOUNCE_DAMPING = 0.4;
const COLLECT_RADIUS = 70;

/* ─── Types ─── */
export type GameState = "sailing" | "near_island" | "inspecting";

interface Vec2 { x: number; y: number; }

interface BoatState {
  position: Vec2;
  velocity: Vec2;
  heading: number;
}

export interface GameEngine {
  /* Refs for high-frequency values (read directly, no re-render) */
  worldRef: React.RefObject<HTMLDivElement | null>;
  boatRef: React.RefObject<HTMLDivElement | null>;
  boatHeadingRef: React.RefObject<HTMLDivElement | null>;
  /* Low-frequency React state (only changes on events) */
  gameState: GameState;
  nearbyIsland: Mission | null;
  inspectedIsland: Mission | null;
  visitedIds: Set<string>;
  /* Snapshot values for HUD (updated at low frequency) */
  hudSpeed: number;
  hudHeading: number;
  hudPosition: Vec2;
  /* Actions */
  openBlueprint: () => void;
  closeBlueprint: () => void;
  navigateToIsland: (mission: Mission) => void;
  /* Treasure map */
  mapOpen: boolean;
  toggleMap: () => void;
  closeMap: () => void;
  /* Score / collectibles */
  score: number;
  collectedItems: Set<string>;
}

/* ─── Helper ─── */
function distance(a: Vec2, b: Vec2): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function normalizeAngle(deg: number): number {
  while (deg > 360) deg -= 360;
  while (deg < 0) deg += 360;
  return deg;
}

function loadVisited(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return new Set(JSON.parse(stored));
  } catch { /* ignore */ }
  return new Set();
}

function saveVisited(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch { /* ignore */ }
}

function loadCollected(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY_COLLECTED);
    if (stored) return new Set(JSON.parse(stored));
  } catch { /* ignore */ }
  return new Set();
}

function saveCollected(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY_COLLECTED, JSON.stringify([...ids]));
  } catch { /* ignore */ }
}

/* ─── Hook ─── */
export function useGameEngine(): GameEngine {
  // ── React state (only for discrete events) ──
  const [gameState, setGameState] = useState<GameState>("sailing");
  const [nearbyIsland, setNearbyIsland] = useState<Mission | null>(null);
  const [inspectedIsland, setInspectedIsland] = useState<Mission | null>(null);
  const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set());

  const [score, setScore] = useState(0);
  const [collectedItems, setCollectedItems] = useState<Set<string>>(new Set());

  // Load persisted state after mount (prevents hydration mismatch)
  useEffect(() => {
    const storedVisited = loadVisited();
    if (storedVisited.size > 0) setVisitedIds(storedVisited);
    const storedCollected = loadCollected();
    if (storedCollected.size > 0) {
      collectedRef.current = storedCollected;
      setCollectedItems(storedCollected);
      const pts = [...storedCollected].reduce((sum, id) => {
        const c = collectibles.find((c) => c.id === id);
        return sum + (c?.points ?? 0);
      }, 0);
      scoreRef.current = pts;
      setScore(pts);
    }
  }, []);

  // ── Low-frequency HUD snapshot (updated every ~200ms, not every frame) ──
  const [hudSpeed, setHudSpeed] = useState(0);
  const [hudHeading, setHudHeading] = useState(0);
  const [hudPosition, setHudPosition] = useState<Vec2>({ x: 0, y: 0 });

  // ── DOM refs for direct manipulation (no React re-render) ──
  const worldRef = useRef<HTMLDivElement>(null);
  const boatElRef = useRef<HTMLDivElement>(null);
  const boatHeadingRef = useRef<HTMLDivElement>(null);

  // ── Internal refs ──
  const boatStateRef = useRef<BoatState>({
    position: { ...SPAWN_POSITION },
    velocity: { x: 0, y: 0 },
    heading: 0,
  });
  const cameraRef = useRef<Vec2>({ ...SPAWN_POSITION });
  const keysRef = useRef<Set<string>>(new Set());
  const autoNavTarget = useRef<Vec2 | null>(null);
  const nearbyRef = useRef<Mission | null>(null);
  const gameStateRef = useRef<GameState>("sailing");
  const frameCount = useRef(0);
  const collectedRef = useRef<Set<string>>(new Set());
  const scoreRef = useRef(0);

  // ── Key listeners ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"].includes(key)) {
        e.preventDefault();
        keysRef.current.add(key);
        autoNavTarget.current = null;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // ── Game Loop ──
  useEffect(() => {
    let animId: number;
    const WORLD_SIZE = 4000;
    const HALF = WORLD_SIZE / 2;

    const tick = () => {
      const boat = boatStateRef.current;
      const camera = cameraRef.current;
      const keys = keysRef.current;

      // ── Input ──
      if (autoNavTarget.current) {
        const target = autoNavTarget.current;
        const dx = target.x - boat.position.x;
        const dy = target.y - boat.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 30) {
          autoNavTarget.current = null;
        } else {
          const targetHeading = normalizeAngle(Math.atan2(dx, -dy) * (180 / Math.PI));
          let headingDiff = targetHeading - boat.heading;
          if (headingDiff > 180) headingDiff -= 360;
          if (headingDiff < -180) headingDiff += 360;
          boat.heading = normalizeAngle(boat.heading + clamp(headingDiff, -TURN_RATE * 1.5, TURN_RATE * 1.5));
          const headingRad = degToRad(boat.heading);
          boat.velocity.x += Math.sin(headingRad) * THRUST_POWER;
          boat.velocity.y += -Math.cos(headingRad) * THRUST_POWER;
        }
      } else {
        if (keys.has("a") || keys.has("arrowleft")) boat.heading = normalizeAngle(boat.heading - TURN_RATE);
        if (keys.has("d") || keys.has("arrowright")) boat.heading = normalizeAngle(boat.heading + TURN_RATE);
        if (keys.has("w") || keys.has("arrowup")) {
          const r = degToRad(boat.heading);
          boat.velocity.x += Math.sin(r) * THRUST_POWER;
          boat.velocity.y += -Math.cos(r) * THRUST_POWER;
        }
        if (keys.has("s") || keys.has("arrowdown")) {
          const r = degToRad(boat.heading);
          boat.velocity.x += -Math.sin(r) * REVERSE_POWER;
          boat.velocity.y += Math.cos(r) * REVERSE_POWER;
        }
      }

      // ── Physics ──
      boat.velocity.x *= FRICTION;
      boat.velocity.y *= FRICTION;
      const speed = Math.sqrt(boat.velocity.x ** 2 + boat.velocity.y ** 2);
      if (speed > MAX_SPEED) {
        const s = MAX_SPEED / speed;
        boat.velocity.x *= s;
        boat.velocity.y *= s;
      }
      boat.position.x += boat.velocity.x;
      boat.position.y += boat.velocity.y;

      // ── Boundaries ──
      if (boat.position.x > WORLD_BOUNDS) { boat.position.x = WORLD_BOUNDS; boat.velocity.x *= -BOUNCE_DAMPING; }
      else if (boat.position.x < -WORLD_BOUNDS) { boat.position.x = -WORLD_BOUNDS; boat.velocity.x *= -BOUNCE_DAMPING; }
      if (boat.position.y > WORLD_BOUNDS) { boat.position.y = WORLD_BOUNDS; boat.velocity.y *= -BOUNCE_DAMPING; }
      else if (boat.position.y < -WORLD_BOUNDS) { boat.position.y = -WORLD_BOUNDS; boat.velocity.y *= -BOUNCE_DAMPING; }

      // ── Camera ──
      camera.x += (boat.position.x - camera.x) * CAMERA_LERP;
      camera.y += (boat.position.y - camera.y) * CAMERA_LERP;

      // ══════════════════════════════════════════════
      // DIRECT DOM UPDATES (no React re-render!)
      // ══════════════════════════════════════════════

      // Move world container
      if (worldRef.current) {
        worldRef.current.style.transform = `translate(${-camera.x - HALF}px, ${-camera.y - HALF}px)`;
      }

      // Rotate boat heading element
      if (boatHeadingRef.current) {
        boatHeadingRef.current.style.transform = `rotate(${boat.heading}deg)`;
      }

      // ── Collision detection (only triggers React state on change) ──
      let closest: Mission | null = null;
      let closestDist = Infinity;
      for (const mission of missions) {
        const d = distance(boat.position, mission.position);
        if (d < COLLISION_RADIUS && d < closestDist) {
          closest = mission;
          closestDist = d;
        }
      }

      const prevId = nearbyRef.current?.id ?? null;
      const newId = closest?.id ?? null;
      if (prevId !== newId) {
        nearbyRef.current = closest;
        setNearbyIsland(closest);
      }
      if (gameStateRef.current !== "inspecting") {
        const newState = closest ? "near_island" : "sailing";
        if (gameStateRef.current !== newState) {
          gameStateRef.current = newState;
          setGameState(newState);
        }
      }

      // ── Collectible pickup detection ──
      for (const item of collectibles) {
        if (collectedRef.current.has(item.id)) continue;
        if (distance(boat.position, item.position) < COLLECT_RADIUS) {
          const next = new Set(collectedRef.current);
          next.add(item.id);
          collectedRef.current = next;
          scoreRef.current += item.points;
          saveCollected(next);
          setCollectedItems(new Set(next));
          setScore(scoreRef.current);
        }
      }

      // ── HUD updates (throttled to every 12 frames = ~5fps) ──
      frameCount.current++;
      if (frameCount.current % 12 === 0) {
        setHudSpeed(speed);
        setHudHeading(boat.heading);
        setHudPosition({ x: boat.position.x, y: boat.position.y });
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ── Actions ──
  const openBlueprint = useCallback(() => {
    const island = nearbyRef.current;
    if (island && island.status !== "locked") {
      setInspectedIsland(island);
      setGameState("inspecting");
      gameStateRef.current = "inspecting";
      setVisitedIds((prev) => {
        const next = new Set(prev);
        next.add(island.id);
        saveVisited(next);
        return next;
      });
    }
  }, []);

  const closeBlueprint = useCallback(() => {
    setInspectedIsland(null);
    setGameState("sailing");
    gameStateRef.current = "sailing";
  }, []);

  const navigateToIsland = useCallback((mission: Mission) => {
    autoNavTarget.current = { ...mission.position };
  }, []);

  // ── Treasure Map ──
  const [mapOpen, setMapOpen] = useState(false);
  const toggleMap = useCallback(() => setMapOpen((v) => !v), []);
  const closeMap = useCallback(() => setMapOpen(false), []);

  // ── ENTER / ESC / M ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && nearbyRef.current && gameStateRef.current === "near_island") {
        e.preventDefault();
        openBlueprint();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        if (gameStateRef.current === "inspecting") closeBlueprint();
        setMapOpen(false);
      }
      if (e.key.toLowerCase() === "m" && gameStateRef.current !== "inspecting") {
        e.preventDefault();
        setMapOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openBlueprint, closeBlueprint]);

  return {
    worldRef,
    boatRef: boatElRef,
    boatHeadingRef,
    gameState,
    nearbyIsland,
    inspectedIsland,
    visitedIds,
    hudSpeed,
    hudHeading,
    hudPosition,
    openBlueprint,
    closeBlueprint,
    navigateToIsland,
    mapOpen,
    toggleMap,
    closeMap,
    score,
    collectedItems,
  };
}
