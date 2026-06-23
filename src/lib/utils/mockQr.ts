/**
 * Generates a deterministic pseudo-QR grid pattern for UI demo purposes only.
 * Not a real scannable PromptPay payload — there is no payment backend yet.
 */
const GRID_SIZE = 21;

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const generateMockQrCells = (seed: string): boolean[][] => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const cells: boolean[][] = [];
  for (let row = 0; row < GRID_SIZE; row += 1) {
    const rowCells: boolean[] = [];
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const isAnchor =
        (row < 7 && col < 7) || (row < 7 && col >= GRID_SIZE - 7) || (row >= GRID_SIZE - 7 && col < 7);
      if (isAnchor) {
        const inRing = row % 6 === 0 || col % 6 === 0 || (row % 6 >= 2 && row % 6 <= 4 && col % 6 >= 2 && col % 6 <= 4);
        rowCells.push(inRing);
        continue;
      }
      rowCells.push(seededRandom(hash + row * GRID_SIZE + col) > 0.52);
    }
    cells.push(rowCells);
  }
  return cells;
};

export const GRID_DIMENSION = GRID_SIZE;
