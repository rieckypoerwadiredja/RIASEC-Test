/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5a9cb5",
        secondary: "#a8d4ef",
        third: "#E48118",
      },
    },
  },
  plugins: [],
};
