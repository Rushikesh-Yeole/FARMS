import React, { useState } from "react";
const filters = {
  types: ["Fruits", "Vegetables", "Grains", "Rice"],
  quantity: { min: 0, max: 1000 },
  price: { min: 0, max: 100000 },
};

const fruitsAndVeggies = [
  { name: "Mango", img: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg" },
  { name: "Banana", img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" },
  { name: "Potato", img: "/images/potato.jpeg" },
  { name: "Tomato", img: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg" },
  { name: "Carrot", img: "images/carrot.jpeg" },

  { name: "Apple", img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" },
  { name: "Spinach", img: "images/Spinach.jpeg" },
  { name: "Peas", img: "images/peas.jpeg" },
  { name: "Pineapple", img: "images/pineapple.jpeg" },
  { name: "Cucumber", img: "images/cucumber.jpeg" },
  { name: "Orange", img: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg" },
  { name: "Onion", img: "images/onion.jpeg" },
  { name: "Garlic", img: "images/garlic.jpeg" },
  { name: "Papaya", img: "images/papaya.jpeg" },
  { name: "Guava", img: "images/guva.jpeg" },
  
  // New Items
  { name: "Strawberry", img: "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg" },
  { name: "Watermelon", img: "images\watermelon.jpeg" },

];


const products = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  location: `Location ${i + 1}`,
  price: `${(i + 1) * 5000}`,
  quantity: `${(i + 1) * 10}`,
  img: "https://via.placeholder.com/150",
}));

const RetailerHome = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  // const [priceRange, setPriceRange] = useState(50000);
  // const [quantityRange, setQuantityRange] = useState(50);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedType, setSelectedType] = useState("");
  const [quantityRange, setQuantityRange] = useState(filters.quantity);
  const [priceRange, setPriceRange] = useState(filters.price);

  const handleScroll = (direction) => {
    if (direction === "left" && scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    } else if (direction === "right" && scrollIndex < fruitsAndVeggies.length - 10) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  const handleFilter = () => {
    const filtered = products.filter(
      (product) =>
        parseInt(product.price, 10) <= priceRange &&
        parseInt(product.quantity, 10) <= quantityRange
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Filter Section */}
      <aside className="w-1/4 p-4 sticky top-16 bg-white shadow-lg h-screen">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
        
        {/* Type Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Type</h3>
          {filters.types.map((type) => (
            <label key={type} className="block mb-2">
              <input
                type="radio"
                name="type"
                value={type}
                checked={selectedType === type}
                onChange={(e) => setSelectedType(e.target.value)}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>

        {/* Quantity Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Quantity (Kg)</h3>
          <input
            type="range"
            min={filters.quantity.min}
            max={filters.quantity.max}
            value={quantityRange.min}
            onChange={(e) =>
              setQuantityRange({ ...quantityRange, min: Number(e.target.value) })
            }
            className="w-full mb-2"
          />
          <span>Min: {quantityRange.min} Kg</span>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Price Range</h3>
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: Number(e.target.value) })
            }
            className="w-full mb-2 border border-gray-300 p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          onClick={handleFilter}
          className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600"
        >
          Apply Filters
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-green-100">
        {/* Scrollable Horizontal List */}
        <div className="relative mb-6">
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
          >
            {"<"}
          </button>
          <div className="flex ml-12 overflow-hidden space-x-4">
            {fruitsAndVeggies.slice(scrollIndex, scrollIndex + 10).map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-full shadow-lg"
                />
                <span className="mt-2 text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow"
          >
            {">"}
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg flex items-center"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-24 h-24 rounded-lg object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.location}</p>
                <p className="text-sm text-gray-600">Quantity: {product.quantity} Kg</p>
                <p className="text-green-500 font-semibold">{product.price} Tsh</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RetailerHome;
