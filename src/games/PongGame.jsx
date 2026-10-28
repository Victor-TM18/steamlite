import React, { useEffect, useRef } from 'react';

export const PongGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 4;
    let ballSpeedY = 4;

    let playerY = 150;
    let aiY = 150;
    const paddleHeight = 80;
    const paddleWidth = 10;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      playerY = e.clientY - rect.top - paddleHeight / 2;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const loop = setInterval(() => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Rebote Superior/Inferior
      if (ballY <= 0 || ballY >= canvas.height) ballSpeedY = -ballSpeedY;

      // IA Simple
      if (aiY + paddleHeight / 2 < ballY) aiY += 3;
      else aiY -= 3;

      // Colisiones Raquetas
      if (ballX <= paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) ballSpeedX = -ballSpeedX;
      if (ballX >= canvas.width - paddleWidth && ballY > aiY && ballY < aiY + paddleHeight) ballSpeedX = -ballSpeedX;

      // Reinicio
      if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
      }

      // Dibujar
      ctx.fillStyle = '#101822';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, playerY, paddleWidth, paddleHeight); // Jugador
      ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight); // IA
      ctx.beginPath();
      ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
      ctx.fill();
    }, 1000 / 60);

    return () => {
      clearInterval(loop);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <h2>Retro Pong 2D</h2>
      <p>Mueve el mouse para controlar tu raqueta izquierda.</p>
      <canvas
        ref={canvasRef}
        width={500}
        height={350}
        style={{ border: '3px solid #2a475e', borderRadius: '8px' }}
      />
    </div>
  );
};