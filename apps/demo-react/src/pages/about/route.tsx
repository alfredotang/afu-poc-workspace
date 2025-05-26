import { createFileRoute, Outlet } from '@tanstack/react-router'

import * as Alert from '@alison-ui/alert'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Alert.Root>
        <Alert.Title>About layout</Alert.Title>
      </Alert.Root>
      <Outlet />
    </div>
  )
}
