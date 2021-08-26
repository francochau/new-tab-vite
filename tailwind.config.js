module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'h-lg': {
          raw: 'screen and (min-width: 1024px) and (min-height: 700px)',
        },
        'h-md': {
          raw: 'screen and (min-width: 768px) and (max-height: 600px)',
        },
        'h-sm': {
          raw: 'screen and (min-width: 640px) and (max-height: 400px )',
        },
      },
      fontSize: {
        '10xl': ['10rem', 1.5],
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      animation: {
        bg: 'bg 25s ease infinite',
      },
      keyframes: {
        bg: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
      outline: ['active'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
