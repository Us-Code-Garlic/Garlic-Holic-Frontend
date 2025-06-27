module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#B59779',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide")
  ],
};