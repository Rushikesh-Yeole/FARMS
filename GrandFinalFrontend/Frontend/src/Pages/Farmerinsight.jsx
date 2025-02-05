import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, TrendingUp, AlertCircle } from 'lucide-react';

const products = [
  'Wheat',
  'Rice',
  'Corn',
  'Soybeans',
  'Potatoes',
  'Tomatoes'
];

const marketInsights = {
  Wheat: { 
    demand: 'high', 
    message: 'High demand expected in next 3 months. Consider increasing production.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800'
  },
  Rice: { 
    demand: 'medium', 
    message: 'Stable demand predicted. Maintain current production levels.',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&q=80&w=800'
  },
  Corn: { 
    demand: 'low', 
    message: 'Market saturation expected. Consider diversifying crops.',
    image: 'https://images.unsplash.com/photo-1601593768799-76d3bc7c8607?auto=format&fit=crop&q=80&w=800'
  },
  Soybeans: { 
    demand: 'high', 
    message: 'Strong export demand forecasted. Good time to increase production.',
    image: 'https://images.unsplash.com/photo-1599720843413-7e0b1e6fce89?auto=format&fit=crop&q=80&w=800'
  },
  Potatoes: { 
    demand: 'medium', 
    message: 'Moderate demand expected. Focus on quality over quantity.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800'
  },
  Tomatoes: { 
    demand: 'high', 
    message: 'Local demand increasing. Consider greenhouse production.',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=800'
  }
};

export default function FarmerInsight() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [showInsight, setShowInsight] = useState(false);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    setShowInsight(true);
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
                {selectedProduct ? (
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
                    <p className="text-gray-500 text-lg">Select a crop to view details</p>
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
                  value={selectedProduct}
                  onChange={handleProductChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                >
                  <option value="">Choose a product</option>
                  {products.map(product => (
                    <option key={product} value={product}>{product}</option>
                  ))}
                </select>
              </div>

              {showInsight && selectedProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className={`p-6 rounded-lg ${
                    marketInsights[selectedProduct].demand === 'high' 
                      ? 'bg-green-100 border-l-4 border-green-500'
                      : marketInsights[selectedProduct].demand === 'medium'
                      ? 'bg-yellow-100 border-l-4 border-yellow-500'
                      : 'bg-red-100 border-l-4 border-red-500'
                  }`}>
                    <div className="flex items-start gap-4">
                      {marketInsights[selectedProduct].demand === 'high' ? (
                        <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : marketInsights[selectedProduct].demand === 'medium' ? (
                        <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Market Analysis</h3>
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