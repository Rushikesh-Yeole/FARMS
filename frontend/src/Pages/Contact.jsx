import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

function Contact() {
  useEffect(() => {
      const link = document.createElement("link");
      link.href = "https://fonts.googleapis.com/css2?family=REM:wght@100..900&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback('Message sent successfully!');
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto " style={{ fontFamily: "'REM', sans-serif" }} >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-800 mb-4">Contact Us</h1>
          <p className="text-gray-600">Get in touch with FARMS</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg h-32 resize-none focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Send Message
              </button>
            </form>

            {/* Live Feedback */}
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center text-green-600"
              >
                <FaCheckCircle className="mr-2" />
                {feedback}
              </motion.div>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 space-y-6"
          >
            <h2 className="text-2xl font-bold text-green-800 mb-6">Get in Touch</h2>
            
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-2xl text-green-600" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">123 Farm Street, Agri Tower</p>
                <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-2xl text-green-600" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">contact@farmsproject.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <FaPhone className="text-2xl text-green-600" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+91 123 456 7890</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;