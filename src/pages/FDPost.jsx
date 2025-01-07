import React, { useState } from "react";
import FHeader from "../components/FarmerHeader";

// Reusable Input Component
const InputField = ({ label, type, name, value, onChange, placeholder, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-blue-800 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-blue-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  </div>
);

const PostTransportDemand = () => {
  const [formData, setFormData] = useState({
    origin: "", destination: "", capacity: "", produce: "", transportDate: "", transportTime: ""
  });

  const handleChange = ({ target: { name, value } }) => setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example for backend integration (e.g., Axios POST)
    console.log("Transport Demand Submitted:", formData);
    // Make an API call to the backend here for real-time integration
  };

  return (
    <>
    <FHeader/>
   
    <div className="bg-blue-50 min-h-screen py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">Post Transport Demand</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Streamlined input fields */}
          {[
            { label: "Origin Location", name: "origin", type: "text", placeholder: "Enter origin location" },
            { label: "Destination Location", name: "destination", type: "text", placeholder: "Enter destination location" },
            { label: " Capacity (Tons)", name: "capacity", type: "number", placeholder: "Enter transport capacity" },
            { label: "Product", name: "produce", type: "text", placeholder: "Enter produce type" },
            { label: " Date", name: "transportDate", type: "date" },
            { label: "Time", name: "transportTime", type: "time" }
          ].map(({ label, name, type, placeholder }) => (
            <InputField key={name} label={label} name={name} type={type} value={formData[name]} onChange={handleChange} placeholder={placeholder} />
          ))}
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 text-lg font-medium">
            Post Transport Demand
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default PostTransportDemand;
