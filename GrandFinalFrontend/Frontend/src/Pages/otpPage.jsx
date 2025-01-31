import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../store/profileSlice";
import { useLocation, useNavigate } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otpLoading, otpError } = useSelector((state) => state.profile);

  // Extract form data passed via navigate
  const {
    phoneNumber,
    firstName,
    lastName,
    contactNumber,
    password,
    accountType,
  } = location.state || {};

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return;

    // Ensure OTP is sent as a string
    const otpString = otp.toString();

    dispatch(
      verifyOtp({
        phoneNumber,
        otp: otpString,
        firstName,
        lastName,
        contactNumber,
        password,
        accountType,
      })
    ).then((result) => {
      if (result.type === "profile/verifyOtp/fulfilled") {
        // OTP verification succeeded, navigate to home page
        navigate("/About", { state: { message: "Registered successfully!" } });
      } else {
        // OTP verification failed, show error message
        alert("Invalid OTP. Please try again.");
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Verify OTP</h1>
        {otpError && <p className="text-red-500 text-center">{otpError}</p>}
        <div className="mb-4">
          <label htmlFor="otp" className="block text-gray-700">
            Enter OTP
          </label>
          <input
            type="text"
            name="otp"
            id="otp"
            value={otp}
            onChange={handleOtpChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full text-white py-2 px-4 rounded-lg ${
            otpLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
          disabled={otpLoading}
        >
          {otpLoading ? "Verifying OTP..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpPage