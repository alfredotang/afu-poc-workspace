import { useId, useState } from 'react'

import { Label } from '@alison-ui/label'

import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '.'

export default {
  component: Checkbox,
  title: 'forms/checkbox',
  argTypes: {
    checked: {
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
    checked: false,
    disabled: false,
    invalid: false,
  },
}

export const Overview = () => (
  <div className="flex gap-4">
    <Checkbox />
    <Checkbox checked />
    <Checkbox disabled />
    <Checkbox checked disabled />
    <Checkbox checked="indeterminate" />
    <Checkbox checked="indeterminate" disabled />
    <Checkbox invalid />
    <Checkbox invalid disabled />
  </div>
)

export const Checked = () => {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)

  return (
    <div className="flex flex-col gap-2">
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <Checkbox checked={checked} onCheckedChange={setChecked} disabled />
    </div>
  )
}

export const Indeterminate = () => (
  <div className="flex flex-col gap-2">
    <Checkbox checked="indeterminate" />
    <Checkbox checked="indeterminate" disabled />
  </div>
)

export const Invalid = () => (
  <div className="flex flex-col gap-2">
    <Checkbox invalid />
    <Checkbox invalid disabled />
  </div>
)

export const WithLabel = () => {
  const id = useId()

  return (
    <div className="flex gap-2">
      <Checkbox id={id} />
      <Label htmlFor={id}>Checkbox</Label>
    </div>
  )
}
