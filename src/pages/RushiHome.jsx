import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-r from-blue-600 to-teal-500 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-4">
            Building a Data-Driven Farm-to-Table Ecosystem
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Empowering farmers, retailers, and transporters with transparent transactions, actionable insights, and optimized logistics.
          </p>
          <Link to="/about">
            <button className="bg-teal-600 text-white text-lg py-2 px-6 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300">
              Learn More <FaArrowRight className="inline ml-2" />
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 px-6">
        <h2 className="text-3xl sm:text-4xl text-center font-semibold mb-12 text-gray-800">
          Transforming Supply Chains in Two Phases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Phase 1 */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Phase 1: Transparent Marketplace</h3>
            <p className="text-gray-600 mb-4">
              Create a seamless platform connecting farmers, retailers, and transporters for efficient, transparent transactions.
            </p>
          </div>
          {/* Phase 2 */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Phase 2: Data-Driven Ecosystem</h3>
            <p className="text-gray-600 mb-4">
              Empower stakeholders with actionable insights, predictive analytics, and trend forecasts for supply chain optimization.
            </p>
          </div>
          {/* Stakeholder Benefits */}
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Stakeholder Benefits</h3>
            <p className="text-gray-600 mb-4">
              Farmers, retailers, and transporters gain access to better markets, smarter inventory, and optimized logistics for sustained growth.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
