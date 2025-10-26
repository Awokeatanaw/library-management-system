/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html',
  ],
  theme: {
    extend: {
      //backgroundImage: {
      //  'custom-image': "url('./image/Myimage.jpg')",// Update this path
     // },
      colors: {
        tealTransparent: 'rgba(0, 128, 128, 0.8)',
      },
    },
  },
  plugins: [],
}

