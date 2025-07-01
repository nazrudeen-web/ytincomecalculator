// tailwind.config.js
const typography = require('@tailwindcss/typography');

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md}',
  ],
  theme: {
    extend: {
       fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // add your custom name
        sora: ['Sora', 'sans-serif'], // add your custom name
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
