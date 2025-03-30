<template>
  <div
    class="max-w-screen-lg mx-auto flex justify-center items-center flex-col"
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
        :value="item"
        v-text="item"
        :key="item"
      />
    </select>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@apps/demo/store'
import { ACCESS_TOKEN_DICT } from '@apps/demo/store/constants'
import { computed } from 'vue'

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
