import React from "react";
import Lottie from "react-lottie";
import loader from "./loader.json"

const Loader = () => {
  return (
    <div className="inset-0 w-full min-h-screen z-50 flex flex-col justify-center items-center bg-white/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center">
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
        <p className="text-xl font-semibold text-green-600 mt-4 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
