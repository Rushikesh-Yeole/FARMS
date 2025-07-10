import React, { useRef } from "react";

const fruitsAndVeggies = [
  { name: "Banana", img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" },
  { name: "Potato", img: "/images/potato.jpeg" },
  { name: "Tomato", img: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg" },
  { name: "Carrot", img: "images/carrot.jpeg" },
  { name: "Spinach", img: "images/Spinach.jpeg" },
  { name: "Peas", img: "images/peas.jpeg" },
  { name: "Pineapple", img: "images/pineapple.jpeg" },
  { name: "Cucumber", img: "images/cucumber.jpeg" },
  { name: "Orange", img: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg" },
  { name: "Onion", img: "images/onion.jpeg" },
  { name: "Garlic", img: "images/garlic.jpeg" },
  { name: "Papaya", img: "images/papaya.jpeg" },
  { name: "Guava", img: "images/guva.jpeg" },
  { name: "Apple", img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" },
  { name: "Strawberry", img: "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg" },
  { name: "Watermelon", img: "images/watermelon.jpeg" },
  { name: "Mango", img: "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg" },
];

const VCarousel = () => {
  const carouselRef = useRef(null);

  return (
    <div
      ref={carouselRef}
      className="relative w-full  overflow-x-auto flex space-x-4 py-4"
      style={{
        scrollBehavior: "smooth", // Enables smooth scrolling
        scrollbarWidth:"none",
      }}
    >

      <style>

        {
        `.relative::webkit-scrollbar{
          display:none;
          
        }`
        }

      </style>
      <div
        className="flex  gap-2"
        style={{
          scrollSnapType: "x mandatory", // Enables scroll snapping

        }}
      >
        {fruitsAndVeggies.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0  min-w-[90px]  flex flex-col items-center justify-center"
            style={{
              scrollSnapAlign: "center", // Aligns each item at the center during snap
            }}
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-16 h-16 border border-black object-contain rounded-full"
            />
            <p className="text-center mt-2">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VCarousel;
