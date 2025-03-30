import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

import { VueQueryPlugin } from '@tanstack/vue-query'
import queryClient from './query-client'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin, { queryClient })

app.mount('#app')
