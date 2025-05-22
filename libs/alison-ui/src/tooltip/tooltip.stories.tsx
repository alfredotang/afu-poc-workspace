import { Button } from '@alison-ui/button'

import type { Meta, StoryObj } from '@storybook/react'

import { Tooltip } from '.'

export default {
  title: 'ui/tooltip',
  component: Tooltip,
  argTypes: {
    content: { control: 'text' },
  },
} as Meta<typeof Tooltip>

export const Default: StoryObj<typeof Tooltip> = {
  args: {
    content: 'This is a tooltip',
  },
  render: function Render(args) {
    return (
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    )
  },
}
