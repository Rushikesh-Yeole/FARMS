import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, ShoppingBag, CheckCircle } from 'lucide-react';

const orderRequests = [
  {
    id: 1,
    productName: "Wheat",
    quantity: "500kg",
    price: "$400",
    location: "Farm District A",
    date: "2024-02-20",
    status: "pending",
    farmerName: "John Doe"
  },
  // Add more sample data
];

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

export default function RetailerDashboard() {
  const [activeTab, setActiveTab] = useState('requests');

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
          onClick={() => setActiveTab('accepted')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'accepted'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Accepted Orders
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
            {orderRequests.map((order) => (
              <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{order.productName}</h3>
                  <span className="text-yellow-600 text-sm">Pending</span>
                </div>
                <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                <p className="text-sm text-gray-600">Price: {order.price}</p>
                <p className="text-sm text-gray-600">Farmer: {order.farmerName}</p>
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
                  <h3 className="font-semibold">{order.productName}</h3>
                  <span className="text-green-600 text-sm">Accepted</span>
                </div>
                <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                <p className="text-sm text-gray-600">Price: {order.price}</p>
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
    </div>
  );
}