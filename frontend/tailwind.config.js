/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
  plugins: [],
}

