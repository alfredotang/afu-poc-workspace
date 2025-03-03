<template>
  <div
    role="alert"
    class="alert alert-success"
  >
    This is a cart layout
  </div>
  <Header />
  <CartHeader />
  <MainLayout>
    <router-view />
  </MainLayout>
</template>
<script setup lang="ts">
import Header from '@/components/Header.vue'
import CartHeader from '@/components/CartHeader.vue'
import MainLayout from '@/components/MainLayout.vue'
</script>
