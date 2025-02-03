import React from 'react'
import Lottie from 'react-lottie'
import Animation2 from "./Animation2.json"

function Test2() {
  return (
    <div className="w-full mb-0">
      <Lottie 
        height="20%"
        width="100%"
        options={{
          loop: true,
          animationData: Animation2,
          autoplay: true,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
          }
        }}
      />
    </div>
  )
}

export default Test2