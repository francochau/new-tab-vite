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
    },
    gradientColorStops: (theme) => ({
      ...theme('colors'),
      'theme1-from': '#0F2027',
      'theme1-via':'#203A43',
      'theme1-to': '#2C5364',
      'theme2-from': '#536976',
      'theme2-to': '#292E49',
      'theme3-from': '#232526',
      'theme3-to': '#d18ab4',
      'theme4-from': '#77A1D3',
      'theme4-via':'#ae93c0',
      'theme4-to': '#E684AE',
      'theme5-from': '#D66D75',
      'theme5-to': '#EF629F',
      danger: '#e3342f',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
