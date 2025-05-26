import { useEffect, useState } from 'react'

import { Button } from '@alison-ui/button'

import type { Meta, StoryObj } from '@storybook/react'

import { SearchIcon, XIcon } from 'lucide-react'

import * as Dialog from './components'

export default {
  component: Dialog.Root,
  title: 'ui/dialog',
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    closable: {
      control: 'boolean',
    },
    closeIcon: {
      control: 'object',
    },
    open: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Dialog.Root>

export const Default: StoryObj<typeof Dialog.Root> = {
  args: {
    title: 'Dialog Title',
    description: 'This is a description for the dialog.',
    closable: true,
    closeIcon: <XIcon />,
    open: false,
  },
  render: function Render({ open, ...args }) {
    const [isOpen, setIsOpen] = useState(open)

    useEffect(() => {
      setIsOpen(open)
    }, [open])

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Click to open</Button>
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen} {...args}>
          <Dialog.Content>
            <div>
              <p>
                Dialog content goes here. You can place any React component
                inside the dialog.
              </p>
            </div>
            <Dialog.Footer>
              <Dialog.Close>
                <div className="flex gap-4">
                  <Button variant="secondary">Close</Button>
                  <Button>Confirm</Button>
                </div>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </>
    )
  },
}

export const Overview = () => (
  <Dialog.Root
    title="Dialog Title"
    description="This is a description for the dialog."
  >
    <Dialog.Trigger asChild>
      <Button>Open Dialog</Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <p>
        Dialog content goes here. You can place any React component inside the
        dialog.
      </p>
      <Dialog.Footer>
        <Dialog.Close>
          <div className="flex gap-4">
            <Button variant="secondary">Close</Button>
            <Button>Confirm</Button>
          </div>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
)

export const HideCloseButton = () => {
  return (
    <Dialog.Root
      closable={false}
      closeIcon={null}
      title="Dialog Title"
      description="This is a description for the dialog."
    >
      <Dialog.Trigger asChild>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <div>
          <p>
            Dialog content goes here. You can place any React component inside
            the dialog.
          </p>
        </div>
        <Dialog.Footer>
          <Dialog.Close>
            <Button variant="secondary">Close</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export const ReplaceCloseButton = () => {
  return (
    <Dialog.Root
      closable
      closeIcon={<SearchIcon />}
      title="Dialog Title"
      description="This is a description for the dialog."
    >
      <Dialog.Trigger asChild>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <div>
          <p>
            Dialog content goes here. You can place any React component inside
            the dialog.
          </p>
        </div>
        <Dialog.Footer>
          <Dialog.Close>
            <Button variant="secondary">Close</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export const ControlledDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog.Root open={open} closable={false}>
        <Dialog.Content>
          <div>
            <p>
              Dialog content goes here. You can place any React component inside
              the dialog.
            </p>
          </div>
          <Dialog.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
