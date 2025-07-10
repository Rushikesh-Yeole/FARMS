import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Sprout, TrendingUp, AlertCircle, List } from "lucide-react";
import { useDispatch } from "react-redux";
import { viewMyOrdersThunk } from "../store/retailerSlice";

export default function Retailerinsight() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [marketInsights, setMarketInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState(null);
  const [crops, setCrops] = useState(["papaya", "sugarcane", "jowar"]);
  const [narrowInsights, setNarrowInsights] = useState(null);
  const [narrowLoading, setNarrowLoading] = useState(false);
  const [narrowError, setNarrowError] = useState(null);

  const cropImages = {
    onion: "images/onion.jpeg",
    potato: "images/potato.jpeg",
    tomato: "images/tomato.jpeg",
    rice: "images/rice.jpg",
    sugarcane: "images/sugercane.jpg",
    custerd: "images/custered.jpg",
    papaya: "images/papaya.jpeg",
    jowar: "images/jowar.png",
  };

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const result = await dispatch(viewMyOrdersThunk());
        const response = result.payload;
        if (response && response.myOrders) {
          const cropList = response.myOrders.map((stock) => stock.crop);
          setCrops(cropList);
          setRegion(response.myOrders[0]?.location?.address || "beed");
          const maxCrop = response.myOrders.reduce(
            (max, stock) => (stock.quantity > max.quantity ? stock : max),
            response.myOrders[0]
          );
          setSelectedProduct(maxCrop?.crop || "");
        }
      } catch (error) {
        console.error("Error fetching stocks:", error);
        setCrops([]);
      }
    };
    fetchStocks();
  }, [dispatch]);

  useEffect(() => {
    const fetchMarketInsights = async () => {
      setLoading(true);
      try {
        console.log(selectedProduct);
        const response = await axios.post(
          "https://farms-engine.onrender.com/insights",
          { region: "beed", product: "papaya" },
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        console.log(response.data);
        setMarketInsights(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch market insights.");
      }
      setLoading(false);
    };
    fetchMarketInsights();
  }, [selectedProduct]);

  useEffect(() => {
    const fetchNarrowInsights = async () => {
      setNarrowLoading(true);
      try {
        const response = await axios.get(
          "https://farms-engine.onrender.com/narrowInsights/6799016d06a2f18aaae17152"
        );
        setNarrowInsights(response.data);
        console.log(response.data);
        setNarrowError(null);
      } catch (err) {
        setNarrowError("Failed to fetch narrow insights");
      }
      setNarrowLoading(false);
    };
    fetchNarrowInsights();
    const intervalId = setInterval(() => {
      fetchNarrowInsights();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

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
            <h1 className="text-4xl font-bold text-green-800">Market Insights</h1>
          </div>
        </motion.div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-green-600 p-4">
            <h2 className="text-2xl font-bold text-white text-center">
              Retailer Real-Time Insights
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 flex items-center justify-center bg-gray-50">
              <div className="w-full h-full max-h-[500px] relative rounded-2xl overflow-hidden p-4">
                {selectedProduct &&
                cropImages[selectedProduct.toLowerCase()] ? (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={cropImages[selectedProduct.toLowerCase()]}
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
                  Select Crop to order
                </label>
                <select
                  onChange={handleProductChange}
                  value={selectedProduct.toLowerCase()}
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg"
                >
                  {crops.map((crop, index) => (
                    <option key={index} value={crop.toLowerCase()}>
                      {crop.toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              {loading ? (
                <p className="text-center text-blue-600 font-semibold">
                  Loading market insights...
                </p>
              ) : error ? (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">
                  {error}
                </div>
              ) : selectedProduct && marketInsights ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div
                    className={`p-6 rounded-lg ${
                      marketInsights.percent_gap > 10
                        ? "bg-green-100 border-l-4 border-green-500"
                        : "bg-red-100 border-l-4 border-red-500"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {marketInsights.percent_gap > 10 ? (
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Market Analysis
                        </h3>
                        <p className="text-lg">{marketInsights.message}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden mt-10">
          <div className="bg-green-600 p-4">
            <h2 className="text-2xl font-bold text-white text-center">
              Shopkeeper Narrow Insight
            </h2>
          </div>
          <div className="p-8">
            {narrowLoading ? (
              <p className="text-center text-blue-600 font-semibold">
                Loading narrow insights...
              </p>
            ) : narrowError ? (
              <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">
                {narrowError}
              </div>
            ) : narrowInsights ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <List className="w-6 h-6 text-green-600 mt-1" />
                    <h3 className="text-xl font-semibold text-green-800">
                      Market Instructions
                    </h3>
                  </div>
                </div>
                {narrowInsights.additionalInfo && (
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">
                      Additional Information
                    </h4>
                    <p className="text-gray-700">
                      {narrowInsights.additionalInfo}
                    </p>
                  </div>
                )}
                {narrowInsights.insights?.length > 0 ? (
                  <div className="bg-yellow-50 rounded-lg p-6 mt-6">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-3">
                      Crop Spoilage Insights
                    </h4>
                    {narrowInsights.insights.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-red-100 text-red-700 flex p-4 rounded-lg mb-4"
                      >
                        <p className="text-md font-semibold">{insight[0]}</p>
                        <p>{insight[1]}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    no spoilage insights available.
                  </p>
                )}
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
