export const themeTypes = [
  {
    label: 'Solid',
    value: 'solid',
  },
  {
    label: 'Gradient',
    value: 'gradient',
  },
  {
    label: 'Animated',
    value: 'animated',
  },
];

export const themes = {
  theme1: {
    name: 'Conny',
    type: 'gradient',
    colors: ['#536976', '#292E49'],
  },
  theme2: {
    name: 'Theme 2',
    type: 'gradient',
    colors: ['#0F2027', '#203A43', '#2C5364'],
  },
  theme3: {
    name: 'Theme 3',
    type: 'gradient',
    colors: ['#ad5389', '#3c1053'],
  },
  theme4: {
    name: 'Theme 4',
    type: 'gradient',
    colors: ['#12c2e9', '#c471ed', '#f64f59'],
  },
  theme5: {
    name: 'Shayla',
    type: 'gradient',
    colors: ['#77A1D3', '#ae93c0', '#E684AE'],
  },
  theme6: {
    name: 'Theme 6',
    type: 'gradient',
    colors: ['#ffdde1', '#ee9ca7'],
  },
  theme7: {
    name: 'Theme 7',
    type: 'solid',
    color: '#3B444B',
  },
  theme8: {
    name: 'Theme 8',
    type: 'solid',
    color: '#5D8AA8',
  },
  theme9: {
    name: 'Theme 9',
    type: 'solid',
    color: '#DE6FA1',
  },
  theme10: {
    name: 'Theme 10',
    type: 'animated',
    colors: ['#e381cf', '#e73c7e', '#23a6d5', '#23d5ab'],
  },
  theme4: {
    name: 'Theme 4',
    type: 'animated',
    colors: ['#12c2e9', '#c471ed', '#f26bde'],
  },
};

export const getThemeStyle = (theme, { old = false } = {}) => {
  if (!themes[theme] && !old) {
    theme = 'theme1';
  }
  switch (themes[theme]?.type) {
    case 'solid':
      return {
        background: themes[theme]?.color,
      };
    case 'animated':
      return {
        background: `linear-gradient(-45deg, ${themes[theme]?.colors.join()})`,
        backgroundSize: '400%, 400%',
      };
    case 'gradient':
    default:
      return {
        background: `linear-gradient(to right, ${themes[
          theme
        ]?.colors.join()})`,
      };
  }
};

export const getThemeClass = (theme) => {
  if (themes[theme]?.type === 'animated') {
    return 'animate-bg';
  } else return '';
};
