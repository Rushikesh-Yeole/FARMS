import { Link, NavLink } from "react-router-dom";
import logo from '../assets/logo.png'; // Ensure correct path

export default function Header() {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="h-8 sm:h-10 md:h-12 max-w-full object-contain"
              alt="FARMS"
            />
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              className="text-white bg-green-700 border border-transparent hover:bg-white hover:text-green-700 hover:border-green-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="text-white bg-green-700 border border-transparent hover:bg-white hover:text-green-700 hover:border-green-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-4 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Register
            </Link>
          </div>
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
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
          </div>
        </div>
      </nav>
    </header>
  );
}
