import path from 'node:path'
import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import { configDefaults } from 'vitest/config'

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import VueRouter from 'unplugin-vue-router/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/packages/main',
    plugins: [
      VueRouter({
        routesFolder: [
          {
            src: 'src/pages',
          },
        ],
        logs: true,
        exclude: ['**/_content/**'],
        extensions: ['.vue'],
      }),
      vue(),
      mode === 'development' && vueDevTools(),
      svgLoader({
        svgoConfig: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // @see https://github.com/svg/svgo/issues/1128
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
      nxViteTsPaths(),
    ],
    // resolve: {
    //   alias: {
    //     '@apps/ce': path.resolve(__dirname, './src/'),
    //     '@libs/helpers': path.resolve(__dirname, '../../libs/helpers/src/'),
    //     '@libs/locales': path.resolve(__dirname, '../../libs/locales/src/'),
    //     '@libs/mock': path.resolve(__dirname, '../../libs/mock/src/'),
    //     '@libs/constants': path.resolve(__dirname, '../../libs/constants/src/'),
    //     '@libs/styles': path.resolve(__dirname, '../../libs/styles/src/'),
    //     '@libs/components': path.resolve(
    //       __dirname,
    //       '../../libs/components/src/'
    //     ),
    //     '@libs/img': path.resolve(__dirname, '../../libs/img/src/'),
    //   },
    // },
    server: {
      proxy: {
        '/api': {
          target: 'https://ce-tot-supervisor.gmicloud-dev.com:30443',
          changeOrigin: true,
        },
      },
      // allow vite server access workspace root
      fs: {
        allow: ['../..'],
      },
    },
    test: {
      include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: './test/setup.ts',
    },
  }
})
