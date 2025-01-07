import React from "react";
import { Link } from "react-router-dom";
import  Stats from "./NitishStats";
import Product  from "./NitishProduct";
import Header from "./NitishHeader";

function Home() {
  return (
    <>
    <Header/>
      <div
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(https://www.loadcellshop.co.uk/wp-content/uploads/2020/09/LC-farming-Sep-2020.jpg)` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center text-center h-full text-white px-4">
          <h1 className="text-4xl sm:text-5xl font-bold">FARMS</h1>
          <p className="text-lg sm:text-xl font-medium mt-2">Empowering Farm-to-Table Connectivity</p>
          <Link
            to="/rinsights"
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