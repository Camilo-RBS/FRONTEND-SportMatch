/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'navy-900': '#0f172a',
          'navy-800': '#1e293b',
          'emerald-400': '#34d399',
          'emerald-500': '#10b981',
          'emerald-600': '#059669'
        },
      },
    },
    plugins: [],
  }