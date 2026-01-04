import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';
import Favourites from '../components/Favourites';
import { filterProperties } from '../utils/filterProperties';
import propertiesData from '../data/Properties.json';
import './SearchPage.css';

const SearchPage = ({ favourites, onAddFav, onRemoveFav, onClearFavs }) => {
  const [properties, setProperties] = useState(propertiesData.properties || propertiesData);

  const handleSearch = (criteria) => {
    const dataToFilter = propertiesData.properties || propertiesData;
    const results = filterProperties(dataToFilter, criteria);
    setProperties(results);
  };

  
  const getImagePath = (path) => {
    if (!path) return '';
    return path.startsWith('/') ? path.slice(1) : path;
  };

  return (
    <div className="search-page-container">
      <aside className="sidebar">
        <SearchForm onSearch={handleSearch} />
        
        <div className="fav-wrapper">
          <Favourites 
            favourites={favourites} 
            onRemoveFav={onRemoveFav} 
            onClearFavs={onClearFavs}
            onDropProperty={onAddFav} 
          />
        </div>
      </aside>

      <main className="results-section">
        {properties.length === 0 ? (
          <div className="no-results">No properties found.</div>
        ) : (
          <div className="property-grid">
            {properties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={{
                  ...property,
                 
                  picture: getImagePath(property.picture)
                }}
                isFav={favourites.some(f => f.id === property.id)}
                onToggleFav={(prop) => {
                  if (favourites.some(f => f.id === prop.id)) {
                    onRemoveFav(prop.id);
                  } else {
                    onAddFav(prop);
                  }
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;