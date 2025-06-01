import { useState } from 'react'

import { Combobox } from '@alison-ui/combobox'

import type { Meta } from '@storybook/react'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { DayTimePicker } from '.'

dayjs.extend(timezone)
dayjs.extend(utc)

export default {
  component: DayTimePicker,
  title: 'forms/day-time-picker',
  argTypes: {
    minuteStep: {
      control: {
        type: 'select',
        options: [1, 5, 10, 15, 30],
      },
      table: {
        type: { summary: '1 | 5 | 10 | 15 | 30' },
      },
    },
  },
} satisfies Meta<typeof DayTimePicker>

const TimeZoneCombobox = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <Combobox
      className="w-[200px]"
      value={value}
      onChange={onChange}
      options={
        // @ts-expect-error - Intl.supportedValuesOf is not a function
        Intl.supportedValuesOf('timeZone').map(name => ({
          label: `${name} (${dayjs().tz(name).format('Z')})`,
          value: name,
        }))
      }
    />
  )
}

export const Overview = () => (
  <div className="flex w-fit flex-col gap-6">
    <Default />
    <Disabled />
    <WithPlaceholder />
    <Invalid />
    <WithTime />
    <WithTimeAndSeconds />
  </div>
)

export const Default = () => {
  const [value, setValue] = useState(new Date().toISOString())
  return (
    <div className="flex items-center gap-4">
      <DayTimePicker value={value} onChange={setValue} />
      <p className="text-sm">Value: {value}</p>
    </div>
  )
}
export const MinMax = () => {
  const [value, setValue] = useState(new Date().toISOString())
  return (
    <div className="flex items-center gap-4">
      <DayTimePicker
        value={value}
        onChange={setValue}
        min={dayjs().subtract(1, 'day').toISOString()}
        max={dayjs().add(1, 'day').toISOString()}
      />
      <p className="text-sm">Value: {value}</p>
    </div>
  )
}

export const Disabled = () => <DayTimePicker disabled />

export const WithPlaceholder = () => (
  <DayTimePicker placeholder="Enter date and time" />
)

export const Invalid = () => <DayTimePicker invalid />

export const WithTimeZone = () => {
  const [value, setValue] = useState(new Date().toISOString())
  const [timeZone, setTimeZone] = useState(dayjs.tz.guess())
  return (
    <div className="flex flex-col gap-6">
      <TimeZoneCombobox value={timeZone} onChange={setTimeZone} />
      <div className="flex items-center gap-4">
        <DayTimePicker value={value} onChange={setValue} timeZone={timeZone} />
      </div>
    </div>
  )
}

export const WithTime = () => {
  const [value, setValue] = useState(new Date().toISOString())
  return (
    <div className="flex items-center gap-4">
      <DayTimePicker value={value} onChange={setValue} enableTime />
      <p className="text-sm">Value: {value}</p>
    </div>
  )
}

export const WithTimeAndTimeZone = () => {
  const [value, setValue] = useState(new Date().toISOString())
  const [timeZone, setTimeZone] = useState(dayjs.tz.guess())
  return (
    <div className="flex flex-col gap-6">
      <TimeZoneCombobox value={timeZone} onChange={setTimeZone} />
      <div className="flex items-center gap-4">
        <DayTimePicker
          value={value}
          onChange={setValue}
          timeZone={timeZone}
          enableTime
        />
      </div>
    </div>
  )
}

export const WithTimeAndMinMax = () => {
  const [value, setValue] = useState(new Date().toISOString())
  return (
    <div className="flex items-center gap-4">
      <DayTimePicker
        value={value}
        onChange={setValue}
        enableTime
        min={dayjs().subtract(1, 'day').toISOString()}
        max={dayjs().add(1, 'day').toISOString()}
      />
    </div>
  )
}

export const WithTimeAndMinMaxAndStep = () => {
  const [value, setValue] = useState(
    dayjs().set('minute', 15).set('second', 0).toISOString()
  )
  return (
    <div className="flex items-center gap-4">
      <DayTimePicker
        value={value}
        onChange={setValue}
        enableTime
        minuteStep={15}
        min={dayjs().subtract(1, 'day').toISOString()}
        max={dayjs().add(1, 'day').toISOString()}
      />
    </div>
  )
}

export const WithTimeAndSeconds = () => {
  const [value, setValue] = useState(new Date().toISOString())
  return (
    <div className="flex items-center gap-4">
      <DayTimePicker
        value={value}
        onChange={setValue}
        enableTime
        enableSeconds
      />
    </div>
  )
}
