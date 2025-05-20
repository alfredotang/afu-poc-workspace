import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import queryClient from './query-client'
import router from './router'
import './style.css'

const pinia = createPinia()
const createReactApp = () => {
  import('@apps/demo-react/main')
}

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, { queryClient })

window.vueRouter = router
window.pinia = pinia
app.mount('#app')
createReactApp()
