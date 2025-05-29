import { Button } from '@alison-ui/button'

import type { Meta } from '@storybook/react'

import * as Card from './components'

export default {
  component: Card.Root,
  title: 'ui/card',
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Card.Root>

export const Overview = () => (
  <Card.Root>
    <Card.Header>
      <Card.Title>Card Title</Card.Title>
      <Card.Description>Card Description</Card.Description>
      <Card.Action>
        <Button>Action</Button>
      </Card.Action>
    </Card.Header>
    <Card.Content>
      <p>This is the content of the card.</p>
    </Card.Content>
    <Card.Footer>
      <p>Footer content here</p>
    </Card.Footer>
  </Card.Root>
)
