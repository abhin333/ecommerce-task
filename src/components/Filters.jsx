import "../styles/Filters.css"; // Importing our custom stylesheet

const Filters = ({
  categories,
  brands,
  filters,
  setFilters,
}) => {
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleMinPriceChange = (e) => {
    setFilters({ ...filters, minPrice: e.target.value });
  };

  const handleMaxPriceChange = (e) => {
    setFilters({ ...filters, maxPrice: e.target.value });
  };

  const handleBrandChange = (brand) => {
    const updatedBrands = filters.brand.includes(brand)
      ? filters.brand.filter((item) => item !== brand)
      : [...filters.brand, brand];

    setFilters({ ...filters, brand: updatedBrands });
  };

  const handleClearAll = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      brand: [],
    });
  };

  return (
    <aside className="filters-sidebar">
      <div className="filters-header">
        <h2>Filters</h2>
        <button className="clear-all-btn" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      {/* Category Section */}
      <div className="filter-group">
        <h3>Category</h3>
        <div className="select-wrapper">
          <select value={filters.category} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range Section */}
      <div className="filter-group">
        <h3>Price Range</h3>
        <div className="price-range-inputs">
          <div className="price-input-box">
            <span>$</span>
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleMinPriceChange}
            />
          </div>
          <span className="price-separator">to</span>
          <div className="price-input-box">
            <span>$</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </div>

      {/* Brand Checkboxes Section */}
      <div className="filter-group">
        <h3>Brands</h3>
        <div className="checkbox-list">
          {brands.map((brand) => (
            <label key={brand} className="checkbox-label">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <span className="checkbox-text">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filters;