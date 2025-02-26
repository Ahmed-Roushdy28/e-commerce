const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    flowbite.content(),
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '0.25rem',  
      },
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
};
