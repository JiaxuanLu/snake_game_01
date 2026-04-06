import React from 'react';
import { Trophy, Gamepad2 } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
  bestLabel: string;
  scoreLabel: string;
  score: number;
  highScore: number;
}

export function Header({ title, subtitle, bestLabel, scoreLabel, score, highScore }: HeaderProps) {
  return (
    <div className="w-full max-w-[400px] flex justify-between items-end mb-6">
      <div>
        <h1 className="text-4xl font-black tracking-tighter text-emerald-500 flex items-center gap-2">
          <Gamepad2 className="w-8 h-8" />
          {title}
        </h1>
        <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">{subtitle}</p>
      </div>
      <div className="text-right">
        <div className="flex items-center justify-end gap-2 text-gray-400 text-sm font-medium">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span>{bestLabel}: {highScore}</span>
        </div>
        <div className="text-2xl font-bold tabular-nums">
          {scoreLabel}: {score.toString().padStart(4, '0')}
        </div>
      </div>
    </div>
  );
}
