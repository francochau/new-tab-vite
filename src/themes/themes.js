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
  conny: {
    name: 'Conny',
    type: 'gradient',
    colors: ['#536976', '#292E49'],
  },
  pepe: {
    name: 'Pepe',
    type: 'gradient',
    colors: ['#0F2027', '#203A43', '#2C5364'],
  },
  vivid: {
    name: 'Vivid',
    type: 'gradient',
    colors: ['#ad5389', '#3c1053'],
  },
  shayla: {
    name: 'Shayla',
    type: 'gradient',
    colors: ['#77A1D3', '#ae93c0', '#E684AE'],
  },
  zen: {
    name: 'Zen',
    type: 'solid',
    color: '#313443',
  },
  royal: {
    name: 'Royal',
    type: 'solid',
    color: '#1b1e31',
  },
  river: {
    name: 'River',
    type: 'solid',
    color: '#326373',
  },
  sweet: {
    name: 'Sweet',
    type: 'solid',
    color: '#af6195',
  },
  sparkling: {
    name: 'Sparkling',
    type: 'animated',
    colors: ['#e381cf', '#e73c7e', '#23a6d5', '#23d5ab'],
  },
  psychedlic: {
    name: 'Psychedlic',
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
