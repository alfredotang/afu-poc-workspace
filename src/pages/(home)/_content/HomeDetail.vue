<template>
  <section class="mb-12 max-w-sm mx-auto">
    <div
      role="tablist"
      class="tabs tabs-boxed"
    >
      <router-link
        role="tab"
        class="tab"
        v-for="tab in TABS"
        :to="{ name: '/(home)/', query: { tab: tab.toLowerCase() } }"
        :key="tab"
        :class="cn('tab', { 'tab-active': currentTab === tab.toLowerCase() })"
        v-text="tab"
      />
    </div>
  </section>
  <component :is="components[currentTab]" />
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'

const TABS = ['IaaS', 'MaaS'] as const

const components = {
  iaas: defineAsyncComponent(() => import('./IaaS.vue')),
  maas: defineAsyncComponent(() => import('./MaaS.vue')),
} as const
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { cn } from '@/libs/class-name'

const route = useRoute('/(home)/')

const currentTab = computed(() => {
  const tab = route.query.tab
  if (typeof tab !== 'string')
    return TABS[0].toLowerCase() as keyof typeof components
  return tab.toLowerCase() as keyof typeof components
})
</script>
