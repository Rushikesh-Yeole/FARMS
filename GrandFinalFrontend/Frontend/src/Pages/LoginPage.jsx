import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/loginSlice";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.loginuser);
  const navigate = useNavigate(); // Declare the useNavigate hook here

  const handleLogin = () => {
    if (mobileNumber && password) {
      dispatch(login({ mobileNumber, password })).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          const user = result.payload; // Extract userData from payload
          navigate('/')
        } else {
          alert("User not logged in");
        }
      });
    }
  };



  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

        {/* Mobile Number Input */}
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-3 text-white font-semibold rounded-lg transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

        {/* User Data Display (For Debugging) */}
        {userData && (
          <div className="mt-4 p-3 bg-gray-50 border rounded-lg text-sm text-gray-600">
            {JSON.stringify(userData)}
          </div>
        )}

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
