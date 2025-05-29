import dayjs from 'dayjs'

import type { TimeOption } from './types'

export function buildTime({
  value,
  hour,
  minute,
  second,
}: {
  value?: string
  hour: number
  minute: number
  second: number
}) {
  return dayjs(value)
    .set('hour', hour)
    .set('minute', minute)
    .set('second', second)
    .toISOString()
}

export function getHourTimeOptions({
  value,
  min,
  max,
}: {
  value: string | undefined
  min: string | undefined
  max: string | undefined
}): TimeOption[] {
  return Array.from({ length: 24 }, (_, i) => {
    let disabled = false
    const hourValue = i
    const hDate = dayjs(value).set('hour', hourValue).toDate()
    const hStart = dayjs(hDate).startOf('hour').toDate()
    const hEnd = dayjs(hDate).endOf('hour').toDate()
    if (min && dayjs(hEnd).isBefore(min)) disabled = true
    if (max && dayjs(hStart).isAfter(max)) disabled = true
    return {
      value: hourValue,
      label: hourValue.toString().padStart(2, '0'),
      disabled,
    }
  })
}

export function getMinuteTimeOptions({
  value,
  hour,
  min,
  max,
}: {
  value: string | undefined
  hour: number
  min: string | undefined
  max: string | undefined
}): TimeOption[] {
  const anchorDate = dayjs(value).set('hour', hour).toDate()
  return Array.from({ length: 60 }, (_, i) => {
    let disabled = false
    const mDate = dayjs(anchorDate).set('minute', i).toDate()
    const mStart = dayjs(mDate).startOf('minute').toDate()
    const mEnd = dayjs(mDate).endOf('minute').toDate()
    if (min && dayjs(mEnd).isBefore(min)) disabled = true
    if (max && dayjs(mStart).isAfter(max)) disabled = true
    return {
      value: i,
      label: i.toString().padStart(2, '0'),
      disabled,
    }
  })
}

export function getSecondTimeOptions({
  value,
  hour,
  minute,
  min,
  max,
}: {
  value: string | undefined
  hour: number
  minute: number
  min: string | undefined
  max: string | undefined
}): TimeOption[] {
  const anchorDate = dayjs(value)
    .set('hour', hour)
    .set('minute', minute)
    .toDate()
  const _min = min ? dayjs(min).set('millisecond', 0).toDate() : undefined
  const _max = max ? dayjs(max).set('millisecond', 0).toDate() : undefined
  return Array.from({ length: 60 }, (_, i) => {
    let disabled = false
    const sDate = dayjs(anchorDate).set('second', i).toDate()
    if (_min && sDate < _min) disabled = true
    if (_max && sDate > _max) disabled = true
    return {
      value: i,
      label: i.toString().padStart(2, '0'),
      disabled,
    }
  })
}
