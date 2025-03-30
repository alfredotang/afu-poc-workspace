import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { useStoreRefs } from '@apps/demo/store'

console.log({ routes })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
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
