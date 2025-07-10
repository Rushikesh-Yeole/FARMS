import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Footer() {
  useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=REM:wght@100..900&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }, []);
  return (
    <footer className="bg-green-700  text-white py-8">
      <div className="max-w-screen-xl  mx-auto px-4 sm:px-6 lg:px-8" style={{ fontFamily: "'REM', sans-serif" }} >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">FARMS</h3>
            <p className="text-sm mb-4">Empowering Farm-to-Table Connectivity</p>
            <p className="text-sm">&copy; {new Date().getFullYear()} FARMS. All Rights Reserved.</p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-green-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm hover:text-green-300 transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-green-300 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="text-sm flex items-center justify-center md:justify-start">
                <FaPhone className="mr-2" /> +91 123 456 7890
              </p>
              <p className="text-sm flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-2" /> contact@farms.com
              </p>
              <p className="text-sm flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-2" /> Mumbai, Maharashtra
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="hover:text-green-300 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-green-300 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
