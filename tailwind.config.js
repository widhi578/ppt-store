/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        furni: {
          light: "#FFF4E8",
          primary: "#E67E22",
          dark: "#D35400",
          text: "#333333",
        }
      }
    },
  },
  plugins: [],
};