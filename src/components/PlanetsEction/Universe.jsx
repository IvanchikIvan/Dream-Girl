import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import MoonIcon from "../../assets/blue_planet.svg";
import SunIcon from "../../assets/red_planet.svg";
import MergedIcon from "../../assets/purple_planet.svg";

const StarBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      angle: Math.random() * 360,
      speed: 0.1 + Math.random() * 0.3,
      size: Math.random() * 6.5,
      trailLength: 5 + Math.random() * 10,
      color: `hsl(${Math.random() * 50 + 200}, 70%, 70%)`,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-[-1] bg-slate-950">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 0,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            x: [
              particle.x + "%",
              particle.x +
                Math.cos(particle.angle) * particle.trailLength +
                "%",
              particle.x + "%",
            ],
            y: [
              particle.y + "%",
              particle.y +
                Math.sin(particle.angle) * particle.trailLength +
                "%",
              particle.y + "%",
            ],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + particle.speed * 10,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: particle.x + "%",
            top: particle.y + "%",
            width: particle.size + "px",
            height: particle.size + "px",
            borderRadius: "50%",
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}

      {Array.from({ length: 50 }).map((_, i) => {
        const startX = Math.random() * 120 - 10;
        const startY = Math.random() * 120 - 10;
        const angle = Math.random() * 360;
        const distance = 50 + Math.random() * 100;

        return (
          <motion.div
            key={`shooting-${i}`}
            initial={{
              opacity: 0,
              x: startX + "%",
              y: startY + "%",
            }}
            animate={{
              x: startX + Math.cos(angle) * distance + "%",
              y: startY + Math.sin(angle) * distance + "%",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              width: "2px",
              height: "2px",
              backgroundColor: "white",
              borderRadius: "50%",
              filter: "blur(1px)",
            }}
          />
        );
      })}

      {Array.from({ length: 300 }).map((_, i) => (
        <motion.div
          key={`bg-${i}`}
          className="absolute bg-white rounded-full"
          style={{
            width: "1px",
            height: "1px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            opacity: 0.1 + Math.random() * 0.2,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

function useContainerSize() {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return [containerRef, size];
}

const OurUniverses = () => {
  const [isMerged, setIsMerged] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });
  const mergeProgress = useMotionValue(0);
  
  const angleLeft = useMotionValue(0);
  const angleRight = useMotionValue(0);

  const [containerRef, containerSize] = useContainerSize();
  const orbitRadius = containerSize.width ? containerSize.width * 0.18 : 250;


  useEffect(() => {
    let animationFrame;
    const updateAngle = () => {
      const time = performance.now() / 1000;
      const speedVariation = Math.sin(time) * 0.007 + 0.01;

      angleLeft.set(angleLeft.get() + speedVariation);
      angleRight.set(angleRight.get() - speedVariation * 1.2);

      animationFrame = requestAnimationFrame(updateAngle);
    };
    updateAngle();
    return () => cancelAnimationFrame(animationFrame);
  }, [angleLeft, angleRight]);

  const moonX = useTransform(
    angleLeft,
    (a) => Math.cos(a) * (orbitRadius*0.6) - (orbitRadius*0.6) * 1.4
  );
  const moonY = useTransform(
    angleLeft,
    (a) => Math.sin(a) * orbitRadius * (1 + 0.2 * Math.sin(a * 2))
  );

  const sunX = useTransform(
    angleRight,
    (a) => Math.cos(a) * (orbitRadius*0.6) + (orbitRadius*0.6) * 1.4
  );
  const sunY = useTransform(
    angleRight,
    (a) => Math.sin(a) * orbitRadius * (1 - 0.2 * Math.cos(a * 2))
  );

  const moonXFinal = useTransform(
    [mergeProgress, moonX, smoothX],
    ([progress, moon, smooth]) => progress * smooth + (1 - progress) * moon
  );
  const moonYFinal = useTransform(
    [mergeProgress, moonY, smoothY],
    ([progress, moon, smooth]) => progress * smooth + (1 - progress) * moon
  );

  const sunXFinal = useTransform(
    [mergeProgress, sunX, smoothX],
    ([progress, sun, smooth]) => progress * smooth + (1 - progress) * sun
  );
  const sunYFinal = useTransform(
    [mergeProgress, sunY, smoothY],
    ([progress, sun, smooth]) => progress * smooth + (1 - progress) * sun
  );

  useEffect(() => {
    if (isMerged) {
      animate(mergeProgress, 1, { duration: 1 });
    } else {
      animate(mergeProgress, 0, { duration: 1 });
    }
  }, [isMerged, mergeProgress]);

  const mergedPlanetStyles = {
    scale: useTransform(mergeProgress, [0, 1], [0, 1]),
    opacity: useTransform(mergeProgress, [0, 0.2, 1], [0, 0, 1]),
    x: smoothX,
    y: smoothY,
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
    setIsMerged(Math.hypot(x, y) < rect.width * 0.2);
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-between text-white p-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <StarBackground />

      <h2 className="text-4xl font-bold mb-8 text-center">Два человека</h2>
      <div
        ref={containerRef}
        className="relative w-full h-1/4 flex items-center justify-center"
      >
        <motion.div
          style={{
            x: moonXFinal,
            y: moonYFinal,
            opacity: useTransform(mergeProgress, [0, 1], [1, 0]),
          }}
          className="absolute w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 rounded-full"
        >
          <img src={MoonIcon} alt="Moon" />
        </motion.div>

        <motion.div
          style={{
            x: sunXFinal,
            y: sunYFinal,
            opacity: useTransform(mergeProgress, [0, 1], [1, 0]),
          }}
          className="absolute w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 rounded-full"
        >
          <img src={SunIcon} alt="Sun" />
        </motion.div>

        <motion.div
          style={{
            ...mergedPlanetStyles,
            position: "absolute",
            boxShadow: "0 0 50px #9a58ad",
          }}
          className="w-32 sm:w-40 md:w-64 h-32 sm:h-40 md:h-64 rounded-full flex items-center justify-center"
        >
          <img className="w-full h-full" src={MergedIcon} alt="Merged Planet" />
        </motion.div>
      </div>

      <motion.p
        className="mt-8 text-lg text-center max-w-2xl"
        animate={{ opacity: isMerged ? 0.5 : 1 }}
      >
        {isMerged
          ? "Но я хочу, чтобы они представляли что-то одно"
          : "Вроде как разные"}
      </motion.p>
    </section>
  );
};

export default OurUniverses;
