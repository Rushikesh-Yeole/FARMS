import React from "react";
import {
  Edit,
  Store,
  ShoppingBag,
  Star,
  Package,
  DollarSign,
} from "lucide-react";

// Sample data
const sampleRetailer = {
  id: "1",
  name: "Rajesh Kumar",
  profileImage: "",
  storeName: "FreshMart Organics",
  rating: 4.8,
  totalListings: 25,
  soldItems: 150,
  revenue: 45000,
  products: [
    {
      id: 1,
      name: "Organic Alphonso Mangoes",
      image:
        "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=1000",
      description:
        "Premium grade Alphonso mangoes sourced directly from Ratnagiri farms",
      price: 400,
      stock: 100,
      category: "Fruits",
    },
    {
      id: 2,
      name: "Fresh Green Apples",
      image:
        "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=1000",
      description:
        "Imported Granny Smith apples, perfect blend of sweet and sour",
      price: 220,
      stock: 150,
      category: "Fruits",
    },
    {
      id: 3,
      name: "Organic Tomatoes",
      image:
        "https://images.unsplash.com/photo-1566383444833-43afb88e5dc9?auto=format&fit=crop&q=80&w=1000",
      description: "Farm-fresh organic tomatoes, locally sourced",
      price: 60,
      stock: 200,
      category: "Vegetables",
    },
  ],
};

const StatCard = ({ icon: Icon, value, label }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center">
    <Icon className="w-8 h-8 text-green-600 mb-2" />
    <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
    <p className="text-gray-600 text-sm">{label}</p>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div className="aspect-video w-full overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
          {product.category}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-green-600 font-bold">₹{product.price}/kg</p>
          <p className="text-sm text-gray-500">Stock: {product.stock} kg</p>
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
          Manage
        </button>
      </div>
    </div>
  </div>
);

function RetailerProfile({ retailer }) {
  return (
    <div className="min-h-screen lg:px-44 bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border relative shadow-sm p-6 mb-8">
          <div className="flex items-centerrelative space-x-6">
            <img
              src={retailer.profileImage}
              alt={retailer.name}
              className="w-32 h-32 rounded-full border-4 border-green-500 object-cover"
            />
            <div className="flex md:flex-row   flex-col">
              <div>
                <h1 className="md:text-3xl text-xl font-bold text-gray-900">
                  {retailer.name}
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  {retailer.storeName}
                </p>
                <div className="flex items-center mt-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="ml-2 text-lg font-semibold">
                    {retailer.rating} / 5.0
                  </span>
                </div>
              </div>
              <button className="px-2 top-12 right-20  md:absolute  py-2  bg-green-600 text-white w-32 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors duration-200 shadow-sm">
                <Edit className="w-5 h-5" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Package}
            value={retailer.totalListings}
            label="Total Listings"
          />
          <StatCard
            icon={ShoppingBag}
            value={retailer.soldItems}
            label="Items Sold"
          />
          <StatCard
            icon={DollarSign}
            value={retailer.revenue}
            label="Total Revenue (₹)"
          />
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:2xl font-bold text-gray-900">
              Your Products
            </h2>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
              + Add New Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {retailer.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <RetailerProfile retailer={sampleRetailer} />;
}