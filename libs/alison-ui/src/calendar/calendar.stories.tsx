import { useState } from 'react'

import { Combobox } from '@alison-ui/combobox'

import type { Meta } from '@storybook/react'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)

import { Calendar, type DateRange } from '.'

export default {
  title: 'forms/calendar',
  component: Calendar,
  argTypes: {
    mode: {
      table: { type: { summary: 'single | range' } },
    },
    selected: {
      control: 'date',
      defaultValue: new Date(),
      table: { type: { summary: 'Date' } },
    },
  },
} satisfies Meta<typeof Calendar>

export const Overview = () => (
  <div className="flex flex-col gap-6">
    <Single />
    <Range />
  </div>
)

export const Single = () => <Calendar mode="single" selected={new Date()} />

export const Range = () => {
  const [selected, setSelected] = useState<DateRange>({
    from: dayjs().subtract(7, 'day').toDate(),
    to: dayjs().toDate(),
  })
  return (
    <Calendar
      mode="range"
      selected={selected}
      onSelect={value => setSelected(value)}
    />
  )
}

export const TimeZone = () => {
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
            label: name,
            value: name,
          }))
        }
      />
      <div>
        <Calendar mode="single" selected={new Date()} timeZone={timeZone} />
      </div>
    </div>
  )
}
