import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Bell, X } from 'lucide-react';
import { viewMyOrders } from '../store/consumerSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ConsumerDashboard() {
  const dispatch = useDispatch();
  const [orderRequests, setOrderRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  useEffect(() => {
    dispatch(viewMyOrders()).then((result) => {
      setOrderRequests(result.payload?.myOrders || []);
      setLoading(false);
    });
  }, [dispatch]);

  const handleOrderClick = useCallback((order) => {
    if (order.locked === false) {
      setSelectedFarmer(order.farmer);
    }
  }, []);

  const notifications = [
    {
      id: 1,
      message: "Your order for Wheat has been accepted",
      timestamp: "2024-02-19 14:30"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Consumer Dashboard</h1>
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['orders', 'notifications'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {tab === 'orders' ? <ShoppingBag className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
              {tab === 'orders' ? 'Order Requests' : 'Notifications'}
            </div>
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-lg border border-green-200">
          <div className="p-4 space-y-4">
            {loading ? (
              <p className="text-center text-gray-500">Loading orders...</p>
            ) : (
              orderRequests.map((order) => (
                <div
                  key={order._id}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${order.locked
 === 'accepted' ? 'cursor-pointer' : ''}`}
                  onClick={() => handleOrderClick(order)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{order.crop}</h3>
                    <span className={`px-2 py-1 rounded text-sm ${order.locked === false ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                      {order.locked === false ? 'Pending' : 'View Farmer Details'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>Crop Grade: {order.cropGrade}/5</p>
                    <p>Quantity: {order.quantity} kg</p>
                    <p>Price: ₹{order.price}</p>
                    <p>Location: {order.location?.address
 || 'Not specified'}</p>
                    <p>Delivery: {new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
                    <p>Contact: {order.contactNumber}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow-lg border border-green-200">
          <div className="p-4 space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Bell className="text-blue-500 h-5 w-5" />
                <div>
                  <p className="text-sm">{notif.message}</p>
                  <p className="text-xs text-gray-500">{notif.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Farmer Details Modal */}
      {selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Farmer Details</h3>
              <button onClick={() => setSelectedFarmer(null)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-3">
              <p><span className="font-semibold">Name:</span> {selectedFarmer.firstName} {selectedFarmer.lastName}</p>
              <p><span className="font-semibold">Contact:</span> {selectedFarmer.contactNumber}</p>
              <p><span className="font-semibold">Rating:</span> {selectedFarmer.averageRating || 'New Farmer'}</p>
              <p><span className="font-semibold">Reliability Score:</span> {selectedFarmer.reliabilityScore}%</p>
              {selectedFarmer.message && <p className="text-sm text-green-600">{selectedFarmer.message}</p>}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
