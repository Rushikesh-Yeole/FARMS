import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Star, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";

const notifications = [
  {
    id: 1,
    type: "farmer_to_retailer",
    farmerName: "Kalpesh Shirsath",
    farmerDetails: {
      contact: "+91 98765 43210",
      location: "Nashik, Maharashtra",
      previousDeals: 12,
      avgRating: 4.5,
      verificationStatus: "verified",
    },
    retailerName: "ABC Store",
    retailerDetails: {
      contact: "+91 98765 12345",
      location: "Mumbai, Maharashtra",
      businessType: "Wholesale",
      avgRating: 4.2,
      gstNumber: "GSTIN12345678",
    },
    productName: "Wheat",
    quantity: "500kg",
    price: "₹25,000",
    date: "2024-02-20",
    status: "pending",
    timestamp: "2024-02-19 14:30",
    dealDetails: {
      paymentTerms: "Advance Payment",
      deliveryMethod: "Supplier Transport",
      quality: "Premium Grade",
    },
  },
];

export default function Notification() {
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});
  const [hiddenCards, setHiddenCards] = useState({}); // Stores hidden notifications

  const handleRatingClick = (notifId, selectedRating) => {
    setRatings((prev) => ({
      ...prev,
      [notifId]: selectedRating,
    }));
    setError((prev) => ({ ...prev, [notifId]: null }));
  };

  const handleSubmit = async (notifId) => {
    if (!ratings[notifId]) {
      setError((prev) => ({ ...prev, [notifId]: "Please select a rating" }));
      return;
    }
    try {
      setLoading((prev) => ({ ...prev, [notifId]: true }));

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Rating submitted successfully!");
      setRatings((prev) => {
        const newRatings = { ...prev };
        delete newRatings[notifId];
        return newRatings;
      });
    } catch (err) {
      setError((prev) => ({
        ...prev,
        [notifId]: "Failed to submit rating. Please try again.",
      }));
      toast.error("Failed to submit rating");
    } finally {
      setLoading((prev) => ({ ...prev, [notifId]: false }));
    }
  };

  const handleNoDeal = (notifId) => {
    setHiddenCards((prev) => ({ ...prev, [notifId]: true })); // Hides the notification
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Notifications</h2>

      <div className="space-y-4">
        {notifications.map((notif) =>
          hiddenCards[notif.id] ? null : (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-5 border border-gray-200"
            >
              <div className="flex items-start gap-3 mb-4">
                <Bell className="text-blue-500 h-5 w-5 mt-1" />
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">
                      {notif.type === "farmer_to_retailer"
                        ? `${notif.farmerName} contacted you regarding a deal`
                        : `${notif.retailerName} contacted you regarding a deal`}
                    </p>
                    {notif.type === "farmer_to_retailer" &&
                      notif.farmerDetails.verificationStatus === "verified" && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                  </div>
                  <p className="text-xs text-gray-500">{notif.timestamp}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-3">
                      Deal Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Product:</span>{" "}
                        {notif.productName}
                      </p>
                      <p>
                        <span className="font-medium">Quantity:</span>{" "}
                        {notif.quantity}
                      </p>
                      <p>
                        <span className="font-medium">Price:</span> {notif.price}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-3">
                      {notif.type === "farmer_to_retailer"
                        ? "Farmer Details"
                        : "Retailer Details"}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Contact:</span>{" "}
                        {notif.type === "farmer_to_retailer"
                          ? notif.farmerDetails.contact
                          : notif.retailerDetails.contact}
                      </p>
                      <p>
                        <span className="font-medium">Rating:</span>{" "}
                        {notif.type === "farmer_to_retailer"
                          ? `${notif.farmerDetails.avgRating} ⭐ (${notif.farmerDetails.previousDeals} deals)`
                          : `${notif.retailerDetails.avgRating} ⭐`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {notif.status === "pending" && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRatingClick(notif.id, star)}
                          disabled={loading[notif.id]}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= (ratings[notif.id] || 0)
                                ? "fill-yellow-400 stroke-yellow-400"
                                : "stroke-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handleSubmit(notif.id)}
                      disabled={!ratings[notif.id] || loading[notif.id]}
                      className={`px-4 py-2 rounded-md text-sm transition-all ${
                        ratings[notif.id] && !loading[notif.id]
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {loading[notif.id] ? "Submitting..." : "Submit Rating"}
                    </button>
                  </div>
                  {error[notif.id] && (
                    <p className="text-red-500 text-sm">{error[notif.id]}</p>
                  )}
                  <button
                    onClick={() => handleNoDeal(notif.id)}
                    className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                  >
                    No Deal
                  </button>
                </div>
              )}
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
