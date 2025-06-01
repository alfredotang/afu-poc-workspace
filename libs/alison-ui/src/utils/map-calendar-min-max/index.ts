import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)

export const getDisplayValue = ({
  value,
  placeholder = 'Select time',
  timeZone = dayjs.tz.guess(),
  formatter,
  enableTime = false,
  enableSeconds = false,
}: {
  value?: string
  placeholder?: string
  formatter?: (date: string) => string
  timeZone?: string
  enableTime?: boolean
  enableSeconds?: boolean
}) => {
  if (!value) return placeholder
  if (formatter) return formatter(value)
  const date = dayjs(value).tz(timeZone)
  if (!enableTime) return date.format('L')
  if (!enableSeconds) return date.format('L HH:mm')
  return date.format('L HH:mm:ss')
}

const mapCalendarMinMax = ({ min, max }: { min?: string; max?: string }) => {
  if (!min && !max) return undefined
  if (!min) return { after: dayjs(max).toDate() }
  if (!max) return { before: dayjs(min).toDate() }
  return {
    before: dayjs(min).toDate(),
    after: dayjs(max).toDate(),
  }
}

export default mapCalendarMinMax
