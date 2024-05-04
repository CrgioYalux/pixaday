/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
        colors: {
            'brand': {
                900: 'hsl(280, 50%, 10%)',
                800: 'hsl(280, 50%, 20%)',
                700: 'hsl(280, 50%, 30%)',
                600: 'hsl(280, 50%, 40%)',
                DEFAULT: 'hsl(280, 50%, 50%)', 500: 'hsl(280, 50%, 50%)',
                400: 'hsl(280, 50%, 60%)',
                300: 'hsl(280, 50%, 70%)',
                200: 'hsl(280, 50%, 80%)',
                100: 'hsl(280, 50%, 90%)',
            },
        },
    },
  },
  plugins: [],
  darkMode: 'class',
}
