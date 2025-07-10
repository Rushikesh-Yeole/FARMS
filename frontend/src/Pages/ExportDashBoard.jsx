import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, ShoppingBag, Star } from "lucide-react";

export default function ExporterDashboard() {
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [rating, setRating] = useState(0);

  const dummyOrders = [
    { _id: "1", crop: "Wheat", quantity: 10, pricePerQuintal: 2000, expectedDeliveryDate: "2025-02-15", locked: true },
    { _id: "2", crop: "Rice", quantity: 15, pricePerQuintal: 1800, expectedDeliveryDate: "2025-02-20", locked: false },
  ];

  const dummyNotifications = [
    { _id: "1", crop: "Wheat", quantity: 10, pricePerQuintal: 2000, status: "Completed" },
  ];

  const dummySupplier = {
    firstName: "vivek",
    lastName: "falke",
    contactNumber: "9876543210",
    averageRating: 4.5,
    reliabilityScore: 90,
  };

  const handleRating = (orderId, ratingValue) => {
    // console.log(rating ${ratingValue} submitted for order ${orderId});
  };
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Retailer Dashboard</h1>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "requests" ? "bg-green-600 text-white" : "bg-green-100 text-green-600 hover:bg-green-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> Order Requests
          </div>
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "notifications" ? "bg-green-600 text-white" : "bg-green-100 text-green-600 hover:bg-green-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" /> Notifications
          </div>
        </button>
      </div>

      {activeTab === "requests" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-lg border border-green-200 p-4">
          {dummyOrders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow mb-4">
              <h3 className="font-semibold">{order.crop}</h3>
              <p className="text-sm text-gray-600">Quantity: {order.quantity} Quintals</p>
              <p className="text-sm text-gray-600">Price: ₹{order.pricePerQuintal} per Quintal</p>
              <p className="text-sm text-gray-600">Date: {new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
              {order.locked && (
                <button
                  onClick={() => setSelectedSupplier(dummySupplier)}
                  className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  View Supplier Details
                </button>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === "notifications" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-lg border border-green-200 p-4">
          {dummyNotifications.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow mb-4">
              <h3 className="font-semibold">{order.crop}</h3>
              <p className="text-sm text-gray-600">Quantity: {order.quantity} Quintals</p>
              <p className="text-sm text-gray-600">Price: ₹{order.pricePerQuintal} per Quintal</p>
              <p className="text-green-600">{order.status}</p>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => handleRating(order._id, star)} className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
                    <Star className="h-6 w-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {selectedSupplier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Supplier Details</h3>
              <button onClick={() => setSelectedSupplier(null)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <p><span className="font-semibold">Name:</span> {selectedSupplier.firstName} {selectedSupplier.lastName}</p>
            <p><span className="font-semibold">Contact:</span> {selectedSupplier.contactNumber}</p>
            <p><span className="font-semibold">Rating:</span> {selectedSupplier.averageRating}</p>
            <p><span className="font-semibold">Reliability Score:</span> {selectedSupplier.reliabilityScore}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}