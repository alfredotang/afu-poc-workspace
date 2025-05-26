import type { Meta } from '@storybook/react'

import * as Popover from '.'

import { Button } from '../button'

export default {
  component: Popover.Root,
  title: 'ui/popover',
  argTypes: {
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
    modal: { control: 'boolean' },
  },
} satisfies Meta<typeof Popover.Root>

export const Overview = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <Button>Open popover</Button>
    </Popover.Trigger>
    <Popover.Content>
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="leading-none font-medium">Dimensions</h4>
          <p className="text-muted-foreground text-sm">
            Set the dimensions for the layer.
          </p>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="width">Width</label>
            <input id="width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="maxWidth">Max. width</label>
            <input
              id="maxWidth"
              defaultValue="300px"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="height">Height</label>
            <input id="height" defaultValue="25px" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <label htmlFor="maxHeight">Max. height</label>
            <input
              id="maxHeight"
              defaultValue="none"
              className="col-span-2 h-8"
            />
          </div>
        </div>
      </div>
    </Popover.Content>
  </Popover.Root>
)
