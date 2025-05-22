import { createFileRoute, Outlet } from '@tanstack/react-router'

import { Alert } from '@alison-ui/alert'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Alert title="About layout" />
      <Outlet />
    </div>
  )
}
