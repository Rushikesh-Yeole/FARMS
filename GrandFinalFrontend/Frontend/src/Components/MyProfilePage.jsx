import react from "react";
import React from "react";
import { Edit, Store, ShoppingBag, Star } from "lucide-react";

const Profile = ({ retailer }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Profile Header */}

      <div className="flex items-center space-x-6 border-b pb-4">
        <img
          src={retailer.profileImg || "https://via.placeholder.com/100"}
          alt="Retailer Profile"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{retailer.name}</h2>
          <p className="text-gray-600">{retailer.storeName}</p>
          <div className="flex items-center space-x-2 text-yellow-500 mt-1">
            <Star className="w-5 h-5" />
            <span className="text-lg font-semibold">{retailer.rating} / 5</span>
          </div>
        </div>
        
        <button className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition">
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around text-center py-6">
        <div>
          <Store className="w-6 h-6 mx-auto text-blue-600" />
          <p className="text-lg font-semibold">{retailer.totalListings}</p>
          <p className="text-gray-600 text-sm">Total Listings</p>
        </div>
        <div>
          <ShoppingBag className="w-6 h-6 mx-auto text-green-600" />
          <p className="text-lg font-semibold">{retailer.soldItems}</p>
          <p className="text-gray-600 text-sm">Sold Items</p>
        </div>
      </div>

      {/* Product Listings */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Listings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {retailer.products.length > 0 ? (
          retailer.products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h4 className="text-lg font-semibold mt-2">{product.name}</h4>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-green-600 font-bold">₹{product.price}/kg</span>
                <button className="text-sm bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300">
                  Manage
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products listed yet.</p>
        )}
      </div>
    </div>
  );
};

// Example data for testing
const sampleRetailer = {
  name: "Rajesh Kumar",
  profileImg: "https://via.placeholder.com/100",
  storeName: "FreshMart",
  rating: 4.5,
  totalListings: 12,
  soldItems: 50,
  products: [
    {
      id: 1,
      name: "Organic Tomatoes",
      img: "https://via.placeholder.com/150",
      description: "Fresh organic tomatoes, direct from the farm.",
      price: 50,
    },
    {
      id: 2,
      name: "Alphonso Mangoes",
      img: "https://via.placeholder.com/150",
      description: "Sweet and juicy Alphonso mangoes.",
      price: 120,
    },
  ],
};

export default function MyProfilePage() {
  return <Profile retailer={sampleRetailer} />;
}
