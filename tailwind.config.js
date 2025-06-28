// tailwind.config.js
const typography = require('@tailwindcss/typography');

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md}',
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
