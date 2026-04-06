import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { Difficulty, DifficultySettings } from '../types';
import { DIFFICULTY_CONFIG } from '../constants';

interface GameOverlayProps {
  gameStarted: boolean;
  isGameOver: boolean;
  isPaused: boolean;
  score: number;
  difficulty: Difficulty;
  t: any;
  onStart: () => void;
  onDifficultySelect: (d: Difficulty) => void;
  onResetDifficulty: () => void;
}

export function GameOverlay({
  gameStarted, isGameOver, isPaused, score, difficulty, t,
  onStart, onDifficultySelect, onResetDifficulty
}: GameOverlayProps) {
  return (
    <AnimatePresence>
      {!gameStarted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">{t.ready}</h2>
                <p className="text-gray-400 text-sm max-w-[240px] mx-auto">{t.instructions}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-[300px] mx-auto">
                {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => onDifficultySelect(level)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      difficulty === level
                        ? `${DIFFICULTY_CONFIG[level].bg} ${DIFFICULTY_CONFIG[level].color} border-current`
                        : 'bg-gray-900 text-gray-500 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    {t[DIFFICULTY_CONFIG[level].translationKey]}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={onStart} className="group relative px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto">
              <Play className="w-5 h-5 fill-current" /> {t.start}
            </button>
          </motion.div>
        </motion.div>
      )}

      {isGameOver && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-white">{t.gameOver}</h2>
              <p className="text-red-200/70 font-medium">{t.finalScore}: {score}</p>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={onStart} className="px-8 py-3 bg-white text-red-950 font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto shadow-xl w-full">
                <RotateCcw className="w-5 h-5" /> {t.tryAgain}
              </button>
              <button onClick={onResetDifficulty} className="px-8 py-3 bg-red-500/20 hover:bg-red-500/30 text-white font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto border border-red-500/50 w-full">
                <RotateCcw className="w-5 h-5 rotate-45" /> {t.changeDifficulty}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {isPaused && !isGameOver && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gray-950/60 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-gray-900/90 px-6 py-3 rounded-full border border-gray-700 flex items-center gap-3 shadow-2xl">
            <Pause className="w-5 h-5 text-emerald-500 fill-current" />
            <span className="font-bold tracking-widest text-sm">{t.paused}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
