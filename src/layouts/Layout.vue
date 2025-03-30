<template>
  <NestedLayout :layouts="layouts">
    <RouterView />
  </NestedLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NestedLayout, { type LayoutType } from './_content/NestedLayout.vue'

const route = useRoute()

const layouts = computed<LayoutType[]>(() => {
  const layouts = route.meta.layouts

  if (!layouts?.length) {
    if (route.name?.startsWith('/cart')) {
      return ['default', 'cart']
    }

    if (route.name?.startsWith('/user-console')) {
      return ['default', 'userConsole']
    }

    return ['default']
  }
  return layouts
})
</script>
