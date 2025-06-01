import type { DateRange } from '@alison-ui/calendar'
import { TimeStep } from '@alison-ui/time-picker/types'
import {
  mapDayPickerChangeValue,
  mapDayPickerDisplayValue,
} from '@alison-ui/utils'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(localizedFormat)

export const getDisplayValue = ({
  value,
  placeholder = 'Select time',
  timeZone = dayjs.tz.guess(),
  formatter,
  enableTime = false,
  enableSeconds = false,
}: {
  value?: {
    from?: string
    to?: string
  }
  placeholder?: string
  formatter?: (date: string) => string
  timeZone?: string
  enableTime?: boolean
  enableSeconds?: boolean
}) => {
  if (!value) return placeholder
  const form = mapDayPickerDisplayValue({
    value: value.from,
    enableTime,
    enableSeconds,
    timeZone,
    formatter,
    placeholder: '',
  })
  const to = mapDayPickerDisplayValue({
    value: value.to,
    enableTime,
    enableSeconds,
    timeZone,
    formatter,
    placeholder: '',
  })

  return `${form} - ${to}`
}

export const mapChangeValue = ({
  value,
  newValue,
  enableTime,
  min,
  max,
  minuteStep,
}: {
  value?: {
    from?: string
    to?: string
  }
  newValue?: DateRange
  enableTime?: boolean
  min?: string
  max?: string
  minuteStep?: TimeStep
}) => {
  const from = newValue?.from
    ? mapDayPickerChangeValue({
        value: value?.from,
        newValue: dayjs(newValue.from).toISOString(),
        enableTime,
        min,
        max,
        minuteStep,
      })
    : undefined

  const to = newValue?.to
    ? mapDayPickerChangeValue({
        value: value?.to,
        newValue: dayjs(newValue.to).toISOString(),
        enableTime,
        min,
        max,
        minuteStep,
      })
    : undefined

  return { from, to }
}
