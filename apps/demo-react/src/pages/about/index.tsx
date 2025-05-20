import { Button } from '@alison-ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

import Hello from './_content/hello'

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div className="text-(--color-primary)">Hello "/about"!</div>
      <Hello />
      <div>
        <Link to="/about/$aboutId" params={{ aboutId: '123' }}>
          <Button>Go to "/about/123"</Button>
        </Link>
      </div>
    </div>
  )
}
