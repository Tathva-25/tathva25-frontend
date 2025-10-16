"use client";
import { useState, useEffect } from "react";

export default function GridTransition({
  children,
  duration = 3000,
  transitionImage = "/images/wheels_bg_img.png",
}) {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [revealedCells, setRevealedCells] = useState(new Set());
  const [hoveredCells, setHoveredCells] = useState(new Set());

  // ========== CUSTOMIZABLE VARIABLES ==========
  const TRANSITION_DURATION = duration; // Total duration in milliseconds (default: 3000ms = 3s)
  const INITIAL_DELAY = 500; // Delay before transition starts (ms)
  const GRID_ROWS = 20;
  const GRID_COLS = 24;
  const TOTAL_CELLS = GRID_ROWS * GRID_COLS;
  const HOVER_FADE_DURATION = 300; // Duration for hover effect to fade out (ms)
  const NEARBY_CELLS_COUNT = 3; // Number of nearby random cells to also trigger
  const NEARBY_RADIUS = 1; // Radius around hovered cell to pick random cells from

  // Calculate delay between each cell reveal based on total duration
  const CELL_DELAY = TRANSITION_DURATION / TOTAL_CELLS;

  useEffect(() => {
    // Start the transition after a brief delay
    const startDelay = setTimeout(() => {
      // Create array of all cell indices
      const cellIndices = Array.from({ length: TOTAL_CELLS }, (_, i) => i);

      // Shuffle the array for random reveal order
      const shuffled = cellIndices.sort(() => Math.random() - 0.5);

      // Reveal cells one by one
      shuffled.forEach((cellIndex, i) => {
        setTimeout(() => {
          setRevealedCells((prev) => new Set([...prev, cellIndex]));

          // End transition when all cells are revealed
          if (i === shuffled.length - 1) {
            setTimeout(() => {
              setIsTransitioning(false);
            }, 300);
          }
        }, i * CELL_DELAY); // Delay between each cell based on duration
      });
    }, INITIAL_DELAY); // Initial delay before starting

    return () => clearTimeout(startDelay);
  }, [CELL_DELAY, INITIAL_DELAY, TOTAL_CELLS]);

  // Get nearby cells within a radius
  const getNearbyCells = (cellIndex, radius) => {
    const row = Math.floor(cellIndex / GRID_COLS);
    const col = cellIndex % GRID_COLS;
    const nearbyCells = [];

    for (
      let r = Math.max(0, row - radius);
      r <= Math.min(GRID_ROWS - 1, row + radius);
      r++
    ) {
      for (
        let c = Math.max(0, col - radius);
        c <= Math.min(GRID_COLS - 1, col + radius);
        c++
      ) {
        const nearbyIndex = r * GRID_COLS + c;
        if (nearbyIndex !== cellIndex) {
          nearbyCells.push(nearbyIndex);
        }
      }
    }
    return nearbyCells;
  };

  // Handle mouse enter on cells
  const handleCellHover = (cellIndex) => {
    // Add the hovered cell
    const cellsToActivate = [cellIndex];

    // Get nearby cells and randomly select some
    const nearbyCells = getNearbyCells(cellIndex, NEARBY_RADIUS);
    const shuffledNearby = nearbyCells.sort(() => Math.random() - 0.5);
    const selectedNearby = shuffledNearby.slice(0, NEARBY_CELLS_COUNT);
    cellsToActivate.push(...selectedNearby);

    // Add all selected cells to hovered state
    setHoveredCells((prev) => new Set([...prev, ...cellsToActivate]));

    // Remove the hover effect after a delay for each cell
    cellsToActivate.forEach((cell) => {
      setTimeout(() => {
        setHoveredCells((prev) => {
          const newSet = new Set(prev);
          newSet.delete(cell);
          return newSet;
        });
      }, HOVER_FADE_DURATION);
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Static background image (base layer - what we transition from) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          backgroundColor: "#F0EFEB",
        }}
      >
        <img
          src="/images/wheels_bg_img.png"
          alt="Wheels Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      {/* Colored version (revealed through grid) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          clipPath: isTransitioning ? "inset(0)" : "none",
        }}
      >
        {children}
      </div>

      {/* Grid overlay - always present for hover effects */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          zIndex: 3,
          pointerEvents: "auto",
        }}
      >
        {Array.from({ length: TOTAL_CELLS }).map((_, index) => {
          const isRevealed = revealedCells.has(index);
          const isHovered = hoveredCells.has(index);
          const showBorder = isTransitioning;

          // Calculate the position of this cell for background positioning
          const row = Math.floor(index / GRID_COLS);
          const col = index % GRID_COLS;
          const cellWidthPercent = 100 / GRID_COLS;
          const cellHeightPercent = 100 / GRID_ROWS;
          const bgPosX = (col * cellWidthPercent).toFixed(2);
          const bgPosY = (row * cellHeightPercent).toFixed(2);

          return (
            <div
              key={index}
              onMouseEnter={() => handleCellHover(index)}
              style={{
                backgroundColor:
                  isTransitioning && !isRevealed ? "#000" : "transparent",
                backgroundImage: isHovered ? `url(${transitionImage})` : "none",
                backgroundSize: `${GRID_COLS * 100}% ${GRID_ROWS * 100}%`,
                backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                border: showBorder
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "none",
                transition: `background-color ${
                  isHovered ? "0.05s" : "0.8s"
                } ease, opacity 0.3s ease`,
                opacity: isHovered ? 1 : isTransitioning && !isRevealed ? 1 : 0,
                cursor: "default",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
