/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,js}"],
  theme: {
    extend: {
      animation: {
        "spin-custom": "spin-custom 1s infinite linear",
        "slide-border": "slide-border 0.5s ease-out forwards",
        "gradient-move": "gradient-move 3s ease infinite",
        "gradient-reset": "gradient-reset 2s ease forwards",
      },
      keyframes: {
        "spin-custom": {
          to: { transform: "rotate(1turn)" },
        },
        "slide-border": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "gradient-reset": {
          "0%": { backgroundPosition: "100% 50%" },
          "50%": { backgroundPosition: "50% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};
