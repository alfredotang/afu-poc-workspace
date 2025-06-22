import type { Meta, StoryObj } from '@storybook/react'

import { Textarea } from '.'

export default {
  component: Textarea,
  title: 'forms/textarea',
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    maxRows: { control: 'number' },
    minRows: { control: 'number' },
  },
} satisfies Meta<typeof Textarea>

export const Default: StoryObj<typeof Textarea> = {
  args: {
    placeholder: 'Enter your text',
  },
}

export const Overview = () => (
  <div className="flex gap-4">
    <Textarea />
    <Invalid />
    <Disabled />
  </div>
)

export const Invalid = () => <Textarea invalid />

export const Disabled = () => <Textarea disabled />
