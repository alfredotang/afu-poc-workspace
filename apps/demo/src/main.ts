import { createPinia } from 'pinia'
import { createApp } from 'vue'

import './style.css'

import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import queryClient from './query-client'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
