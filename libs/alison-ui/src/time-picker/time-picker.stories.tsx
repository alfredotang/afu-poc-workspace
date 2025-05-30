import { useState } from 'react'

import type { Meta } from '@storybook/react'

import dayjs from 'dayjs'

import { TimePicker } from '.'

export default {
  component: TimePicker,
  title: 'forms/time-picker',
} satisfies Meta<typeof TimePicker>

export const Overview = () => (
  <div className="space-y-6">
    <Default />
    <Disabled />
    <WithPlaceholder />
    <Invalid />
    <WithSeconds />
    <MinMax />
    <MinMaxWithSeconds />
  </div>
)

export const Default = () => {
  const [value, setValue] = useState(new Date().toISOString())
  return (
    <div className="flex items-center gap-4">
      <TimePicker value={value} onChange={setValue} />
      <p className="text-sm">Value: {value}</p>
    </div>
  )
}

export const Disabled = () => <TimePicker disabled />

export const WithPlaceholder = () => <TimePicker placeholder="Enter time" />

export const Invalid = () => <TimePicker invalid />

export const WithSeconds = () => {
  const [value, setValue] = useState(new Date().toISOString())
  return (
    <div className="flex items-center gap-4">
      <TimePicker value={value} onChange={setValue} enableSeconds />
      <p className="text-sm">Value: {value}</p>
    </div>
  )
}

export const MinMax = () => {
  const [value, setValue] = useState(new Date().toISOString())
  return (
    <div className="flex items-center gap-4">
      <TimePicker
        value={value}
        onChange={setValue}
        min={dayjs().subtract(1, 'hour').toISOString()}
        max={dayjs().add(1, 'hour').toISOString()}
      />
      <p className="text-sm">Value: {value}</p>
    </div>
  )
}

export const MinMaxWithSeconds = () => {
  const [value, setValue] = useState(new Date().toISOString())
  return (
    <div className="flex items-center gap-4">
      <TimePicker
        value={value}
        onChange={setValue}
        min={dayjs().subtract(1, 'hour').toISOString()}
        max={dayjs().add(1, 'hour').toISOString()}
        enableSeconds
      />
      <p className="text-sm">Value: {value}</p>
    </div>
  )
}

export const WithStep = () => {
  const [value, setValue] = useState(new Date().toISOString())
  return (
    <div className="flex items-center gap-4">
      <TimePicker value={value} onChange={setValue} step={15} />
    </div>
  )
}
