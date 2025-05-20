import { createRootRoute, Outlet, useMatches } from '@tanstack/react-router'

import RootLayout from '../layouts/root-layout'

export const Route = createRootRoute({
  component: () => {
    const route = useMatches({
      select: matched => matched[matched.length - 1],
    })

    if (route.globalNotFound) {
      return <Outlet />
    }

    return (
      <RootLayout>
        <Outlet />
      </RootLayout>
    )
  },
  notFoundComponent: () => <></>,
})
