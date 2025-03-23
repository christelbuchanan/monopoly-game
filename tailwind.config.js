/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'monopoly-red': '#ed1b24',
        'monopoly-blue': '#0072bb',
        'monopoly-green': '#1fb25a',
        'monopoly-yellow': '#fef200',
        'monopoly-orange': '#f7941d',
        'monopoly-purple': '#d93a96',
        'monopoly-brown': '#955436',
        'monopoly-light-blue': '#aae0fa',
        'monopoly-board': '#C5E8D3',
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
