"use client";

import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { generateMockQrCells, GRID_DIMENSION } from "@/lib/utils/mockQr";

export default function MockQrCode({ seed, size = 220 }: { seed: string; size?: number }) {
  const cells = useMemo(() => generateMockQrCells(seed), [seed]);
  const cellSize = size / GRID_DIMENSION;

  return (
    <Box bg="white" p={3} rounded="lg" display="inline-block">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="QR Code สำหรับชำระเงิน (ตัวอย่าง)">
        <rect width={size} height={size} fill="#ffffff" />
        {cells.map((row, rowIndex) =>
          row.map((isFilled, colIndex) =>
            isFilled ? (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * cellSize}
                y={rowIndex * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#111827"
              />
            ) : null,
          ),
        )}
      </svg>
    </Box>
  );
}
