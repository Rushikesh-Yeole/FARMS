import React from "react";
import Lottie from "react-lottie";
import Animation3 from "./Animation3.json";

const Test3 = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[400px] h-[400px] max-w-full">
        <Lottie
          height="100%"
          width="100%"
          options={{ 
            loop: true, 
            animationData: Animation3,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice"
            }
          }}
        />
      </div>
    </div>
  );
};

export default Test3;
