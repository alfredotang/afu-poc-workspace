import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(localizedFormat)

const mapDayPickerDisplayValue = ({
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

export default mapDayPickerDisplayValue
