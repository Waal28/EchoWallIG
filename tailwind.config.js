/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rubikDirt: ['rubik-dirt', 'sans-serif'], // Tambahkan font custom
        galindo: ['galindo', 'sans-serif'], // Tambahkan font custom
        lilitaOne: ['lilita-one', 'sans-serif'], // Tambahkan font custom
        zain: ['zain', 'sans-serif'], // Tambahkan font custom
      },
    },
  },
  plugins: [],
};
