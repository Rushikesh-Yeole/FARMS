import { useState } from "react";
import { useDispatch } from "react-redux";
import { retailerdemandthunk } from "../store/retailerdemandSlice";
import { toast } from "react-toastify";

const locationData = {
  Maharashtra: {
    Pune: ["Haveli", "Baramati", "Daund"],
    Mumbai: ["Andheri", "Dadar", "Borivali"],
    nashik:["deola"]
  },
  Karnataka: {
    Bangalore: ["Bangalore North", "Bangalore South"],
    Mysore: ["Mysore North", "Mysore South"],
  },
};
const limit = {
  jowar:19,
  sugarcane:20,
  papaya:7,
}
const cropCategories = {
  Cereals: ["Rice", "Wheat", "Jowar", "Bajra", "Maize", "Ragi"],
  Pulses: ["Tur", "Moong", "Urad", "Chana", "Masoor"],
  Oilseeds: ["Groundnut", "Soybean", "Sunflower", "Safflower", "Sesame", "Niger Seed"],
  "Cash Crops": ["Cotton", "Sugarcane", "Tobacco"],
  Fruits: ["Mango", "Banana", "Grapes", "Orange", "Pomegranate", "Guava", "Papaya", "sugarcane"],
  Vegetables: ["Onion", "Tomato", "Brinjal", "Okra", "Cabbage", "Cauliflower", "Spinach"],
  "Spices and Condiments": ["Turmeric", "Ginger", "Garlic", "Chili", "Coriander", "Cumin"],
  "Plantation Crops": ["Coffee", "Areca Nut"],
  Flowers: ["Rose", "Jasmine", "Marigold"],
};

export default function RetailerDemandForm() {
  const [formData, setFormData] = useState({
    category: "",
    crop: "",
    quantity: "",
    price: "", 
    cropGrade: "", // Added crop grade
    expectedDeliveryDate: "",
    location: {
      state: "",
      district: "",
      village: "dhankawadi",
      landmark:"pict",
      areaName:"trimurti chowk"

    },
    contactNumber: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "contactNumber" && !value.startsWith("+91")) {
      value = value.replace(/\D/g, "");
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: { ...formData.location, [name]: value },
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Retailer Demand Submitted:", formData);
    if(formData.price<limit[formData.crop.toLowerCase()]){alert("Price too low than Market Limits!");}
    else{dispatch(retailerdemandthunk(formData));
    alert("Demand Posted Successfully!");
  }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
        🛒 Post Your Demand
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crop Category Selection */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Crop Category</label>
          <select
            name="category"
            className="w-full p-3 border rounded-lg"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value, crop: "" })}
            required
          >
            <option value="">-- Select Category --</option>
            {Object.keys(cropCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Crop Selection */}
        {formData.category && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Crop Type</label>
            <select
              name="crop"
              className="w-full p-3 border rounded-lg"
              value={formData.crop}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Crop --</option>
              {cropCategories[formData.category].map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity */}
        <div>
          <label className="block font-medium mb-1">Quantity (kg)</label>
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

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Offered Price (₹ per kg)</label>
          <input
            type="number"
            name="price"
            className="w-full p-3 border rounded-lg"
            value={formData.price}
            onChange={handleChange}
            required
            min="1"
            placeholder="Enter expected price"
          />
        </div>

        {/* Crop Grade */}
        <div>
          <label className="block font-medium mb-1">Crop Grade</label>
          <select
            name="cropGrade"
            className="w-full p-3 border rounded-lg"
            value={formData.cropGrade}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Grade --</option>
            <option value="1">1 (Premium)</option>
            <option value="2">2 (Good)</option>
            <option value="3">3 (Average)</option>
            <option value="4">4 (Moderate)</option>
            <option value="5">5 (Low)</option>
          </select>
        </div>

        {/* Expected Delivery Date */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Expected Delivery Date</label>
          <input
            type="date"
            name="expectedDeliveryDate"
            className="w-full p-3 border rounded-lg"
            value={formData.expectedDeliveryDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location Fields */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">State</label>
          <select
            name="state"
            className="w-full p-3 border rounded-lg"
            value={formData.location.state}
            onChange={handleLocationChange}
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
        {formData.location.state && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">District</label>
            <select
              name="district"
              className="w-full p-3 border rounded-lg"
              value={formData.location.district}
              onChange={handleLocationChange}
              required
            >
              <option value="">-- Select District --</option>
              {Object.keys(locationData[formData.location.state]).map(
                (district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {formData.location.district && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Village</label>
            <input
              type="text"
              name="village"
              className="w-full p-3 border rounded-lg"
              value={formData.location.village}
              onChange={handleLocationChange}
              required
              placeholder="Enter village name"
            />
          </div>
        )}
        {formData.location.village && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">areaName</label>
            <input
              type="text"
              name="areaName"
              className="w-full p-3 border rounded-lg"
              value={formData.location.areaName}
              onChange={handleLocationChange}
              required
              placeholder="Enter village name"
            />
          </div>
        )}
        {formData.location.areaName && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">landmark</label>
            <input
              type="text"
              name="landmark"
              className="w-full p-3 border rounded-lg"
              value={formData.location.landmark}
              onChange={handleLocationChange}
              required
              placeholder="Enter village name"
            />
          </div>
        )}
        {/* Contact Number */}
          {/* <div className="md:col-span-2">
            <label className="block font-medium mb-1">Contact Number (Optional)</label>
            <input
              type="text"
              name="contactNumber"
              className="w-full p-3 border rounded-lg"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div> */}

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition">
            Post Demand
          </button>
        </div>
      </form>
    </div>
  );
}
