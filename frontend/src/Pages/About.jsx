import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTractor, FaStore, FaTruck, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function About() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=REM:wght@100..900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { bg: "bg-green-600", title: "Slide 1" },
    { bg: "bg-blue-200", title: "Slide 2" },
    { bg: "bg-yellow-200", title: "Slide 3" },
    { bg: "bg-red-200", title: "Slide 4" },
    { bg: "bg-purple-200", title: "Slide 5" },
    { bg: "bg-pink-200", title: "Slide 6" },
    { bg: "bg-indigo-200", title: "Slide 7" },
    { bg: "bg-orange-200", title: "Slide 8" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const cards = [
    {
      title: "Product Listings for Farmers",
      icon: <FaTractor className="text-5xl text-green-600" />,
      description: "List your agricultural products and reach a wider market of buyers"
    },
    {
      title: "Retailers' Demands in Real-Time",
      icon: <FaStore className="text-5xl text-green-600" />,
      description: "Access real-time demand data and connect directly with farmers"
    },
    {
      title: "Transport Pooling Options",
      icon: <FaTruck className="text-5xl text-green-600" />,
      description: "Optimize logistics with shared transport solutions"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-br bg-green-200 min-h-screen p-8 flex flex-col items-center" style={{ fontFamily: "'REM', sans-serif" }}>
        <h1 className="text-5xl font-extrabold text-green-800 mb-6 text-center tracking-wide">
          Building a Data-Driven Farm-to-Table Ecosystem
        </h1>

        <h2 className="text-xl font-medium text-green-600 text-center mb-12 max-w-3xl">
          Revolutionizing the supply chain for farmers, retailers, and transporters through technology and data-driven insights.
        </h2>

        <div className="w-full max-w-5xl mb-4">
          <h2 className="text-3xl font-semibold text-green-800 mb-4 tracking-wide">
            Phase 1: Marketplace Platform for Transparent Transactions
          </h2>

          <div className="w-full max-w-6xl mb-8">
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 w-full md:w-[350px] h-[280px] flex flex-col justify-between transform-gpu transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    {card.icon}
                    <h3 className="text-2xl font-bold text-green-700">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full max-w-5xl mb-16">
        <motion.div
        className="w-full max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold text-green-700 mb-4 tracking-wide">
          Phase 2: Data-Driven Ecosystem for Supply Chain Optimization
        </h2>
        <p className="text-lg text-gray-800 leading-relaxed mb-6">
          Leverage transaction and stock data to provide actionable insights,
          enhancing decision-making and reducing inefficiencies.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <span className="text-2xl text-green-700">✔️</span>
            <p className="text-gray-800">Sales Analytics for better planning</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl text-green-700">✔️</span>
            <p className="text-gray-800">
              Personalized Recommendations for stakeholders
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl text-green-700">✔️</span>
            <p className="text-gray-800">Predictive Insights on trends</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl text-green-700">✔️</span>
            <p className="text-gray-800">Market Trends Dashboard</p>
          </div>
        </div>

        </motion.div>
      </div>
      {/* Vision Section */}
            <div className="flex flex-col gap-16 p-8">
              {/* Features Section with Hover Effects */}
              <div className="flex align-centre">
               
      
                {/* Vision Section with Animation */}
                <motion.div 
                  className="w-full max-w-5xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="text-3xl font-semibold text-green-700 mb-4 tracking-wide transition-transform">
                    Vision for the Future
                  </h2>
                  <p className="text-lg text-gray-800 leading-relaxed hover:text-green-900 transition-colors">
                    This project lays the foundation for a sustainable, tech-enabled
                    farm-to-table ecosystem, empowering stakeholders with data-driven
                    insights to ensure economic growth and long-term sustainability.
                  </p>
                </motion.div>
              </div>
            </div>

        <div className="relative w-full h-[50vh] bg-green-200 mb-16 mt-10">
          <div className="mx-auto max-w-7xl h-full px-4">
            <div className="relative h-full flex items-start pt-8">
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  className={`absolute w-full h-[45vh] ${slide.bg} rounded-xl shadow-lg ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: currentSlide === index ? 0 : currentSlide > index ? -100 : 100, opacity: currentSlide === index ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <h2 className="text-4xl text-center mt-20">{slide.title}</h2>
                </motion.div>
              ))}

              <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-20" onClick={prevSlide}>
                <FaChevronLeft className="text-green-600 text-xl" />
              </button>
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-20" onClick={nextSlide}>
                <FaChevronRight className="text-green-600 text-xl" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                  <button key={index} className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSlide === index ? "bg-green-600" : "bg-gray-400"}`} onClick={() => setCurrentSlide(index)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
