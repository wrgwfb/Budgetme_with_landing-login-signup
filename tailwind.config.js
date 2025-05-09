/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // Matches App.js at the root
    "./screens/**/*.{js,jsx,ts,tsx}", // Matches all files in screens and its subdirectories (e.g., screens/pages)
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins_400Regular", "sans-serif"], // Use Poppins_400Regular for Expo, or Poppins-Regular for Option 1
        "poppins-bold": ["Poppins_700Bold", "sans-serif"],
        "poppins-medium": ["Poppins_500Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
