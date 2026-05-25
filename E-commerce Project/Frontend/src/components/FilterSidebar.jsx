import React from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const FilterSidebar = ({
  search,
  setSearch,
  brand,
  setBrand,
  category,
  setCategory,
  setPriceRange,
  allProducts,
  priceRange,
}) => {
  const Categories = allProducts.map((p) => p.category);
  const UniqueCategories = ["All", ...new Set(Categories)];

  const Brands = allProducts.map((p) => p.brand);
  const UniqueBrands = ["All", ...new Set(Brands)];

  const handleCategoryClick = (val) => {
    setCategory(val);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) setPriceRange([priceRange[0], value]);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 99999]);
  };

  return (
    
    <div className="bg-white shadow-lg border border-gray-200 ml-10 mt-4 p-6 rounded-2xl h-max hidden md:block w-72 sticky top-4 self-start">
      
      {/* Search */}
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Search Product
      </h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="bg-gray-50 p-3 rounded-xl border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      {/* Category */}
      <h2 className="mt-6 font-semibold text-lg text-gray-800">
        Categories
      </h2>
      <div className="flex flex-col gap-3 mt-3">
        {UniqueCategories.map((item, index) => (
          <label
            key={index}
            className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg transition ${
              category === item
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
              className="accent-indigo-500"
            />
            <Label className="cursor-pointer">{item}</Label>
          </label>
        ))}
      </div>

      {/* Brands */}
      <h2 className="mt-6 font-semibold text-lg text-gray-800">
        Brands
      </h2>
      <select
        className="bg-gray-50 w-full p-3 border border-gray-300 rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={brand}
        onChange={handleBrandChange}
      >
        {UniqueBrands.map((item, index) => (
          <option key={index} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Price Range */}
      <h2 className="mt-6 font-semibold text-lg text-gray-800">
        Price Range
      </h2>
      <div className="mt-3 flex flex-col gap-3">
        <p className="text-sm text-gray-600 font-medium">
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </p>

        <div className="flex gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={handleMinChange}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <input
          type="range"
          min="0"
          max="5000"
          step="200"
          value={priceRange[0]}
          onChange={handleMinChange}
          className="w-full accent-indigo-500"
        />

        <input
          type="range"
          min="0"
          max="99999"
          step="350"
          value={priceRange[1]}
          onChange={handleMaxChange}
          className="w-full accent-indigo-500"
        />
      </div>

      {/* Reset Button */}
      <Button
        onClick={resetFilters}
        className="bg-indigo-500 hover:bg-indigo-600 text-white mt-6 w-full rounded-xl py-3"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;