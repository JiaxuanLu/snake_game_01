import { Point, Difficulty, DifficultySettings } from './types';

export const GRID_SIZE = 20;
export const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
export const INITIAL_DIRECTION: Point = { x: 0, y: -1 };

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultySettings> = {
  EASY: { speed: 400, color: 'text-blue-400', bg: 'bg-blue-500/10', translationKey: 'easy' },
  MEDIUM: { speed: 200, color: 'text-emerald-400', bg: 'bg-emerald-500/10', translationKey: 'medium' },
  HARD: { speed: 120, color: 'text-orange-400', bg: 'bg-orange-500/10', translationKey: 'hard' },
  INSANE: { speed: 80, color: 'text-red-500', bg: 'bg-red-500/10', translationKey: 'insane' },
};
