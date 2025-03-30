<template>
  <div
    class="mx-auto flex max-w-screen-lg flex-col items-center justify-center"
  >
    <select
      class="select select-bordered w-full max-w-xs"
      @change="handleLogin"
    >
      <option
        disabled
        selected
      >
        Select Role
      </option>
      <option
        v-for="item in options"
        :key="item"
        :value="item"
        v-text="item"
      />
    </select>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { useStore } from '@apps/demo/store'
import { ACCESS_TOKEN_DICT } from '@apps/demo/store/constants'

definePage({
  meta: {
    layouts: ['auth'],
    isPublic: true,
  },
})

const { login } = useStore()

const options = computed(
  () => Object.keys(ACCESS_TOKEN_DICT) as Array<keyof typeof ACCESS_TOKEN_DICT>
)

const handleLogin = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const role = target.value as keyof typeof ACCESS_TOKEN_DICT
  login(role)
}
</script>
