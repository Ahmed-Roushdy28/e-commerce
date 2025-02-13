const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    flowbite.content(),
  ],
  theme: { container: {
    center: true,
    padding: '1rem', // padding on Y-axis only
  },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}