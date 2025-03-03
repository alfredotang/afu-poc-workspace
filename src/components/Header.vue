<template>
  <header class="p-6 flex justify-between">
    <nav class="flex gap-4">
      <router-link
        v-for="route in routes"
        class="hover:underline"
        :key="route.name"
        :to="{ name: route.name }"
        v-slot="{ isActive }"
      >
        <button :class="cn('btn', isActive ? 'btn-primary' : 'btn-ghost')">
          {{ route.label }}
        </button>
      </router-link>
    </nav>
    <Login />
  </header>
</template>

<script setup lang="ts">
import type { RouteRecordName } from 'vue-router'
import Login from '@/components/Login.vue'
import { cn } from '@/libs/class-name'

const routes: Array<{ label: string; name: RouteRecordName }> = [
  { name: 'my-homie', label: 'home' },
  { name: '/admin/', label: 'admin' },
  { name: '/about/', label: 'about' },
  { name: '/cart/', label: 'cart' },
  { name: '/callback/', label: 'callback' },
]
</script>
