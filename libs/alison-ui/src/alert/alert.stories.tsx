import type { Meta, StoryObj } from '@storybook/react'

import { Alert } from '.'

export default {
  component: Alert,
  title: 'ui/alert',
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    variant: {
      control: 'inline-radio',
      options: ['default', 'destructive'],
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | destructive' },
      },
    },
  },
} satisfies Meta<typeof Alert>

export const Default: StoryObj<typeof Alert> = {
  args: {
    title: 'Default Alert',
    description: 'This is a default alert.',
    variant: 'default',
  },
}

export const Overview = () => (
  <div className="flex flex-col gap-4">
    <Alert title="Default Alert" description="This is a default alert." />
    <Alert
      title="Destructive Alert"
      description="This is a destructive alert."
      variant="destructive"
    />
  </div>
)

export const WithTitle = () => <Alert title="Alert with Title" />

export const WithDescription = () => (
  <Alert description="Alert with only a description." />
)

export const Destructive = () => (
  <Alert
    title="Destructive Alert"
    description="This alert indicates a destructive action."
    variant="destructive"
  />
)
