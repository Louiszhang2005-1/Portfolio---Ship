"use client";

import { useGameEngine } from "@/hooks/useGameEngine";
import GameWorld from "@/components/GameWorld";
import Boat from "@/components/Boat";
import HUD from "@/components/HUD";
import DialogueBubble from "@/components/DialogueBubble";
import BlueprintModal from "@/components/BlueprintModal";
import MobileControls from "@/components/MobileControls";
import TreasureMap from "@/components/TreasureMap";

export default function Home() {
  const game = useGameEngine();

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* ── GAME WORLD ── */}
      <GameWorld
        worldRef={game.worldRef}
        nearbyIsland={game.nearbyIsland}
        visitedIds={game.visitedIds}
        collectedItems={game.collectedItems}
        onIslandClick={game.navigateToIsland}
      />

      {/* ── BOAT ── */}
      <Boat
        boatHeadingRef={game.boatHeadingRef}
        speed={game.hudSpeed}
      />

      {/* ── HUD ── */}
      <HUD
        visitedCount={game.visitedIds.size}
        speed={game.hudSpeed}
        nearbyIsland={game.nearbyIsland}
        gameState={game.gameState}
        boatPosition={game.hudPosition}
        boatHeading={game.hudHeading}
        onIslandClick={game.navigateToIsland}
        onToggleMap={game.toggleMap}
        score={game.score}
        collectedItems={game.collectedItems}
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
    </div>
  );
}
