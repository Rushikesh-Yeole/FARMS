import React, { useState } from "react";
import FHeader from "../components/FarmerHeader";

// Dummy data for stock listings
const stockListings = [
  {
    id: 1,
    stockName: "Pomegranate",
    pictures: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100/0000FF/808080", // Another image
      "https://via.placeholder.com/100/FF0000/FFFFFF", // Another image
    ], 
    quantity: 200, 
    pricePerKg: 120,
    location: "Solapur",
    postDate: "12/12/2024",
    farmerName: "Ramesh Patil",
    phoneNumber: "9123456789",
  },
  {
    id: 2,
    stockName: "Onion",
    pictures: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100/0000FF/808080",
    ], 
    quantity: 500,
    pricePerKg: 20,
    location: "Solapur",
    postDate: "08/12/2024",
    farmerName: "Ramesh Patil",
    phoneNumber: "9123456789",
  },
  {
    id: 3,
    stockName: "Sugarcane",
    pictures: [
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100/FF0000/FFFFFF",
    ], 
    quantity: 1000,
    pricePerKg: 25,
    location: "Solapur",
    postDate: "10/12/2024",
    farmerName: "Ramesh Patil",
    phoneNumber: "9123456789",
  },
];

// Listing Card Component
const ListingCard = ({ stockName, pictures, quantity, location, postDate, pricePerKg, farmerName, phoneNumber }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
   
   
    
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6 hover:shadow-xl transition duration-300 cursor-pointer">
      <div className="flex items-center">
        <div>
          <img
            src={pictures[0]}
            alt={stockName}
            className="h-24 w-24 object-cover rounded-md cursor-pointer"
            onClick={() => handleImageClick(0)} 
          />
        </div>

        <div className="ml-4 flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{stockName}</h2>
          <p className="text-sm text-gray-600">{quantity} kg</p>
          <p className="text-sm text-gray-600">{location}</p>
          <p className="text-sm text-gray-600">{postDate}</p>
        </div>

        <div className="flex flex-col items-end text-right">
          <div className="text-lg font-semibold text-green-600">${pricePerKg} / kg</div>
          <div className="text-sm text-gray-600">{farmerName}</div>
          <div className="text-sm text-gray-600">{phoneNumber}</div>
        </div>
      </div>

      {/* Modal for more images */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={pictures[selectedImage]}
                alt={stockName}
                className="h-64 w-64 object-cover rounded-md"
              />
            </div>
            <div className="flex justify-center mt-4">
              {pictures.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumbnail-${index}`}
                  className={`h-16 w-16 object-cover rounded-md mx-2 cursor-pointer ${index === selectedImage ? 'border-4 border-blue-500' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default function StockListingsPage() {
  // Sort stockListings by postDate (newest first)
  const sortedListings = stockListings.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));

  return (
    <>
   
    <FHeader/>
  
    <div className="bg-green-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto p-8">
        {/* Sub-header style like "Saved" */}
        <div className="bg-gradient-to-r from-blue-100 to-green-200 p-4 rounded-lg shadow-md flex justify-center items-center mb-6">
          <div className="flex items-center space-x-2 justify-center">
            {/* Optional Icon */}
            <div className="h-6 w-6 rounded-full text-slate-600 flex justify-center items-center">
              <span className="text-xl">📦</span>
            </div>
            <h1 className="text-3xl text-center rounded-lg font-bold text-gray-900">Stock</h1>
          </div>
        </div>

        <div className="space-y-6">
          {sortedListings.map((listing) => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
