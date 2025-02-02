import React, { useEffect, useState } from "react";
// import { useDispatch,useSelector } from "react-redux";
import { motion } from "framer-motion";
import { bestDeal } from "../store/viewBestDealsSlice";
import {
  Star,
  TrendingUp,
  MapPin,
  Phone,
  Calendar,
  DollarSign,
  Award,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useSelector,useDispatch } from "react-redux";
const FarmerBestDealsPage = () => {
  const [distance, setDistance] = useState("");
  const [showContactMap, setShowContactMap] = useState({});
  const dispatch = useDispatch();
  const poststockState = useSelector((state)=>state.postStock)
 
  // useEffect(() => {
  //   // Ensure the state is populated before dispatching
  //   if (poststockState?.stockPostData?.stock?._id) {
  //     dispatch(poststockState.stockPostData.stock._id);
  //   }
  // }, []);
 
    
  


  // Example deals data
  const deals = [
    {
      id: 1,
      retailerName: "Karan Chavan",
      retailerType: "Premium Wholesaler",
      productImage:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=2070",
      productName: "Tomatoes",
      rating: 4.8,
      pricePerKg: 45,
      location: "Mumbai Central Market",
      contactNumber: "+91 98765 43210",
      expectedDeliveryDate: "2024-03-25",
      expectedProfitMin: 10000,
      expectedProfitMax: 12000,
      dealScore: 98,
    },
    {
      id: 2,
      retailerName: "City Grocers",
      retailerType: "Bulk Buyer",
      productImage:
        "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&q=80&w=2070",
      productName: "Potatoes",
      rating: 4.6,
      pricePerKg: 30,
      location: "Pune Wholesale Market",
      contactNumber: "+91 98765 43211",
      expectedDeliveryDate: "2024-03-24",
      expectedProfitMin: 7500,
      expectedProfitMax: 8500,
      dealScore: 95,
    },
  ];


  useEffect(()=>{
    // Check if stock _id exists and dispatch the bestDeal thunk
    if (poststockState?.stockPostData?.stock?._id) {
      const requirementId = poststockState.stockPostData.stock._id;
      dispatch(bestDeal(requirementId));  // Dispatch the async action with the stock ID
    }
  })
  

  const toggleContact = (dealId) => {
    setShowContactMap((prev) => ({
      ...prev,
      [dealId]: !prev[dealId],
    }));
  };

  const handleDistanceSubmit = (event) => {
    event.preventDefault();
    console.log("Distance form submitted!");
};

  return (
    <div className="min-h-screen  lg:px-40 bg-gradient-to-b from-green-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center  mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 font-[Poppins]">
            Discover Your Best Profit Opportunities
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-[Inter]">
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
          className="max-w-md mx-auto mb-12"
        >
          <form onSubmit={handleDistanceSubmit} className="flex gap-4">
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter maximum distance (km)"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              Find Deals
              <ArrowRight size={20} />
            </button>
          </form>
        </motion.div>

        {/* Deals Section */}
        <div className="space-y-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl  shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative"
            >
              <div className="flex ">
                {/* Left Section - Retailer Info & Image */}
                <div className="w-1/4 bg-green-100 p-4 flex  flex-col items-center justify-center border-r border-gray-100">
                  <img
                    src={deal.productImage}
                    alt={deal.productName}
                    className=" object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 text-center font-[Poppins] mb-2">
                    {deal.productName}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 text-center">
                    {deal.retailerType}
                  </p>
                </div>

                {/* Right Section - Deal Details */}
                <div className="flex-1 p-6 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                    <h4 className="text-2xl font-bold text-gray-900 text-center ">
                    {deal.retailerName}
                  </h4>
                      <Star
                        className="text-yellow-500 fill-yellow-500"
                        size={28}
                      />
                      <span className="text-xl font-bold text-gray-900">
                        {deal.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-green-700" size={28} />
                      <span className="text-xl font-bold text-green-700">
                        Best Deal
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <DollarSign
                        className="text-gray-800"
                        size={24}
                        strokeWidth={2.5}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Price per kg
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          ₹{deal.pricePerKg}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <TrendingUp
                        className="text-gray-800"
                        size={24}
                        strokeWidth={2.5}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Expected Profit
                        </p>
                        <p className="text-lg font-bold text-green-700">
                          ₹{deal.expectedProfitMin.toLocaleString()} - ₹
                          {deal.expectedProfitMax.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin
                        className="text-gray-800 "
                        size={24}
                        strokeWidth={2.5}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Location
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {deal.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleContact(deal.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                      >
                        <Phone
                          className="text-green-700"
                          size={20}
                          strokeWidth={2.5}
                        />
                        <span className="font-semibold">
                          {showContactMap[deal.id]
                            ? deal.contactNumber
                            : "Show Contact"}
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar
                        className="text-gray-800"
                        size={24}
                        strokeWidth={2.5}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Expected Delivery
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {new Date(
                            deal.expectedDeliveryDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Best Deal Tag */}
                  {deal.dealScore >= 95 && (
                    <div className="absolute top-4 right-4">
                      {/* <div className="bg-gradient-to-br from-amber-500 via-amber-400 to-yellow-400 text-white px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2 transform rotate-2">
                        <Award size={20} className="fill-white" />
                        Premium Deal
                      </div> */}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerBestDealsPage;
