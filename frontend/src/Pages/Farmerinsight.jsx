import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Sprout, TrendingUp, AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchStockListings } from "../store/FarmerDashBoard/stocklistingSlice";

export default function FarmerInsight() {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductopti, setSelectedProductopti] = useState("");
  const [marketInsights, setMarketInsights] = useState(null);
  const [marketInsightsopti, setMarketInsightsopti] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [region, setRegion] = useState(null);
  const [crops, setCrops] = useState([]);

  const cropImages = {
    onion: "images/onion.jpeg",
    potato: "images/potato.jpeg",
    tomato: "images/tomato.jpeg",
    rice: "images/rice.jpg",
    sugercane: "images/sugercane.jpg",
    custerd: "images/custered",
    papaya: "images/papaya",
    jowar: "images/jowar.png"
  };

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const result = await dispatch(fetchStockListings());
        const response = result.payload;
        if (response && response.stocks) {
          const cropList = response.stocks.map(stock => stock.crop);
          setCrops(cropList);
          setRegion("beed");

          const maxCrop = response.stocks.reduce((max, stock) =>
            stock.quantity > max.quantity ? stock : max, response.stocks[0]);
          setSelectedProduct(maxCrop?.crop || "");
          setSelectedProductopti(maxCrop?.crop || ""); // Set selectedProductopti as well if it's based on the same crop
        }
      } catch (error) {
        console.error("Error fetching stocks:", error);
        setCrops([]);
      }
    };
    fetchStocks();
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchMarketInsights = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.post("https://farms-engine.onrender.com/insights", {
  //         region: "beed",
  //         product: selectedProduct.toLocaleLowerCase(),
  //       }, {
  //         headers: { "Content-Type": "application/json" },
  //         withCredentials: true,
  //       });
  //       setMarketInsights(response.data);
  //       setError(null);
  //     } catch (err) {
  //       setError("Failed to fetch market insights.");
  //     }
  //     setLoading(false);
  //   };
  //   fetchMarketInsights();
  // }, [selectedProduct]);

  useEffect(() => {
    const fetchMarketForecastInsights = async () => {
      setLoading(true);
      try {
        const response = await axios.post("https://farms-engine.onrender.com/optisights", { 
          region: "beed",
          product: selectedProductopti.toLocaleLowerCase,
          period: 1,
        }, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setMarketInsightsopti(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch market forecast insights.");
      }
      setLoading(false);
    };
    if (selectedProductopti) {
      fetchMarketForecastInsights();
    }
  }, [selectedProductopti]); // Fetch forecast insights when selectedProductopti changes

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleProductChangeopti = (e) => {
    setSelectedProductopti(e.target.value);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-green-800">Farmer's Market Insights</h1>
          </div>
          <p className="text-gray-600 text-lg">Make informed decisions with real-time market analysis</p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-6">
          <div className="bg-green-800 p-4">
            <h2 className="text-2xl font-bold text-white text-center">Real-Time Market Insights</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 flex items-center justify-center bg-gray-50">
              <div className="w-full h-full max-h-[500px] relative rounded-2xl overflow-hidden p-4">
                {selectedProduct && cropImages[selectedProduct.toLowerCase()] ? (
                  <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                    src={cropImages[selectedProduct.toLowerCase()]} alt={selectedProduct}
                    className="w-full h-full object-cover rounded-2xl shadow-lg" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
                    <p className="text-gray-500 text-lg">Select a crop to view details</p>
                  </div>
                )}
              </div>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <label className="block text-lg font-medium text-gray-700 mb-3">Select Your Crop</label>
                <select value={selectedProduct} onChange={handleProductChange}
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg">
                  {crops.map((crop, index) => (
                    <option key={index} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>
              {loading ? (
                <p className="text-center text-blue-600 font-semibold">Loading market insights...</p>
              ) : error ? (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">{error}</div>
              ) : selectedProduct && marketInsights && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className={`p-6 rounded-lg ${marketInsights.percent_gap > 10 ? "bg-green-100 border-l-4 border-green-500" : "bg-red-100 border-l-4 border-red-500"}`}>
                    <div className="flex items-start gap-4">
                      {marketInsights.percent_gap > 10 ? <TrendingUp className="w-6 h-6 text-green-600" /> : <AlertCircle className="w-6 h-6 text-red-600" />}
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Market Analysis</h3>
                        <p className="text-lg">{marketInsights.message}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-green-800 p-4">
            <h2 className="text-2xl font-bold text-white text-center">Market Forecast Insights</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 flex items-center justify-center bg-gray-50">
              <div className="w-full h-full max-h-[500px] relative rounded-2xl overflow-hidden p-4">
                {selectedProductopti && cropImages[selectedProductopti.toLowerCase()] ? (
                  <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                    src={cropImages[selectedProductopti.toLowerCase()]} alt={selectedProductopti}
                    className="w-full h-full object-cover rounded-2xl shadow-lg" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
                    <p className="text-gray-500 text-lg">Select a crop to view details</p>
                  </div>
                )}
              </div>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <label className="block text-lg font-medium text-gray-700 mb-3">Select Your Crop</label>
                <select value={selectedProductopti} onChange={handleProductChangeopti}
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg">
                  {crops.map((crop, index) => (
                    <option key={index} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>
              {loading ? (
                <p className="text-center text-blue-600 font-semibold">Loading market forecast insights...</p>
              ) : error ? (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">{error}</div>
              ) : selectedProductopti && marketInsightsopti && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className={`p-6 rounded-lg ${marketInsightsopti.percent_gap > 10 ? "bg-green-100 border-l-4 border-green-500" : "bg-red-100 border-l-4 border-red-500"}`}>
                    <div className="flex items-start gap-4">
                      {marketInsightsopti.percent_gap > 10 ? <TrendingUp className="w-6 h-6 text-green-600" /> : <AlertCircle className="w-6 h-6 text-red-600" />}
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Market Forecast</h3>
                        <p className="text-lg">{marketInsightsopti.message}</p>
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
