import React from "react";

function Stats() {
  return (
    <div className="bg-green-100 min-h-screen p-4 flex flex-col items-center">
      <h2 className="text-green-700 font-bold text-2xl mb-4">Real-Time Crop Market Prices</h2>
      
      {/* Static Image Section */}
      <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl">
        <img
          src="https://via.placeholder.com/800x400?https://www.thebusinessresearchcompany.com/graphimages/General_Crop_Farming_Global_Market_Report_2024_Graph.webptext=Crop+Market+Prices+Chart"
          alt="Crop Market Prices Chart"
          className="rounded w-full"
        />
        <p className="text-gray-700 mt-2 text-center">Crop prices simulation chart (static image).</p>
      </div>
    </div>
  );
}

export default Stats;
