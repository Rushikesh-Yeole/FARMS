import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, ShoppingBag, CheckCircle } from 'lucide-react';
import { useSelector,useDispatch } from 'react-redux';
import { viewMyOrdersThunk } from '../store/retailerSlice';




export default function RetailerDashboard() {
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [myorderRequests,setMyorderRequests] = useState([
    {
      id: 1,
      productName: "Wheat",
      quantity: "500kg",
      price: "$400",
      location: "Farm District A",
      date: "2024-02-20",
      status: "pending",
      farmer: {
        name: "John Doe",
        contact: "123-456-7890",
        location: "Farm District A",
        rating: "4.5"
      }
    },
    {
      id: 2,
      productName: "Rice",
      quantity: "300kg",
      price: "$350",
      location: "Farm District B",
      date: "2024-02-21",
      status: "completed",
      farmer: {
        name: "Jane Smith",
        contact: "987-654-3210",
        location: "Farm District B",
        rating: "4.8"
      }
    }
  ]);
  
  const acceptedOrders = [
    {
      id: 1,
      productName: "Rice",
      quantity: "300kg",
      price: "$350",
      location: "Farm District B",
      date: "2024-02-21",
      status: "accepted",
      farmerName: "Jane Smith"
    },
    // Add more sample data
  ];
  
  const notifications = [
    {
      id: 1,
      message: "Your order for Wheat has been accepted by John Doe",
      timestamp: "2024-02-19 14:30"
    },
    // Add more notifications
  ];
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(viewMyOrdersThunk()).then((result)=>{
      console.log(result.payload);
      setMyorderRequests(result.payload.myOrders
      )
      

    })
  },[dispatch]);

  const handleOrderClick = (order) => {
    if (order.status === 'completed') {
      setSelectedFarmer(order.farmer);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Retailer Dashboard</h1>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'requests'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Order Requests
          </div>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'notifications'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </div>
        </button>
      </div>

      {/* Content Sections */}
      {activeTab === 'requests' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg border border-green-200"
        >
          <div className="bg-yellow-50 border-b border-yellow-100 p-4">
            <h2 className="text-lg font-semibold text-yellow-700">Order Requests</h2>
          </div>
          <div className="p-4 space-y-4">
            {myorderRequests.map((order) => (
              <div 
                key={order._id} 
                className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                  order.status === 'completed' ? 'cursor-pointer' : ''
                }`}
                onClick={() => handleOrderClick(order)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{order.crop
                  }</h3>
                  
                </div>
                <p className="text-sm text-gray-600">Quantity: {order.quantity
                }</p>
                <p className="text-sm text-gray-600">Price: {order.pricePerQuintal}</p>
                <p className="text-sm text-gray-600">Date: {order?.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString() : "N/A"}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'accepted' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg border border-green-200"
        >
          <div className="bg-green-50 border-b border-green-100 p-4">
            <h2 className="text-lg font-semibold text-green-700">Accepted Orders</h2>
          </div>
          <div className="p-4 space-y-4">
            {acceptedOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{order.crop}</h3>
                  <span className="text-green-600 text-sm">Accepted</span>
                </div>
                <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                <p className="text-sm text-gray-600">Price: {order.pricePerQuintal}</p>
                <p className="text-sm text-gray-600">Farmer: {order.farmerName}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg border border-green-200"
        >
          <div className="bg-blue-50 border-b border-blue-100 p-4">
            <h2 className="text-lg font-semibold text-blue-700">Notifications</h2>
          </div>
          <div className="p-4 space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Bell className="text-blue-500" />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Farmer Details</h3>
              <button 
                onClick={() => setSelectedFarmer(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              <p><span className="font-semibold">Name:</span> {selectedFarmer.name}</p>
              <p><span className="font-semibold">Contact:</span> {selectedFarmer.contact}</p>
              <p><span className="font-semibold">Location:</span> {selectedFarmer.location}</p>
              <p><span className="font-semibold">Rating:</span> {selectedFarmer.rating}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}     