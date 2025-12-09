/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7B2C2F', // Deep burgundy
          dark: '#2C3E50',   // Rich navy
          green: '#355C3A',  // Forest green
        },
        secondary: {
          cream: '#F5E9DA',
          beige: '#E9D8A6',
          gold: '#FFD700',
        },
        accent: {
          gold: '#FFD700',
          teal: '#2EC4B6',
        },
        neutral: {
          gray: '#6B7280',
          light: '#F3F4F6',
        },
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Inter', 'sans-serif'],
        special: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}

