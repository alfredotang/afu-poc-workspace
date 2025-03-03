<template>
  <div class="space-y-6">
    <div
      role="alert"
      class="alert alert-warning"
    >
      This is a auth layout
    </div>
    <PageRouteData class="mx-auto max-w-screen-lg" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import PageRouteData from '@/components/PageRouteData.vue'
</script>
