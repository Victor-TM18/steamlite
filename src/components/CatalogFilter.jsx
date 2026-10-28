import React from 'react';

export const CatalogFilter = ({ searchTerm, setSearchTerm, selectedGenre, setSelectedGenre, genres }) => {
  return (
    <div className="catalog-filters" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
      <input
        type="text"
        placeholder="Buscar juego por título..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          border: '1px solid #2a475e',
          backgroundColor: '#1b2838',
          color: '#ffffff',
          flex: '1 1 300px'
        }}
      />

      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          border: '1px solid #2a475e',
          backgroundColor: '#1b2838',
          color: '#ffffff',
          cursor: 'pointer'
        }}
      >
        <option value="Todos">Todos los Géneros</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};