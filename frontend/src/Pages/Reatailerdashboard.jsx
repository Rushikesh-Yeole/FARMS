import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, ShoppingBag, Star } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { viewMyOrdersThunk, viewSupplierThunk } from "../store/retailerSlice";

export default function RetailerDashboard() {
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [rating, setRating] = useState({});
  const dispatch = useDispatch();

  // Redux store data
  const { myretailerData, loading } = useSelector((state) => state.retailer);

  useEffect(() => {
    dispatch(viewMyOrdersThunk());
  }, [dispatch]);

  const handleOnclickviewSupply = async (id) => {
    try {
      const result = await dispatch(viewSupplierThunk(id)).unwrap();
      console.log("Supplier fetched:", result);
      setSelectedSupplier(result);
    } catch (error) {
      console.error("Error fetching supplier:", error);
    }
  };
  
 const handleNotification =() =>{
  
 }
  const handleRating = (orderId, ratingValue) => {
    setRating((prev) => ({ ...prev, [orderId]: ratingValue }));
    console.log(`Rating ${ratingValue} submitted for order ${orderId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Retailer Dashboard</h1>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "requests" ? "bg-green-600 text-white" : "bg-green-100 text-green-600 hover:bg-green-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Requests
          </div>
        </button>
        <button
          onClick={() => {
            handleNotification();
            setActiveTab("notifications")}}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "notifications" ? "bg-green-600 text-white" : "bg-green-100 text-green-600 hover:bg-green-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </div>
        </button>
      </div>

      {/* Order Requests Section */}
      {activeTab === "requests" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-lg border border-green-200">
          <div className="bg-yellow-50 border-b border-yellow-100 p-4">
            <h2 className="text-lg font-semibold text-yellow-700">Order Requests</h2>
          </div>
          <div className="p-4 space-y-4">
            {loading ? (
              <p>Loading orders...</p>
            ) : myretailerData?.myOrders?.length ? (
              myretailerData.myOrders.map((order) => (
                <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{order.crop}</h3>
                    <span className={`text-sm ${order.locked ? "text-green-600" : "text-yellow-600"}`}>
                      {order.locked ? "Accepted" : "Pending"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Quantity: {order.quantity} Quintals</p>
                  <p className="text-sm text-gray-600">Price: ₹{order.pricePerQuintal} per Quintal</p>
                  <p className="text-sm text-gray-600">Date: {new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
                  {order.locked && (
                    <button
                      onClick={() => handleOnclickviewSupply(order._id)}
                      className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      View Supplier Details
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Notifications Section */}
      {activeTab === "notifications" && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-lg shadow-lg border border-green-200"
        >
          <div className="bg-blue-50 border-b border-blue-100 p-4">
            <h2 className="text-lg font-semibold text-blue-700">Notifications</h2>
          </div>
          <div className="p-4 space-y-4">
            {myretailerData?.completedOrders?.map((order) => (
              <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{order.crop}</h3>
                  <span className="text-green-600">Completed</span>
                </div>
                <p className="text-sm text-gray-600">Quantity: {order.quantity} Quintals</p>
                <p className="text-sm text-gray-600">Price: ₹{order.pricePerQuintal} per Quintal</p>
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700">Rate your experience:</p>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(order._id, star)}
                        className={`transition-colors ${
                          star <= (rating[order._id] || 0) ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {(!myretailerData?.completedOrders || myretailerData.completedOrders.length === 0) && (
              <p className="text-center text-gray-500">No notifications available</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Supplier Details Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Supplier Details</h3>
              <button onClick={() => setSelectedSupplier(null)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <div className="space-y-3">
              <p><span className="font-semibold">Name:</span> {selectedSupplier.firstName} {selectedSupplier.lastName}</p>
              <p><span className="font-semibold">Contact:</span> {selectedSupplier.contactNumber}</p>
              <p><span className="font-semibold">Rating:</span> {selectedSupplier.averageRating}</p>
              <p><span className="font-semibold">Reliability Score:</span> {selectedSupplier.reliabilityScore}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
