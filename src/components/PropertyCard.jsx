import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';

const PropertyCard = ({ property, isFav, onToggleFav }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PROPERTY',
    item: property,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Image Logic: Safely get the first image
  const rawImage = (property.images && property.images.length > 0)
    ? property.images[0]
    : null;
    
  // Ensure path starts with / if it exists
  const imgPath = rawImage
    ? (rawImage.startsWith('/') ? rawImage : `/${rawImage}`)
    : null;

  return (
    <div 
      ref={drag} 
      className="property-card" 
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="card-image-wrapper">
        {imgPath ? (
          <img 
            src={imgPath} 
            alt={property.type} 
            className="card-img"
            onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} 
          />
        ) : null}
        {/* Fallback placeholder if image fails or is missing */}
        <div className="card-img-placeholder" style={{ display: imgPath ? 'none' : 'flex' }}>
          <span>🏠 {property.type}</span>
        </div>
      </div>

      <div className="card-content">
        {/* Title is Location, matching your screenshot */}
        <h3 className="card-title">{property.location}</h3>
        
        {/* Price */}
        <div className="card-price">£{property.price.toLocaleString()}</div>
        
        {/* Description */}
        <p className="card-description">
          {property.description}
        </p>

        <div className="card-footer">
          <Link to={`/property/${property.id}`} className="view-details-link">
            VIEW DETAILS
          </Link>
          
          <button 
            className="fav-icon-btn" 
            onClick={() => onToggleFav(property)}
          >
            {isFav ? '❤️' : '🤍'} {/* Using a heart that stands out more */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;