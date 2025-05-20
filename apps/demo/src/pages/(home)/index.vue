<template>
  <div class="space-y-6">
    <div class="text-highlight-primary text-2xl font-medium">
      {{ route.meta.title }}
    </div>
    <HomeDetail />
  </div>
</template>

<script setup lang="tsx">
import { useRoute } from 'vue-router'

import HomeDetail from './_content/HomeDetail.vue'

definePage({
  meta: {
    title: 'Hello world, this is a demo page',
    isPublic: true,
  },
})

const route = useRoute()
</script>
