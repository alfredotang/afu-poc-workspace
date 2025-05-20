<template>
  <div class="space-y-6">
    <PageRouteData class="mx-auto max-w-screen-lg" />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import PageRouteData from '@apps/demo/components/PageRouteData.vue'
</script>
