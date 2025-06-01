import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '.'

export default {
  component: Checkbox,
  title: 'forms/checkbox',
  argTypes: {
    value: {
      control: 'select',
      options: [true, false, 'indeterminate'],
      table: {
        type: {
          summary: 'boolean | "indeterminate"',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
    invalid: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export const Default: StoryObj<typeof Checkbox> = {
  args: {
    value: false,
    disabled: false,
    invalid: false,
  },
}

export const Overview = () => (
  <div className="flex gap-4">
    <Checkbox />
    <Checkbox value={true} />
    <Checkbox disabled />
    <Checkbox value disabled />
    <Checkbox value="indeterminate" />
    <Checkbox value="indeterminate" disabled />
    <Checkbox invalid />
    <Checkbox invalid disabled />
  </div>
)

export const Checked = () => {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)

  return (
    <div className="flex flex-col gap-2">
      <Checkbox value={checked} onChange={setChecked} />
      <Checkbox value={checked} onChange={setChecked} disabled />
    </div>
  )
}

export const Indeterminate = () => (
  <div className="flex flex-col gap-2">
    <Checkbox value="indeterminate" />
    <Checkbox value="indeterminate" disabled />
  </div>
)

export const Invalid = () => (
  <div className="flex flex-col gap-2">
    <Checkbox invalid />
    <Checkbox invalid disabled />
  </div>
)

export const WithLabel = () => {
  return <Checkbox label="Checkbox" />
}
