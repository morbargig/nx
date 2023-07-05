/** @type {Parameters<Parameters<Parameters<import('tailwindcss/plugin')>[0]>[0]['addUtilities']>['0']} */
export const baseFontSizes = {
  '.text-14': {
    fontSize: '0.875rem',
    lineHeight: '1.1428571428571428',
  },
  '.text-16': {
    fontSize: '1rem',
    lineHeight: '1.1875',
  },
  '.text-18': {
    fontSize: '1.125rem',
    lineHeight: '1.2222222222222223',
  },
  '.text-20': {
    fontSize: '1.25rem',
    lineHeight: '1.15',
  },
  '.text-22': {
    fontSize: '1.375rem',
    lineHeight: '1.1818181818181819',
  },
  '.text-24': {
    fontSize: '1.5rem',
    lineHeight: '1.2083333333333333',
  },
  '.text-28': {
    fontSize: '1.75rem',
    lineHeight: '1.1785714285714286',
  },
  '.text-32': {
    fontSize: '2rem',
    lineHeight: '1.1875',
  },
  '.text-34': {
    fontSize: '2.125rem',
    lineHeight: '1.2058823529411764',
  },
  '.text-36': {
    fontSize: '2.25rem',
    lineHeight: '1.1666666666666667',
  },
  '.text-38': {
    fontSize: '2.375rem',
    lineHeight: '1.1842105263157894',
  },
  '.text-42': {
    fontSize: '2.625rem',
    lineHeight: '1.1904761904761905',
  },
  '.text-48': {
    fontSize: '3rem',
    lineHeight: '1.1875',
  },
  '.text-63': {
    fontSize: '3.9375rem',
    lineHeight: '1.0793650793650793',
  },
};

/** @type {NonNullable<NonNullable<import('tailwindcss').Config['theme']>['extend']>['colors']} */
export const baseColors = {
  'accent-bright-red': '#EA0037',
  'accent-green': '#06D79D',
  'accent-light-blue': '#8CD2FA',
  'accent-purple': '#8796FA',
  'accent-purple-80': '#E9E9F1',
  'background-gray': '#F5F6FA',
  'background-pink': '#FCDBE6',
  'dark-gray': '#333333',
  'disable-gray': '#EAEAEA',
  'error-red': '#E91E63',
  'header-blue': '#0E0066',
  'light-orange': '#F5821F',
  'med-gray': '#6B6E77',
  'med-gray-20': '#898B92',
  'med-gray-40': '#A6A8AD',
  'med-gray-90': '#F0F0F1',
  'primary-blue': '#232873',
  'primary-blue-70': '#BDBFD5',
  'primary-orange': '#FF5A23',
  'secondary-blue': '#14008E',
  'snackbar-bg-color': '#65699D',
  'success-green': '#34BB94',
  'tag-light-blue': '#EAF1FF',
};

/** @type {NonNullable<NonNullable<import('tailwindcss').Config['theme']>['extend']>['fontWeight']} */
export const baseFontWeight = {
  regular: '400',
  demibold: '600',
};

/** @type {NonNullable<NonNullable<import('tailwindcss').Config['theme']>['extend']>['boxShadow']} */
export const baseBoxShadow = {
  'outer-1': '0px 1px 2px rgba(108, 108, 108, 0.1295)',
  'outer-2': '0 0.125rem 0.9375rem rgba(0, 0, 0, 0.0998)',
  'outer-3': '0 0.0625rem 0.75rem rgba(0, 0, 0, 0.06)',
  'outer-4': ' 0 0.125rem 0.9375rem rgba(0, 0, 0, 0.1)',
  full: '0 0.125rem 0.9375rem 0 rgba(0, 0, 0, 0.1)',
  'full-light': '0 1px 2px 0 rgba(108, 108, 108, 0.13)',
  subHeader: '0 1px 2px 0 rgba(0, 0, 0, 0.06)',
};

/** @type {NonNullable<NonNullable<import('tailwindcss').Config['theme']>['extend']>['fontFamily']} */
export const baseFontFamily = {
  ploni: ['ploni'],
};
