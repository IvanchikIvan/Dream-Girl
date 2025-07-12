import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/carousel/1.jpg";
import img2 from "../assets/carousel/2.jpg";
import img3 from "../assets/carousel/3.jpg";
import img4 from "../assets/carousel/4.jpg";
import img5 from "../assets/carousel/5.jpg";
import img6 from "../assets/carousel/6.jpg";
import img7 from "../assets/carousel/7.jpg";
import img8 from "../assets/carousel/8.jpg";
import img9 from "../assets/carousel/9.jpg";
import img10 from "../assets/carousel/10.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export default function InfiniteGallery() {
  const isMobile = window.innerWidth < 768;
  const scrollRef = useRef();
  const offset = useRef(0);
  const loopLength = useRef(0);
  const speed = 2;

  useEffect(() => {
    function updateLength() {
      if (!scrollRef.current) return;
      const nodes = Array.from(scrollRef.current.children).slice(
        0,
        images.length
      );
      let len = 0;
      nodes.forEach((el) => {
        len += isMobile ? el.offsetHeight : el.offsetWidth;
      });
      loopLength.current = len;
    }
    setTimeout(updateLength, 100); 
    window.addEventListener("resize", updateLength);
    return () => window.removeEventListener("resize", updateLength);
  }, [isMobile]);

  useEffect(() => {
    let running = true;
    function animate() {
      if (!running) return;
      offset.current += speed;
      if (offset.current >= loopLength.current) offset.current = 0;
      if (scrollRef.current) {
        scrollRef.current.style.transform = isMobile
          ? `translateY(-${offset.current}px)`
          : `translateX(-${offset.current}px)`;
      }
      requestAnimationFrame(animate);
    }
    animate();
    return () => {
      running = false;
    };
  }, [isMobile]);

  return (
    <div
      className="relative min-h-screen w-full bg-gradient-to-r from-pink-300 via-blue-200 to-green-300 flex flex-col"
      style={{
        overflow: "hidden",
      }}
    >
      {!isMobile ? (
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-8 mt-10 text-center select-none pointer-events-none z-10">
          Ты прекрасна
        </h1>
      ) : (
        <h1
          className="
    text-5xl md:text-6xl font-bold mb-8 mt-10 text-center select-none pointer-events-none z-10
  "
          style={{
            color: "white",
            mixBlendMode: "difference",
          }}
        >
          Ты прекрасна
        </h1>
      )}

      <div
        className={`
          absolute ${
            isMobile ? "left-0 w-full bottom-0" : "top-1/2 left-0 w-full"
          }
          ${isMobile ? "h-[100vh]" : "h-[340px]"}
          flex items-center justify-center overflow-hidden
          z-0
          transform
          ${isMobile ? "" : "-translate-y-1/2"}
        `}
        style={{
          width: "100vw",
        }}
      >
        <div
          ref={scrollRef}
          className={`flex ${
            isMobile ? "flex-col" : "flex-row"
          } will-change-transform`}
          style={{
            transition: "none",
            minWidth: !isMobile ? "100vw" : undefined,
            minHeight: isMobile ? "60vh" : undefined,
          }}
        >
          {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className={`
                flex-shrink-0 flex-grow-0
                flex items-center justify-center
                ${isMobile ? "my-2" : "mx-2"}
              `}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={img}
                alt={`Фотка ${(i % images.length) + 1}`}
                style={{
                  maxHeight: isMobile ? "160px" : "320px",
                  maxWidth: isMobile ? "90vw" : "330px",
                  objectFit: "cover",
                  borderRadius: "1.2rem",
                  boxShadow: "0 2px 24px rgba(0,0,0,0.13)",
                  margin: "0 auto",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
