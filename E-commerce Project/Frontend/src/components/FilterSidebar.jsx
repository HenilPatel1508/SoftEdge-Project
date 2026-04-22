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
    (setSearch(""),
      setCategory("All"),
      setBrand("All"),
      setPriceRange([0, 99999]));
  };
  console.log(UniqueBrands);

  return (
    <div className="bg-gray-100 ml-10 mt-2 p-4 rounded-md h-max hidden md:block w-64">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />
      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {UniqueCategories.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
            />
            <Label>{item}</Label>
          </div>
        ))}
      </div>

      {/* Brands */}
      <h1 className="mt-5 font-semibold text-xl">Brands</h1>
      <select
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
        value={brand}
        onChange={handleBrandChange}
      >
        {UniqueBrands.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item.toUpperCase()}
            </option>
          );
        })}
      </select>

      {/* Price range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label>
          Price Range : ₹{priceRange[0]}-{priceRange[1]}
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={priceRange[0]}
            onChange={handleMinChange}
            min="0"
            max="5000"
            className="w-20 p-1 border border-gray-300 rounded"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={handleMaxChange}
            min="0"
            max="99999"
            className="w-20 p-1 border border-gray-300 rounded"
          />
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          step="200"
          value={priceRange[0]}
          onChange={handleMinChange}
          className="w-full"
        />
        <input
          type="range"
          min="0"
          max="99999"
          value={priceRange[1]}
          onChange={handleMaxChange}
          step="350"
          className="w-full"
        />
      </div>
      {/* reset button */}
      <Button onClick={resetFilters} className="bg-indigo-400 hover:bg-indigo-600 text-white mt-5 cursor-pointer w-full">
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
