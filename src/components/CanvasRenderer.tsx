import React, { useEffect } from 'react';
import { Point } from '../types';
import { GRID_SIZE } from '../constants';

interface CanvasRendererProps {
  snake: Point[];
  food: Point;
  direction: Point;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function CanvasRenderer({ snake, food, direction, canvasRef }: CanvasRendererProps) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0); ctx.lineTo(i * cellSize, canvas.height); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize); ctx.lineTo(canvas.width, i * cellSize); ctx.stroke();
    }

    ctx.fillStyle = '#ef4444';
    ctx.shadowBlur = 15; ctx.shadowColor = '#ef4444';
    ctx.beginPath();
    ctx.arc(food.x * cellSize + cellSize / 2, food.y * cellSize + cellSize / 2, cellSize / 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? '#10b981' : '#34d399';
      const padding = 2;
      const x = segment.x * cellSize + padding;
      const y = segment.y * cellSize + padding;
      const size = cellSize - padding * 2;
      ctx.beginPath();
      ctx.roundRect(x, y, size, size, isHead ? 6 : 4);
      ctx.fill();

      if (isHead) {
        ctx.fillStyle = 'white';
        const eyeSize = size / 5;
        if (direction.x === 1) {
          ctx.fillRect(x + size * 0.7, y + size * 0.2, eyeSize, eyeSize);
          ctx.fillRect(x + size * 0.7, y + size * 0.6, eyeSize, eyeSize);
        } else if (direction.x === -1) {
          ctx.fillRect(x + size * 0.1, y + size * 0.2, eyeSize, eyeSize);
          ctx.fillRect(x + size * 0.1, y + size * 0.6, eyeSize, eyeSize);
        } else if (direction.y === -1) {
          ctx.fillRect(x + size * 0.2, y + size * 0.1, eyeSize, eyeSize);
          ctx.fillRect(x + size * 0.6, y + size * 0.1, eyeSize, eyeSize);
        } else if (direction.y === 1) {
          ctx.fillRect(x + size * 0.2, y + size * 0.7, eyeSize, eyeSize);
          ctx.fillRect(x + size * 0.6, y + size * 0.7, eyeSize, eyeSize);
        }
      }
    });
  }, [snake, food, direction, canvasRef]);

  return null;
}
