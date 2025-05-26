import type { Meta } from '@storybook/react'

import * as Alert from '.'

export default {
  component: Alert.Root,
  title: 'ui/alert',
} satisfies Meta<typeof Alert>

export const Overview = () => (
  <div className="flex flex-col gap-4">
    <Default />
    <Destructive />
  </div>
)

export const Default = () => (
  <Alert.Root>
    <Alert.Title>Default Alert</Alert.Title>
    <Alert.Description>This is a default alert.</Alert.Description>
  </Alert.Root>
)

export const Destructive = () => (
  <Alert.Root variant="destructive">
    <Alert.Title>Destructive Alert</Alert.Title>
    <Alert.Description>
      This alert indicates a destructive action.
    </Alert.Description>
  </Alert.Root>
)
