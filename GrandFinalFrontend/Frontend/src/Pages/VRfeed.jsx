import React, { useState } from "react";
import VRBestDealTag from "../Components/VRBestDealTag";
import CartToggle from "../Components/CartToggle";
const filters = {
  types: ["Fruits", "Vegetables", "Grains"],
  // fruits:["Mango,Banana,"],
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
      <div className="  pl-4 pt-4">
        <h2 className="text-xl font-bold  mb-4">{type}</h2>
        <div
          className="flex  overflow-x-auto"
          style={{
            scrollBehavior: "smooth", // Enables smooth scrolling
            scrollbarWidth: "none", // Hides scrollbar for Firefox
          }}
        >
          <style>
            {`
              /* Hide scrollbar for Webkit browsers like Chrome, Safari, Edge */
              .flex::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {items.map((item) => (
            <div
              key={item.id}
              className="p-2 w-60 md:w-61 lg:w-63 border-[1.4px] border-solid bg-white  relative mr-4 rounded-lg flex-shrink-0"
            >
              <VRBestDealTag />
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full border h-40 object-contain rounded-lg z-0"
                />
              </div>
              <h3 className="mt-4 font-semibold text-lg text-gray-900">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">{item.location}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold text-green-700">
                  ₹{item.price}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ₹{Math.floor(item.price * 1.5)}
                </span>
              </div>
              <p className="text-sm text-green-600">
                Save ₹{Math.floor(item.price * 0.5)}
              </p>
              <div className="flex items-center gap-3 p-1 mt-4">
                <button className="bg-green-600 w-full text-white font-medium text-sm px-2 py-2 rounded-lg hover:bg-green-700 transition">
                  Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-800 w-full font-medium text-sm px-2 py-2 rounded-lg hover:bg-gray-300 transition">
                  See More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex  bg-slate-50 justify-center">
      {/* <div classname=" border-2 border-black w-full" >hi bdlhdewjblehd ewdhew kd ewd dhke</div> */}
      {/* Products Feed */}
      <div className="w-9/12 pl-4 border-black">
        {renderSection("Vegetables")}
        {renderSection("Fruits")}
      </div>
    </div>
  );
};

export default VRfeed;

{
  /* Filters Section */
}
//   <div className="w-1/4 p-4 bg-gray-100">
//     <h2 className="text-xl font-bold mb-4">Filters</h2>
//     <div className="mb-4">
//       <label className="block mb-2 font-semibold">Type</label>
//       <select
//         name="type"
//         value={filterCriteria.type}
//         onChange={handleFilterChange}
//         className="w-full p-2 border rounded"
//       >
//         <option value="All">All</option>
//         <option value="Fruits">Fruits</option>
//         <option value="Vegetables">Vegetables</option>
//       </select>
//     </div>
//     <div className="mb-4">
//       <label className="block mb-2 font-semibold">Min Price</label>
//       <input
//         type="number"
//         name="minPrice"
//         value={filterCriteria.minPrice}
//         onChange={handleFilterChange}
//         className="w-full p-2 border rounded"
//       />
//     </div>
//     <div className="mb-4">
//       <label className="block mb-2 font-semibold">Max Price</label>
//       <input
//         type="number"
//         name="maxPrice"
//         value={filterCriteria.maxPrice}
//         onChange={handleFilterChange}
//         className="w-full p-2 border rounded"
//       />
//     </div>
//     <button
//       onClick={resetFilters}
//       className="w-full bg-red-500 text-white py-2 rounded mb-4"
//     >
//       Reset Filters
//     </button>
//     <button
//       onClick={applyFilters}
//       className="w-full bg-green-500 text-white py-2 rounded"
//     >
//       Apply Filters
//     </button>
//   </div>
