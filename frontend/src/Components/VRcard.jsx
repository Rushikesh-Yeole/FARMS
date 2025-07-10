import VRBestDealTag from "../Components/VRBestDealTag";
import React from "react";
import { MapPin, Package, ArrowRight } from "lucide-react";

const VRcard = ({ product }) => {
  return (
    <div className="w-60 md:w-64 lg:w-72 border border-gray-200 bg-white relative mr-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex-shrink-0 font-sans">
      {product.type && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">
          {product.type}
        </div>
      )}
      { <VRBestDealTag />} {/* Conditionally render Best Deal tag */}
      <div className="relative">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-48 border-b-1 object-contain transition-transform duration-200 rounded-t-lg hover:scale-105"
          onError={(e) => { e.target.onerror = null; e.target.src="placeholder_image.jpg"}} // Placeholder image on error
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{product.name}</h3>
        {/* <p className="text-gray-600 text-sm line-clamp-2 mt-1">{product.description}</p> */}
        <div className="mt-1 space-y-1">
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Package className="w-4 h-4 mr-2 text-gray-400" />
            <span>{product.quantity} kg available</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-3">
          <span className="text-lg font-bold text-green-600">
            ₹{product.price.toLocaleString()}/kg
          </span>
          <button className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium">
            View Details
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VRcard;