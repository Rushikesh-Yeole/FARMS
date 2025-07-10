import React, { useState } from 'react';
import { Bell, Clock, CheckCircle } from 'lucide-react';
import { getPendingRequest, getmyRequest } from '../store/transReq';
import { useDispatch } from 'react-redux';

export default function TransporterDashboard() {
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [confirmedRequests, setConfirmedRequests] = useState([]);
  const dispatch = useDispatch();

  const handlePendingRequest = () => {
    dispatch(getPendingRequest()).then((result) => {
      if (result.payload) {
        console.log(result.payload.data);
        setPendingRequests(result.payload.data || []);
      }
    });
  };

  const handleConfirmRequest = () => {
    dispatch(getmyRequest()).then((result) => {
      if (result.payload) {
        console.log(result.payload.data);
        setConfirmedRequests(result.payload.data || []);
      }
    });
  };
  const handleGetmypending=()=>{
    dispatch()
  }

  const notifications = [
    {
      id: 1,
      message: 'Farmer John Doe has accepted your transport request for 800kg Corn',
      timestamp: '2024-02-19 14:30',
    },
    {
      id: 2,
      message: 'Farmer Jane Smith has accepted your transport request for 400kg Soybeans',
      timestamp: '2024-02-19 10:15',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Transporter Dashboard</h1>

      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setActiveTab('pending');
            handlePendingRequest();
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'pending' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Requests
          </div>
        </button>

        <button
          onClick={() => {
            setActiveTab('confirmed');
            handleConfirmRequest();
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'confirmed' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Confirmed Requests
          </div>
        </button>

        <button
          onClick={() =>{ handleGetmypending(),setActiveTab('notifications')}}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === 'notifications' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600 hover:bg-green-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </div>
        </button>
      </div>

      {/* Pending Requests */}
      {activeTab === 'pending' && (
        <div className="bg-white rounded-lg shadow-lg border border-green-200">
          <div className="bg-yellow-50 border-b border-yellow-100 p-4">
            <div className="flex items-center gap-2 text-yellow-700 font-semibold text-lg">
              <Clock className="h-5 w-5" />
              Pending Transport Requests
            </div>
          </div>
          <div className="p-4 space-y-4">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <div key={request.id} className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">{request.cropType}</h3>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>Quantity: {request.quantities}</p>
                    <p>Price: {request.price}</p>
                    <p>From: {request.Departlocation?.place}</p>
                    <p>To: {request.Destination?.place}</p>
                    <p>Date: {new Date(request.DepatrureDate
).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No pending requests</p>
            )}
          </div>
        </div>
      )}

      {/* Confirmed Requests */}
      {activeTab === 'confirmed' && (
        <div className="bg-white rounded-lg shadow-lg border border-green-200">
          <div className="bg-green-50 border-b border-green-100 p-4">
            <div className="flex items-center gap-2 text-green-700 font-semibold text-lg">
              <CheckCircle className="h-5 w-5" />
              Confirmed Transport Requests
            </div>
          </div>
          <div className="p-4 space-y-4">
            {confirmedRequests.length > 0 ? (
              confirmedRequests.map((request) => (
                <div key={request.id} className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">{request.cropType}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Confirmed</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <p>Farmer: {request.Farmerid?.firstName}</p>
                    <p>Quantity: {request.quantities}</p>
                    <p>Price: {request.price}</p>
                    <p>From: {request.Departlocation?.place}</p>
                    <p>To: {request.Destination?.place}</p>
                    <p>Date: {new Date(request.DepatrureDate
).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No confirmed requests</p>
            )}
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-lg shadow-lg border border-green-200">
          <div className="bg-blue-50 border-b border-blue-100 p-4">
            <div className="flex items-center gap-2 text-blue-700 font-semibold text-lg">
              <Bell className="h-5 w-5" />
              Notifications
            </div>
          </div>
          <div className="p-4">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div key={notif.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Bell className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-800">{notif.message}</p>
                    <p className="text-xs text-gray-500">{notif.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No new notifications</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
