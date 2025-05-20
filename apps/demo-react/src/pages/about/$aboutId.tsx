import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/$aboutId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { aboutId } = Route.useParams()
  return (
    <div>
      <div>$aboutId</div>
      <div>{aboutId}</div>
    </div>
  )
}
