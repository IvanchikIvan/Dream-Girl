import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reasons = [
  "Твоя искренность",
  "Твоя забота",
  "Твой смех",
  "Твои глаза",
  "Твоя смелость",
  "Твои объятия",
  "Твоя поддержку",
  "Твои мечты",
  "Твои идеи",
  "Твой характер",
  "Твоя улыбка",
  "Твои слова",
];

const VISIBLE_COUNT = 7;
const CENTER_INDEX = Math.floor(VISIBLE_COUNT / 2);

export default function LoveReasonsWheel() {
  const [index, setIndex] = useState(CENTER_INDEX);
  const touchStart = useRef(null);
  const lastScroll = useRef(Date.now());

  const handleWheel = (e) => {
    if (Date.now() - lastScroll.current < 120) return;
    if (e.deltaY > 0 && index < reasons.length - 1) {
      setIndex((i) => i + 1);
      lastScroll.current = Date.now();
    }
    if (e.deltaY < 0 && index > 0) {
      setIndex((i) => i - 1);
      lastScroll.current = Date.now();
    }
  };

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const delta = touchStart.current - touchEnd;
    if (Math.abs(delta) > 24) {
      if (delta > 0 && index < reasons.length - 1) setIndex((i) => i + 1);
      else if (delta < 0 && index > 0) setIndex((i) => i - 1);
    }
    touchStart.current = null;
  };

  const scroll = (dir) => {
    setIndex((prev) =>
      Math.max(0, Math.min(prev + dir, reasons.length - 1))
    );
  };

  const visible = [];
  for (let i = -CENTER_INDEX; i <= CENTER_INDEX; i++) {
    const reasonIndex = index + i;
    let content = null;
    if (reasonIndex >= 0 && reasonIndex < reasons.length) {
      content = reasons[reasonIndex];
    }
    visible.push({ value: content, offset: i, key: content ? content : `empty-${i}` });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white select-none">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 text-gray-900">Я тебя люблю за</h2>
      <div
        className="relative flex flex-col items-center w-full max-w-md"
        style={{ height: 400, touchAction: "none" }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
      >
        <AnimatePresence initial={false}>
          {visible.map(({ value, offset, key }) => {
            const scale = 1 - Math.abs(offset) * 0.18;
            const opacity = 1 - Math.abs(offset) * 0.22;
            const blur = Math.abs(offset) === 0 ? 0 : 2 + Math.abs(offset) * 2;
            const y = offset * 46;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: y + 30 * Math.sign(offset) }}
                animate={{
                  opacity,
                  scale,
                  y,
                  filter: `blur(${blur}px)`,
                  zIndex: 100 - Math.abs(offset),
                }}
                exit={{ opacity: 0, y: y - 30 * Math.sign(offset) }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute left-0 right-0 flex justify-center pointer-events-none select-none"
                style={{
                  fontSize: `${1.5 + scale * 1.5}rem`,
                  fontWeight: offset === 0 ? 700 : 400,
                  color: value ? "#111827" : "#e5e7eb",
                  opacity,
                  userSelect: "none",
                }}
              >
                {value ? value : "⠀"} 
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="mt-10 flex gap-8">
        <button
          className="bg-gray-100 hover:bg-gray-200 rounded-full w-12 h-12 text-2xl shadow transition"
          onClick={() => scroll(-1)}
          disabled={index <= 0}
        >
          ↑
        </button>
        <button
          className="bg-gray-100 hover:bg-gray-200 rounded-full w-12 h-12 text-2xl shadow transition"
          onClick={() => scroll(1)}
          disabled={index >= reasons.length - 1}
        >
          ↓
        </button>
      </div>
    </div>
  );
}
