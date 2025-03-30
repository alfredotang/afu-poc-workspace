<template>
  <nav class="px-6 mb-6 flex gap-4">
    <router-link
      v-for="route in routes"
      class="hover:underline"
      :key="route.name"
      :to="{ name: route.name, query: route.query }"
      v-slot="{ isActive }"
    >
      <button :class="cn('btn', isActive ? 'btn-success' : 'btn-ghost')">
        {{ route.label }}
      </button>
    </router-link>
  </nav>
</template>

<script lang="ts" setup>
import type { RouteRecordName, LocationQueryRaw } from 'vue-router'
import { cn } from '@libs/helpers/className'
import dayjs from 'dayjs'
import { uuid } from '@libs/helpers/id'

const routes: Array<{
  label: string
  name: RouteRecordName
  query?: LocationQueryRaw
}> = [
  {
    name: '/cart/success',
    label: 'Success',
    query: { orderId: uuid() },
  },
  {
    name: '/cart/failed',
    label: 'Failed',
    query: { timestamp: dayjs().unix() },
  },
]
</script>
