import { motion, useTransform } from "framer-motion";

const PlanetOrbit = ({ Icon, size, color, angle, orbitRadius, mergeProgress }) => {
  const x = useTransform(
    [angle, mergeProgress],
    ([a, p]) => Math.cos(a) * orbitRadius * (1 - p)
  );
  const y = useTransform(
    [angle, mergeProgress],
    ([a, p]) => Math.sin(a) * orbitRadius * (1 - p)
  );

  const opacity = useTransform(mergeProgress, [0, 1], [1, 0]);
  const scale = useTransform(mergeProgress, [0, 1], [1, 0.5]);

  return (
    <motion.div
      style={{
        x,
        y,
        position: "absolute",
        scale,
        opacity,
        boxShadow: `0 0 50px ${color}`,
      }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`${size} rounded-full flex items-center justify-center`}
    >
      <img
        className={`${size} transition-colors duration-500`}
        style={{ fill: color }}
        src={Icon}
        alt="Planet Icon"
      />
    </motion.div>
  );
};

export default PlanetOrbit;
