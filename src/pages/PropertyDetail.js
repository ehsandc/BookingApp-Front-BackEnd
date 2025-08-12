import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProperty = async () => {
    try {
      const response = await fetch(
        `https://bed-final-project-deploy.onrender.com/properties/${id}`
      );
      if (!response.ok) {
        throw new Error("Property not found");
      }
      const property = await response.json();
      setProperty(property);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading property...</div>;
  if (!property) return <div className="error">Property not found</div>;

  return (
    <div className="property-detail">
      <div className="property-header">
        <h1>{property.title}</h1>
        <p className="location">📍 {property.location}</p>
      </div>

      <div className="property-content">
        <div className="property-main">
          <div className="property-image-large">🏠</div>

          <div className="property-info-section">
            <h2>About this property</h2>
            <p>{property.description}</p>

            <div className="property-amenities">
              <div className="amenity">🛏️ {property.bedroomCount} Bedrooms</div>
              <div className="amenity">
                🚿 {property.bathRoomCount} Bathrooms
              </div>
              <div className="amenity">👥 {property.maxGuestCount} Guests</div>
              <div className="amenity">⭐ {property.rating}/5 Rating</div>
            </div>
          </div>
        </div>

        <div className="property-sidebar">
          <div className="booking-card">
            <div className="price-section">
              <span className="price">${property.pricePerNight}</span>
              <span className="price-unit">/night</span>
            </div>

            <button className="book-button">Reserve Now</button>

            <p className="booking-note">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
