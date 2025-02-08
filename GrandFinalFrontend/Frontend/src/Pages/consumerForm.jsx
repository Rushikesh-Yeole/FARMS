import { useState } from "react";
import { useDispatch } from "react-redux";
import { consumerPostStock } from "../store/consumerSlice";

export default function ConsumerForm() {
  const [formData, setFormData] = useState({
    crop: "",
    cropGrade: "",
    quantity: "",
    location: {
      apartment: "",
      areaName: "",
      landmark: "",
      city: "",
      district: "",
      state: ""
    },
    expectedDeliveryDate: "",
    contactNumber: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault(); // Remove formData from preventDefault
    dispatch(consumerPostStock(formData));
    console.log("Form Submitted", formData);
};


  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
        🛒 Place Your Order
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Crop</label>
          <input type="text" name="crop" value={formData.crop} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Crop Grade</label>
          <select name="cropGrade" value={formData.cropGrade} onChange={handleChange} className="w-full p-3 border rounded-lg" required>
            <option value="">-- Select Grade --</option>
            <option value="1">1 (Premium)</option>
            <option value="2">2 (Good)</option>
            <option value="3">3 (Average)</option>
            <option value="4">4 (Low)</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Quantity (kg)</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-3 border rounded-lg" required min="1" />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Expected Delivery Date</label>
          <input type="date" name="expectedDeliveryDate" value={formData.expectedDeliveryDate} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Contact Number</label>
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold">Location Details</h3>
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Apartment</label>
          <input type="text" name="location.apartment" value={formData.location.apartment} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Area Name</label>
          <input type="text" name="location.areaName" value={formData.location.areaName} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Landmark</label>
          <input type="text" name="location.landmark" value={formData.location.landmark} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">City</label>
          <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">District</label>
          <input type="text" name="location.district" value={formData.location.district} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">State</label>
          <input type="text" name="location.state" value={formData.location.state} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}