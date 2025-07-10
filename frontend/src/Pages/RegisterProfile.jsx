import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerProfile } from "../store/profileSlice";
import { useNavigate } from "react-router-dom";

const RegisterProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    password: "",
    accountType: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerProfile(formData)).then((result) => {
      if (result.type === "profile/registerProfile/fulfilled") {
        // Navigate to OTP page with the contact number
        navigate("/otp", { state: formData });
      }
      
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Register Profile</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:ring-green-400 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:ring-green-400 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-gray-700">
            Contact Number
          </label>
          <input
            type="text"
            name="contactNumber"
            id="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:ring-green-400 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="accountType" className="block text-gray-700">
            Account Type
          </label>
          <select
            name="accountType"
            id="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full px-4 py-2 border focus:ring-green-400 rounded-lg"
            required
          >
            <option value="">Select Account Type</option>
            <option value="Farmer">Farmer</option>
            <option value="Retailer">ShopKeeper</option>
            <option value="Transporter">Transporter</option>
            <option value="Consumer">Consumer</option>
          </select>
        </div> 
        <button
          type="submit"
          className={`w-full text-white py-2 px-4 rounded-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterProfile;
