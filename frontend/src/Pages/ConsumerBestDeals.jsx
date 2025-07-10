import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { consumerbestDeal } from "../store/consumerSlice";
import { requestsupplyconsumer } from "../store/consumerSlice";

const ConsumerBestDeals = () => {
  const [expandedDeals, setExpandedDeals] = useState({});
  const postStock = useSelector((state) => state.postStock);
  const dispatch = useDispatch();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  let farmerStockId = postStock?.stockPostData?.stock?._id;
  if(!farmerStockId) farmerStockId =postStock?.stockPostData?._id;
  console.log(postStock)

  const toggleDealExpansion = (dealId) => {
    setExpandedDeals((prev) => ({
      ...prev,
      [dealId]: !prev[dealId],
    }));
  };

  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatCurrency = (value) => `₹${value.toLocaleString()}`;

  useEffect(() => {
    if (farmerStockId) {
      setLoading(true); // Set loading true before fetching data
      console.log("working")
      dispatch(consumerbestDeal(farmerStockId))
        .then((result) => {
          console.log(result.payload)
          if (result.payload?.filteredDeals?.length > 0) {
            setDeals(result.payload?.filteredDeals); // Update only if deals are found
          }
        })
        .finally(() => {
          setLoading(false); // Ensure loading is set to false after API call
        });
    }
    setLoading(false)
  }, [dispatch,farmerStockId]);
  

 const handleSupplyRequest = (groupId, farmerStockId, maxDistance) => {
     if (!farmerStockId) {
       console.error("Farmer Stock ID is missing!");
       return;
     }
     dispatch(requestsupplyconsumer({ groupId, farmerStockId, maxDistance }));
   };

  if (loading) return <div className="flex justify-center items-center py-20"><div className="animate-spin border-t-4 border-green-600 rounded-full w-16 h-16"></div></div>;

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
          {deals.length === 0 ? (
            <div>No deals found at the moment.</div>
          ) : (
            deals.map((deal, dealIndex) => {
              const mainRetailer = deal.group?.consumers[0]?.crop;
              const isExpanded = expandedDeals[deal.groupId];

              return (
                <motion.div
                  key={deal.groupId
                  }
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
                            {/* <h2 className="text-green-600 font-medium">{mainRetailer}</h2> */}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                          <Star className="w-5 h-5 text-green-600 fill-green-600" />
                          <span className="font-semibold text-green-700">{deal.group?.avgGroupRating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <div className="text-sm text-gray-500">Primary Location</div>
                            <div className="font-medium text-gray-800">{deal.group?.consumers
[0]?.location?.address}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <div className="text-sm text-gray-500">Earliest Delivery</div>
                            <div className="font-medium text-gray-800">
                              {formatDate(deal.group?.consumers[0]?.expectedDeliveryDate)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-xl p-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            
                            
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Total Quantity</div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-green-600" />
                              <span className="text-xl font-bold text-gray-800">
                                {deal.group?.totalQuantity
                                } Kg
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
<div className="grid grid-cols-2 gap-4 mt-4 md:pr-96">
          

                      {/* <button onClick={() => {
                        handleSupplyRequest(deal.group._id, farmerStockId, deal.maxDistance);
                      }}>Request Supply</button> */}

                      </div>
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
                            {deal.group?.consumers.map((consumer, idx) => (
                              <motion.div
                                key={consumer._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-green-100"
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-2">
                                    <Package className="w-5 h-5 text-green-600" />
                                    <span className="font-semibold text-gray-800">Consumer #{idx + 1}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < consumer?.cropGrade
                                          ? 'text-green-500 fill-green-500' : 'text-gray-300'}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500">Location: {consumer.location
?.address
}</div>
                                <div className="font-medium text-gray-800">Delivery Date: {formatDate(consumer.expectedDeliveryDate
)}</div>
                                {/* <div className="font-medium text-gray-800">Price per Quintal: {formatCurrency(consumer.pricePerQuintal)}</div> */}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerBestDeals;
