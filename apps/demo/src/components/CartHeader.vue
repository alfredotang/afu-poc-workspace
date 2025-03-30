<template>
  <nav class="mb-6 flex gap-4 px-6">
    <router-link
      v-for="route in routes"
      :key="route.name"
      v-slot="{ isActive }"
      class="hover:underline"
      :to="{ name: route.name, query: route.query }"
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
import { uuid } from '@libs/helpers/id'
import dayjs from 'dayjs'

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
