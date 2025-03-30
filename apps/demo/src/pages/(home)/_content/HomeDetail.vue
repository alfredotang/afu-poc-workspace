<template>
  <section class="mx-auto mb-12 max-w-sm">
    <div
      role="tablist"
      class="tabs-boxed tabs"
    >
      <router-link
        v-for="tab in TABS"
        :key="tab"
        role="tab"
        class="tab"
        :to="{ name: '/(home)/', query: { tab: tab.toLowerCase() } }"
        :class="cn('tab', { 'tab-active': currentTab === tab.toLowerCase() })"
      >
        {{ tab }}
      </router-link>
    </div>
  </section>
  <component :is="components[currentTab]" />
</template>

<script lang="ts">
import { defineAsyncComponent, computed } from 'vue'

const TABS = ['IaaS', 'MaaS'] as const

const components = {
  iaas: defineAsyncComponent(() => import('./IaaS.vue')),
  maas: defineAsyncComponent(() => import('./MaaS.vue')),
} as const
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import { cn } from '@libs/helpers/className'

const route = useRoute('/(home)/')

const currentTab = computed(() => {
  const tab = route.query.tab
  if (typeof tab !== 'string')
    return TABS[0].toLowerCase() as keyof typeof components
  return tab.toLowerCase() as keyof typeof components
})
</script>
