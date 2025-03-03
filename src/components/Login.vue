<template>
  <button
    :class="cn('btn btn-primary', isLoggedIn ? '' : 'btn-outline')"
    @click="toggleLogin"
  >
    {{ isLoggedIn ? userName : 'Login' }}
  </button>
</template>
<script setup lang="ts">
import { useStoreRefs, useStore } from '@/store'
import { cn } from '@/libs/class-name'
import { useRouter } from 'vue-router'

const { isLoggedIn, userName } = useStoreRefs()
const { logout } = useStore()
const router = useRouter()

const toggleLogin = () => {
  if (isLoggedIn.value) {
    logout()
    return
  }

  router.push({ name: '/auth/signin' })
}
</script>
