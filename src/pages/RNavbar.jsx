// Navbar.jsx
import React from 'react';
import {NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 shadow bg-white">
      <nav className="flex items-center justify-between p-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="images\logo.png" alt="FARMS" className="h-10 mr-3" />
        </Link>


        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            
             
             
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? 'text-green-700' : 'text-gray-700'
                    } hover:text-green-700`
                  }
                >
                  My Demands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/retailer_profile"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? 'text-green-700' : 'text-gray-700'
                    } hover:text-green-700`
                  }
                >
                 My Profile
                </NavLink>
              </li>
              
            </ul>
          </div>












        {/* Search Bar */}
        <div className="flex-1 ml-56 mx-4">
          <input
            type="text"
            placeholder="Search for products, locations..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Demand Button */}
        <Link to="/post-demand">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
            Upload Demand
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
