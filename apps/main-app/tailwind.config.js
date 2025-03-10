import { createGlobPatternsForDependencies } from '@nx/angular/tailwind';
import { join } from 'path';
import plugin from 'tailwindcss/plugin';
const {
  baseColors,
  baseFontSizes,
  baseFontWeight,
  baseBoxShadow,
  baseFontFamily,
} = require('../../tailwind/tailwind-base.config');

/** @type {import('tailwindcss').Config} */
export const content = [
  join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
  ...createGlobPatternsForDependencies(__dirname),
];
export const theme = {
  extend: {
    screens: {
      // landscape
      // desktop: { raw: '(max-device-height: 100vw)' },
      desktop: { raw: '(max-device-height: 0px)' },
    },
    colors: { ...baseColors },
    fontWeight: { ...baseFontWeight },
    padding: {
      8.5: '2.125rem',
    },
    width: {},
    fontSize: {
      'x1.01': '1.01em',
      '1xl': '1.375rem',
      '2xl.66': '1.75rem',
    },
    fontFamily: { ...baseFontFamily },
    boxShadow: {
      ...baseBoxShadow,
      '0px-1px-2px-rgba(108,108,108,0.129494)':
        '0px 1px 2px rgba(108, 108, 108, 0.129494)',
    },
  },
};
export const plugins = [
  plugin(function ({ addUtilities }) {
    addUtilities(baseFontSizes);
  }),
];
