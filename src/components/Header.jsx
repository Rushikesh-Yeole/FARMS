import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "spost", label: "Farmer post Stock" },
  { to: "fstock", label: "Farmer Stock" },
  { to: "fdpost", label: "Farmer post Demand" },
  { to: "fdemand", label: "Farmer Demands" },
  { to: "TFeed", label: "Transporter" },
  { to: "/about", label: "About" },
  { to: "/Sign-in", label: "Sign In" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();  // Hook to get the current location

  // Close the menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);  // Close the menu on route change
  }, [location]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="font-bold text-sm sm:text-xl">FARMS</Link>

        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-md">
          {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>

        <nav className="hidden lg:flex space-x-6">
          {navItems.map(({ to, label }) => (
            <Link key={to} to={to} className="py-2 px-6 rounded-full bg-teal-500 text-white hover:bg-teal-700">
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center z-40">
          <ul className="flex flex-col gap-6 text-center">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="block py-2 px-8 rounded-full bg-teal-500 text-white text-lg hover:bg-teal-700">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-white text-3xl">
            <FaTimes />
          </button>
        </div>
      )}
    </header>
  );
}
