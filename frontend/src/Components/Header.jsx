import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from '../../public/images/logo.png';
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../store/loginSlice";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLogin } = useSelector((state) => state.loginuser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(prevState => !prevState);
  const handleLogin = () => navigate("/loginpage");
  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/");
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <header className="shadow sticky top-0 z-50">
      <nav className="bg-white px-4 py-2.5">
        <div className="flex items-center justify-between mx-auto max-w-screen-xl">
          {/* Hamburger Menu Button (Visible on both desktop and mobile) */}
          <button className="lg:block p-2 text-green-700" onClick={toggleMenu}>
            <div className={`w-6 h-1 bg-green-700 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-1 bg-green-700 my-1 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-1 bg-green-700 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>

          <Link to="/" className="ml-auto flex">
            <img src={logo} className="h-10 max-w-full object-contain" alt="FARMS" />
          </Link>

          {/* Desktop Navigation Links (Hidden when the hamburger is toggled) */}
          <div className="hidden lg:flex flex-grow justify-center">
            <NavLink to="/" className={({ isActive }) => `py-2 px-4 text-lg ${isActive ? 'text-green-700' : 'text-gray-700'}`}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `py-2 px-4 text-lg ${isActive ? 'text-green-700' : 'text-gray-700'}`}>About</NavLink>
            <NavLink to="/contactus" className={({ isActive }) => `py-2 px-4 text-lg ${isActive ? 'text-green-700' : 'text-gray-700'}`}>Contact Us</NavLink>
          </div>

          {/* Login/Logout Button */}
          <div className="hidden lg:block ml-auto">
            {isLogin ? (
              <button onClick={handleLogout} className="bg-red-600 text-white rounded-lg px-4 py-2">Log out</button>
            ) : (
              <button onClick={handleLogin} className="bg-green-700 text-white rounded-lg px-4 py-2">Log in / Register</button>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay (Visible when Menu is open) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70" onClick={toggleMenu}></div>
      )}

      {/* Sidebar Menu for Both Desktop and Mobile */}
      <div className={`fixed left-0 top-0 w-1/2 h-full bg-white p-4 transition-transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:w-1/3`}>
        <ul className="space-y-4">
          <li><NavLink to="/" className="py-2 text-lg" onClick={toggleMenu}>Home</NavLink></li>
          <li><NavLink to="/exporthome" className="py-2 text-lg" onClick={toggleMenu}>Export</NavLink></li>
          <li><NavLink to="/notification" className="py-2 text-lg" onClick={toggleMenu}>Notifications</NavLink></li>
        </ul>

        {isLogin ? (
          <button onClick={handleLogout} className="bg-red-600 text-white rounded-lg px-4 py-2 mt-4">Log out</button>
        ) : (
          <button onClick={handleLogin} className="bg-green-700 text-white rounded-lg px-4 py-2 mt-4">Log in / Register</button>
        )}
      </div>
    </header>
  );
}
