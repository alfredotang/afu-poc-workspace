import type { Meta, StoryObj } from '@storybook/react'

import { LockIcon } from 'lucide-react'

import { Input } from '.'

export default {
  component: Input,
  title: 'ui/input',
  argTypes: {
    leading: { control: 'text' },
    trailing: { control: 'text' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Input>

export const Default: StoryObj<typeof Input> = {
  args: {
    placeholder: 'Enter your text',
  },
}

export const Overview = () => (
  <div className="flex gap-4">
    <Input />
    <Input disabled />
    <Input invalid />
    <Input leading={<LockIcon />} />
    <Input trailing={<LockIcon />} />
    <Input leading={<LockIcon />} trailing={<LockIcon />} />
  </div>
)

export const IconLeading = () => <Input leading={<LockIcon />} />

export const IconTrailing = () => <Input trailing={<LockIcon />} />

export const IconLeadingAndTrailing = () => (
  <Input leading={<LockIcon />} trailing={<LockIcon />} />
)

export const Invalid = () => <Input invalid />

export const Disabled = () => <Input disabled />
