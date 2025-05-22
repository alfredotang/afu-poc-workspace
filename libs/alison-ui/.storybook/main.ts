import path from 'node:path'

import react from '@vitejs/plugin-react'
import { mergeConfig } from 'vite'

import type { StorybookConfig } from '@storybook/react-vite'

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: async config =>
    mergeConfig(config, {
      plugins: [
        react(),
        nxViteTsPaths(),
        // @see https://github.com/tailwindlabs/tailwindcss/discussions/16687#discussioncomment-12374574
        (await import('@tailwindcss/vite')).default(),
      ],
      resolve: {
        alias: {
          // storybook is build with CommonJS, so __dirname is available
          '@alison-ui': path.resolve(__dirname, '../src'),
        },
      },
    }),
}

export default config

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
