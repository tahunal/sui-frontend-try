/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'card-win': {
          '0%, 100%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1.15)' }
        }
      },
      animation: {
        'card-win': 'card-win 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}