import React, { useState } from "react";

const filters = {
  types: ["Fruits", "Vegetables"],
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
  { name: "Strawberry", img: "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg" },
  { name: "Watermelon", img: "images/watermelon.jpeg" },
];

const products = [
  { id: 1, name: "Mango", location: "Pune", price: "500", quantity: "50", img: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg" , type:"Fruits" ,mobile:"9604483028"},
  { id: 2, name: "Banana", location: "Baramati", price: "300", quantity: "100", img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg"  , type:"fruit" ,mobile:"9604483028"},
  { id: 3, name: "Potato", location: "Indapur", price: "200", quantity: "500", img: "/images/potato.jpeg" , type:"Vegetables" ,mobile:"7588488221" },
  { id: 4, name: "Tomato", location: "Nashik", price: "400", quantity: "300", img: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg" , type:"Vegetables" ,mobile:"7588488221" },
  { id: 5, name: "Carrot", location: "Solapur", price: "250", quantity: "200", img: "images/carrot.jpeg"  , type:"Vegetables" ,mobile:"7588488221"},
  { id: 6, name: "Apple", location: "Sangli", price: "600", quantity: "150", img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" , type:"Fruits" ,mobile:"9604483028" },
  { id: 7, name: "Spinach", location: "Satara", price: "150", quantity: "100", img: "images/Spinach.jpeg"  , type:"Vegetables" ,mobile:"7588488221"},
  { id: 8, name: "Peas", location: "Kholapur", price: "350", quantity: "250", img: "images/peas.jpeg" },
  { id: 9, name: "Pineapple", location: "Nanded", price: "700", quantity: "50", img: "images/pineapple.jpeg"  , type:"Fruits" ,mobile:"9604483028"},
  { id: 10, name: "Cucumber", location: "Mumbai", price: "300", quantity: "400", img: "images/cucumber.jpeg"  , type:"Vegetables" ,mobile:"7588488221"},
  { id: 11, name: "Orange", location: "Kalyan", price: "500", quantity: "350", img: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg"  , type:"Fruits" ,mobile:"9604483028"},
  { id: 12, name: "Onion", location: "Thane", price: "200", quantity: "600", img: "images/onion.jpeg"  , type:"Vegetables" ,mobile:"7588488221"},
];

const RetailerHome = () => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedType, setSelectedType] = useState("");
  const [quantityRange, setQuantityRange] = useState(filters.quantity);
  const [priceRange, setPriceRange] = useState(filters.price);
  const [popupProduct, setPopupProduct] = useState(null);
  const [location,setLocation]=useState(null);

  const handleScroll = (direction) => {
    if (direction === "left" && scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    } else if (direction === "right" && scrollIndex < fruitsAndVeggies.length - 5) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  const handleFilter = () => {
    const filtered = products.filter((product) => {
      const withinPrice = parseInt(product.price, 10) <= priceRange.max && parseInt(product.price, 10) >= priceRange.min;
      const withinQuantity = parseInt(product.quantity, 10) <= quantityRange.max && parseInt(product.quantity, 10) >= quantityRange.min;
      const matchesType = selectedType ? product.type === selectedType : true;
      const locationmatched=(location==null)?true:location==product.location;
      return withinPrice && withinQuantity && matchesType &&locationmatched;
    });
    setFilteredProducts(filtered);
  };

  const handleProductClick = (product) => {
    setPopupProduct(product);
  };

  const closePopup = () => {
    setPopupProduct(null);
  };
  return (
    <div className="flex  bg-green-200 min-h-screen">
      <aside className="w-1/4 p-4 sticky top-16 bg-white shadow-lg h-screen">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
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
        <div className="mb-6">
        <h3 className="font-medium mb-2">Location</h3>
        <input
            type="text"
            placeholder="Location"
            // value={priceRange.min}
            onChange={(e) => setLocation(e.target.value)}

            className="w-full mb-2 border border-gray-300 p-2 rounded"
          />
        
        </div>
        <button
          onClick={handleFilter}
          className="w-full bg-green-500 text-white  py-2 rounded-lg mt-4 hover:bg-green-600"
        >
          Apply Filters
        </button>
      </aside>

      <main className="flex-1 p-4 bg-green-100">
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

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg flex items-center"
              onClick={() => handleProductClick(product)}
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
                <p className="text-green-500 font-semibold">₹{product.price}</p>

              </div>
            </div>
          ))}
        </div>
        {popupProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 mt-20 rounded-lg shadow-lg w-10/12 md:w-1/3">
      <h2 className="text-lg font-bold mb-2 text-center">{popupProduct.name}</h2>
      <img
        src={popupProduct.img}
        alt={popupProduct.name}
        className="w-full h-44 object-contain rounded-lg mb-2" // Change object-cover to object-contain
      />
      <p className="text-sm mb-1"><strong>Location:</strong> {popupProduct.location}</p>
      <p className="text-sm mb-1"><strong>Price:</strong>₹{popupProduct.price} </p>
      <p className="text-sm mb-2"><strong>Quantity:</strong> {popupProduct.quantity} Kg</p>
      <div className="bg-green-50 border border-green-300 p-4 rounded-lg text-center mb-2">
        <h3 className="text-green-600 font-bold text-lg mb-2">Contact the Farmer</h3>
        <p className="text-green-500 font-semibold text-sm">📞 {popupProduct.mobile}</p>
      </div>
      <button
        onClick={closePopup}
        className="block mx-auto bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
      >
        Close
      </button>
    </div>
  </div>
)}



      </main>
    </div>
  );
};


export default RetailerHome;    