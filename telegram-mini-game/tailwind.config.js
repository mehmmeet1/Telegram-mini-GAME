/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px', // Ekstra küçük telefonlar için
        'sm': '375px', // Küçük telefonlar için
        'md': '414px', // Orta boy telefonlar için 
        'lg': '480px', // Büyük telefonlar için
        'xl': '768px', // Tabletler için
        '2xl': '1024px', // Büyük tabletler için
      },
      colors: {
        'bordo': {
          50: '#fdf2f4',
          100: '#fbe6ea',
          200: '#f6cfd7',
          300: '#efabb8',
          400: '#e57d94',
          500: '#d8546f',
          600: '#c13354', // Ana bordo rengi
          700: '#a4244a',
          800: '#852040',
          900: '#70213a',
          950: '#410d1e',
        },
        'krem': {
          50: '#fcf9f2',
          100: '#f9f1de',
          200: '#f2e3be', // Ana krem rengi
          300: '#e9cc8f',
          400: '#e0b268',
          500: '#d59442',
          600: '#c37937',
          700: '#a25e2e',
          800: '#844c2c',
          900: '#6d3f27',
          950: '#3d2014',
        },
        'koyu': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#666666',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#333333', // Ana siyah rengi
          900: '#262626',
          950: '#121212',
        },
        'acik': {
          50: '#ffffff', // Ana beyaz rengi
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#e5e5e5',
          400: '#d4d4d4',
          500: '#a3a3a3',
          600: '#737373',
          700: '#525252',
          800: '#404040',
          900: '#262626',
          950: '#0a0a0a',
        },
      }
    },
  },
  plugins: [],
} 