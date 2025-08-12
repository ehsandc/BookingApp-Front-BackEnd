import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import SearchFilter from "../components/SearchFilter";
import { mockProperties } from "../data/mockProperties";
import "./HomePage.css";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://bed-final-project-deploy.onrender.com/properties"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.length > 0) {
          setProperties(data);
          setFilteredProperties(data);
        } else {
          setProperties(mockProperties);
          setFilteredProperties(mockProperties);
        }
      } catch (error) {
        console.error("Error loading properties:", error);
        setProperties(mockProperties);
        setFilteredProperties(mockProperties);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);
  const handleSearch = (searchTerm) => {
    const filtered = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const handleFilter = (filters) => {
    let filtered = properties;

    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.pricePerNight <= filters.maxPrice);
    }
    if (filters.minGuests) {
      filtered = filtered.filter((p) => p.maxGuestCount >= filters.minGuests);
    }
    if (filters.bedrooms) {
      filtered = filtered.filter((p) => p.bedroomCount >= filters.bedrooms);
    }

    setFilteredProperties(filtered);
  };

  if (loading) return <div className="loading">Loading properties...</div>;

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>🏠 Find Your Perfect Stay</h1>
        <p>Discover amazing properties around the world</p>
      </header>

      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        totalCount={filteredProperties.length}
      />

      <div className="properties-grid">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="no-results">
          <h3>No properties found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
