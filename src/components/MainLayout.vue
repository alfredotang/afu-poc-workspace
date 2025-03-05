<template>
  <section class="mb-12 max-w-sm mx-auto">
    <div
      role="tablist"
      class="tabs tabs-boxed"
    >
      <a
        role="tab"
        class="tab"
        v-for="item in TABS"
        :key="item"
        :class="cn('tab', { 'tab-active': item === currentTab })"
        @click="currentTab = item"
        v-text="item"
      />
    </div>
  </section>
  <PageRouteData
    v-if="currentTab === 'Route Config'"
    class="mb-6 p-6 max-w-screen-lg mx-auto"
  />
  <main
    v-else
    :class="cn('p-6 max-w-screen-lg mx-auto', props.class)"
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
import { cn } from '@/libs/class-name'
import PageRouteData from '@/components/PageRouteData.vue'
import { useRoute } from 'vue-router'

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
