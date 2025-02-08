import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchStockListings } from "../../store/FarmerDashBoard/stocklistingSlice";
import { useDispatch } from "react-redux";
import { myTransportDemand } from "../../store/transportDemandSlice";
import { updateDealData } from "../../store/viewBestDealsSlice";
import { useNavigate } from "react-router-dom";
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
  ArrowRight
} from "lucide-react";
import { getPendingRequest } from "../../store/transReq";
import { fetchNotifications,acceptInvitation } from "../../store/FarmerDashBoard/notificationSlice";

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState("stocks");
  const [expandedStock, setExpandedStock] = useState(null);
  const [expandedTransport, setExpandedTransport] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [pendingrequest,setPendingrequest] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [transportDemands, settransportDemands] = useState([
    {
      id: 1,
      fromLocation: "Nashik, Maharashtra",
      toLocation: "Mumbai Central Market",
      productName: "Premium Tomatoes",
      quantity: 300,
      expectedDate: "2024-03-25",
      status: "accepted",
      transporterDetails: {
        name: "FastTrack Logistics",
        vehicleType: "Refrigerated Truck",
        vehicleNumber: "MH-04-AB-1234",
        contactNumber: "+91 98765 43210",
        rating: 4.8,
      },
      price: 5000,
    },
    {
      id: 2,
      fromLocation: "Nashik, Maharashtra",
      toLocation: "Pune Market",
      productName: "Premium Tomatoes",
      quantity: 300,
      expectedDate: "2024-03-26",
      status: "pending",
    },
    {
      id: 3,
      fromLocation: "Pune, Maharashtra",
      toLocation: "Thane Market",
      productName: "Organic Potatoes",
      quantity: 800,
      expectedDate: "2024-03-28",
      status: "in_transit",
      transporterDetails: {
        name: "Green Miles Transport",
        vehicleType: "Medium Truck",
        vehicleNumber: "MH-12-XY-5678",
        contactNumber: "+91 98765 43211",
        rating: 4.6,
      },
      price: 8000,
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

  const handleGetmypending = async () => {
    try {
      const result = await dispatch(fetchNotifications());
      
      console.log("API Response:", result.payload); // Debugging log
  
      if (result.payload?.myrequest) {
        setPendingrequest(result.payload.myrequest);
      } else {
        console.warn("No 'myrequest' found in API response.");
        setPendingrequest([]); // Ensure it's always an array
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setPendingrequest([]); // Prevents crashes if API call fails
    }
  };
  
  const handleAccept=(id)=>{

    dispatch(acceptInvitation(id));
  }
  const handleOnclickMyDemands = async () => {
    try {
      const result =  dispatch(myTransportDemand());
  
      console.log("API Response:", result); // Debugging log
  
      if (result.payload) {
        settransportDemands(result.payload);
      } else {
        console.warn("Warning: No data received in payload.");
        settransportDemands([]); // Ensures it's always an array
      }
    } catch (error) {
      console.error("Request failed:", error);
      settransportDemands([]); // Prevent crashes in UI
    }
  };
  const handleshopkeeperBestdeals = async (payload) => {
    try {
      console.log("Dispatching payload:", payload);
      await dispatch(updateDealData(payload));
      navigate('/farmerbestdeals');
    } catch (error) {
      console.error("Error updating deal data:", error);
    }
  };
  const handleconsumerBestdeals =(stock) =>{
    navigate('/consumerbestdeals');
  }
  
  


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
            onClick={() => {
              handleOnclickMyDemands();
              setActiveTab("transport")}}
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
             onClick={()=>{handleGetmypending(),setActiveTab('notifications')}}
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
                     
                    </button>
                  </div>
                      <div className="grid grid-cols-2 gap-4 mt-4 md:pr-96">
                        <motion.button
                                           
                                              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r px-2 py-2 from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white  rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                                              whileHover={{ scale: 1.01 }}
                                              whileTap={{ scale: 0.98 }}
                                            onClick={()=>{handleshopkeeperBestdeals(stock)}}>
                                              Shopkeeper BestDeals 
                                            </motion.button>
                                            <motion.button  
                                           
                                           className="w-full flex items-center justify-center gap-2 bg-gradient-to-r  px-2 py-2  from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white  rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                                           whileHover={{ scale: 1.01 }}
                                           whileTap={{ scale: 0.98 }}
                                           onClick={()=>{handleconsumerBestdeals(stock)}}
                                         >
                                           consumer BestDeals 
                                         </motion.button>
                      </div>
                  {/* Progress Bar */}
                  {/* <div className="mt-6">
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
                  </div> */}
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
                          Expected:{" "}
                          {new Date(demand.DepatrureDate
).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          From: {demand.Departlocations?.[0]?.place}
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
                    {demand.transporterDetails && (
                      <button
                        onClick={() =>
                          setExpandedTransport(
                            expandedTransport === demand.id ? null : demand.id
                          )
                        }
                        className="text-gray-400 hover:text-gray-600 ml-4"
                      >
                        {expandedTransport === demand.id ? (
                          <ChevronUp size={24} />
                        ) : (
                          <ChevronDown size={24} />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Expanded Transporter Details */}
                  {expandedTransport === demand.id &&
                    demand.transporterDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-100"
                      >
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <Truck size={20} className="mr-2" />
                          Transporter Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Name:</span>{" "}
                            {demand.transporterDetails.name}
                          </div>
                          <div>
                            <span className="font-medium">Vehicle Type:</span>{" "}
                            {demand.transporterDetails.vehicleType}
                          </div>
                          <div>
                            <span className="font-medium">Vehicle Number:</span>{" "}
                            {demand.transporterDetails.vehicleNumber}
                          </div>
                          <div>
                            <span className="font-medium">Contact:</span>{" "}
                            {demand.transporterDetails.contactNumber}
                          </div>
                          <div>
                            <span className="font-medium">Rating:</span>{" "}
                            {demand.transporterDetails.rating} / 5
                          </div>
                        </div>
                      </motion.div>
                    )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
          className={`p-4 rounded-lg shadow-sm ${
            notification.read
              ? "bg-white"
              : "bg-green-50 border-l-4 border-green-600"
          }`}
        >
          <h1>
            {new Date(notification.DepatrureDate).toLocaleDateString("en-GB")}
          </h1>
          <h2>{notification.Departlocation?.place}</h2>
          <button
            className="border-4"
            onClick={() => {
              handleAccept(notification._id);
            }}
          >
            Accept
          </button>
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
// stock.location?.place