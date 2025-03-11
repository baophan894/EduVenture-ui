/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Bao gồm các file cần quét để áp dụng lớp Tailwind
  ],
  theme: {
    extend: {
     fontFamily: {
        shopee: ['ShopeeDisplay', 'sans-serif'], // Font chữ ShopeeDisplay
      },
    },
  },
  plugins: [], 
};
