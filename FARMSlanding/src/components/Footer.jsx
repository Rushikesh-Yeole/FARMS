import React from 'react';

function Footer() {
  return (
    <footer className="bg-green-700 text-white py-4">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <p className="text-sm">&copy; {new Date().getFullYear()} FARMS. All Rights Reserved.</p>
          </div>

          {/* Middle Section (Links) */}
          <div className="flex justify-center gap-6">
            <a href="/" className="text-sm hover:underline">
              Home
            </a>
            <a href="/about" className="text-sm hover:underline">
              About
            </a>
            <a href="/contact" className="text-sm hover:underline">
              Contact Us
            </a>
          </div>

          {/* Right Section (Social Media or Logo) */}
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
                alt="Facebook"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg"
                alt="Twitter"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
