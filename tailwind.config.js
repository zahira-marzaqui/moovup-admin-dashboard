/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'evolve': {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#818eff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#2f4398',
          950: '#1e1b4b',
        },
        'anais': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#f7799c',
          950: '#831843',
        },
        'populo': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#ffaa93',
          950: '#7c2d12',
        },
      },
    },
  },
  plugins: [],
}

