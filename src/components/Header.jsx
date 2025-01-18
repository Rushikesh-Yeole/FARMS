// import { useState, useEffect } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";

// const navItems = [
//   { to: "spost", label: "Farmer Post" },
//   { to: "fstock", label: "Farmer Stock" },
//   { to: "fdpost", label: "Farmer Demand" },
//   { to: "fdemand", label: "Transport Demands" },
//   { to: "TFeed", label: "Transporter" },
//   { to: "rhome", label: "Retailer" },
//   { to: "rpost", label: "Retailer Post" },
//   { to: "rdash", label: "Retailer Demands" },
//   { to: "/about", label: "About" },
//   { to: "/Sign-in", label: "Sign In" },
// ];

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();

//   // Close the menu whenever the route changes
//   useEffect(() => {
//     setMenuOpen(false);
//   }, [location]);

//   return (
//     <header className="bg-slate-200 shadow-md">
//       <div className="flex justify-between items-center max-w-6xl mx-auto p-3 relative">
//         <Link to="/" className="font-bold text-sm sm:text-xl">
//           FARMS
//         </Link>

//         {/* Container for button and dropdown */}
//         <div className="relative">
//           {/* Hamburger menu button */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="p-2 rounded-md"
//           >
//             {menuOpen ? (
//               <FaTimes className="text-2xl text-teal-500" />
//             ) : (
//               <FaBars className="text-2xl text-teal-500" />
//             )}
//           </button>

//           {/* Dropdown menu */}
//           {menuOpen && (
//             <div
//               className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md z-50 w-60 lg:w-48"
//             >
//               <ul className="flex flex-col p-4">
//                 {navItems.map(({ to, label }) => (
//                   <li key={to} className="mb-2">
//                     <Link
//                       to={to}
//                       className="block py-2 px-4 rounded-md bg-teal-500 text-white hover:bg-teal-700 transition duration-300"
//                     >
//                       {label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
