import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { transportDetailsThunk } from '../store/profileSlice';

const vehicleTypes = [
  { id: 'Pickup', name: 'Pickup Vehicle' },
  { id: 'Tempo', name: 'Tempo' },
  { id: 'Truck', name: 'Truck' },
  { id: 'Eicher', name: 'Eicher' }
];

export default function TransporterVehicleForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    vehicleType: '',
    capacity: '',
    isColdStorageAvailable: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(transportDetailsThunk(formData));
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Vehicle Registration</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Type
          </label>
          <select
            value={formData.vehicleType}
            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">Select vehicle type</option>
            {vehicleTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loading Capacity (kg)
          </label>
          <input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter capacity in kg"
            required
            min="0"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Cold Storage Available</span>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, isColdStorageAvailable: !formData.isColdStorageAvailable })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              formData.isColdStorageAvailable ? 'bg-green-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.isColdStorageAvailable ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Register Vehicle
        </button>
      </form>
    </div>
  );
}
