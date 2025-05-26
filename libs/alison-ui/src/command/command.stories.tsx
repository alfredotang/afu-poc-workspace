import { useState } from 'react'

import { Button } from '@alison-ui/button'

import type { Meta } from '@storybook/react'

import * as Command from '.'

export default {
  title: 'ui/command',
  component: Command.Root,
} as Meta

export const Default = () => {
  return (
    <Command.Root className="rounded-lg border shadow-md">
      <Command.Input placeholder="Type a command" />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Actions">
          <Command.Item>Action 1</Command.Item>
          <Command.Item>Action 2</Command.Item>
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Settings">
          <Command.Item>Setting 1</Command.Item>
          <Command.Item>Setting 2</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  )
}

export const Dialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Empty>No commands found.</Command.Empty>
          <Command.Group heading="Files">
            <Command.Item>File 1</Command.Item>
            <Command.Item>File 2</Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Edit">
            <Command.Item>Edit 1</Command.Item>
            <Command.Item>Edit 2</Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  )
}
