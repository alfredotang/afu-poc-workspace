import 'vue-router'

import type { LayoutType } from '@/layouts/_content/NestedLayout.vue'

// To ensure it is treated as a module, add at least one `export` statement
export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string

    // navigation guards
    isPublic?: boolean
    featureEnabled?: boolean
    requiresOwner?: boolean

    // global ui
    hideSidebar?: boolean
    hideGlobalFooter?: boolean
    customBreadcrumb?: Array<Record<string, unknown>>
    disableHeaderSpace?: boolean
    layouts?: LayoutType[]
  }
}
