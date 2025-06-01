import { useState } from 'react'

import { Combobox } from '@alison-ui/combobox'

import type { Meta } from '@storybook/react'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)

import { TimePicker } from '.'

export default {
  component: TimePicker,
  title: 'forms/time-picker',
  argTypes: {
    step: {
      control: {
        type: 'select',
        options: [1, 5, 10, 15, 30],
      },
      table: {
        type: { summary: '1 | 5 | 10 | 15 | 30' },
      },
    },
  },
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
  const [value, setValue] = useState(dayjs().toISOString())
  return (
    <div className="flex items-center gap-4">
      <TimePicker
        value={value}
        onChange={setValue}
        min={dayjs().subtract(1, 'hour').set('second', 15).toISOString()}
        max={dayjs().add(1, 'hour').set('second', 15).toISOString()}
        enableSeconds
      />
      <p className="text-sm">Value: {value}</p>
    </div>
  )
}

export const WithStep = () => {
  const [value, setValue] = useState<string>()
  return (
    <div className="flex items-center gap-4">
      <TimePicker value={value} onChange={setValue} step={15} />
      <p className="text-sm">Value: {value}</p>
    </div>
  )
}

export const TimeZone = () => {
  const [value, setValue] = useState<string>(
    dayjs().set('minute', 30).set('second', 0).toISOString()
  )
  const [timeZone, setTimeZone] = useState(dayjs.tz.guess())
  return (
    <div className="flex flex-col gap-6">
      <Combobox
        className="w-[200px]"
        value={timeZone}
        onChange={setTimeZone}
        options={
          // @ts-expect-error - Intl.supportedValuesOf is not a function
          Intl.supportedValuesOf('timeZone').map(name => ({
            label: `${name} (${dayjs().tz(name).format('Z')})`,
            value: name,
          }))
        }
      />
      <div className="flex items-center gap-4">
        <TimePicker
          value={value}
          timeZone={timeZone}
          enableSeconds
          onChange={setValue}
          min={dayjs().subtract(1, 'hour').toISOString()}
          max={dayjs().add(1, 'hour').toISOString()}
        />
        <p className="text-sm">Value: {value}</p>
      </div>
    </div>
  )
}
