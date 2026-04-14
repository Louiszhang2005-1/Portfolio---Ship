"use client";

import { useGameEngine } from "@/hooks/useGameEngine";
import GameWorld from "@/components/GameWorld";
import Boat from "@/components/Boat";
import HUD from "@/components/HUD";
import DialogueBubble from "@/components/DialogueBubble";
import BlueprintModal from "@/components/BlueprintModal";
import MobileControls from "@/components/MobileControls";

export default function Home() {
  const game = useGameEngine();

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* ── GAME WORLD (Ocean + Islands) ── */}
      <GameWorld
        cameraOffset={game.cameraOffset}
        nearbyIsland={game.nearbyIsland}
        visitedIds={game.visitedIds}
        onIslandClick={game.navigateToIsland}
      />

      {/* ── BOAT (Always screen-center) ── */}
      <Boat
        velocityX={game.boatVelocity.x}
        velocityY={game.boatVelocity.y}
        rotation={game.boatRotation}
        speed={game.speed}
      />

      {/* ── HUD OVERLAY ── */}
      <HUD
        visitedCount={game.visitedIds.size}
        speed={game.speed}
        nearbyIsland={game.nearbyIsland}
        gameState={game.gameState}
        onIslandClick={game.navigateToIsland}
      />

      {/* ── DIALOGUE BUBBLE (near island) ── */}
      {game.gameState !== "inspecting" && (
        <DialogueBubble
          nearbyIsland={game.nearbyIsland}
          onInspect={game.openBlueprint}
        />
      )}

      {/* ── BLUEPRINT MODAL (project deep-dive) ── */}
      <BlueprintModal
        mission={game.inspectedIsland}
        isOpen={game.gameState === "inspecting"}
        onClose={game.closeBlueprint}
      />

      {/* ── MOBILE D-PAD ── */}
      <MobileControls onMove={() => {}} />
    </div>
  );
}
