import React, { useEffect, useRef, useState } from 'react';

export const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 1;
    let dy = 0;
    let currentScore = 0;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
      if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
      if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
      if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
    };

    window.addEventListener('keydown', handleKeyDown);

    const gameInterval = setInterval(() => {
      // Mover Serpiente
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Detección de Colisión
      if (
        head.x < 0 || head.x >= tileCount ||
        head.y < 0 || head.y >= tileCount ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        clearInterval(gameInterval);
        return;
      }

      snake.unshift(head);

      // Detección de Comida
      if (head.x === food.x && head.y === food.y) {
        currentScore += 10;
        setScore(currentScore);
        food = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount)
        };
      } else {
        snake.pop();
      }

      // Renderizado Canvas
      ctx.fillStyle = '#171a21';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff4d4d';
      ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

      ctx.fillStyle = '#66c0f4';
      snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
      });
    }, 120);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h2>Snake Classic</h2>
      <p>Puntaje: {score}</p>
      {gameOver && <p style={{ color: '#ff4d4d', fontWeight: 'bold' }}>¡Juego Terminado! Recarga la vista para reintentar.</p>}
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{ border: '3px solid #2a475e', borderRadius: '8px', backgroundColor: '#171a21' }}
      />
    </div>
  );
};