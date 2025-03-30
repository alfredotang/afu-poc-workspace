<template>
  <div
    class="tooltip"
    :data-tip="isLoggedIn ? 'logout' : undefined"
  >
    <button
      :class="cn('btn', isLoggedIn ? 'btn-ghost' : 'btn-primary')"
      @click="toggleLogin"
    >
      <img
        v-show="isLoggedIn"
        class="size-10"
        src="https://pansci.asia/wp-content/uploads/2016/11/f4ba5977f2f0519a10c9f9bd66cefc89-560x576.png"
        alt="pokemon"
      />
      {{ isLoggedIn ? userName : 'Login' }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useStoreRefs, useStore } from '@apps/demo/store'
import { cn } from '@libs/helpers/className'

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
