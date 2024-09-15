/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'light-red': '#FEE2E2', // Light red background for the music player
        'light-yellow': '#FDE68A', // Hover effect color
        'deep-shadow': '#4B5563', // Deep shadow color
        'custom-text': '#1F2937' // Custom text color
      },
      boxShadow: {
        'deep': '0 4px 8px rgba(0, 0, 0, 0.5)' // Deep shadow for the cover art
      },
      fontFamily: {
        'custom': ['"Helvetica Neue"', 'Arial', 'sans-serif'] // Custom font family
      }
    }
  },
  plugins: [],
}

