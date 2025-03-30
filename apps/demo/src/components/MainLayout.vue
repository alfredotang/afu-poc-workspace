<template>
  <section class="mx-auto mb-12 max-w-sm">
    <div
      role="tablist"
      class="tabs-boxed tabs"
    >
      <a
        v-for="item in TABS"
        :key="item"
        role="tab"
        class="tab"
        :class="cn('tab', { 'tab-active': item === currentTab })"
        @click="currentTab = item"
        v-text="item"
      />
    </div>
  </section>
  <PageRouteData
    v-if="currentTab === 'Route Config'"
    class="mx-auto mb-6 max-w-screen-lg p-6"
  />
  <main
    v-else
    :class="cn('mx-auto max-w-screen-lg p-6', props.class)"
  >
    <slot />
  </main>
</template>

<script lang="ts">
const TABS = ['Page Content', 'Route Config'] as const
type Tab = (typeof TABS)[number]
</script>

<script lang="ts" setup>
import { computed, type HTMLAttributes, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import PageRouteData from '@apps/demo/components/PageRouteData.vue'
import { cn } from '@libs/helpers/className'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const route = useRoute()

const currentTab = ref<Tab>('Page Content')

const routeName = computed(() => route.name)

watch(routeName, (current, previous) => {
  if (current !== previous) {
    currentTab.value = 'Page Content'
  }
})
</script>
