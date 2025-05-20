import { PlusIcon } from 'lucide-react'

import { Button } from '.'

export default {
  component: Button,
  title: 'ui/button',
}

export const Default = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Default */}
      <div className="flex gap-4">
        <Button>Button</Button>
        <Button disabled>Button</Button>
        <Button size="sm">Button</Button>
        <Button size="icon">
          <PlusIcon />
        </Button>
        <Button size="lg">Button</Button>
      </div>
      {/* Outline */}
      <div className="flex gap-4">
        <Button variant="outline">Button</Button>
        <Button variant="outline" disabled>
          Button
        </Button>

        <Button variant="outline" size="sm">
          Button
        </Button>
        <Button variant="outline" size="icon">
          <PlusIcon />
        </Button>
        <Button variant="outline" size="lg">
          Button
        </Button>
      </div>
      {/* Ghost */}
      <div className="flex gap-4">
        <Button variant="ghost">Button</Button>
        <Button variant="ghost" disabled>
          Button
        </Button>
        <Button variant="ghost" size="sm">
          Button
        </Button>
        <Button variant="ghost" size="icon">
          <PlusIcon />
        </Button>
        <Button variant="ghost" size="lg">
          Button
        </Button>
      </div>
      {/* Link */}
      <div className="flex gap-4">
        <Button variant="link">Button</Button>
        <Button variant="link" disabled>
          Button
        </Button>
        <Button variant="link" size="sm">
          Button
        </Button>
        <Button variant="link" size="icon">
          <PlusIcon />
        </Button>
        <Button variant="link" size="lg">
          Button
        </Button>
      </div>
      {/* Destructive */}
      <div className="flex gap-4">
        <Button variant="destructive">Button</Button>
        <Button variant="destructive" disabled>
          Button
        </Button>
        <Button variant="destructive" size="sm">
          Button
        </Button>
        <Button variant="destructive" size="icon">
          <PlusIcon />
        </Button>
        <Button variant="destructive" size="lg">
          Button
        </Button>
      </div>
      {/* Secondary */}
      <div className="flex gap-4">
        <Button variant="secondary">Button</Button>
        <Button variant="secondary" disabled>
          Button
        </Button>
        <Button variant="secondary" size="sm">
          Button
        </Button>
        <Button variant="secondary" size="icon">
          <PlusIcon />
        </Button>
        <Button variant="secondary" size="lg">
          Button
        </Button>
      </div>
    </div>
  )
}

export const Sizes = () => {
  return (
    <div className="flex gap-4">
      <Button size="sm">Button</Button>
      <Button>Button</Button>
      <Button size="icon">
        <PlusIcon />
      </Button>
      <Button size="lg">Button</Button>
    </div>
  )
}

export const Variants = () => {
  return (
    <div className="flex gap-4">
      <Button>Button</Button>
      <Button variant="outline">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="link">Button</Button>
      <Button variant="destructive">Button</Button>
      <Button variant="secondary">Button</Button>
    </div>
  )
}
