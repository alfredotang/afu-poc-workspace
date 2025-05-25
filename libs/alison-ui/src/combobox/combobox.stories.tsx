import { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Combobox, type ComboboxOption } from './index'

export default {
  title: 'forms/combobox',
  component: Combobox,
  argTypes: {
    options: {
      control: 'object',
      table: {
        type: {
          detail: `{
            value: string;
            label: string;
          }[]`,
        },
      },
    },
    onChange: { action: 'changed' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    searchPlaceholder: { control: 'text' },
    emptyMessage: { control: 'text' },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
} as Meta<typeof Combobox>

const options: ComboboxOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

export const Default: StoryObj<typeof Combobox> = {
  args: {
    options,
    placeholder: 'Select an option',
    searchPlaceholder: 'Search...',
    emptyMessage: 'No options available',
    className: 'w-[200px]',
    disabled: false,
    invalid: false,
    value: options[0].value,
  },
  render: function Render({ value: initialValue, ...args }) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return <Combobox {...args} value={value} onChange={setValue} />
  },
}

export const Overview = () => {
  const [value, setValue] = useState('')
  return (
    <div className="flex flex-col gap-4">
      <Combobox
        className="w-[200px]"
        options={options}
        value={value}
        onChange={setValue}
      />
      <Combobox
        className="w-[200px]"
        options={options}
        value={value}
        onChange={setValue}
        disabled
      />
      <Combobox
        className="w-[200px]"
        options={options}
        value={value}
        onChange={setValue}
        invalid
      />
    </div>
  )
}
