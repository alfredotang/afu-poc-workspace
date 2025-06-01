import { useState } from 'react'

import { Combobox } from '@alison-ui/combobox'

import type { Meta } from '@storybook/react'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { DayTimeRangePicker } from '.'

dayjs.extend(timezone)
dayjs.extend(utc)

export default {
  component: DayTimeRangePicker,
  title: 'forms/day-time-range-picker',
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
} satisfies Meta<typeof DayTimeRangePicker>

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
    {/* <WithSeconds />
    <MinMax />
    <MinMaxWithSeconds /> */}
  </div>
)

export const Default = () => {
  const [value, setValue] = useState<{ from?: string; to?: string }>({
    from: dayjs().toISOString(),
    to: dayjs().add(3, 'day').toISOString(),
  })
  return (
    <div className="flex items-center gap-4">
      <DayTimeRangePicker value={value} onChange={setValue} />
      <p className="text-sm">from: {value.from}</p>
      <p className="text-sm">to: {value.to}</p>
    </div>
  )
}
export const MinMax = () => {
  const [value, setValue] = useState<{ from?: string; to?: string }>({
    from: dayjs().toISOString(),
    to: dayjs().add(2, 'day').toISOString(),
  })
  return (
    <div className="flex items-center gap-4">
      <DayTimeRangePicker
        value={value}
        onChange={setValue}
        min={dayjs().subtract(4, 'day').toISOString()}
        max={dayjs().add(4, 'day').toISOString()}
      />
      <p className="text-sm">from: {value.from}</p>
      <p className="text-sm">to: {value.to}</p>
    </div>
  )
}

export const Disabled = () => <DayTimeRangePicker disabled />

export const WithPlaceholder = () => {
  const [value, setValue] = useState<{ from?: string; to?: string }>()
  return (
    <DayTimeRangePicker
      value={value}
      onChange={setValue}
      placeholder="Hello world"
    />
  )
}

export const Invalid = () => <DayTimeRangePicker invalid />

export const WithTimeZone = () => {
  const [value, setValue] = useState<{ from?: string; to?: string }>({
    from: dayjs().toISOString(),
    to: dayjs().add(1, 'day').toISOString(),
  })
  const [timeZone, setTimeZone] = useState(dayjs.tz.guess())
  return (
    <div className="flex flex-col gap-6">
      <TimeZoneCombobox value={timeZone} onChange={setTimeZone} />
      <div className="flex items-center gap-4">
        <DayTimeRangePicker
          value={value}
          onChange={setValue}
          timeZone={timeZone}
        />
      </div>
    </div>
  )
}

export const WithTime = () => {
  const [value, setValue] = useState<{ from?: string; to?: string }>({
    from: dayjs().toISOString(),
    to: dayjs().add(1, 'day').toISOString(),
  })
  return (
    <div className="flex items-center gap-4">
      <DayTimeRangePicker value={value} onChange={setValue} enableTime />
      <p className="text-sm">from: {value.from}</p>
      <p className="text-sm">to: {value.to}</p>
    </div>
  )
}

export const WithTimeAndTimeZone = () => {
  const [value, setValue] = useState<{ from?: string; to?: string }>({
    from: dayjs().toISOString(),
    to: dayjs().add(1, 'day').toISOString(),
  })
  const [timeZone, setTimeZone] = useState(dayjs.tz.guess())
  return (
    <div className="flex flex-col gap-6">
      <TimeZoneCombobox value={timeZone} onChange={setTimeZone} />
      <div className="flex items-center gap-4">
        <DayTimeRangePicker
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
  const [value, setValue] = useState<{ from?: string; to?: string }>({
    from: dayjs().toISOString(),
    to: dayjs().add(1, 'day').toISOString(),
  })
  return (
    <div className="flex items-center gap-4">
      <DayTimeRangePicker
        value={value}
        onChange={setValue}
        enableTime
        min={dayjs().subtract(4, 'day').toISOString()}
        max={dayjs().add(4, 'day').toISOString()}
      />
    </div>
  )
}

export const WithTimeAndMinMaxAndStep = () => {
  const [value, setValue] = useState<{ from?: string; to?: string }>({
    from: dayjs().set('minute', 15).set('second', 0).toISOString(),
    to: dayjs().add(1, 'day').set('minute', 15).set('second', 0).toISOString(),
  })
  return (
    <div className="flex items-center gap-4">
      <DayTimeRangePicker
        value={value}
        onChange={setValue}
        enableTime
        minuteStep={15}
        min={dayjs().subtract(4, 'day').toISOString()}
        max={dayjs().add(4, 'day').toISOString()}
      />
    </div>
  )
}

export const WithTimeAndSeconds = () => {
  const [value, setValue] = useState<{ from?: string; to?: string }>({
    from: dayjs().toISOString(),
    to: dayjs().add(1, 'day').toISOString(),
  })
  return (
    <div className="flex items-center gap-4">
      <DayTimeRangePicker
        value={value}
        onChange={setValue}
        enableTime
        enableSeconds
      />
    </div>
  )
}
