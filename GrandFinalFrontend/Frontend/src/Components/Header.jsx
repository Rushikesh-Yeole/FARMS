import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../../public/images/logo.png'; // Ensure correct path
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../store/loginSlice";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogin} = useSelector((state) => state.loginuser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogin = () => {
    navigate("/loginpage");
  };
  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/"); // Redirect to homepage after logout
  };

  // ✅ Prevent horizontal scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  }, [isMenuOpen]);

  return (
    <header className="shadow sticky top-0 z-50">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex items-center justify-between mx-auto max-w-screen-xl">
          {/* ✅ Hamburger Menu */}
          <button className="lg:hidden p-2 text-green-700  relative z-50" onClick={toggleMenu}>
            <div className={`w-6 h-1 bg-green-700 transition-all duration-300 transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-1 bg-green-700 my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-1 bg-green-700 transition-all duration-300 transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
          

          {/* ✅ Logo */}
          <Link to="/" className="lg:ml-0 ml-auto flex">
            <img src={logo} className="h-8 sm:h-10 md:h-12 max-w-full object-contain" alt="FARMS" />
          </Link>
          
          {/* ✅ Desktop Navigation Links */}
          <div className="hidden lg:flex flex-grow justify-center">
            <NavLink to="/" className={({ isActive }) => `block py-2 px-4 text-lg font-medium duration-200 ${isActive ? "text-green-700" : "text-gray-700"} hover:text-green-700 `}>Home</NavLink>
            <NavLink to="/profile" className={({ isActive }) => `block py-2 px-4 text-lg font-medium duration-200 ${isActive ? "text-green-700" : "text-gray-700"} hover:text-green-700`}>My Profile</NavLink>
            <NavLink to="/about" className={({ isActive }) => `block py-2 px-4 text-lg font-medium duration-200 ${isActive ? "text-green-700" : "text-gray-700"} hover:text-green-700`}>About</NavLink>
            <NavLink to="/contactus" className={({ isActive }) => `block py-2 px-4 text-lg font-medium duration-200 ${isActive ? "text-green-700" : "text-gray-700"} hover:text-green-700`}>Contact Us</NavLink>
          </div>

          {/* ✅ Login/Register or Logout Button */}
          <div className="hidden lg:block ml-auto">
            {isLogin ? (
              <button onClick={handleLogout} className="text-white bg-red-600 border border-transparent hover:bg-white hover:text-red-600 hover:border-red-600 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none mt-4">
                Log out
              </button>
            ) : (
              <button onClick={handleLogin} className="text-white bg-green-700 border-2 border-transparent hover:bg-white hover:text-green-700 hover:border-green-700 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none mb-0 mt-1">
                Log in / Register
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ Sidebar Overlay (Only Appears When Menu is Open) */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-70  z-40" onClick={toggleMenu}></div>
      )}

      {/* ✅ Sidebar for Mobile */}
      <div className={`lg:hidden fixed left-0 top-0 sm:w-full md:w-1/2 h-full bg-white p-4 pt-16 border-2 z-40 transition-all duration-700 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className="space-y-4 pl-4">
          <li><NavLink to="/profile" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-green-700" : "text-gray-700"} hover:text-green-700`} onClick={toggleMenu}>My Profile</NavLink></li>
          <li><NavLink to="/" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-green-700" : "text-gray-700"} hover:text-green-700`} onClick={toggleMenu}>Home</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-green-700" : "text-gray-700"} hover:text-green-700`} onClick={toggleMenu}>About</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-green-700" : "text-gray-700"} hover:text-green-700`} onClick={toggleMenu}>Contact Us</NavLink></li>
        </ul>

        {/* ✅ Mobile Login/Register or Logout Button */}
        {isLogin ? (
          <button onClick={handleLogout} className="text-white bg-red-600 border border-transparent hover:bg-white hover:text-red-600 hover:border-red-600 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none mt-4">
            Log out
          </button>
        ) : (
          <button onClick={handleLogin} className="text-white bg-green-700 border-4 hover:bg-white hover:text-green-700 hover:border-green-700 rounded-lg text-2xl px-4 py-4 focus:outline-none mt-4">
            Log in / Register
          </button>
        )}
      </div>
    </header>
  );
}
