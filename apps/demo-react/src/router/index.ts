import { createRouter } from '@tanstack/react-router'

import { routeTree } from './route-tree.gen'

// Create a new router instance
export const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
  interface StaticDataRouteOption {
    hideLayout?: boolean
  }
}
