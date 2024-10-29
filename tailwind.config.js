/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray75: "#CFCFCF",
        blue100: "#8393BC",
        blue200: "#4E659F",
        blue400: "#1D3061",
        yellow400: "#F3D901",
        red500: "#B41C1E"
      },
    },  
  },
  plugins: [],
}

