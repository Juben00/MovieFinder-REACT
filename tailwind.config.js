/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollbar: {
        width: "12px", // Set the desired width here
        thumb: "#4A5568", // Customize the thumb color
        track: "#2D3748", // Customize the track color
      },
    },
  },
  plugins: [],
};
