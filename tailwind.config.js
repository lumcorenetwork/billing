/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ede9fe',
          DEFAULT: '#a78bfa',
          dark: '#7c3aed',
        },
        accent: {
          light: '#c4b5fd',
          DEFAULT: '#8b5cf6',
          dark: '#6d28d9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Roboto', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
