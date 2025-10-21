import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import SearchFilter from "../components/SearchFilter";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import API_BASE_URL from "../config/api";
// import { mockProperties } from "../data/mockProperties";
import "./HomePage.css";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    maxPrice: "",
    minGuests: "",
    bedrooms: "",
  });
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/properties`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error("Error loading properties:", error);
        setProperties([]);
        setFilteredProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Reset search and filters when navigating to home
  useEffect(() => {
    if (location.pathname === "/") {
      setSearchTerm("");
      setFilters({ maxPrice: "", minGuests: "", bedrooms: "" });
      setFilteredProperties(properties);
    }
    // eslint-disable-next-line
  }, [location.pathname, properties]);

  const applyFilters = (list, filtersObj) => {
    let filtered = list;
    if (filtersObj.maxPrice) {
      filtered = filtered.filter((p) => p.pricePerNight <= filtersObj.maxPrice);
    }
    if (filtersObj.minGuests) {
      filtered = filtered.filter(
        (p) => p.maxGuestCount >= filtersObj.minGuests
      );
    }
    if (filtersObj.bedrooms) {
      filtered = filtered.filter((p) => p.bedroomCount >= filtersObj.bedrooms);
    }
    return filtered;
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    let filtered = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(term.toLowerCase()) ||
        property.location.toLowerCase().includes(term.toLowerCase()) ||
        property.description.toLowerCase().includes(term.toLowerCase())
    );
    // Apply filters too
    filtered = applyFilters(filtered, filters);
    setFilteredProperties(filtered);
  };

  // Add a new handler to clear both search and filters and show all properties
  const handleClear = () => {
    setSearchTerm("");
    setFilters({ maxPrice: "", minGuests: "", bedrooms: "" });
    setFilteredProperties(properties);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    let filtered = properties;
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    filtered = applyFilters(filtered, newFilters);
    setFilteredProperties(filtered);
  };

  if (loading)
    return <LoadingSpinner size="large" message="Loading properties..." />;

  return (
    <div className="home-page">
      <section className="hero-section" id="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Find Your Perfect Stay</h1>
            <p>Discover unique homes, apartments, and experiences worldwide.</p>
            <SearchFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              onClear={handleClear}
              totalCount={filteredProperties.length}
              searchTerm={searchTerm}
              filters={filters}
            />
            <a href="#properties" className="hero-cta">
              Browse Properties
            </a>
          </div>
        </div>
      </section>

      <div className="home-content">
        <div className="properties-grid" id="properties">
          {filteredProperties.map((property, idx) => (
            <PropertyCard key={property.id} property={property} index={idx} />
          ))}
        </div>
        {filteredProperties.length === 0 && (
          <div className="no-results">
            <h3>No properties found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
