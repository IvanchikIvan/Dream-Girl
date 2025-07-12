import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ArrowBack = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Назад"
    className="
      absolute top-4 left-4 z-10 p-2 rounded-full
      bg-white bg-opacity-0 hover:bg-opacity-10 
      transition
      text-white
      focus:outline-none
      group
    "
    style={{
      boxShadow: "none",
    }}
  >
    <svg
      className="w-8 h-8 group-hover:-translate-x-1 transition-transform opacity-70"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

export default function TruthOrDareSlide() {
  const [slide, setSlide] = useState("question");
  const [direction, setDirection] = useState(1);

  const goTo = (key) => {
    setDirection(1);
    setSlide(key);
  };
  const goBack = () => {
    setDirection(-1);
    setSlide("question");
  };

  const slideContent = {
    question: (
      <>
        <h1 className="text-4xl md:text-5xl font-bold mb-10 drop-shadow-lg">Правда или действие?</h1>
        <div className="flex gap-6">
          <button
            className="
              px-8 py-3
              rounded-2xl
              bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
              shadow-lg
              text-white text-xl font-semibold
              transition
              transform
              hover:scale-105
              active:scale-95
              hover:shadow-2xl
              focus:outline-none
              border-2 border-transparent
              hover:border-white/30
            "
            onClick={() => goTo("truth")}
          >
            Правда
          </button>
          <button
            className="
              px-8 py-3
              rounded-2xl
              bg-gradient-to-r from-green-400 via-blue-500 to-purple-600
              shadow-lg
              text-white text-xl font-semibold
              transition
              transform
              hover:scale-105
              active:scale-95
              hover:shadow-2xl
              focus:outline-none
              border-2 border-transparent
              hover:border-white/30
            "
            onClick={() => goTo("dare")}
          >
            Действие
          </button>
        </div>
      </>
    ),
    truth: (
      <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg text-center px-4">
        Получилось ли у меня хоть чуть-чуть исправиться?
      </h1>
    ),
    dare: (
      <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg text-center px-4">
        Отправь три милых кружка с котёнком
      </h1>
    ),
  };

  const variants = {
    enter: (direction) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.48, ease: "easeOut" },
    },
    exit: (direction) => ({
      y: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.40, ease: "easeIn" },
    }),
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {slide !== "question" && <ArrowBack onClick={goBack} />}

      <AnimatePresence custom={direction} initial={false} mode="wait">
        <motion.div
          key={slide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"
        >
          {slideContent[slide]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
