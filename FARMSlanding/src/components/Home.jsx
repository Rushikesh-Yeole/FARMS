import React from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import Stats from "./Stats";

function Home() {
  return (
    <>
      <div
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url('https://via.placeholder.com/1920x1080')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center text-center h-full text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold">FARMS</h1>
          <p className="text-lg sm:text-xl font-medium mt-2">Empowering Farm-to-Table Connectivity</p>
          <Link
            to="/stats"
            className="mt-4 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            View Stats
          </Link>
        </div>
      </div>
      <Product />
      <Stats/>
    </>
  );
}

export default Home;
