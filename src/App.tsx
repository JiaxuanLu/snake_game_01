import { useRef, useState, useEffect, useCallback } from 'react';
import { useSnakeGame } from './hooks/useSnakeGame';
import { TRANSLATIONS } from './translations';
import { Difficulty, Language, Point } from './types';
import { Header } from './components/Header';
import { LanguageSelector } from './components/LanguageSelector';
import { GameOverlay } from './components/GameOverlay';
import { Controls } from './components/Controls';
import { CanvasRenderer } from './components/CanvasRenderer';

export default function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
  const [language, setLanguage] = useState<Language>('zh');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const game = useSnakeGame(difficulty);
  const t = TRANSLATIONS[language];

  const handleKeyDown = useCallback((e: KeyboardEvent | any) => {
    const key = 'key' in e ? e.key : '';
    const code = 'code' in e ? e.code : '';
    
    // Prevent default scrolling for game control keys
    const preventKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Space'];
    if (preventKeys.includes(key) || preventKeys.includes(code)) {
      if ('preventDefault' in e) e.preventDefault();
    }
    
    if (key === 'ArrowUp' || key === 'w' || key === 'W' || code === 'KeyW') game.handleInput({ x: 0, y: -1 });
    else if (key === 'ArrowDown' || key === 's' || key === 'S' || code === 'KeyS') game.handleInput({ x: 0, y: 1 });
    else if (key === 'ArrowLeft' || key === 'a' || key === 'A' || code === 'KeyA') game.handleInput({ x: -1, y: 0 });
    else if (key === 'ArrowRight' || key === 'd' || key === 'D' || code === 'KeyD') game.handleInput({ x: 1, y: 0 });
    else if (key === ' ' || code === 'Space') {
      game.togglePause();
    }
  }, [game]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const onStart = () => {
    game.resetGame();
    setTimeout(() => gameContainerRef.current?.focus(), 10);
  };

  const onMobileInput = (key: string) => {
    const dirs: Record<string, Point> = {
      ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }
    };
    if (dirs[key]) game.handleInput(dirs[key]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-4 font-sans selection:bg-emerald-500/30">
      <LanguageSelector current={language} onSelect={setLanguage} />
      
      <Header 
        title={t.title} subtitle={t.subtitle} 
        bestLabel={t.best} scoreLabel={t.score} 
        score={game.score} highScore={game.highScore} 
      />

      <div 
        ref={gameContainerRef} tabIndex={0}
        onClick={() => gameContainerRef.current?.focus()}
        className="relative group outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-xl cursor-pointer"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
          <canvas ref={canvasRef} width={400} height={400} className="block max-w-full h-auto aspect-square" />
          <CanvasRenderer snake={game.snake} food={game.food} direction={game.direction} canvasRef={canvasRef} />
          <GameOverlay 
            {...game} difficulty={difficulty} t={t} 
            onStart={onStart} onDifficultySelect={setDifficulty}
            onResetDifficulty={() => { game.setIsGameOver(false); game.setGameStarted(false); }}
          />
        </div>
      </div>

      <Controls 
        movementLabel={t.movement} pauseLabel={t.pause} spaceLabel={t.space} 
        onMobileInput={onMobileInput} 
      />
    </div>
  );
}
