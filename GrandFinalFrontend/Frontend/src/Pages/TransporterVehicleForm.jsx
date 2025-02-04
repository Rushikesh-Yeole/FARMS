import React, { useState } from 'react';

const vehicleTypes = [
  { id: 'pickup', name: 'Pickup Vehicle' },
  { id: 'tempo', name: 'Tempo' },
  { id: 'truck', name: 'Truck' },
  { id: 'eicher', name: 'Eicher' }
];

export default function TransporterVehicleForm() {
  const [formData, setFormData] = useState({
    vehicleType: '',
    capacity: '',
    hasColdStorage: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Vehicle Registration</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        {/* Vehicle Type Dropdown */}
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

        {/* Capacity Input */}
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

        {/* Cold Storage Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Cold Storage Available</span>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, hasColdStorage: !formData.hasColdStorage })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              formData.hasColdStorage ? 'bg-green-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.hasColdStorage ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Submit Button */}
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