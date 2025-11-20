'use client';
import { useState, useEffect } from 'react';

export default function CryptoBlaster() {
  const [score, setScore] = useState(0);
  const [obstacles, setObstacles] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    const scoreTimer = setInterval(() => setScore(s => s + 1), 1000);

    const obstacleTimer = setInterval(() => {
      setObstacles(prev => {
        const newObstacles = prev.map(p => p - 1);
        if (newObstacles.some(p => p <= 0)) {
          setGameOver(true);
          return prev;
        }
        const newDist = Math.floor(Math.random() * 6) + 5;
        return [...newObstacles, newDist];
      });
    }, 1000);

    return () => {
      clearInterval(scoreTimer);
      clearInterval(obstacleTimer);
    };
  }, [gameOver]);

  const playAgain = () => {
    setScore(0);
    setObstacles([]);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl">🚀</div>
      <div className="text-2xl">Score: {score}</div>
      {gameOver && (
        <div className="text-2xl">GAME OVER</div>
      )}
      <button onClick={playAgain} className="px-4 py-2 bg-gray-200 rounded">
        Play Again
      </button>
    </div>
  );
}
