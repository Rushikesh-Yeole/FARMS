import React from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation(); // Access location object
  const { message } = location.state || {}; // Get success message

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Home Page</h1>
        {message && (
          <p className="text-green-500 text-center">{message}</p> // Display success message
        )}
      </div>
    </div>
  );
};

export default HomePage;
