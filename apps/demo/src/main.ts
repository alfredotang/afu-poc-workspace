import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import queryClient from './query-client'
import router from './router'
import './style.css'

import '@apps/demo-react/main'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })

// @ts-expect-error - for testing
window.vueRouter = router

app.mount('#app')
