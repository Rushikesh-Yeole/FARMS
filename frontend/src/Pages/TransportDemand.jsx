import { useState } from "react";
import { useDispatch } from "react-redux";
import { transportDemandThunk } from "../store/transportDemandSlice";

const locationData = {
  Maharashtra: {
    Pune: ["Haveli", "Baramati", "Daund"],
    Mumbai: ["Andheri", "Dadar", "Borivali"],
  },
  Karnataka: {
    Bangalore: ["Bangalore North", "Bangalore South"],
    Mysore: ["Mysore North", "Mysore South"],
  },
};

export default function TransportDemandForm() {
  const [formData, setFormData] = useState({
    departLocation: {
      state: "",
      district: "",
      village: "",
    },
    deliveryLocation: {
      state: "",
      district: "",
      village: "",
    },
    dateOfJourney: "",
    quantity: "",
    contactNumber: "",
  });

  const dispatch = useDispatch();

  const handleLocationChange = (e, locationType) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [locationType]: { ...formData[locationType], [name]: value },
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "contactNumber" && !value.startsWith("+91")) {
      value = value.replace(/\D/g, "");
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transport Demand Submitted:", formData);
    dispatch(transportDemandThunk(formData));
    alert("Transport Demand Posted Successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
        🚚 Post Transport Demand
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Depart Location */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Depart State</label>
          <select
            name="state"
            className="w-full p-3 border rounded-lg"
            value={formData.departLocation.state}
            onChange={(e) => handleLocationChange(e, "departLocation")}
            required
          >
            <option value="">-- Select State --</option>
            {Object.keys(locationData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        {formData.departLocation.state && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Depart District</label>
            <select
              name="district"
              className="w-full p-3 border rounded-lg"
              value={formData.departLocation.district}
              onChange={(e) => handleLocationChange(e, "departLocation")}
              required
            >
              <option value="">-- Select District --</option>
              {Object.keys(locationData[formData.departLocation.state]).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        )}


{formData.departLocation.district && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Village</label>
            <input
              type="text"
              name="village"
              className="w-full p-3 border rounded-lg"
              value={formData.departLocation.village}
              onChange={(e) => handleLocationChange(e, "departLocation")}
              required
              placeholder="Enter village name"
            />
          </div>
        )}
        {/* Delivery Location */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Delivery State</label>
          <select
            name="state"
            className="w-full p-3 border rounded-lg"
            value={formData.deliveryLocation.state}
            onChange={(e) => handleLocationChange(e, "deliveryLocation")}
            required
          >
            <option value="">-- Select State --</option>
            {Object.keys(locationData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        {formData.deliveryLocation.state && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Delivery District</label>
            <select
              name="district"
              className="w-full p-3 border rounded-lg"
              value={formData.deliveryLocation.district}
              onChange={(e) => handleLocationChange(e, "deliveryLocation")}
              required
            >
              <option value="">-- Select District --</option>
              {Object.keys(locationData[formData.deliveryLocation.state]).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        )}
        {formData.deliveryLocation.district && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Village</label>
            <input
              type="text"
              name="village"
              className="w-full p-3 border rounded-lg"
              value={formData.deliveryLocation.village}
              onChange={(e) => handleLocationChange(e, "deliveryLocation")}
              required
              placeholder="Enter village name"
            />
          </div>
        )}
        {/* Date of Journey */}
        <div>
          <label className="block font-medium mb-1">Date of Journey</label>
          <input
            type="date"
            name="dateOfJourney"
            className="w-full p-3 border rounded-lg"
            value={formData.dateOfJourney}
            onChange={handleChange}
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium mb-1">Quantity (Kg)</label>
          <input
            type="number"
            name="quantity"
            className="w-full p-3 border rounded-lg"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
            placeholder="Enter quantity"
          />
        </div>

        {/* Contact Number */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Contact Number (Optional)</label>
          <input
            type="text"
            name="contactNumber"
            className="w-full p-3 border rounded-lg"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition"
          >
            Post Transport Demand
          </button>
        </div>
      </form>
    </div>
  );
}
