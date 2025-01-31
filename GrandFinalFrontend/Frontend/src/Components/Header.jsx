import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from '../../public/images/logo.png'; // Ensure correct path

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const handleRetailerClick = () => {
    setIsModalOpen(false);
    navigate('/rhome');
  };
  const handleTransporterClick=()=>{
    setIsMenuOpen(true);
    navigate('/tfeed')
  }
  const handleFarmerClick=()=>{
    setIsMenuOpen(true);
    navigate('/ffeed')
  }
  
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
            
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 px-4 text-sm font-medium duration-200 ${
                  isActive ? "text-green-700" : "text-gray-700"
                } hover:text-green-700`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `block py-2 px-4 text-sm font-medium duration-200 ${
                  isActive ? "text-green-700" : "text-gray-700"
                } hover:text-green-700`
              }
            >
              Myprofile
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 px-4 text-sm font-medium duration-200 ${
                  isActive ? "text-green-700" : "text-gray-700"
                } hover:text-green-700`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contactus"
              className={({ isActive }) =>
                `block py-2 px-4 text-sm font-medium duration-200 ${
                  isActive ? "text-green-700" : "text-gray-700"
                } hover:text-green-700`
              }
            >
              Contact Us
            </NavLink>
          </div>

          {/* Login/Register Button */}
          <div className="hidden lg:block ml-auto">
            <button
              onClick={toggleModal}
              className="text-white  bg-green-700 border border-transparent hover:bg-white hover:text-green-700 hover:border-green-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
            >
              Log in / Register
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div 
  className={`lg:hidden fixed  inset-0 ${isMenuOpen ? 'bg-black bg-opacity-70' : 'bg-white bg-opacity-0'} z-40`}
>

        <div  className={` left-0 top-0 sm:w-full md:w-1/2 h-full bg-white p-4 pt-16 border-2 inset-0   z-40 transition-all duration-700 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <ul className="space-y-4 pl-4">
          <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-green-700" : "text-gray-700"
                  } hover:text-green-700`
                }
              >
                Myprofile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-green-700" : "text-gray-700"
                  } hover:text-green-700`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-green-700" : "text-gray-700"
                  } hover:text-green-700`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-green-700" : "text-gray-700"
                  } hover:text-green-700`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <button
            onClick={toggleModal}
            className="text-white bg-green-700 border border-transparent hover:bg-white hover:text-green-700 hover:border-green-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none mt-4"
          >
            Log in / Register
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white  w-60 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-green-700">Select Role</h2>
            <div className="flex  flex-col space-y-4">
              <button onClick={handleFarmerClick} className="text-white bg-green-700 hover:bg-white hover:text-green-700 border border-green-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                Farmer
              </button>
              <button onClick={handleRetailerClick} className="text-white bg-green-700 hover:bg-white hover:text-green-700 border border-green-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                Retailer
              </button>
              <button onClick={handleTransporterClick} className="text-white bg-green-700 hover:bg-white hover:text-green-700 border border-green-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                Transporter
              </button>
            </div>
            <button onClick={toggleModal} className="mt-4 text-sm text-gray-500 underline">
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}