import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { mapMaxTime, mapMinTime } from '@alison-ui/utils'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import type { TimeOption, TimeStep, TimeStruct } from './types'

import {
  buildTime,
  getHourTimeOptions,
  getMinuteTimeOptions,
  getSecondTimeOptions,
} from './utils'

type TimeItem = {
  key: 'hours' | 'minutes' | 'seconds'
  currentValue: number | undefined
  options: TimeOption[]
  ref: React.RefObject<HTMLDivElement | null>
  onSelect: (v: TimeOption) => void
  disabled?: boolean
}

export type TimePickerProps = {
  /**
   * ISO 8601 time string
   */
  value?: string
  /**
   * ISO 8601 time string
   */
  min?: string
  /**
   * ISO 8601 time string
   */
  max?: string
  disabled?: boolean
  invalid?: boolean
  enableSeconds?: boolean
  placeholder?: string
  className?: string
  onChange?: (date: string) => void
}

dayjs.extend(timezone)
dayjs.extend(utc)

export function useTimePickerState({
  value,
  min,
  max,
  enableSeconds,
  step = 1,
  timeZone = dayjs.tz.guess(),
  onChange,
}: {
  value?: string
  min?: string
  max?: string
  enableSeconds?: boolean
  step?: TimeStep
  timeZone?: string
  onChange?: (date: string) => void
}) {
  const [time, setTime] = useState<TimeStruct>(() => {
    const current = dayjs(value)
    return {
      hour: current.get('hour'),
      minute: current.get('minute'),
      second: current.get('second'),
    }
  })
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)

  const onChangeTime = useCallback(
    (time: TimeStruct) => {
      setTime(time)
      const newValue = buildTime({
        value,
        time,
      })
      onChange?.(newValue)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  )

  useEffect(() => {
    if (!value) return
    const current = dayjs(value)
    setTime({
      hour: current.get('hour'),
      minute: current.get('minute'),
      second: current.get('second'),
    })
  }, [value])

  const onHourChange = useCallback(
    (v: TimeOption) => {
      const { minute, second } = time
      const newTime = dayjs(
        buildTime({
          value,
          time: {
            hour: v.value,
            minute,
            second,
          },
        })
      )

      const isBeforeMin = min && dayjs(newTime).isBefore(min)
      const isAfterMax = max && dayjs(newTime).isAfter(max)

      if (isBeforeMin) {
        const minTime = dayjs(mapMinTime({ min, minuteStep: step }))
        onChangeTime({
          hour: v.value,
          minute: minTime.get('minute'),
          second: minTime.get('second'),
        })
        return
      }

      if (isAfterMax) {
        const maxTime = dayjs(mapMaxTime({ max, minuteStep: step }))
        onChangeTime({
          hour: v.value,
          minute: maxTime.get('minute'),
          second: maxTime.get('second'),
        })
        return
      }

      onChangeTime({
        hour: v.value,
        minute: newTime.get('minute'),
        second: newTime.get('second'),
      })
    },
    [time, min, max, value, step, onChangeTime]
  )

  const onMinuteChange = useCallback(
    (v: TimeOption) => {
      const { hour, second } = time
      const newTime = dayjs(
        buildTime({
          value,
          time: {
            hour,
            minute: v.value,
            second,
          },
        })
      )

      const isBeforeMin = min && dayjs(newTime).isBefore(min)
      const isAfterMax = max && dayjs(newTime).isAfter(max)

      if (isBeforeMin) {
        onChangeTime({
          hour,
          minute: v.value,
          second: dayjs(min).get('second'),
        })
        return
      }
      if (isAfterMax) {
        onChangeTime({
          hour,
          minute: v.value,
          second: dayjs(max).get('second'),
        })
        return
      }
      onChangeTime({
        ...time,
        minute: v.value,
      })
    },
    [time, value, min, max, onChangeTime]
  )

  const onSecondChange = useCallback(
    (v: TimeOption) => {
      onChangeTime({
        ...time,
        second: v.value,
      })
    },
    [onChangeTime, time]
  )

  const timeItems = useMemo(() => {
    const { hour, minute, second } = time
    return (
      [
        {
          key: 'hours',
          currentValue: value ? hour : undefined,
          options: getHourTimeOptions({ value, min, max, timeZone }),
          ref: hourRef,
          onSelect: onHourChange,
        },
        {
          key: 'minutes',
          currentValue: value ? minute : undefined,
          options: getMinuteTimeOptions({
            value,
            hour,
            min,
            max,
            step,
            timeZone,
          }),
          ref: minuteRef,
          onSelect: onMinuteChange,
        },
        {
          key: 'seconds',
          currentValue: value ? second : undefined,
          options: getSecondTimeOptions({
            value,
            hour,
            minute,
            min,
            max,
            timeZone,
          }),
          ref: secondRef,
          onSelect: onSecondChange,
          disabled: !enableSeconds,
        },
      ] satisfies TimeItem[]
    ).filter(item => !item.disabled)
  }, [
    time,
    value,
    min,
    max,
    timeZone,
    onHourChange,
    step,
    onMinuteChange,
    onSecondChange,
    enableSeconds,
  ])

  const onChangePopoverVisible = useCallback((v: boolean) => {
    setIsPopoverVisible(v)
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isPopoverVisible) {
        hourRef.current?.scrollIntoView({ behavior: 'auto' })
        minuteRef.current?.scrollIntoView({ behavior: 'auto' })
        secondRef.current?.scrollIntoView({ behavior: 'auto' })
      }
    }, 1)
    return () => clearTimeout(timeoutId)
  }, [isPopoverVisible])

  return {
    isPopoverVisible,
    timeItems,
    onChangePopoverVisible,
  }
}
