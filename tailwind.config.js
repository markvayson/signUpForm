/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "sideBar-Img": "url('../src/img/bg.jpg')",
      },
    },
  },
  plugins: [],
};
