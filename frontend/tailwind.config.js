/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
    // extend: {
    //   fontSize: {
    //     sm: '0.875rem',
    //     base: '1rem',
    //   },
    // },
  },
  // corePlugins: {
  //   preflight: false, // Disables Tailwind's base resets entirely
  // },
  plugins: [
    flowbite.plugin(),
  ],
}

