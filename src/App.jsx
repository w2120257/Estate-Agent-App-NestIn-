import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; 
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import './App.css';

function App() {
  // 1. STATE MANAGEMENT
  
  // Load favourites from localStorage on startup
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('propertyFavs');
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  // Save to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem('propertyFavs', JSON.stringify(favourites));
  }, [favourites]);

  // 2. FAVOURITES LOGIC 

  // Safe Add Handler: Avoids duplicates
  const addFav = (property) => {
    setFavourites((prevFavs) => {
      if (prevFavs.some(fav => fav.id === property.id)) {
        return prevFavs;
      }
      return [...prevFavs, property];
    });
  };

  // Safe Remove Handler
  const removeFav = (id) => {
    setFavourites((prevFavs) => prevFavs.filter(fav => fav.id !== id));
  };

  // Clear All Handler
  const clearFavs = () => {
    setFavourites([]);
  };

  //3. RENDER
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        
        {/* HEADER SECTION */}
        {/* We use <header>  */}
        <header>
          {/* Logo Link: Redirects to Home */}
          <Link to="/" className="logo-link">
            <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🏡</span> 
            NESTIN
          </Link>
          
          {/* Navbar Links*/}
          <nav>
             {/* i did not add nav bar links for now*/}
          </nav>
        </header>

        {/* ROUTES SECTION */}
        <Routes>
          <Route 
            path="/" 
            element={
              <SearchPage 
                favourites={favourites} 
                onAddFav={addFav} 
                onRemoveFav={removeFav}
                onClearFavs={clearFavs}
              />
            } 
          />
          <Route
            path="/property/:id" 
            element={
              <PropertyPage 
                favourites={favourites}
                onAddFav={addFav} 
                onRemoveFav={removeFav}
              />
            } 
          />
        </Routes>

      </div>
    </DndProvider>
  );
}

export default App;