import type { Config } from 'tailwindcss'

import daisyui from 'daisyui'
import plugin from 'tailwindcss/plugin'

import * as colors from './color'

/**
 * TODO: refactor with https://gmicloud.atlassian.net/browse/CE-583
 */
const rootStylePlugin = plugin(({ addBase }) => {
  addBase({
    ':root': {
      '--font-inter': 'Inter, sans-serif',
      '--transparent': 'transparent',
    },
  })
})

const scrollbarPlugin = plugin(({ addUtilities }) => {
  const newUtilities = {
    '.scrollbar-stable': {
      'scrollbar-gutter': 'stable',
    },
  }
  addUtilities(newUtilities)
})

const customClassesPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    '.scrollbar-hide': {
      /* Firefox */
      'scrollbar-width': 'none',

      /* Safari and Chrome */
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },

    '.scrollbar-default': {
      /* Firefox */
      'scrollbar-width': 'auto',

      /* Safari and Chrome */
      '&::-webkit-scrollbar': {
        display: 'block',
      },
    },
    '.text-fill-transparent': {
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
    '.text-highlight-primary': {
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-image':
        'linear-gradient(349.68deg, #a2ccf8 14.18%, #1780ed 47.37%, #5da6f3 76.79%)',
    },
  })
})

export default {
  theme: {
    extend: {
      fontSize: {
        md: '22px',
      },
      colors: {
        ...colors,
      },
      borderRadius: {
        '0.5xl': '0.675rem',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        header: '101',
        footer: '102',
        modal: '103',
      },
    },
  },
  daisyui: {
    themes: ['winter'],
  },
  plugins: [daisyui, rootStylePlugin, customClassesPlugin, scrollbarPlugin],
} satisfies Omit<Config, 'content'>
