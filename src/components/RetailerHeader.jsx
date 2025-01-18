import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from '../../public/images/logo.png'; // Ensure correct path
import profileIcon from '../../public/images/profile-icon.png'; // Add a profile icon image

export default function RHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(prevState => !prevState);
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex items-center justify-between mx-auto max-w-screen-xl">
          
          {/* Hamburger Menu */}
          <button 
            className="lg:hidden p-2 text-green-700 relative z-50" 
            onClick={toggleMenu}
          >
            <div className={`w-6 h-1 bg-green-700 transition-all duration-300 transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-1 bg-green-700 my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-1 bg-green-700 transition-all duration-300 transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>

          {/* Logo aligned to right on mobile */}
          <Link to="/" className="lg:ml-0 ml-auto flex">
            <img
              src={logo}
              className="h-8 sm:h-10 md:h-12 max-w-full object-contain"
              alt="FARMS"
            />
          </Link>

          {/* Centered Navigation Links */}
          <div className="hidden lg:flex flex-grow justify-center">
            <NavLink to="/rhome" className={({ isActive }) => `block py-2 px-4 text-sm font-medium duration-200 ${isActive ? "text-green-700" : "text-gray-700"} hover:text-green-700`}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `block py-2 px-4 text-sm font-medium duration-200 ${isActive ? "text-green-700" : "text-gray-700"} hover:text-green-700`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `block py-2 px-4 text-sm font-medium duration-200 ${isActive ? "text-green-700" : "text-gray-700"} hover:text-green-700`}>
              Contact Us
            </NavLink>
          </div>

          {/* Profile Icon */}
          <div className="relative">
            <img
              src={profileIcon}
              alt="Profile"
              className="w-13 border-2  h-12 rounded-full cursor-pointer border border-green-700"
              onClick={toggleProfileDropdown}
            />
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-green-700 rounded-md shadow-lg">
                <ul className="py-1">
                  <li>
                    <NavLink to="/rdash" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-700 hover:text-white">My Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink to="/rpost" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-700 hover:text-white">Post Demand</NavLink>
                  </li>
                  <li>
                    <NavLink to="/rinsights" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-700 hover:text-white">Insights</NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
