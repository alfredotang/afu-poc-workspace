<template>
  <div class="space-y-6">
    <HomeDetail />
  </div>
</template>

<script setup lang="ts">
import HomeDetail from './_content/HomeDetail.vue'

definePage({
  meta: {
    title: 'Hello world',
    isPublic: true,
  },
})
</script>
