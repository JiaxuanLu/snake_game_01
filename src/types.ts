export type Point = { x: number; y: number };
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'INSANE';
export type Language = 'zh' | 'en';

export interface DifficultySettings {
  speed: number;
  color: string;
  bg: string;
  translationKey: keyof typeof import('./translations').TRANSLATIONS.zh;
}
