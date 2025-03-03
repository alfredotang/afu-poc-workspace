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
  const { isOwner, isLoggedIn } = useStoreRefs()
  if (to.meta.requiresOwner && !isOwner.value) {
    return next({ name: '/401' })
  }

  if (!isLoggedIn.value && !to.meta.isPublic) {
    return next({ name: '/auth/signin' })
  }
  next()
})
