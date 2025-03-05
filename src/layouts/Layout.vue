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
  if (Array.isArray(route.meta.layout)) {
    return route.meta.layout?.length ? route.meta.layout : ['default']
  }

  return [route.meta.layout || 'default']
})
</script>
