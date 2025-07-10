import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchStockListings } from "../../store/FarmerDashBoard/stocklistingSlice";
import { useDispatch } from "react-redux";
import { myTransportDemand } from "../../store/transportDemandSlice";
import { replaceStockPostData } from "../../store/farmerStockPostSlice";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Bell,
  Calendar,
  MapPin,
  DollarSign,
  Star,
  Truck,
  ArrowRight
} from "lucide-react";
import { fetchNotifications, acceptInvitation } from "../../store/FarmerDashBoard/notificationSlice";

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("stocks");
  const [expandedStock, setExpandedStock] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [pendingrequest, setPendingrequest] = useState([
    {
      _id: "67f4bba0450c110ab9bd2079",
      Departlocation: {
        type: "Point",
        place: "Pimpri Chinchwad Pune Maharashtra",
        coordinates: [18.5204, 73.8567]
      },
      DepatrureDate: "2025-04-21T00:00:00.000Z",
      Destination: {
        type: "Point",
        place: "Swargate Pune Maharashtra",
        coordinates: [18.5204, 73.8567]
      },
      Farmerid: "67dd140ef28f82ea45140df6",
      Transporterid: {
        _id: "67dd5153f28f82ea45140f43",
        firstName: "Kalpesh",
        lastName: "Shirsath"
      },
      completionFlag: false,
      createdAt: "2025-04-08T06:01:04.268Z",
      quantities: 20000,
      updatedAt: "2025-04-08T06:01:04.268Z",
      __v: 0
    }
  ]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Original transport demand object without transporter details.
  const [transportDemands, settransportDemands] = useState([
    {
      _id: "67dd523ef28f82ea45140f4b",
      Departlocations: {
        coordinates: [18.21985375, 74.45340540036307],
        place: "baramati Pune Maharashtra",
        type: "Point"
      },
      DepatrureDate: "2025-03-23T00:00:00.000Z",
      Destination: {
        coordinates: [18.21985375, 74.45340540036307],
        place: "baramati Pune Maharashtra",
        type: "Point"
      },
      FarmerIds: "67dd140ef28f82ea45140df6",
      quantities: 5000,
      requestedTransporters: [],
      createdAt: "2025-03-21T11:49:18.635Z",
      updatedAt: "2025-03-21T11:49:18.635Z",
      __v: 0
    },
  ]);

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

  const handlestockListing = () => {
    dispatch(fetchStockListings())
      .then((result) => {
        const response = result.payload;
        if (response && response.stocks) {
          setStocks(response.stocks);
          console.log("Stocks fetched in Dashboard:", response.stocks);
        } else {
          console.error("No stocks found in response");
          setStocks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching stocks:", error);
        setStocks([]);
      });
  };

  const handleGetmypending = async () => {
    try {
      const result = await dispatch(fetchNotifications());
      console.log("API Response:", result.payload);
      if (result.payload?.myrequest) {
        setPendingrequest(result.payload.myrequest);
      } else {
        console.warn("No 'myrequest' found in API response.");
        setPendingrequest([]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setPendingrequest([]);
    }
  };

  const handleAccept = (id) => {
    dispatch(acceptInvitation(id));
  };

  const handleOnclickMyDemands = () => {
    dispatch(myTransportDemand())
      .then((result) => {
        console.log("API Response:", result);
        const payload = result.payload;
        if (payload) {
          settransportDemands(payload);
        } else {
          console.warn("Warning: No data received in payload.");
          settransportDemands([]);
        }
      })
      .catch((error) => {
        console.error("Request failed:", error);
        settransportDemands([]);
      });
  };
  

  const handleshopkeeperBestdeals = (payload) => {
    try {
      console.log("Dispatching payload:", payload);
      dispatch(replaceStockPostData(payload));
      navigate('/farmerbestdeals');
    } catch (error) {
      console.error("Error updating deal data:", error);
    }
  };

  const handleconsumerBestdeals = (stock) => {
    dispatch(replaceStockPostData(stock));
    navigate('/consumerbestdeals');
  };

  useEffect(() => {
    if (activeTab === "stocks") {
      handlestockListing();
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
            onClick={() => setActiveTab("stocks")}
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
            onClick={() => {
              handleOnclickMyDemands();
              setActiveTab("transport");
            }}
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
            onClick={() => {
              handleGetmypending();
              setActiveTab("notifications");
            }}
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
                  <div className="p-6 shadow-xl border-gray-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
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
                            Posted: {new Date(stock.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            {stock.location?.address}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} />₹{stock.minExpectedPrice}/kg
                          </div>
                          <div className="flex items-center gap-2">
                            <Star size={16} />Crop Grade: {stock.cropGrade}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setExpandedStock(expandedStock === stock.id ? null : stock.id)
                        }
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {/* (Optional icon) */}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 md:pr-96">
                      <motion.button
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r px-2 py-2 from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleshopkeeperBestdeals(stock)}
                      >
                        Shopkeeper BestDeals 
                      </motion.button>
                      <motion.button
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r px-2 py-2 from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleconsumerBestdeals(stock)}
                      >
                        Consumer BestDeals 
                      </motion.button>
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
            {transportDemands.map((demand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Package size={16} />
                          Quantity: {demand.quantities}kg
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          Expected: {new Date(demand.DepatrureDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          From: {demand.Departlocations?.place}
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowRight size={16} />
                          To: {demand.Destination?.place}
                        </div>
                        {demand.price && (
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} />
                            Price: ₹{demand.price}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Removed toggle button for transporter details */}
                  </div>

                  {/* Removed transporter details expanded section */}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
  <div className="space-y-4">
    {pendingrequest.length <= 0 ? (
      <p className="text-gray-500 text-center">No notifications available</p>
    ) : (
      pendingrequest.map((notification) => (
        <motion.div
          key={notification._id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-4 rounded-lg shadow-md border ${
            notification.read
              ? "bg-white border-gray-200"
              : "bg-green-50 border-l-4 border-green-600"
          }`}
        >
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-600">
                Date: {new Date(notification.DepatrureDate).toLocaleDateString("en-GB")}
              </span>
              <span className="text-sm text-gray-700 font-medium">
                From: {notification.Departlocation?.place}
              </span>
              <span className="text-sm text-gray-700 font-medium">
                To: {notification.Destination?.place}
              </span>
              <span className="text-sm text-gray-600">
                Quantity: {notification.quantities}kg
              </span>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <button
                onClick={() => handleAccept(notification._id)}
                className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 transition"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      ))
    )}
  </div>
)}


      </div>
    </div>
  );
};

export default FarmerDashboard;