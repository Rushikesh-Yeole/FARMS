import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchStockListings } from "../../store/FarmerDashBoard/stocklistingSlice";
import { useDispatch } from "react-redux";
import {
  Package,
  Bell,
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  DollarSign,
  Star,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck,
} from "lucide-react";

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("stocks");
  const [expandedStock, setExpandedStock] = useState(null);
  const [expandedTransport, setExpandedTransport] = useState(null);
  const [stocks, setStocks] = useState([]);
  const dispatch = useDispatch();

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "expired":
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "in_progress":
      case "in_transit":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 size={16} className="mr-1" />;
      case "in_progress":
      case "in_transit":
        return <Clock size={16} className="mr-1" />;
      case "pending":
        return <AlertCircle size={16} className="mr-1" />;
      default:
        return null;
    }
  };

  const handlestockListing = () => {
    dispatch(fetchStockListings()).then((result) => {
      const response = result.payload;
      if (response && response.stocks) {
        setStocks(response.stocks);
        console.log("Stocks fetched in Dashboard:", response.stocks);
      } else {
        console.error("No stocks found in response");
        setStocks([]);
      }
    }).catch((error) => {
      console.error("Error fetching stocks:", error);
      setStocks([]);
    });
  };

  useEffect(() => {
    if (activeTab === "stocks") {
      handlestockListing(); // Fetch stocks when 'stocks' tab is active
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen lg:px-44 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your stock listings and track deals</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => {
              setActiveTab("stocks");
            }}
            className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg text-xs sm:font-medium ${
              activeTab === "stocks"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-green-50"
            }`}
          >
            <Package size={20} className="mr-2 hidden sm:block" />
            Stock Listings
          </button>
          <button
            onClick={() => setActiveTab("transport")}
            className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium ${
              activeTab === "transport"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-green-50"
            }`}
          >
            <Truck size={20} className="mr-2 hidden sm:block" />
            Transport Demands
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center border border-gray-300 px-4 py-2 rounded-lg text-xs font-medium ${
              activeTab === "notifications"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-green-50"
            }`}
          >
            <Bell size={20} className="mr-2 hidden sm:block" />
            Notifications
          </button>
        </div>

        {/* Stocks Tab */}
        {activeTab === "stocks" && (
          <div className="space-y-6">
            {stocks.length > 0 ? (
              stocks.map((stock, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden"
                >
                      <div className="p-6  shadow-xl border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center  gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {stock.crop}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(
                            stock.status
                          )}`}
                        >
                          {stock.status ? "Accepted" : "Pending"}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          Posted:{" "}
                          {new Date(stock.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          {stock.location?.address}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} />₹{stock.pricePerKg}/kg
                        </div>
                        <div className="flex items-center gap-2">
                          <Star size={16} />Crop Grade: {stock.cropGrade}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setExpandedStock(
                          expandedStock === stock.id ? null : stock.id
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedStock === stock.id ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </button>
                  </div>
                      
                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex  justify-between text-sm text-gray-600 mb-2">
                      <span>Stock Progress</span>
                      <span>
                        {stock.totalQuantity - stock.remainingQuantity}kg /{" "}
                        {stock.totalQuantity}kg
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{
                          width:90,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                  
                </motion.div>
              ))
            ) : (
              <h1>No stocks available</h1>
            )}
          </div>
        )}

        {/* Transport Demands Tab */}
        {activeTab === "transport" && (
          <div className="space-y-6">
            {/* Add transport demands rendering here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
// stock.location?.place