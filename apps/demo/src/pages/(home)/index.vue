<template>
  <div class="space-y-6">
    <div class="text-highlight-primary text-2xl font-medium">
      {{ route.meta.title }}
    </div>
    <HomeDetail />
    <div id="react-content"></div>
  </div>
</template>

<script setup lang="tsx">
import { useRoute } from 'vue-router'

import { useRenderReact } from '@apps/demo/composables/useRenderReact'

import HomeDetail from './_content/HomeDetail.vue'
import ReactContent from './_content/react-content'

definePage({
  meta: {
    title: 'Hello world, this is a demo page',
    isPublic: true,
  },
})

useRenderReact('react-content', <ReactContent />)

const route = useRoute()
</script>
