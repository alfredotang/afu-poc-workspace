<template>
  <div
    role="alert"
    class="alert alert-info"
  >
    This is a default layout
  </div>
  <Header />
  <MainLayout>
    <slot />
  </MainLayout>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import MainLayout from '@/components/MainLayout.vue'
</script>
