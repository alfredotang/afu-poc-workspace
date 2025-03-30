<template>
  <div
    role="alert"
    class="alert alert-success mb-4"
  >
    This is a cart layout
  </div>
  <CartHeader />

  <main class="mx-auto max-w-screen-lg p-6">
    <slot />
  </main>
</template>
<script setup lang="ts">
import CartHeader from '@apps/demo/components/CartHeader.vue'
</script>
