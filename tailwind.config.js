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
      black: "#000000",
      purple: "#743AA4",
      blue: "#6CA2D9",
      lightBlue: "#C8DFF7",
      transparent: "transparent",
      gray: "#252525",
      gray2: "#757575",
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
      },
      boxShadow:{
        'glow': '0 0 8px rgba(207, 231, 255, 0.6), 0 0 12px rgba(207, 231, 255, 0.8), 0 0 16px rgba(207, 231, 255, 1)',
      }
    },
  },
  plugins: [],
};
