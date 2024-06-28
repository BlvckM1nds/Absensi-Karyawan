/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#222222",
        secondary: "#19A7CE",
        light: "#F6F1F1",
        cloud: "#AFD3E2",
        accent: {
          DEFAULT: "#146C94",
          hover: "#0D455E"
        }
      },
    },
  },
  plugins: [],
}