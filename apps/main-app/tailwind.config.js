const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');
const {
  baseColors,
  baseFontSizes,
  baseFontWeight,
  baseBoxShadow,
  baseFontFamily,
} = require('../../tailwind/tailwind-base.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
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
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities(
        baseFontSizes,
      );
    }),
  ],
};
