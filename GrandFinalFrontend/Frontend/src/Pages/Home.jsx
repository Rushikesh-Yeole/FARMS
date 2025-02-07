import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Test3 from "../assets/animation/Test3";
import Test2 from "../assets/animation/Test2";
import Test from "../assets/animation/Test";
import pic1 from "../assets/picture/web1final.jpeg";
import pic2 from "../assets/picture/web2.webp";
import FarmerHome from "../Components/FarmerHome";
import RetailerHome from "../Components/RetailerHome";
import { useSelector } from "react-redux";

function Home() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=REM:wght@100..900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const carouselImages = [pic1, pic2];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [text, setText] = useState("");
  const headingText = "Empowering Farm-to-Table Connectivity";

  // ✅ Corrected Redux state selection
  const userData = useSelector((state) => state.loginuser?.userData);
  const isLogin = useSelector((state) => state.loginuser?.isLogin);
  const usertype = userData?.accountType; // ✅ Safely get user role

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let index = 0;
    let isAdding = true;
    const interval = setInterval(() => {
      setText(headingText.slice(0, index + 1));
      if (isAdding) {
        index++;
        if (index === headingText.length) isAdding = false;
      } else {
        index--;
        if (index === 0) isAdding = true;
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-green-200 min-h-screen font-rem">
      {!isLogin ? (
        <div className="relative w-full mx-auto flex justify-center items-center">
          <div className="relative h-[92vh] w-full overflow-hidden">
            {carouselImages.map((image, index) => (
              <motion.div
                key={index}
                className="absolute w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={index === currentSlide ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent" />
                <motion.div
                  className="absolute inset-0 flex items-center px-4 md:px-8 lg:ml-20 max-w-[90%] md:max-w-2xl lg:max-w-3xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1
                    className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
                    style={{ fontFamily: "'REM', sans-serif" }}
                  >
                    {index === 0 ? (
                      <span className="block">Optimising Farmer's<br className="hidden md:block" /> product Cost</span>
                    ) : (
                      <span className="block">Connecting Farmer<br className="hidden md:block" /> To Retailer</span>
                    )}
                  </h1>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {usertype === "Farmer" && <FarmerHome />}
          {usertype === "Retailer" && <RetailerHome />}
        </>
      )}

      <motion.div
        className="flex flex-col lg:flex-row justify-center items-center px-6 lg:px-16 gap-6 w-full mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full lg:w-1/2 flex justify-center h-auto lg:h-[450px]">
          <Test />
        </div>
        <div className="w-full lg:w-1/2 text-left">
          <h2
            className="text-green-700 text-3xl mb-4"
            style={{ fontFamily: "'REM', sans-serif", fontWeight: 500 }}
          >
            {text}
          </h2>
          <p className="text-black text-lg leading-relaxed" style={{ fontFamily: "'REM', sans-serif" }}>
            Our platform bridges the gap between farmers and consumers...
          </p>
        </div>
      </motion.div>

      <div className="flex justify-center items-center gap-6 mt-16 px-4 lg:px-12 pb-4">
        <div className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-7xl">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center w-full md:w-[300px] lg:w-[350px] mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full h-56 bg-green-300 rounded-lg overflow-hidden mb-4">
                <img
                  src="https://images.pexels.com/photos/2090642/pexels-photo-2090642.jpeg"
                  alt="Farm Field"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-black text-center" style={{ fontFamily: "'REM', sans-serif" }}>
                This section highlights how our platform optimizes logistics...
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="flex flex-col lg:flex-row justify-center items-center px-6 lg:px-16 gap-6 w-full mb-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full lg:w-1/2 text-left">
          <h2 className="text-green-700 text-3xl mb-4">{text}</h2>
          <p className="text-black text-lg leading-relaxed" style={{ fontFamily: "'REM', sans-serif" }}>
            Our platform bridges the gap between farmers and consumers...
          </p>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center h-auto lg:h-[450px]">
          <Test3 />
        </div>
      </motion.div>
      <Test2 />
    </div>
  );
}

export default Home;
