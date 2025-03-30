<template>
  <component :is="currentLayout">
    <NestedLayout
      v-if="remainingLayouts.length"
      :layouts="remainingLayouts"
    >
      <slot />
    </NestedLayout>
    <slot v-else />
  </component>
</template>

<script lang="ts">
const LAYOUT_COMPONENT_DICT = {
  default: defineAsyncComponent(() => import('./Default.vue')),
  auth: defineAsyncComponent(() => import('./Auth.vue')),
  empty: defineAsyncComponent(() => import('./Empty.vue')),
  cart: defineAsyncComponent(() => import('./Cart.vue')),
  userConsole: defineAsyncComponent(() => import('./UserConsole.vue')),
} as const

export type LayoutType = keyof typeof LAYOUT_COMPONENT_DICT
</script>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps<{ layouts: LayoutType[] }>()

const currentLayout = computed(() => {
  return LAYOUT_COMPONENT_DICT[props.layouts[0]] || null
})

const remainingLayouts = computed(() => props.layouts.slice(1))
</script>
