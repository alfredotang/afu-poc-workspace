import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import dayjs from 'dayjs'

import type { TimeOption } from './types'

import {
  buildTime,
  getHourTimeOptions,
  getMinuteTimeOptions,
  getSecondTimeOptions,
} from './utils'

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

export function useTimePickerState({
  value,
  min,
  max,
  enableSeconds,
}: {
  value?: string
  min?: string
  max?: string
  enableSeconds?: boolean
}) {
  const [hour, setHour] = useState(dayjs(value).get('hour'))
  const [minute, setMinute] = useState(dayjs(value).get('minute'))
  const [second, setSecond] = useState(dayjs(value).get('second'))
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  const hourRef = useRef<HTMLDivElement>(null)
  const minuteRef = useRef<HTMLDivElement>(null)
  const secondRef = useRef<HTMLDivElement>(null)

  const onHourChange = useCallback(
    (v: TimeOption) => {
      if (min) {
        const newTime = buildTime({
          value,
          hour: v.value,
          minute,
          second,
        })
        if (dayjs(newTime).isBefore(min)) {
          setMinute(dayjs(min).get('minute'))
          setSecond(dayjs(min).get('second'))
        }
      }
      if (max) {
        const newTime = buildTime({
          value,
          hour: v.value,
          minute,
          second,
        })
        if (dayjs(newTime).isAfter(max)) {
          setMinute(dayjs(max).get('minute'))
          setSecond(dayjs(max).get('second'))
        }
      }
      setHour(v.value)
    },
    [min, max, value, minute, second]
  )

  const onMinuteChange = useCallback(
    (v: TimeOption) => {
      if (min) {
        const newTime = buildTime({
          value,
          hour: v.value,
          minute,
          second,
        })
        if (newTime < min) {
          setSecond(dayjs(min).get('second'))
        }
      }
      if (max) {
        const newTime = buildTime({
          value,
          hour: v.value,
          minute,
          second,
        })
        if (dayjs(newTime).isAfter(max)) {
          setSecond(dayjs(max).get('second'))
        }
      }
      setMinute(v.value)
    },
    [min, max, value, minute, second]
  )

  const timeItems = useMemo(() => {
    return [
      {
        key: 'hours',
        currentValue: hour,
        options: getHourTimeOptions({ value, min, max }),
        ref: hourRef,
        onSelect: onHourChange,
        enabled: true,
      },
      {
        key: 'minutes',
        currentValue: minute,
        options: getMinuteTimeOptions({ value, hour, min, max }),
        ref: minuteRef,
        onSelect: onMinuteChange,
        enabled: true,
      },
      {
        key: 'seconds',
        currentValue: second,
        options: getSecondTimeOptions({ value, hour, minute, min, max }),
        ref: secondRef,
        onSelect: (v: TimeOption) => setSecond(v.value),
        enabled: enableSeconds,
      },
    ].filter(item => item.enabled)
  }, [
    enableSeconds,
    hour,
    minute,
    onHourChange,
    onMinuteChange,
    second,
    value,
    min,
    max,
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
    hour,
    minute,
    second,
    onChangePopoverVisible,
  }
}
