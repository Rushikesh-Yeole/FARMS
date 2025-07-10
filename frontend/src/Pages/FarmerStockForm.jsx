import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {farmerStockPost} from '../store/farmerStockPostSlice'
import { bestDeal } from "../store/viewBestDealsSlice";
import { useNavigate } from "react-router-dom";
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
const cropCategories = {
  Cereals: ["Rice", "Wheat", "Jowar", "Bajra", "Maize", "Ragi"],
  Pulses: ["Tur", "Moong", "Urad", "Chana", "Masoor"],
  Oilseeds: [
    "Groundnut",
    "Soybean",
    "Sunflower",
    "Safflower",
    "Sesame",
    "Niger Seed",
  ],
  "Cash Crops": ["Cotton", "Sugarcane", "Tobacco"],
  Fruits: [
    "Mango",
    "Banana",
    "Grapes",
    "Orange",
    "Pomegranate",
    "Guava",
    "Papaya",
    "Chikoo",
    "Custard Apple",
    "Fig",
  ],
  Vegetables: [
    "Onion",
    "Tomato",
    "Brinjal",
    "Okra",
    "Cabbage",
    "Cauliflower",
    "Spinach",
    "Carrot",
    "Potato",
    "Bitter Gourd",
    "Bottle Gourd",
  ],
  "Spices and Condiments": [
    "Turmeric",
    "Ginger",
    "Garlic",
    "Chili",
    "Coriander",
    "Cumin",
  ],
  "Plantation Crops": ["Coffee", "Areca Nut"],
  Flowers: ["Rose", "Jasmine", "Marigold"],
};

export default function FarmerStockForm() {

  const navigate = useNavigate();
  
  const dispatch = useDispatch()
  const [previewImage, setPreviewImage] = useState(null);
  const state = useSelector((state)=>state.retailerdemand)
  const [formData, setFormData] = useState({
    category: "",
    cropname: "",
    cropgrade: "",
    quantity: "",
    cropImage: null,
    location: { 
      // address: "", 
      state: "",
      district: "",
      village: "",
    },
    contactNumber: "",
    minExpectedPrice:0
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "contactNumber") {
      if (!value.startsWith("+91")) {
        value =  value.replace(/\D/g, "");
      }
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, cropImage: file });
    
    // Image Preview Logic
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Submitted:", formData);
    setFormData({ ...formData});
    dispatch(farmerStockPost(formData)).then(()=>{
      console.log("done")
      navigate("/farmerdashbaord");
    })
    // dispatch(bestDeal(state.postStock.stockPostData.stock._id)).then((result)=>{
    //   if(result.type === "deals/bestDeals/fulfilled")
    //   navigate("/farmerbestdeals");
    // })
    

    // alert("Stock Posted Successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-200 mb-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        🌾 Post Your Stock
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Crop Selection */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Crop Category</label>
          <select
            name="category"
            className="w-full p-3 border rounded-lg"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value, cropname: "" })
            }
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

        {formData.category && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Crop Type</label>
            <select
              name="cropname"
              className="w-full p-3 border rounded-lg"
              value={formData.cropname}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Crop --</option>
              {cropCategories[formData.category].map((cropname) => (
                <option key={cropname} value={cropname}>
                  {cropname}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Grade & Quantity */}
        <div>
          <label className="block font-medium mb-1">Crop Grade</label>
          <select
            name="cropgrade"
            className="w-full p-3 border rounded-lg"
            value={formData.cropgrade}
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

        <div>
          <label className="block font-medium mb-1">Quantity (quintal)</label>
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
        <div>
          <label className="block font-medium mb-1">minExpectedPrice</label>
          <input
            type="number"
            name="minExpectedPrice"
            className="w-full p-3 border rounded-lg"
            value={formData.minExpectedPrice}
            onChange={handleChange}
            required
            min="1"
            placeholder="Enter quantity"
          />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            name="cropImage"
            className="w-full p-3 border rounded-lg"
            onChange={handleFileChange}
            required
          />
          {previewImage && (
            <div className="mt-3 flex justify-center">
              <img
                src={previewImage}
                alt="Crop Preview"
                className="w-40 h-40 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Location */}
        {/* State Selection */}
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

        {/* District Selection (Only show if state is selected) */}
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

        {/* Taluka Selection (Only show if district is selected) */}
        {formData.location.district && (
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Village</label>
            <input
              type="text"
              name="village"
              className="w-full p-3 border rounded-lg"
              value={formData.location.village}
              onChange={handleLocationChange}
              placeholder="Enter phone number"
              required
            />
          </div>
        )}

        {/* Contact */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">
            Contact Number (Optional)
          </label>
          <input
            type="text"
            name="contactNumber"
            className="w-full p-3 border rounded-lg"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition"
          >
            Post Stock
          </button>
        </div>
      </form>
    </div>
  );
}
