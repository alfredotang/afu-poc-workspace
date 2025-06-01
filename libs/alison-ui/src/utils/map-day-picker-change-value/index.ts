import { TimeStep } from '@alison-ui/time-picker/types'
import mapMaxTime from '@alison-ui/utils/map-max-time'
import mapMinTime from '@alison-ui/utils/map-min-time'

import dayjs from 'dayjs'

const mapDayPickerChangeValue = ({
  value,
  newValue,
  enableTime,
  min,
  max,
  minuteStep,
}: {
  value?: string
  newValue: string
  enableTime?: boolean
  min?: string
  max?: string
  minuteStep?: TimeStep
}) => {
  if (!enableTime || !value) return dayjs(newValue).toISOString()
  const hour = dayjs(value).hour()
  const minute = dayjs(value).minute()
  const second = dayjs(value).second()
  const newDate = dayjs(newValue)
    .set('hour', hour)
    .set('minute', minute)
    .set('second', second)
    .set('millisecond', 0)

  if (min && newDate.isBefore(dayjs(min))) {
    return mapMinTime({ min, minuteStep })
  }
  if (max && newDate.isAfter(dayjs(max))) {
    return mapMaxTime({ max, minuteStep })
  }
  return newDate.toISOString()
}

export default mapDayPickerChangeValue
