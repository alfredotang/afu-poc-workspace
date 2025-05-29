import type { Meta } from '@storybook/react'

import { RadioGroup, type RadioOptions } from './index'

export default {
  title: 'forms/radio-group',
  component: RadioGroup,
  argTypes: {
    options: {
      control: 'object',
      table: {
        type: {
          detail: `{
            label?: React.ReactNode
            value: string
          }[]`,
        },
      },
    },
    onChange: {
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    value: { control: 'text' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    itemClassName: { control: 'text' },
  },
} as Meta

const radioOptions: RadioOptions[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

export const Default = () => {
  return <RadioGroup options={radioOptions} value="option1" />
}

export const Overview = () => {
  return (
    <div className="space-y-6">
      <Default />
      <Disabled />
      <Invalid />
    </div>
  )
}

export const Disabled = () => {
  return <RadioGroup options={radioOptions} value="option1" disabled />
}

export const Invalid = () => {
  return <RadioGroup options={radioOptions} invalid />
}
