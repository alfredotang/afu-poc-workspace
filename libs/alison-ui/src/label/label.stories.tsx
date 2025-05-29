import type { Meta, StoryObj } from '@storybook/react'

import { Label } from '.'

export default {
  component: Label,
  title: 'forms/label',
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Label>

export const Default: StoryObj<typeof Label> = {
  args: {
    children: 'Label Text',
  },
}

export const Overview = () => (
  <div className="flex gap-4">
    <Label>Default Label</Label>
    <Label disabled>Disabled Label</Label>
    <Label invalid>Invalid Label</Label>
  </div>
)

export const Disabled = () => <Label disabled>Disabled Label</Label>

export const Invalid = () => <Label invalid>Invalid Label</Label>
