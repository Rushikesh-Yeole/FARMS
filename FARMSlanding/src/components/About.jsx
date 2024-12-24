import React from "react";

function About() {
  return (
    <div className="bg-gradient-to-br from-green-100 via-green-200 to-green-300 min-h-screen p-8 flex flex-col items-center">
      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold text-green-800 mb-6 text-center tracking-wide">
        Building a Data-Driven Farm-to-Table Ecosystem
      </h1>

      {/* Subheading */}
      <h2 className="text-xl font-medium text-green-600 text-center mb-12 max-w-3xl">
        Revolutionizing the supply chain for farmers, retailers, and
        transporters through technology and data-driven insights.
      </h2>

      {/* Phase 1 */}
      <div className="w-full max-w-5xl mb-16">
        <h2 className="text-3xl font-semibold text-green-700 mb-4 tracking-wide">
          Phase 1: Marketplace Platform for Transparent Transactions
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Create a platform that seamlessly connects farmers, retailers/vendors,
          and transporters to enable efficient, transparent transactions.
        </p>
        <ul className="list-none flex flex-wrap gap-6 text-green-900 font-medium">
          <li className="bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-50 transition">
            Product Listings for Farmers
          </li>
          <li className="bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-50 transition">
            Retailers' Demands in Real-Time
          </li>
          <li className="bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-50 transition">
            Transport Pooling Options
          </li>
        </ul>
      </div>

      {/* Phase 2 */}
      <div className="w-full max-w-5xl mb-16">
        <h2 className="text-3xl font-semibold text-green-700 mb-4 tracking-wide">
          Phase 2: Data-Driven Ecosystem for Supply Chain Optimization
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Leverage transaction and stock data to provide actionable insights,
          enhancing decision-making and reducing inefficiencies.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl text-green-700">✔️</span>
            <p className="text-gray-800">Sales Analytics for better planning</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl text-green-700">✔️</span>
            <p className="text-gray-800">
              Personalized Recommendations for stakeholders
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl text-green-700">✔️</span>
            <p className="text-gray-800">Predictive Insights on trends</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl text-green-700">✔️</span>
            <p className="text-gray-800">Market Trends Dashboard</p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-semibold text-green-700 mb-4 tracking-wide">
          Vision for the Future
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed">
          This project lays the foundation for a sustainable, tech-enabled
          farm-to-table ecosystem, empowering stakeholders with data-driven
          insights to ensure economic growth and long-term sustainability.
        </p>
      </div>
    </div>
  );
}

export default About;
