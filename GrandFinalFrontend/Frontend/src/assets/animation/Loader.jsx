import React from "react";
import Lottie from "react-lottie";
import loader from "./loader.json"

const Loader = () => {
  return (
    <div className="fixed inset-0 w-full h-screen flex flex-col justify-center items-center bg-white/80 backdrop-blur-sm">
      <div className="w-[125px] h-[125px] max-w-full">
        <Lottie
          height="100%"
          width="100%"
          options={{ 
            loop: true, 
            animationData: loader,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice"
            }
          }}
        />
      </div>
      <p className="text-xl font-semibold text-green-600 mt-0 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
