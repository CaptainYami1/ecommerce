import { useState, useEffect } from "react";
import "../../../../css/carousel.css";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      url: "src/assets/banner_mens.png",
    },
    {
      url: "src/assets/banner_women.png",
    },
    {
      url: "src/assets/banner_kids.png",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);
  return (
    <>
      <section
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="carousel w-full h-100 bg-cover bg-left bg-no-repeat duration-1000 bg-[#ff562238] transition-transform animate-slide"
      ></section>
    </>
  );
}

export default Carousel;
