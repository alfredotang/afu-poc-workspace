<template>
  <div class="flex min-h-screen flex-col">
    <div
      role="alert"
      class="alert alert-success"
    >
      This is a Vue layout
    </div>
    <Header />
    <MainLayout class="grow">
      <slot />
    </MainLayout>
  </div>
</template>

<script setup lang="ts">
import Header from '@apps/demo/components/Header.vue'
import MainLayout from '@apps/demo/components/MainLayout.vue'
</script>
