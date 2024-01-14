/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Consolas', 'monospace'],
      },
      extend: {
        // spacing: {
        //   '8xl': '96rem',
        //   '9xl': '128rem',
        // },
        // borderRadius: {
        //   '4xl': '2rem',
        // }
      }},
    plugins: [
      require('@tailwindcss/typography'),
      require("daisyui"),
      require('@tailwindcss/forms'),
    ],
  }