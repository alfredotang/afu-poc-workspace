<template>
  <div
    role="alert"
    class="alert alert-success mb-4"
  >
    This is a cart layout
  </div>
  <CartHeader />

  <main class="p-6 max-w-screen-lg mx-auto">
    <slot />
  </main>
</template>
<script setup lang="ts">
import CartHeader from '@/components/CartHeader.vue'
</script>
