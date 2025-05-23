import { Button } from '@alison-ui/button'

import type { Meta, StoryObj } from '@storybook/react'

import { Tooltip } from '.'

export default {
  title: 'ui/tooltip',
  component: Tooltip,
  argTypes: {
    content: { control: 'text' },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        type: { summary: 'top | right | bottom | left' },
      },
    },
  },
} as Meta<typeof Tooltip>

export const Default: StoryObj<typeof Tooltip> = {
  args: {
    content: 'This is a tooltip',
    side: 'top',
  },
  render: function Render(args) {
    return (
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    )
  },
}
