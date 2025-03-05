import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/afu-vue-practice' : undefined,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
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
      // extendRoute: route => {
      //   route.name = route.name
      //     .split('/')
      //     .filter(Boolean)
      //     .join('-')
      //     .replace(/\[(\w+)\]/, ':$1')
      //     .replace(/\((\w+)\)/, '$1')
      // },
      // beforeWriteFiles: root => {
      //   console.log({ parent: root.parent })
      //   root.insert(
      //     '/root',
      //     fileURLToPath(new URL('./src/components/Root.vue', import.meta.url))
      //   )
      // },
    }),
    vue(),
    vueDevTools(),
  ],
}))
