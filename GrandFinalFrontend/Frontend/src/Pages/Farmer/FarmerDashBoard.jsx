import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { myTransportDemand } from '../../store/transportDemandSlice';
import {
  Package,
  Bell,
  Handshake,
  ChevronDown,
  ChevronUp,
  Calendar,
  DollarSign,
  MapPin,
  Store,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { useDispatch } from 'react-redux';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('stocks');
  const [expandedStock, setExpandedStock] = useState(null);
  const [expandedTransport, setExpandedTransport] = useState(null);

  // Example data
  const stocks = [
    {
      id: 1,
      productName: "Premium Tomatoes",
      totalQuantity: 1000,
      remainingQuantity: 400,
      pricePerKg: 45,
      postedDate: "2024-03-20",
      location: "Nashik, Maharashtra",
      status: 'active',
      acceptedDeals: [
        {
          id: 1,
          retailerName: "Fresh Mart",
          quantity: 300,
          pricePerKg: 45,
          expectedDeliveryDate: "2024-03-25",
          location: "Mumbai Central Market",
          status: 'pending'
        },
        {
          id: 2,
          retailerName: "City Grocers",
          quantity: 300,
          pricePerKg: 46,
          expectedDeliveryDate: "2024-03-26",
          location: "Pune Market",
          status: 'completed'
        }
      ]
    },
    {
      id: 2,
      productName: "Organic Potatoes",
      totalQuantity: 2000,
      remainingQuantity: 1200,
      pricePerKg: 30,
      postedDate: "2024-03-19",
      location: "Pune, Maharashtra",
      status: 'active',
      acceptedDeals: [
        {
          id: 3,
          retailerName: "Veggie World",
          quantity: 800,
          pricePerKg: 32,
          expectedDeliveryDate: "2024-03-28",
          location: "Thane Market",
          status: 'in_progress'
        }
      ]
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'interest',
      message: "Fresh Mart is interested in your tomatoes listing. They want to purchase 300kg at ₹45/kg.",
      timestamp: "2024-03-20T10:30:00",
      read: false,
      stockId: 1
    },
    {
      id: 2,
      type: 'acceptance',
      message: "Deal accepted with City Grocers for 300kg tomatoes at ₹46/kg.",
      timestamp: "2024-03-20T09:15:00",
      read: true,
      stockId: 1
    },
    {
      id: 3,
      type: 'update',
      message: "Veggie World has started processing your potato delivery of 800kg.",
      timestamp: "2024-03-19T16:45:00",
      read: true,
      stockId: 2
    }
  ];

  const [transportDemands,settransportDemands] = useState([
    {
      id: 1,
      fromLocation: "Nashik, Maharashtra",
      toLocation: "Mumbai Central Market",
      productName: "Premium Tomatoes",
      quantity: 300,
      expectedDate: "2024-03-25",
      status: 'accepted',
      transporterDetails: {
        name: "FastTrack Logistics",
        vehicleType: "Refrigerated Truck",
        vehicleNumber: "MH-04-AB-1234",
        contactNumber: "+91 98765 43210",
        rating: 4.8
      },
      price: 5000
    },
    {
      id: 2,
      fromLocation: "Nashik, Maharashtra",
      toLocation: "Pune Market",
      productName: "Premium Tomatoes",
      quantity: 300,
      expectedDate: "2024-03-26",
      status: 'pending'
    },
    {
      id: 3,
      fromLocation: "Pune, Maharashtra",
      toLocation: "Thane Market",
      productName: "Organic Potatoes",
      quantity: 800,
      expectedDate: "2024-03-28",
      status: 'in_transit',
      transporterDetails: {
        name: "Green Miles Transport",
        vehicleType: "Medium Truck",
        vehicleNumber: "MH-12-XY-5678",
        contactNumber: "+91 98765 43211",
        rating: 4.6
      },
      price: 8000
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
      case 'in_transit':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={16} className="mr-1" />;
      case 'in_progress':
      case 'in_transit':
        return <Clock size={16} className="mr-1" />;
      case 'pending':
        return <AlertCircle size={16} className="mr-1" />;
      default:
        return null;
    }
  };
  const dispatch = useDispatch();
  const handledemandsButton =(st)=>{
    dispatch(myTransportDemand()).then((result)=>{
      const data = result.payload;
      settransportDemands(data)

    })
    setActiveTab(st);
  }

  return (
    <div className="min-h-screen  lg:px-44  bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your stock listings and track deals</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('stocks')}
            className={`flex items-center px-4 py-2 rounded-lg font-normal sm:font-medium ${
              activeTab === 'stocks'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-green-50'
            }`}
          >
            <Package size={20} className="mr-2" />
            Stock Listings
          </button>
          <button
            onClick={() => handledemandsButton('transport')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium ${
              activeTab === 'transport'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-green-50'
            }`}
          >
            <Truck size={20} className="mr-2" />
            Transport Demands
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center px-4 py-2 rounded-lg font-medium ${
              activeTab === 'notifications'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-green-50'
            }`}
          >
            <Bell size={20} className="mr-2" />
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
        </div>

        {/* Stocks Tab */}
        {activeTab === 'stocks' && (
          <div className="space-y-6">
            {stocks.map(stock => (
              <motion.div
                key={stock.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-xl  overflow-hidden"
              >
                {/* Stock Header */}
                <div className="p-6  shadow-xl border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center  gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {stock.productName}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(stock.status)}`}>
                          {stock.status.charAt(0).toUpperCase() + stock.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          Posted: {new Date(stock.postedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          {stock.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} />
                          ₹{stock.pricePerKg}/kg
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedStock(expandedStock === stock.id ? null : stock.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedStock === stock.id ? (
                        <ChevronUp size={24} />
                      ) : (
                        <ChevronDown size={24} />
                      )}
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex  justify-between text-sm text-gray-600 mb-2">
                      <span>Stock Progress</span>
                      <span>
                        {stock.totalQuantity - stock.remainingQuantity}kg / {stock.totalQuantity}kg
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{
                          width: `${((stock.totalQuantity - stock.remainingQuantity) / stock.totalQuantity) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content - Accepted Deals */}
                {expandedStock === stock.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-50 shadow-xl border p-6"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Handshake size={20} className="mr-2" />
                      Accepted Deals
                    </h4>
                    <div className="space-y-4">
                      {stock.acceptedDeals.map(deal => (
                        <div
                          key={deal.id}
                          className="bg-white rounded-lg p-4 shadow-lg border"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <Store size={20} className="text-gray-600" />
                              <span className="font-medium text-gray-900">
                                {deal.retailerName}
                              </span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(deal.status)}`}>
                              {getStatusIcon(deal.status)}
                              {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Package size={16} />
                              Quantity: {deal.quantity}kg
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign size={16} />
                              Price: ₹{deal.pricePerKg}/kg
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={16} />
                              Delivery: {new Date(deal.expectedDeliveryDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={16} />
                              {deal.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Transport Demands Tab */}
        {activeTab === 'transport' && (
          <div className="space-y-6">
            {transportDemands.map((demand,index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Package size={16} />
                          Quantity: {demand.quantities
                          }kg
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          Expected: {new Date(demand.DepatrureDate
).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          From: {demand.Departlocations?.[0]?.place

}
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowRight size={16} />
                          To: {demand.Destination?.place}
                        </div>
                        {demand.price && (
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} />
                            Price: ₹{demand.price}
                          </div>
                        )}
                      </div>
                    </div>
                    {demand.transporterDetails && (
                      <button
                        onClick={() => setExpandedTransport(expandedTransport === demand.id ? null : demand.id)}
                        className="text-gray-400 hover:text-gray-600 ml-4"
                      >
                        {expandedTransport === demand.id ? (
                          <ChevronUp size={24} />
                        ) : (
                          <ChevronDown size={24} />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Expanded Transporter Details */}
                  {expandedTransport === demand.id && demand.transporterDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-gray-100"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Truck size={20} className="mr-2" />
                        Transporter Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Name:</span> {demand.transporterDetails.name}
                        </div>
                        <div>
                          <span className="font-medium">Vehicle Type:</span> {demand.transporterDetails.vehicleType}
                        </div>
                        <div>
                          <span className="font-medium">Vehicle Number:</span> {demand.transporterDetails.vehicleNumber}
                        </div>
                        <div>
                          <span className="font-medium">Contact:</span> {demand.transporterDetails.contactNumber}
                        </div>
                        <div>
                          <span className="font-medium">Rating:</span> {demand.transporterDetails.rating} / 5
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-4">
            {notifications.map(notification => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg shadow-sm ${
                  notification.read ? 'bg-white' : 'bg-green-50 border-l-4 border-green-600'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'interest'
                      ? 'bg-yellow-100 text-yellow-600'
                      : notification.type === 'acceptance'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {notification.type === 'interest' ? (
                      <AlertCircle size={20} />
                    ) : notification.type === 'acceptance' ? (
                      <Handshake size={20} />
                    ) : (
                      <TrendingUp size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{notification.message}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;