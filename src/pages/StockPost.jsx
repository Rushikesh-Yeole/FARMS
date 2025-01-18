import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FHeader from "../components/FarmerHeader";

const InputField = ({ label, type, name, value, onChange, placeholder, ...rest }) => (
  <div>
    <label className="block text-sm font-medium text-green-900 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-green-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      {...rest}
    />
  </div>
);

export default function FarmerPost() {
  const [formData, setFormData] = useState({
    stockName: "",
    pictures: [],
    quantity: "",
    pricePerKg: "",
    location: "",
    postDate: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, pictures: Array.from(e.target.files) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare FormData object to send text and files
    const form = new FormData();
    for (const key in formData) {
      if (key === "pictures") {
        formData.pictures.forEach((file) => form.append("pictures[]", file)); // For multiple files
      } else {
        form.append(key, formData[key]);
      }
    }

    // Send the data using fetch
    fetch("/api/post-stock", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Stock posted successfully:", data);
        navigate("/fstock");
      })
      .catch((error) => {
        console.error("Error posting stock:", error);
      });
  };

  const fields = [
    { label: "Stock Name", name: "stockName", type: "text", placeholder: "Enter stock name" },
    { label: "Pictures", name: "pictures", type: "file", placeholder: "", multiple: true, isFile: true },
    { label: "Quantity (in kgs)", name: "quantity", type: "number", placeholder: "Enter quantity" },
    { label: "Price Per Kg", name: "pricePerKg", type: "number", placeholder: "Enter price per kg" },
    { label: "Location", name: "location", type: "text", placeholder: "Enter location" },
    { label: "Post Date", name: "postDate", type: "date", placeholder: "" },
  ];

  return (
    <>
    <FHeader/>
    <div className="bg-green-50 min-h-screen py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-4">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">Post Your Stock</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map(({ label, name, type, placeholder, multiple, isFile }) => (
            <InputField
              key={name}
              label={label}
              name={name}
              type={type}
              value={formData[name]}
              onChange={isFile ? handleFileChange : handleInputChange}  // Conditional handler for file inputs
              placeholder={placeholder}
              multiple={multiple}
            />
          ))}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg font-medium"
          >
          <Link to='/fstock'>
          Post Stock
          </Link>
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
