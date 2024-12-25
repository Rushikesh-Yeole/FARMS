import React, { useState } from "react";

const PostStock = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <div className="flex w-full  items-center justify-center min-h-screen bg-green-50">
      <form
        className="bg-white p-8 mt-6 rounded-lg shadow-lg w-full max-w-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">
          Post Your Stock
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Stock Name</label>
          <input
            type="text"
            placeholder="Enter stock name"
            required
        className="w-full p-2 border rounded-md focus:outline-none focus:border-2 border-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Pictures</label>
          <input
            type="file"
            accept="image/*"
            required
           className="w-full p-2 border rounded-md focus:outline-none focus:border-2 border-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Quantity (in kgs)</label>
          <input
            type="number"
            placeholder="Enter quantity"
            required
           className="w-full p-2 border rounded-md focus:outline-none focus:border-2 border-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price Per Kg</label>
          <input
            type="number"
            placeholder="Enter price per kg"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:border-2 border-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            required
      className="w-full p-2 border rounded-md focus:outline-none focus:border-2 border-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Post Date</label>
          <input
            type="date"
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:border-2 border-green-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600"
        >
          Post Stock
        </button>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md text-center shadow-lg">
              <h3 className="text-green-600 font-bold text-xl mb-4">
                Stock Posted Successfully!
              </h3>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PostStock;
