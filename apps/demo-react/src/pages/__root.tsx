import { Alert, AlertTitle } from '@alison-ui/alert'
import { Button } from '@alison-ui/button'
import { Input } from '@alison-ui/input'
import { universalRouter } from '@libs/helpers/bridges'
import {
  createRootRoute,
  Link,
  Outlet,
  useMatches,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { SearchIcon, XIcon } from 'lucide-react'

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
        <Alert>
          <AlertTitle>This is a React app</AlertTitle>
        </Alert>
        <header className="flex gap-6 p-2">
          <nav className="flex gap-4">
            <Button
              className="cursor-pointer [&.active]:font-bold"
              variant="ghost"
              onClick={() =>
                universalRouter.pushVue({
                  path: '/',
                })
              }
            >
              Home
            </Button>
            <Link to="/about">
              {({ isActive }) => (
                <Button variant={isActive ? 'default' : 'ghost'}>About</Button>
              )}
            </Link>
            <Button
              className="cursor-pointer"
              variant="ghost"
              onClick={() =>
                universalRouter.pushVue({
                  path: '/user-console/resource-overview',
                })
              }
            >
              Resource Overview
            </Button>
          </nav>
        </header>
        <section className="flex flex-wrap gap-4 p-6">
          <Input leading={<SearchIcon />} trailing={<XIcon />} />
          <Input leading={<SearchIcon />} />
          <Input trailing={<XIcon />} />
          <Input />
        </section>
        <main className="p-6">
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    )
  },
  notFoundComponent: () => <></>,
})
