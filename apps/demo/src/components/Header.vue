<template>
  <header class="flex justify-between p-6">
    <nav class="flex gap-4">
      <router-link
        v-for="route in routes"
        :key="route.name"
        v-slot="{ isActive }"
        class="hover:underline"
        :to="{ name: route.name }"
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

import Login from '@apps/demo/components/Login.vue'
import { cn } from '@libs/helpers/className'

const routes: Array<{ label: string; name: RouteRecordName }> = [
  { name: '/(home)/', label: 'home' },
  { name: '/user-console/resource-overview/', label: 'Resource Overview' },
  { name: '/admin/', label: 'admin' },
  { name: '/about/', label: 'about' },
  { name: '/cart/', label: 'cart' },
  { name: '/callback/', label: 'callback' },
]
</script>
