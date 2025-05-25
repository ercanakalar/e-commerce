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
        "fade-out": "fadeOut 2s ease-in-out",
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
        fadeOut: {
          "0%": { opacity: "1", transform: "translateX(0px)" },
          "50%": { opacity: "0.5", transform: "translateX(10px)" },
          "100%": { opacity: "0.90", transform: "translateX(20px)" },
        },
      },
    },
  },
  plugins: [],
};
