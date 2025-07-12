import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SectionIntro from "./components/SectionIntro";
import PhotoWheel from "./components/InfiniteCarousel";
import OurUniverses from "./components/PlanetsEction/Universe";
import LoveReasonsWheel from "./components/LoveReasonsWheel/LoveReasonsWheel";
import TruthOrDareSlide from "./components/TruthOrDareSlide/TruthOrDareSlide";


function App() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    SectionIntro,
    PhotoWheel,
    OurUniverses,
    LoveReasonsWheel,
    TruthOrDareSlide,
  ];

  return (
    <div className="relative">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        direction="horizontal"
        slidesPerView={1}
        spaceBetween={0}
        speed={800}
        className="h-screen"
      >
        {slides.map((Slide, index) => (
          <SwiperSlide key={index}>
            <Slide />
          </SwiperSlide>
        ))}
      </Swiper>

      {activeIndex > 0 && (
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-base sm:text-lg px-3 sm:px-4 py-2 rounded focus:outline-none transition-colors"
          onClick={() => swiperRef.current.slidePrev()}
        >
          ←
        </button>
      )}


      
      {activeIndex < slides.length - 1 && (
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white text-base sm:text-lg px-3 sm:px-4 py-2 rounded focus:outline-none transition-colors"
          onClick={() => swiperRef.current.slideNext()}
        >
          →
        </button>
      )}
    </div>
  );
}

export default App;
