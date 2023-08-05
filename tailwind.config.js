/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes:{
        'trans-right': {
          '0%': {width: '0px'},
          
          '100%': {width: '300px'}
        },
        'trans-left':{
          '0%': {width: '300px'},
          
          '100%': {width: '0px'}
        }
      },
      animation:{
        'trans-right':'trans-right 1s ',
        'trans-left' : 'trans-left 1s'
      }
    },
  },
  plugins: [],
}
