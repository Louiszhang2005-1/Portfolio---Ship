"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { missions, Mission, SPAWN_POSITION } from "@/data/missions";

/* ─── Constants ─── */
const ACCELERATION = 0.35;
const MAX_SPEED = 5.5;
const FRICTION = 0.91;
const CAMERA_LERP = 0.07;
const COLLISION_RADIUS = 160;
const STORAGE_KEY = "isle-commander-visited";
const WORLD_BOUNDS = 1600; // ± from center

/* ─── Types ─── */
export type GameState = "sailing" | "near_island" | "inspecting";

interface Vec2 {
  x: number;
  y: number;
}

interface BoatState {
  position: Vec2;
  velocity: Vec2;
  rotation: number; // degrees, visual only
}

export interface GameEngine {
  boatPosition: Vec2;
  boatVelocity: Vec2;
  boatRotation: number;
  cameraOffset: Vec2;
  gameState: GameState;
  nearbyIsland: Mission | null;
  inspectedIsland: Mission | null;
  visitedIds: Set<string>;
  speed: number;
  openBlueprint: () => void;
  closeBlueprint: () => void;
  navigateToIsland: (mission: Mission) => void;
}

/* ─── Helper ─── */
function distance(a: Vec2, b: Vec2): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function loadVisited(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return new Set(JSON.parse(stored));
  } catch {
    /* ignore */
  }
  return new Set();
}

function saveVisited(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

/* ─── Hook ─── */
export function useGameEngine(): GameEngine {
  // ── State ──
  const [gameState, setGameState] = useState<GameState>("sailing");
  const [nearbyIsland, setNearbyIsland] = useState<Mission | null>(null);
  const [inspectedIsland, setInspectedIsland] = useState<Mission | null>(null);
  const [visitedIds, setVisitedIds] = useState<Set<string>>(() => loadVisited());

  // ── Refs for animation-loop values ──
  const boatRef = useRef<BoatState>({
    position: { ...SPAWN_POSITION },
    velocity: { x: 0, y: 0 },
    rotation: 0,
  });
  const cameraRef = useRef<Vec2>({ ...SPAWN_POSITION });
  const keysRef = useRef<Set<string>>(new Set());
  const autoNavTarget = useRef<Vec2 | null>(null);
  const nearbyRef = useRef<Mission | null>(null);
  const gameStateRef = useRef<GameState>("sailing");

  // ── Render state (updated each frame for React) ──
  const [renderState, setRenderState] = useState({
    boatPosition: { ...SPAWN_POSITION },
    boatVelocity: { x: 0, y: 0 },
    boatRotation: 0,
    cameraOffset: { ...SPAWN_POSITION },
    speed: 0,
  });

  // ── Key listeners ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"].includes(key)) {
        e.preventDefault();
        keysRef.current.add(key);
        autoNavTarget.current = null; // cancel auto-nav on manual input
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

  // ── Game Loop (requestAnimationFrame) ──
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const boat = boatRef.current;
      const camera = cameraRef.current;
      const keys = keysRef.current;

      // ── Input → Acceleration ──
      let ax = 0;
      let ay = 0;

      // Auto-navigation (tap-to-move)
      if (autoNavTarget.current) {
        const target = autoNavTarget.current;
        const dx = target.x - boat.position.x;
        const dy = target.y - boat.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 30) {
          autoNavTarget.current = null;
        } else {
          ax = (dx / dist) * ACCELERATION;
          ay = (dy / dist) * ACCELERATION;
        }
      } else {
        // WASD / Arrows
        if (keys.has("w") || keys.has("arrowup")) ay -= ACCELERATION;
        if (keys.has("s") || keys.has("arrowdown")) ay += ACCELERATION;
        if (keys.has("a") || keys.has("arrowleft")) ax -= ACCELERATION;
        if (keys.has("d") || keys.has("arrowright")) ax += ACCELERATION;
      }

      // ── Velocity update ──
      boat.velocity.x = clamp((boat.velocity.x + ax) * FRICTION, -MAX_SPEED, MAX_SPEED);
      boat.velocity.y = clamp((boat.velocity.y + ay) * FRICTION, -MAX_SPEED, MAX_SPEED);

      // ── Position update ──
      boat.position.x = clamp(boat.position.x + boat.velocity.x, -WORLD_BOUNDS, WORLD_BOUNDS);
      boat.position.y = clamp(boat.position.y + boat.velocity.y, -WORLD_BOUNDS, WORLD_BOUNDS);

      // ── Rotation (based on velocity direction) ──
      const speed = Math.sqrt(boat.velocity.x ** 2 + boat.velocity.y ** 2);
      if (speed > 0.3) {
        const targetRotation = Math.atan2(boat.velocity.y, boat.velocity.x) * (180 / Math.PI) + 90;
        // Lerp rotation smoothly
        let diff = targetRotation - boat.rotation;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        boat.rotation += diff * 0.1;
      }

      // ── Camera smooth-follow ──
      camera.x += (boat.position.x - camera.x) * CAMERA_LERP;
      camera.y += (boat.position.y - camera.y) * CAMERA_LERP;

      // ── Collision detection ──
      let closest: Mission | null = null;
      let closestDist = Infinity;

      for (const mission of missions) {
        const d = distance(boat.position, mission.position);
        if (d < COLLISION_RADIUS && d < closestDist) {
          closest = mission;
          closestDist = d;
        }
      }

      // Only update React state if the nearby island changed
      const prevNearbyId = nearbyRef.current?.id ?? null;
      const newNearbyId = closest?.id ?? null;

      if (prevNearbyId !== newNearbyId) {
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

      // ── Push render state ──
      setRenderState({
        boatPosition: { ...boat.position },
        boatVelocity: { ...boat.velocity },
        boatRotation: boat.rotation,
        cameraOffset: { ...camera },
        speed,
      });

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
      // Mark as visited
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

  // ── ENTER key to open blueprint ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && nearbyRef.current && gameStateRef.current === "near_island") {
        e.preventDefault();
        openBlueprint();
      }
      if (e.key === "Escape" && gameStateRef.current === "inspecting") {
        e.preventDefault();
        closeBlueprint();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openBlueprint, closeBlueprint]);

  return {
    boatPosition: renderState.boatPosition,
    boatVelocity: renderState.boatVelocity,
    boatRotation: renderState.boatRotation,
    cameraOffset: renderState.cameraOffset,
    gameState,
    nearbyIsland,
    inspectedIsland,
    visitedIds,
    speed: renderState.speed,
    openBlueprint,
    closeBlueprint,
    navigateToIsland,
  };
}
