import React from "react";
import "./SearchFilter.css";

const SearchFilter = ({
  onSearch,
  onFilter,
  onClear,
  totalCount,
  searchTerm,
  filters,
}) => {
  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    onFilter(newFilters);
  };

  return (
    <div className="search-filter">
      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            id="search-input"
            placeholder="Search properties by title, location..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <span
            className="search-icon clickable"
            title="Go to results"
            onClick={() => {
              const el = document.getElementById("properties");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            style={{ cursor: "pointer" }}
          >
            🔍
          </span>
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

        <button onClick={onClear} className="clear-filters">
          Clear
        </button>
      </div>

      <div className="results-count">{totalCount} properties found</div>
    </div>
  );
};

export default SearchFilter;
