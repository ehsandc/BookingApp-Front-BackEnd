import React, { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ onSearch, onFilter, totalCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    maxPrice: '',
    minGuests: '',
    bedrooms: ''
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ maxPrice: '', minGuests: '', bedrooms: '' });
    onSearch('');
    onFilter({});
  };

  return (
    <div className="search-filter">
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search properties by title, location..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <label>Max Price</label>
          <input
            type="number"
            name="maxPrice"
            placeholder="$200"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Min Guests</label>
          <input
            type="number"
            name="minGuests"
            placeholder="2"
            value={filters.minGuests}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            placeholder="1"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="filter-input"
          />
        </div>

        <button onClick={clearFilters} className="clear-filters">
          Clear
        </button>
      </div>

      <div className="results-count">
        {totalCount} properties found
      </div>
    </div>
  );
};

export default SearchFilter;
