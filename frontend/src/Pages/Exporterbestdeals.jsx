import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  MapPin,
  Phone,
  Calendar,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const ExporterbestDeals = () => {
  const [distance, setDistance] = useState("");
  const [showContactMap, setShowContactMap] = useState({});

  const deals = [
    {
      id: 1,
      retailerName: "Karan Chavan",
      retailerType: "Premium Wholesaler",
      productImage:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=2070",
      productName: "Tomatoes",
      rating: 4.8,
      pricePerKg: 45000,
      ratingc:1200,
      location: "Yeola",
      contactNumber: "+91 98765 43210",
      expectedDeliveryDate: "2024-03-25",
      expectedProfitMin: 10000,
      expectedProfitMax: 12000,
      dealScore: 98,
    },
    {
      id: 2,
      retailerName: "Nitish patil",
      retailerType: "Bulk Buyer",
      productImage:
        "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&q=80&w=2070",
      productName: "Potatoes",
      rating: 4.6,
      pricePerKg: 20000,
      ratingc:500,
      location: "Baramati , pune",
      contactNumber: "+91 98765 43211",
      expectedDeliveryDate: "2024-03-24",
      expectedProfitMin: 7500,
      expectedProfitMax: 8500,
      dealScore: 95,
    },
  ];

  const handleDistanceSubmit = (e) => {
    e.preventDefault();
    console.log("Distance submitted:", distance);
  };

  const toggleContact = (dealId) => {
    setShowContactMap((prev) => ({
      ...prev,
      [dealId]: !prev[dealId],
    }));
  };

  return (
    <div className="min-h-screen    border bg-gradient-to-b from-green-50 to-white py-8 px-4 sm:px-1 lg:px-20">
      <div className="max-w-7xl  sm:mx-4 lg:mx-20 ">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Discover Your Best Profit Opportunities
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Our AI-powered system analyzes thousands of deals to bring you the
            most profitable opportunities. Trust in our Deal Score™ - your guide
            to maximum returns.
          </p>
        </motion.div>

        {/* Distance Input Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto mb-10"
        >
          <form
            onSubmit={handleDistanceSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter max distance (km)"
              className="w-full sm:flex-1 px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              Find Deals <ArrowRight size={20} />
            </button>
          </form>
        </motion.div>

        {/* Deals Section */}
        <div className="space-y-6 ">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3, duration: 1 }}
              className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
            
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="w-full md:w-1/3 bg-green-100 md:p-4  flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                  <img
                    src={deal.productImage}
                    alt={deal.productName}
                    className="w    object-contain rounded-s md:rounded-lg"
                  />
                  <h3 className="text-xl hidden md:block sm:text-2xl font-bold text-gray-900 text-center mt-2">
                    {deal.productName}
                  </h3>
                </div>

                {/* Deal Details */}
                <div className="flex-1  p-6">
                  <div className="flex flex-col  sm:flex-row justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xl font-bold">{deal.retailerName}</h4>
                      <Star
                        className="text-yellow-500 fill-yellow-500"
                        size={20}
                      />
                      <span className="text-lg font-bold">{deal.rating}</span>
                      <span className="text-lg font-base">({deal.ratingc})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-green-700" size={20} />
                      <span className="text-lg font-bold text-green-700">
                        Best Deal
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1  sm:grid-cols-2 gap-4 ">
                    <div className="flex  items-center gap-2">
                      <IndianRupee className="text-gray-800" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Price per ton
                        </p>
                        <p className="text-lg font-bold">₹{deal.pricePerKg}</p>
                      </div>
                    </div>

               

                    <div className="flex  items-center gap-2">
                      <MapPin className="text-gray-800" size={20} />
                      <p className="text-lg font-semibold">{deal.location}</p>
                    </div>
                  </div>
                  <div className="grid mt-4 md:mt-6 grid-cols-1 md:grid-cols-2">
                    <div className="flex  items-center gap-2">
                      <Calendar className="text-gray-800" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Expected Delivery Date
                        </p>
                        <p className="text-lg font-bold">
                          {deal.expectedDeliveryDate}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => toggleContact(deal.id)}
                        className="bg-green-100 mt-4 sm:mt-0  hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2"
                      >
                        <Phone size={20} />
                        {showContactMap[deal.id]
                          ? deal.contactNumber
                          : "Show Contact"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExporterbestDeals;