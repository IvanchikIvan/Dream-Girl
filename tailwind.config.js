/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" }, // перемещаем на ширину одного блока (первая половина)
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite", // 20 секунд — скорость (можно настроить)
      },
    },
  },
  plugins: [],
};
