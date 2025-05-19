import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Config } from 'tailwindcss'

import { createGlobPatternsForDependencies } from '@nx/vue/tailwind'

/**
 * @see https://github.com/tailwindlabs/tailwindcss/issues/11097#issuecomment-1526886184
 */
import baseConfig from '../../libs/styles/src/tailwind.base'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  presets: [baseConfig],
  content: [
    join(__dirname, 'index.html'),
    join(__dirname, 'src/**/*!(*.stories|*.spec).{ts,tsx,css}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [],
  theme: {},
} satisfies Config
