import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { bestDeal } from "../store/viewBestDealsSlice";

const FarmerBestDealsPage = () => {
  const [distance, setDistance] = useState("");
  const [showContactMap, setShowContactMap] = useState({});
  const poststockState = useSelector((state) => state.postStock);
  const dispatch = useDispatch();
  const [deals, setDeals] = useState([
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
  ]);
  //////NOTES//////

  // useEffect(() => {
  //   // Check if stock _id exists
  //   if (poststockState?.stockPostData?.stock?._id) {
  //     const requirementId = poststockState.stockPostData.stock._id;

  //     dispatch(bestDeal(requirementId)).then((result) => {
  //       if (result.type === "deals/bestDeals/fulfilled") {
  //         setDeals(result.payload.demandWithScores);
  //       }
  //     });
  //   }
  // }, [poststockState?.stockPostData?.stock?._id, dispatch]);

  // ✅ Issue 1: Missing dependency array
  // This useEffect runs on every render, which is inefficient.
  // It should only run when `poststockState?.stockPostData?.stock?._id` changes.

  // ✅ Issue 2: Potential memory leak
  // If the component unmounts before dispatch completes, updating state will cause errors.
  // We need to prevent state updates on an unmounted component.

  useEffect(() => {
    if (poststockState?.stockPostData?.stock?._id) {
      const requirementId = poststockState.stockPostData.stock._id;
      dispatch(bestDeal(requirementId)).then((result) => {
        if (result.type === "deals/bestDeals/fulfilled") {
          const response = result.payload;
          setDeals(response.demandsWithScores);  
        }
      });
    }
  }, [poststockState?.stockPostData?.stock?._id, dispatch]); 
  

  const toggleContact = (dealId) => {
    setShowContactMap((prev) => ({
      ...prev,
      [dealId]: !prev[dealId],
    }));
  };
  const handleDistanceSubmit = () => {};

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
    key={index}  // Use index if there's no unique ID
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.3, duration: 1 }}
    className="bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
  >
    <div className="flex flex-col md:flex-row">
      {/* Image Section (Use Placeholder for Now) */}
      <div className="w-full md:w-1/3 bg-green-100 md:p-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
        <img
          src="https://via.placeholder.com/150"  // 🔄 Update later if you have product images
          alt={deal.demand.crop}
          className="w-full object-contain rounded-s md:rounded-lg"
        />
        <h3 className="text-xl hidden md:block sm:text-2xl font-bold text-gray-900 text-center mt-2">
          {deal.demand.crop} (Grade {deal.demand.cropGrade})
        </h3>
      </div>

      {/* Deal Details */}
      <div className="flex-1 p-6">
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div className="flex items-center gap-2">
            <h4 className="text-xl font-bold">
              {deal.userId.firstName} {deal.userId.lastName}
            </h4>
            <Star className="text-yellow-500 fill-yellow-500" size={20} />
            <span className="text-lg font-bold">{deal.userId.averageRating}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-green-700" size={20} />
            <span className="text-lg font-bold text-green-700">Best Deal</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="text-gray-800" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-700">Price per Quintal</p>
              <p className="text-lg font-bold">₹{deal.demand.pricePerQuintal}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="text-gray-800" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-700">Quantity</p>
              <p className="text-lg font-bold text-green-700">{deal.demand.quantity} Quintals</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="text-gray-800" size={20} />
            <p className="text-lg font-semibold">{deal.demand.location.address}</p>
          </div>
        </div>

        <div className="grid mt-4 md:mt-6 grid-cols-1 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-800" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-700">Expected Delivery</p>
              <p className="text-lg font-bold">{new Date(deal.demand.expectedDeliveryDate).toDateString()}</p>
            </div>
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

export default FarmerBestDealsPage;
