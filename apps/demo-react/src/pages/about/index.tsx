import { createFileRoute, Link } from '@tanstack/react-router'

import { Button } from '@alison-ui/button'

import PokemonList from '@apps/demo-react/components/pokemon-list'

import Hello from './_content/hello'
export const Route = createFileRoute('/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-6">
      <div className="text-(--color-primary)">Hello "/about"!</div>
      <Hello />
      <PokemonList />
      <div>
        <Link to="/about/$aboutId" params={{ aboutId: '123' }}>
          <Button>Go to "/about/123"</Button>
        </Link>
      </div>
    </div>
  )
}
