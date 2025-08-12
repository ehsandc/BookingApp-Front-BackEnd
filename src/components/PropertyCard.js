import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="property-card-link">
      <div className="property-card">
        <div className="property-image">
          {property.image ? (
            <img
              src={property.image}
              alt={property.title}
              className="property-img"
              loading="lazy"
            />
          ) : (
            <div className="property-image-placeholder">🏠</div>
          )}
          <div className="property-rating">⭐ {property.rating}</div>
        </div>

        <div className="property-info">
          <h3 className="property-title">{property.title}</h3>
          <p className="property-location">�� {property.location}</p>
          <p className="property-description">{property.description}</p>

          <div className="property-details">
            <span>🛏️ {property.bedroomCount} bed</span>
            <span>🚿 {property.bathRoomCount} bath</span>
            <span>👥 {property.maxGuestCount} guests</span>
          </div>

          <div className="property-price">
            <strong>${property.pricePerNight}</strong>
            <span>/night</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
