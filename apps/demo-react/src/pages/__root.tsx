import { universalRouter } from '@libs/helpers/universal-router'
import {
  createRootRoute,
  Link,
  Outlet,
  useMatches,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => {
    const route = useMatches({
      select: matched => matched[matched.length - 1],
    })

    if (route.globalNotFound) {
      return <Outlet />
    }

    return (
      <div className="min-h-screen">
        <header className="flex gap-6 p-2">
          <div>Is React App</div>
          <nav className="flex gap-4">
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
            <a
              className="cursor-pointer [&.active]:font-bold"
              onClick={() =>
                universalRouter.pushVue({
                  path: '/user-console/resource-overview',
                })
              }
            >
              Resource Overview
            </a>
          </nav>
        </header>
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    )
  },
  notFoundComponent: () => <></>,
})
