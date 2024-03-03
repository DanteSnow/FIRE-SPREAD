/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/src/images/fireSpread.png')",
        logo: "url('/src/images/fireSpreadLogo.png')",
      },

      height: {
        500: "500px",
      },
    },
  },

  plugins: [],
};
