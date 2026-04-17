"use client";

import { useMemo } from "react";
import { useGameEngine } from "@/hooks/useGameEngine";
import GameWorld from "@/components/GameWorld";
import Boat from "@/components/Boat";
import HUD from "@/components/HUD";
import DialogueBubble from "@/components/DialogueBubble";
import BlueprintModal from "@/components/BlueprintModal";
import MobileControls from "@/components/MobileControls";
import TreasureMap from "@/components/TreasureMap";
import MissionBriefing from "@/components/MissionBriefing";

/* Seeded RNG for stable star positions */
function seededRng(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

const STARS = (() => {
  const rng = seededRng(42);
  return Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: rng() * 100,
    y: rng() * 100,
    size: 1 + rng() * 2,
    delay: rng() * 5,
  }));
})();

export default function Home() {
  const game = useGameEngine();

  // Clamp timeOfDay to 0-1, derive night opacity
  const nightOpacity = Math.min(1, Math.max(0, game.timeOfDay));
  const isNight = nightOpacity > 0.3;

  // Pre-build a memoized star layer so it doesn't re-create on every render
  const starLayer = useMemo(() => (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 7, opacity: Math.max(0, (nightOpacity - 0.3) / 0.7) }}
    >
      {STARS.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animation: `nightStarTwinkle ${2 + star.delay * 0.6}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  ), [nightOpacity]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">

      {/* ── GAME WORLD (with parallax layers) ── */}
      <GameWorld
        worldRef={game.worldRef}
        paralaxBgRef={game.paralaxBgRef}
        paralaxMidRef={game.paralaxMidRef}
        nearbyIsland={game.nearbyIsland}
        visitedIds={game.visitedIds}
        collectedItems={game.collectedItems}
        fogRevealedZones={game.fogRevealedZones}
        onIslandClick={game.navigateToIsland}
        hudEnemies={game.hudEnemies}
        explodedBarrels={game.explodedBarrels}
      />

      {/* ── DAY / NIGHT CYCLE ── */}
      {/* Night sky darkening gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          background: `radial-gradient(ellipse at center, transparent 15%, rgba(4, 10, 38, ${nightOpacity * 0.72}) 100%)`,
          transition: "background 1s ease",
        }}
      />
      {/* Warm day vignette (fades at night) */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          background: `radial-gradient(ellipse at 50% 0%, rgba(255, 200, 80, ${(1 - nightOpacity) * 0.06}) 0%, transparent 60%)`,
          transition: "background 1s ease",
        }}
      />

      {/* Stars */}
      {isNight && starLayer}

      {/* ── BOAT ── */}
      <Boat
        boatHeadingRef={game.boatHeadingRef}
        speed={game.hudSpeed}
        boatSquash={game.boatSquash}
      />

      {/* ── HUD ── */}
      <HUD
        visitedCount={game.visitedIds.size}
        speed={game.hudSpeed}
        coreTemp={game.hudCoreTemp}
        nearbyIsland={game.nearbyIsland}
        gameState={game.gameState}
        boatPosition={game.hudPosition}
        boatHeading={game.hudHeading}
        nearestUnvisitedAngle={game.nearestUnvisitedAngle}
        onIslandClick={game.navigateToIsland}
        onToggleMap={game.toggleMap}
        score={game.score}
        collectedItems={game.collectedItems}
        hudBoilerHit={game.hudBoilerHit}
        deckBoundaryWarning={game.deckBoundaryWarning}
      />

      {/* ── DIALOGUE ── */}
      {game.gameState !== "inspecting" && (
        <DialogueBubble
          nearbyIsland={game.nearbyIsland}
          onInspect={game.openBlueprint}
        />
      )}

      {/* ── BLUEPRINT MODAL ── */}
      <BlueprintModal
        mission={game.inspectedIsland}
        isOpen={game.gameState === "inspecting"}
        onClose={game.closeBlueprint}
      />

      {/* ── TREASURE MAP ── */}
      <TreasureMap
        isOpen={game.mapOpen}
        onClose={game.closeMap}
        visitedIds={game.visitedIds}
        onNavigate={game.navigateToIsland}
      />

      {/* ── MOBILE CONTROLS ── */}
      <MobileControls />

      {/* ── MISSION BRIEFING (first visit onboarding) ── */}
      <MissionBriefing />
    </div>
  );
}
