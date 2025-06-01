import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import type { TimeOption, TimeStep, TimeStruct } from './types'

dayjs.extend(timezone)
dayjs.extend(utc)

export function buildTime({
  value,
  time: { hour, minute, second },
}: {
  value?: string
  time: TimeStruct
  timeZone?: string
}) {
  return dayjs(value)
    .set('hour', hour)
    .set('minute', minute)
    .set('second', second)
    .set('millisecond', 0)
    .toISOString()
}

export function getHourTimeOptions({
  value,
  min,
  max,
  timeZone = dayjs.tz.guess(),
}: {
  value: string | undefined
  min: string | undefined
  max: string | undefined
  timeZone?: string
}): TimeOption[] {
  const baseDate = dayjs(value)

  return Array.from({ length: 24 }, (_, i) => {
    const hDate = baseDate
      .set('hour', i)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
    const hStart = hDate.startOf('hour')
    const hEnd = hDate.endOf('hour')

    const _min = min ? dayjs(min) : undefined
    const _max = max ? dayjs(max) : undefined

    let disabled = false
    if (_min && hEnd.isBefore(_min)) disabled = true
    if (_max && hStart.isAfter(_max)) disabled = true

    return {
      value: i,
      label: hDate.tz(timeZone).format('HH'),
      disabled,
    }
  }).sort((a, b) => Number(a.label) - Number(b.label))
}

export function getMinuteTimeOptions({
  value,
  hour,
  min,
  max,
  step = 1,
  timeZone = dayjs.tz.guess(),
}: {
  value: string | undefined
  hour: number
  min: string | undefined
  max: string | undefined
  step?: TimeStep
  timeZone?: string
}): TimeOption[] {
  const baseDate = dayjs(value)
    .set('hour', hour)
    .set('second', 0)
    .set('millisecond', 0)
  const _min = min ? dayjs(min) : undefined
  const _max = max ? dayjs(max) : undefined

  return Array.from({ length: Math.ceil(60 / step) }, (_, i) => {
    const minuteValue = i * step
    const mDate = baseDate.set('minute', minuteValue)
    const mStart = mDate.startOf('minute')
    const mEnd = mDate.endOf('minute')

    let disabled = false
    if (_min && mEnd.isBefore(_min)) disabled = true
    if (_max && mStart.isAfter(_max)) disabled = true

    return {
      value: minuteValue,
      label: mDate.tz(timeZone).format('mm'),
      disabled,
    }
  }).sort((a, b) => Number(a.label) - Number(b.label))
}

export function getSecondTimeOptions({
  value,
  hour,
  minute,
  min,
  max,
  timeZone = dayjs.tz.guess(),
}: {
  value: string | undefined
  hour: number
  minute: number
  min: string | undefined
  max: string | undefined
  timeZone?: string
}): TimeOption[] {
  const baseDate = dayjs(value)
    .set('hour', hour)
    .set('minute', minute)
    .set('millisecond', 0)
  const _min = min ? dayjs(min).set('millisecond', 0) : undefined
  const _max = max ? dayjs(max).set('millisecond', 0) : undefined

  return Array.from({ length: 60 }, (_, i) => {
    const sDate = baseDate.set('second', i)

    let disabled = false
    if (_min && sDate.isBefore(_min)) disabled = true
    if (_max && sDate.isAfter(_max)) disabled = true

    return {
      value: i,
      label: sDate.tz(timeZone).format('ss'),
      disabled,
    }
  }).sort((a, b) => Number(a.label) - Number(b.label))
}

export const getDisplayValue = ({
  value,
  enableSeconds = false,
  placeholder = 'Select time',
  timeZone = dayjs.tz.guess(),
}: {
  value?: string
  enableSeconds?: boolean
  placeholder?: string
  timeZone?: string
}) => {
  if (!value) return placeholder
  return dayjs(value)
    .tz(timeZone)
    .format(enableSeconds ? 'HH:mm:ss' : 'HH:mm')
}
