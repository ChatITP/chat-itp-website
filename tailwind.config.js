const { Chango } = require('next/font/google');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      offWhite: "#e5e5e5",
      background: "#0d0d0d",
      black: "#000000",
      purple: "#743AA4",
      blue: "#6CA2D9",
      lightBlue: "#C8DFF7",
      transparent: "transparent",
      gray: "#353535",
      gray2: "#4D4D4E",
      darkGray: "#2D2D2D",
      chatGray: "#424242",
      scrollBar: "#717171",
      red: "#FF9C9C",
      orange: "#FFD9A3",
      yellow: "#FFF495",
      green: "#B3FFA0",
      teal: "#A9FFEF",
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-45":
          "linear-gradient(45deg, rgba(255, 142, 209, 0.22), #1b0e25, rgba(64, 157, 255, 0.22))",
      },
      "custom-radial": "radial-gradient(circle at 30% 30%, #FF8AB3, #A8C4FF, #FFC75F)",
      boxShadow: {
        glow: "0 0 8px rgba(207, 231, 255, 0.6), 0 0 12px rgba(207, 231, 255, 0.8), 0 0 16px rgba(207, 231, 255, 1)",
      },
      fontFamily: {
        sans: ["Open Sans", "Helvetica", "Arial", "sans-serif"],
        chango:['Chango', 'cursive'],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
