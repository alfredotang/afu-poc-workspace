import { Alert, AlertTitle } from '@alison-ui/alert'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Alert>
        <AlertTitle>About layout</AlertTitle>
      </Alert>
      <Outlet />
    </div>
  )
}
