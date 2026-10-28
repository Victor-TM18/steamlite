import React from 'react';

export const GameCard = ({ game, onSelectGame, isOwned }) => {
  return (
    <div 
      className="game-card" 
      style={{
        backgroundColor: '#1b2838',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <img 
        src={game.image} 
        alt={game.title} 
        style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
      />
      <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ fontSize: '0.8rem', color: '#66c0f4', fontWeight: 'bold' }}>{game.genre}</span>
        <h3 style={{ margin: '0.5rem 0', color: '#fff' }}>{game.title}</h3>
        <p style={{ color: '#c6d4df', fontSize: '0.9rem', flex: 1 }}>
          {game.description.substring(0, 80)}...
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#a4d007' }}>
            {game.price === 0 ? 'Gratis' : `$${game.price.toFixed(2)}`}
          </span>
          <button
            onClick={() => onSelectGame(game.id)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: isOwned ? '#47b147' : '#66c0f4',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isOwned ? 'Ver en Biblioteca' : 'Ver Detalles'}
          </button>
        </div>
      </div>
    </div>
  );
};