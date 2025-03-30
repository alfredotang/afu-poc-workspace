import type { Config } from 'tailwindcss'

import daisyui from 'daisyui'

export default {
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['winter'],
  },
  plugins: [daisyui],
} satisfies Omit<Config, 'content'>
