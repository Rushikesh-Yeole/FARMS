import React, { useState } from "react";

const CartToggle = () => {
  const [isAdded, setIsAdded] = useState(false);

  const toggleCart = () => {
    setIsAdded(!isAdded);
  };

  return (
    <div
      onClick={toggleCart}
      className="mt-2 ml-2 cursor-pointer h-10 w-10 flex items-center justify-center border border-gray-300 rounded-lg"
      title={isAdded ? "Remove from Cart" : "Add to Cart"}
    >
      {isAdded ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="green"
          className="w-7 h-7"
        >
          <path d="M20.756 4.345A1 1 0 0 0 20 4H5.21l-.433-2.4A1 1 0 0 0 3.8 1H2a1 1 0 0 0 0 2h1.18l3.24 17.935A2 2 0 0 0 8.392 23h10.716a2 2 0 0 0 1.97-1.613l1.92-10A1 1 0 0 0 22 10H7.54l-.24-1.5h14.1a1 1 0 0 0 .988-.826l.4-2.5a1 1 0 0 0-.032-.329ZM8.14 13h11.96l-1.6 8.334a1 1 0 0 1-.985.832H8.392a1 1 0 0 1-.985-.831L6.16 13h1.98ZM9 20a1.5 1.5 0 1 0 1.5-1.5A1.5 1.5 0 0 0 9 20Zm8 0a1.5 1.5 0 1 0 1.5-1.5A1.5 1.5 0 0 0 17 20Z" />
        </svg>
      ) : (
        <svg
          
          viewBox="0 0 24 24"
          fill="none"
          stroke="gray"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l.09.5L6.5 16.5h12.88a1 1 0 0 0 .98-.804l2.42-12.096A1 1 0 0 0 21.79 2H6" />
        </svg>
      )}
    </div>
  );
};

export default CartToggle;
