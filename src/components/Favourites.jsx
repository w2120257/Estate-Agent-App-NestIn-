import React from 'react';
import { useDrop } from 'react-dnd';

const Favourites = ({ favourites, onRemoveFav, onClearFavs, onDropProperty }) => {
  // Setup Drop hook
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PROPERTY',
    drop: (item) => onDropProperty(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div 
      ref={drop} 
      className={`favourites-panel ${isOver ? 'highlight' : ''}`}
    >
      <h3>Favourites</h3>
      {favourites.length === 0 ? (
        <p className="drag-hint">Drag properties here...</p>
      ) : (
        <>
          <ul className="fav-list">
            {favourites.map(fav => (
              <li key={fav.id} className="fav-item">
                <span>{fav.location}</span>
                <button 
                  className="remove-btn" 
                  onClick={() => onRemoveFav(fav.id)}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
          <button className="clear-btn" onClick={onClearFavs}>
            Clear All
          </button>
        </>
      )}
    </div>
  );
};

export default Favourites;

