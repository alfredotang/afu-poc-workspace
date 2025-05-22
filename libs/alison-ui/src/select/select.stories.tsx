import type { Meta, StoryObj } from '@storybook/react'

import { Select, type SelectGroupOption } from './index'

export default {
  title: 'ui/select',
  component: Select,
  argTypes: {
    options: {
      control: 'object',
      table: {
        type: {
          detail: `{
        groupLabel?: React.ReactNode
        options: {
          label: React.ReactNode
          value: React.ReactNode
        }[]
      }`,
        },
      },
    },
    onChange: { action: 'changed' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    size: {
      control: { type: 'inline-radio' },
      options: ['default', 'sm'],
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'default | sm' },
      },
    },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    className: { control: 'text' },
  },
} as Meta

const singleGroupOptions: SelectGroupOption[] = [
  {
    groupLabel: '',
    options: Array.from({ length: 100 }).map((_, index) => ({
      label: `${index}`,
      value: `${index}`,
    })),
  },
]

const groupOptions: SelectGroupOption[] = [
  {
    groupLabel: 'Group 1',
    options: [
      { label: 'Group Option 1', value: 'groupOption1' },
      { label: 'Group Option 2', value: 'groupOption2' },
    ],
  },
  {
    groupLabel: 'Group 2',
    options: [{ label: 'Group Option 3', value: 'groupOption3' }],
  },
  {
    groupLabel: '',
    options: [{ label: 'Group Option 4', value: 'groupOption4' }],
  },
]

export const Default: StoryObj<typeof Select> = {
  args: {
    options: singleGroupOptions,
    placeholder: 'Select an option',
    disabled: false,
    className: '',
    size: 'default',
    invalid: false,
  },
}

export const Overview = () => {
  return (
    <div className="flex flex-col gap-4">
      <Select options={singleGroupOptions} placeholder="Select an option" />
      <Select options={groupOptions} placeholder="Select an option" />
      <Select
        options={singleGroupOptions}
        placeholder="Select an option"
        size="sm"
      />
      <Select options={groupOptions} placeholder="Select an option" size="sm" />
    </div>
  )
}

export const Group = () => {
  return <Select options={groupOptions} placeholder="Select an option" />
}

export const Sizes = () => {
  return (
    <div className="flex flex-col gap-4">
      <Select options={singleGroupOptions} placeholder="Select an option" />
      <Select
        options={singleGroupOptions}
        placeholder="Select an option"
        size="sm"
      />
    </div>
  )
}
