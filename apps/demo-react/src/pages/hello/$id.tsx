import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/hello/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/hello/$id"!</div>
}
