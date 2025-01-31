// import React, { useState } from "react";
import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Package,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";

import VCarousel from "../Components/VCarousel";
import VRBestDealTag from "../Components/VRBestDealTag";
import CartToggle from "../Components/CartToggle";
import VRcard from "../Components/VRcard";
const filters = {
  types: ["Fruits", "Vegetables", "Grains"],
  quantity: { min: 0, max: 1000 },
  price: { min: 0, max: 100000 },
};

const products = [
  {
    id: 3,
    name: "Potato",
    location: "Indapur",
    price: "200",
    quantity: "500",
    img: "/images/potato.jpeg",
    type: "Vegetables",
    mobile: "7588488221",
  },
  {
    id: 4,
    name: "Tomato",
    location: "Nashik",
    price: "400",
    quantity: "300",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
    type: "Vegetables",
    mobile: "7588488221",
  },
  {
    id: 5,
    name: "Carrot",
    location: "Solapur",
    price: "250",
    quantity: "200",
    img: "images/carrot.jpeg",
    type: "Vegetables",
    mobile: "7588488221",
  },

  {
    id: 7,
    name: "Spinach",
    location: "Satara",
    price: "150",
    quantity: "100",
    img: "images/Spinach.jpeg",
    type: "Vegetables",
    mobile: "7588488221",
  },
  {
    id: 8,
    name: "Peas",
    location: "Kholapur",
    price: "350",
    quantity: "250",
    img: "images/peas.jpeg",
    type: "Vegetables",
    mobile: "7588488221",
  },
  {
    id: 9,
    name: "Pineapple",
    location: "Nanded",
    price: "700",
    quantity: "50",
    img: "images/pineapple.jpeg",
    type: "Fruits",
    mobile: "9604483028",
  },
  {
    id: 10,
    name: "Cucumber",
    location: "Mumbai",
    price: "300",
    quantity: "400",
    img: "images/cucumber.jpeg",
    type: "Vegetables",
    mobile: "7588488221",
  },
  {
    id: 11,
    name: "Orange",
    location: "Kalyan",
    price: "500",
    quantity: "350",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg",
    type: "Fruits",
    mobile: "9604483028",
  },
  {
    id: 12,
    name: "Onion",
    location: "Thane",
    price: "200",
    quantity: "600",
    img: "images/onion.jpeg",
    type: "Vegetables",
    mobile: "7588488221",
  },
  {
    id: 6,
    name: "Apple",
    location: "Sangli",
    price: "600",
    quantity: "150",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
    type: "Fruits",
    mobile: "9604483028",
  },
  {
    id: 2,
    name: "Banana",
    location: "Baramati",
    price: "300",
    quantity: "100",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg",
    type: "Fruits",
    mobile: "9604483028",
  },
  {
    id: 1,
    name: "Mango",
    location: "Pune",
    price: "500",
    quantity: "50",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg",
    type: "Fruits",
    mobile: "9604483028",
  },
];

const VRfeed = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterCriteria, setFilterCriteria] = useState({
    type: "All",
    minPrice: 0,
    maxPrice: 100000,
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Initially hidden
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const applyFilters = () => {
    const { type, minPrice, maxPrice } = filterCriteria;
    const filtered = products.filter((product) => {
      return (
        (type === "All" || product.type === type) &&
        product.price >= minPrice &&
        product.price <= maxPrice
      );
    });
    setFilteredProducts(filtered);
    setIsFilterVisible(false); // Close sidebar after applying filters
  };

  const resetFilters = () => {
    setFilterCriteria({
      type: "All",
      minPrice: 0,
      maxPrice: 100000,
    });
    setFilteredProducts(products);
  };

  const renderSection = (type) => {
    const items = filteredProducts.filter((product) => product.type === type);

    return (
      <div className="pt-4 ">
        <h2 className="text-xl ml-4  font-bold mb-4">{type}</h2>
        <div
          className="flex  p-2 overflow-x-auto"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
          }}
        >
          <style>
            {`
              .flex::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {items.map((item) => (
            <VRcard key={item.id} product={item} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile View Search Bar */}
      {/* <button className="bg-red-500 border-4 border-black w-full h-32"
      onClick={()=>{
        console.log()}}


      ></button> */}
      <VCarousel/>
      <div className="w-full my-4 p-3 ">
        <div className="flex items-center w-full">
          <input
            type="text"
            className="flex-grow p-2 border  rounded"
            placeholder="Search..."
          />
          <button
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => {
              console.log("Clicked");
              alert("Button Clicked!"); // Add an alert
              setIsFilterVisible(true);
            }}
          >
            Open Filter
          </button>
        </div>
      </div>
          
      <div className="flex relative  justify-center">
        {/* Filters Section (Sidebar) */}
        {isFilterVisible && (
          //  <div
          //  className={`lg:hidden fixed  inset-0 bg-gray-800 bg-opacity-50 z-40 transition-all duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          // >
          <div
            className={`fixed top-0 left-0 w-3/4 h-full transition-transform duration-300 bg-white p-4 z-50 lg:hidden ${
              isFilterVisible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Back Button */}
            <button
              className="absolute left-2 top-1 text-5xl font-bold text-gray-700 hover:text-gray-900 "
              onClick={() => setIsFilterVisible(false)}
            >
              &larr;
            </button>
            <h2 className="text-xl font-bold mb-4 mt-10">Filters</h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Type</label>
              <select
                name="type"
                value={filterCriteria.type}
                onChange={handleFilterChange}
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
                value={filterCriteria.minPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Max Price</label>
              <input
                type="number"
                name="maxPrice"
                value={filterCriteria.maxPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={resetFilters}
              className="w-full bg-red-500 text-white py-2 rounded mb-4"
            >
              Reset Filters
            </button>
            <button
              onClick={applyFilters}
              className="w-full bg-green-500 text-white py-2 rounded"
            >
              Apply Filters
            </button>
          </div>
        )}

        {/* Filters Section (Desktop) */}
        <div
          className={`bg-white p-4 hidden lg:block md:hidden md:w-1/4 md:h-screen md:p-4`}
        >
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Type</label>
            <select
              name="type"
              value={filterCriteria.type}
              onChange={handleFilterChange}
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
              value={filterCriteria.minPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Max Price</label>
            <input
              type="number"
              name="maxPrice"
              value={filterCriteria.maxPrice}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={resetFilters}
            className="w-full bg-red-500 text-white py-2 rounded mb-4"
          >
            Reset Filters
          </button>
          <button
            onClick={applyFilters}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Apply Filters
          </button>
        </div>

        {/* Products Feed */}
        <div className="w-full md:w-3/4 lg:w-3/4">
          {renderSection("Vegetables")}
          {renderSection("Fruits")}
        </div>
      </div>
    </>
  );
};

export default VRfeed;
