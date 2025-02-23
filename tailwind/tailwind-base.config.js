/** @type {Parameters<Parameters<Parameters<import('tailwindcss/plugin')>[0]>[0]['addUtilities']>['0']} */
export const baseFontSizes = {
  '.text-base': {
    fontSize: '0.875rem',
    lineHeight: '1.1428571428571428',
  },
};

/** @type {NonNullable<NonNullable<import('tailwindcss').Config['theme']>['extend']>['colors']} */
export const baseColors = {
  'error-red': '#E91E63',
  primary: '#232873',
  secondary: '#14008E',
};

/** @type {NonNullable<NonNullable<import('tailwindcss').Config['theme']>['extend']>['fontWeight']} */
export const baseFontWeight = {
  regular: '400',
  demibold: '600',
};

/** @type {NonNullable<NonNullable<import('tailwindcss').Config['theme']>['extend']>['boxShadow']} */
export const baseBoxShadow = {
  full: '0 0.125rem 0.9375rem 0 rgba(0, 0, 0, 0.1)',
  'full-light': '0 1px 2px 0 rgba(108, 108, 108, 0.13)',
};

/** @type {NonNullable<NonNullable<import('tailwindcss').Config['theme']>['extend']>['fontFamily']} */
export const baseFontFamily = {
  ploni: ['ploni'],
};
