import React from "react";

const FilterSidebar = ({ isVisible, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 ${
          isVisible ? "left-0" : "-left-full"
        } transition-all duration-300 bg-white p-4 lg:block md:hidden md:w-1/4 lg:static lg:w-auto lg:h-auto z-40`}
        style={{
          height: "100vh",
          width: isVisible
            ? "100vw" // Covers the whole screen on small screens
            : "0",
          maxWidth: "50vw", // Covers 50% of the screen on medium screens
        }}
      >
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Type</label>
          <select
            name="type"
            className="w-full p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Min Price</label>
          <input
            type="number"
            name="minPrice"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          className="w-full bg-red-500 text-white py-2 rounded mb-4"
        >
          Reset Filters
        </button>
        <button
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      {/* Backdrop for Small and Medium Screens */}
      {isVisible && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default FilterSidebar;
