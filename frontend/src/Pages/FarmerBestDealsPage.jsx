import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "../assets/animation/Loader"
import {
  Star,
  TrendingUp,
  MapPin,
  Calendar,
  IndianRupee,
  Leaf,
  Package,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { bestDeal,requestsupply } from "../store/viewBestDealsSlice";
import { div } from "framer-motion/client";
import { HiIdentification } from "react-icons/hi";

const FarmerBestDealsPage = () => {
  const [expandedDeals, setExpandedDeals] = useState({});
  
  const dispatch = useDispatch();
  const postStock = useSelector((state) => state.postStock);
  const [deals, setDeals] = useState([ /* Your deals data here */ ]);
  const [loading,setloading]=useState(true);
  const toggleDealExpansion = (dealId) => {
    setExpandedDeals((prev) => ({
      ...prev,
      [dealId]: !prev[dealId],
    }));
  };
  let farmerStockId = useSelector((state) => state.postStock?.stockPostData?.stock?._id);
// const farmerStockId = useSelector((state)=>state.postStock)

  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatCurrency = (value) => `₹${value.toLocaleString()}`;

  useEffect(() => {
     
    if(!farmerStockId){
      farmerStockId = postStock?.stockPostData?._id;
    }
    
    if (!farmerStockId) {
      setloading(false)
      return}
    ;
    
  
  
    dispatch(bestDeal(farmerStockId))
      .then((result) => {
        if (result.payload?.filteredDeals?.length) {
          setDeals(result.payload.filteredDeals); 
        }
      })
      .finally(() => setloading(false)); 
  }, [dispatch, farmerStockId]);

  const handleSupplyRequest = (groupId, farmerStockId, maxDistance) => {
    if (!farmerStockId) {
      console.error("Farmer Stock ID is missing!");
      return;
    }
    dispatch(requestsupply({ groupId, farmerStockId, maxDistance }));
  };
  
  
if(loading) return <Loader/>
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
        
          


        <div className="space-y-8">
          {deals.map((deal, dealIndex) => {
            const mainRetailer = deal.group.retailers[0]?.crop; // Adjust for correct data field
            const isExpanded = expandedDeals[deal.group._id];

            return (
              <motion.div
                key={deal.group._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: dealIndex * 0.1 }}
              >
                
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Leaf className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800">Premium Bulk Deal</h2>
                          <p className="text-green-600 font-medium">{mainRetailer}</p>
                        </div>  
                      </div>
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                        <Star className="w-5 h-5 text-green-600 fill-green-600" />
                        <span className="font-semibold text-green-700">{deal.group.avgGroupRating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <div className="text-sm text-gray-500">Primary Location</div>
                          <div className="font-medium text-gray-800">{deal.group.retailers[0]?.location.address}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <div className="text-sm text-gray-500">Earliest Delivery</div>
                          <div className="font-medium text-gray-800">
                            {formatDate(deal.group.retailers[0]?.expectedDeliveryDate)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 mb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Price per Kg</div>
                          <div className="flex items-center gap-2">
                            <IndianRupee className="w-5 h-5 text-green-600" />
                            <span className="text-xl font-bold text-gray-800">
                              {formatCurrency(deal.group.avgPrice)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Total Quantity</div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <span className="text-xl font-bold text-gray-800">
                              {deal.group.totalQuantity} Kg
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                   <div className="grid grid-cols-2 gap-4 mt-4 md:pr-96">
                   <motion.button
                      onClick={() => toggleDealExpansion(deal.group._id)}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-4 px-6 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isExpanded ? 'Hide shopkeeper' : `View ${deal.group.retailers.length} shopkeeper`}
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </motion.button>
                         {/* <motion.button
                                                               
                                                               className="w-full flex items-center justify-center gap-2 bg-gradient-to-r  px-2 py-2  from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white  rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
                                                               whileHover={{ scale: 1.01 }}
                                                               whileTap={{ scale: 0.98 }}
                                                               onClick={()=>{
                                                                handleSupplyRequest(deal.groupId,farmerStockId,deal.maxDistance)
                                                              }}
                                                             >
                                                                Request for supply
                                                             </motion.button> */}
                   </div>
                    {/* <button > kalpesh</button> */}
                  </div>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-green-100"
                    >
                      <div className="p-6 bg-green-50/50">
                        <div className="space-y-4">
                          {deal.group.retailers.map((retailer, idx) => (
                            <motion.div
                              key={retailer._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-green-100"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <Package className="w-5 h-5 text-green-600" />
                                  <span className="font-semibold text-gray-800">Retailer #{idx + 1}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${i < retailer.cropGrade ? 'text-green-500 fill-green-500' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">Location: {retailer.location.address}</div>
                              <div className="font-medium text-gray-800">Delivery Date: {formatDate(retailer.expectedDeliveryDate)}</div>
                              <div className="font-medium text-gray-800">Price per Quintal: {formatCurrency(retailer.pricePerQuintal)}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FarmerBestDealsPage;
