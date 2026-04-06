import { useState, useEffect, useCallback, useRef } from 'react';
import { Point, Difficulty } from '../types';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, DIFFICULTY_CONFIG } from '../constants';

export function useSnakeGame(difficulty: Difficulty) {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const directionRef = useRef<Point>(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  const lastMoveTime = useRef(0);
  const directionQueue = useRef<Point[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('snake-high-score');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snake-high-score', score.toString());
    }
  }, [score, highScore]);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some(s => s.x === newFood.x && s.y === newFood.y)) break;
    }
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    setFood(generateFood(INITIAL_SNAKE));
    directionQueue.current = [];
  }, [generateFood]);

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused || !gameStarted) return;

    setSnake(prevSnake => {
      const nextDirection = directionQueue.current.length > 0 
        ? directionQueue.current.shift()! 
        : directionRef.current;
      
      directionRef.current = nextDirection;
      setDirection(nextDirection);

      const head = prevSnake[0];
      const newHead = { x: head.x + nextDirection.x, y: head.y + nextDirection.y };

      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE ||
          prevSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [food, generateFood, isGameOver, isPaused, gameStarted]);

  useEffect(() => {
    let frameId: number;
    const loop = (time: number) => {
      if (time - lastMoveTime.current > DIFFICULTY_CONFIG[difficulty].speed) {
        moveSnake();
        lastMoveTime.current = time;
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [moveSnake, difficulty]);

  const handleInput = useCallback((newDir: Point) => {
    if (!gameStarted || isPaused || isGameOver) return;
    const last = directionQueue.current.length > 0 ? directionQueue.current[directionQueue.current.length - 1] : directionRef.current;
    if (newDir.x !== -last.x || newDir.y !== -last.y) {
      directionQueue.current.push(newDir);
      if (directionQueue.current.length > 2) directionQueue.current.shift();
    }
  }, [gameStarted, isPaused, isGameOver]);

  const togglePause = useCallback(() => {
    if (gameStarted && !isGameOver) setIsPaused(p => !p);
  }, [gameStarted, isGameOver]);

  return {
    snake, food, direction, isGameOver, isPaused, score, highScore, gameStarted,
    resetGame, handleInput, togglePause, setGameStarted, setIsGameOver
  };
}
