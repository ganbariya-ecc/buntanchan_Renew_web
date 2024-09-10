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
        'skyblue': '#BCE6FF',
        'white': '#FFFFFF',
        'gray': '#9ca3af',
      },

      // フォントサイズ設定
      fontSize: {
        'super': '120px',
        'main': '96px',
        'title': '80px',
        'sub': '64px',
        'text': '48px',
        'comment': '32px',
        'small': '24px',
        'mini': '20px',
        'tiny': '16px',
        

      },
    },
  },
  plugins: [],
};