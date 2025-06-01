import { useState } from 'react'

import type { Meta } from '@storybook/react'

import { Slider } from '.'

export default {
  component: Slider,
  title: 'ui/slider',
  argTypes: {
    defaultValue: {
      control: 'object',
      table: {
        defaultValue: { summary: '[0, 100]' },
        type: { summary: 'number[]' },
      },
    },
    value: {
      control: 'object',
      table: {
        type: { summary: 'number[]' },
      },
    },
    min: {
      control: 'number',
      table: {
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    max: {
      control: 'number',
      table: {
        defaultValue: { summary: '100' },
        type: { summary: 'number' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean' },
      },
    },
    invalid: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean' },
      },
    },
  },
} satisfies Meta<typeof Slider>

export const Default = () => {
  return <Slider />
}

export const Overview = () => {
  return (
    <div className="flex flex-col gap-6">
      <Default />
      <Range />
    </div>
  )
}

export const Range = () => {
  return (
    <div className="flex flex-col gap-4">
      <Slider defaultValue={[10, 40]} min={0} max={50} />
    </div>
  )
}

export const Controlled = () => {
  const [value, setValue] = useState([40])
  return (
    <div className="flex flex-col gap-4">
      <Slider value={value} onChange={setValue} />
      <p className="text-sm">{value?.[0]}</p>
    </div>
  )
}

export const ControlledRange = () => {
  const [value, setValue] = useState([40, 60])
  return (
    <div className="flex flex-col gap-4">
      <Slider value={value} onChange={setValue} />
      <p className="text-sm">{value.join(', ')}</p>
    </div>
  )
}
