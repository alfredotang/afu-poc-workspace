import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'
import { useStoreRefs } from '@/store'

const routesWithLayouts = setupLayouts(routes)

console.log(routesWithLayouts)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routesWithLayouts,
})

export default router

router.beforeEach((to, _from, next) => {
  const { isAdmin } = useStoreRefs()
  if (to.name === '/admin/' && !isAdmin.value) {
    alert('You are not an admin!')
    return next({ name: '/callback/' })
  }
  next()
})
