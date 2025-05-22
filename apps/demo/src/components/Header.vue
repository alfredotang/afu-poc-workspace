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
    <button
      class="btn btn-ghost"
      @click="onToggleFramework"
    >
      {{ framework }}
    </button>
    <button
      class="btn btn-ghost"
      @click="onToggleHello"
    >
      {{ hello }}
    </button>
    <Login />
  </header>
</template>

<script setup lang="ts">
import type { RouteRecordName } from 'vue-router'

import Login from '@apps/demo/components/Login.vue'
import {
  useFrameworkStore,
  useFrameworkStoreRefs,
} from '@apps/demo/store/framework'
import { useHelloStore, useHelloStoreRefs } from '@apps/demo/store/hello'
import { cn } from '@libs/helpers/className'

const { setFramework } = useFrameworkStore()
const { framework } = useFrameworkStoreRefs()
const { hello } = useHelloStoreRefs()
const { setHello } = useHelloStore()
const routes: Array<{ label: string; name: RouteRecordName }> = [
  { name: '/(home)/', label: 'home' },
  { name: '/user-console/resource-overview/', label: 'Resource Overview' },
  { name: '/admin/', label: 'admin' },
  { name: '/about/', label: 'about' },
  { name: '/cart/', label: 'cart' },
  { name: '/callback/', label: 'callback' },
]

const onToggleFramework = () => {
  const newFramework =
    framework.value === 'vue' ? 'This is defined in react' : 'vue'
  setFramework(newFramework)
}

const onToggleHello = () => {
  const newHello =
    hello.value === 'this is defined in vue'
      ? 'react'
      : 'this is defined in vue'
  setHello(newHello)
}
</script>
