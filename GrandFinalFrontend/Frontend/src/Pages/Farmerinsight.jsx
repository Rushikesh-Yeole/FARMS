  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { motion } from "framer-motion";
  import { Sprout, TrendingUp, AlertCircle } from "lucide-react";
  import { useDispatch } from "react-redux";
  import { fetchStockListings } from "../store/FarmerDashBoard/stocklistingSlice";

  export default function FarmerInsight() {
    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState("");
    const [marketInsights, setMarketInsights] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [maxCrop, setMaxCrop] = useState({crop:"onion"});
    const [crops, setCrops] = useState([
      {
        crop: "onion",
      },
      {
        crop: "potato",
      },
      {
        crop: "tomato",
      },
    ]);
    const [stocks, setStocks] = useState(); // Added missing state

    useEffect(() => {
      const fetchStocks = async () => {
        try {
          const result =  dispatch(fetchStockListings());
          const response = result.payload;

          if (response && response.stocks) {
            setStocks(response.stocks);
            console.log("Stocks fetched in Dashboard:", response.stocks);

            const cropData = response.stocks.map(stock => ({
              crop: stock.crop,
              quantity: stock.quantity,
            }));

            console.log("Extracted Crop Data:", cropData);

            const maxCrop = cropData.length > 0
              ? cropData.reduce((max, crop) => (crop.quantity > max.quantity ? crop : max), cropData[0])
              : null;

            console.log("Crop with highest quantity:", maxCrop);

            setCrops(cropData);
            setMaxCrop(maxCrop);
          } else {
            console.error("No stocks found in response");
            setStocks([]);
            setCrops([]);
            setMaxCrop(null);
          }
        } catch (error) {
          console.error("Error fetching stocks:", error);
          setStocks([]);
          setCrops([]);
          setMaxCrop(null);
        }
      };

      fetchStocks();

      const fetchMarketInsights = async () => {
        try {
          console.log("hii")
          const response = await axios.post("https://farms-engine.onrender.com/insights",{
            region:"a",
            product:"Rice"
          },
          {withCredentials: true}).then(result=>{console.log(result)});
          const data = response.data;

          if (Array.isArray(data)) {
            const insightsMap = {};
            data.forEach(item => {
              insightsMap[item.crop] = {
                message: item.message,
              };
            });
            setMarketInsights(insightsMap);
          }
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch market insights.");
          setLoading(false);
        }
      };

      fetchMarketInsights();
    }, [dispatch]); // Added dependency

    const handleProductChange = (e) => {
      setSelectedProduct(e.target.value);
    };

    if (loading)
      return <p className="text-center text-lg">Loading insights...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sprout className="w-8 h-8 text-green-600" />
              <h1 className="text-4xl font-bold text-green-800">
                Farmer's Market Insights
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Make informed decisions with real-time market analysis
            </p>
          </motion.div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 flex items-center justify-center bg-gray-50">
                <div className="w-full h-full max-h-[500px] relative rounded-2xl overflow-hidden p-4">
                  {selectedProduct && marketInsights[selectedProduct] ? (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      src={marketInsights[selectedProduct].image}
                      alt={selectedProduct}
                      className="w-full h-full object-cover rounded-2xl shadow-lg"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
                      <p className="text-gray-500 text-lg">
                        Select a crop to view details
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Select Your Crop
                  </label>
                  <select
                    value={selectedProduct || (maxCrop ? maxCrop.crop : "")} // Show maxCrop by default if no selection
                    onChange={handleProductChange}
                    className="w-full p-4 border-6 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                  >
                    <option className="text-black" value="">
                      {maxCrop ? ` ${maxCrop.crop}` : "Choose a product"}
                    </option>
                    {crops.map((product, index) => (
                      <option
                        className="text-black"
                        key={index}
                        value={product.crop}
                      >
                        {product.crop}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedProduct && marketInsights[selectedProduct] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div
                      className={`p-6 rounded-lg ${
                        marketInsights[selectedProduct].demand === "high"
                          ? "bg-green-100 border-l-4 border-green-500"
                          : marketInsights[selectedProduct].demand === "medium"
                          ? "bg-yellow-100 border-l-4 border-yellow-500"
                          : "bg-red-100 border-l-4 border-red-500"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {marketInsights[selectedProduct].demand === "high" ? (
                          <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                        )}
                        <div>
                          <h3 className="font-semibold text-lg mb-2">
                            Market Analysis
                          </h3>
                          <p className="text-lg">
                            {marketInsights[selectedProduct].message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }