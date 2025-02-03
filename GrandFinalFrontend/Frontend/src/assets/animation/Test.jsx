import React from "react";
import Lottie from "react-lottie";
import Animation1 from "./Animation1.json";

const Test = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[500px] h-[500px] max-w-full">
        <Lottie
          height="100%"
          width="100%"
          options={{ 
            loop: true, 
            animationData: Animation1,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice"
            }
          }}
        />
      </div>
    </div>
  );
};

export default Test;
