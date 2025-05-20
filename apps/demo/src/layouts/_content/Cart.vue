<template>
  <CartHeader />
  <main class="mx-auto max-w-screen-lg p-6">
    <slot />
  </main>
</template>
<script setup lang="ts">
import CartHeader from '@apps/demo/components/CartHeader.vue'
</script>
