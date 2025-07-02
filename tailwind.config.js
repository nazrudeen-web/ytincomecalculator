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
      colors: {
        accent: '#ff0000',
        bcPrimary: '#fff',
        bcSecondary: '#F9F9F9',
        tPrimary: '#0F0F0F',
        tSecondary: '#606060',
        divider: '#E5E5E5',
        bTag: '#F2F2F2',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
