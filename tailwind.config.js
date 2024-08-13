/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./public/**/*.{html,js,css}"],
  theme: {
    extend: {
      // フォントファミリー設定
      fontFamily: {
        'main': ['"Kiwi Maru"', ...defaultTheme.fontFamily.sans],
        'title': ['"Yusei Magic"', ...defaultTheme.fontFamily.sans],
      },
      // 色設定
      colors: {
        'main-color': 'rgba(246, 219, 186, 0.5)',
        'sub-color': 'rgba(255 247 237)',
        'green': '#4AB4A1',
      },
      // スクリーン幅設定
      screens: {
        'title': '256px',
        'sub': '128x',
        
      },
    },
  },
  plugins: [],
};