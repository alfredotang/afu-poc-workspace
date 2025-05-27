import type { Meta, StoryObj } from '@storybook/react'

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
  },
} satisfies Meta<typeof Slider>

export const Default: StoryObj<typeof Slider> = {
  args: {
    defaultValue: [20, 80],
  },
}

export const Overview = () => {
  return (
    <div className="flex flex-col gap-4">
      <Slider defaultValue={[20, 80]} />
      <Slider defaultValue={[30, 70]} min={0} max={100} />
      <Slider defaultValue={[10, 90]} min={0} max={100} />
    </div>
  )
}

export const CustomRange = () => {
  return (
    <div className="flex flex-col gap-4">
      <Slider defaultValue={[10, 40]} min={0} max={50} />
      <Slider defaultValue={[15, 35]} min={10} max={40} />
    </div>
  )
}
