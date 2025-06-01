import { TimeStep } from '@alison-ui/time-picker/types'

import dayjs from 'dayjs'

const mapMinTime = ({
  min,
  minuteStep = 1,
}: {
  min: string
  minuteStep?: TimeStep
}) => {
  if (!minuteStep || minuteStep === 1) return dayjs(min).toISOString()
  const minMinute = dayjs(min).minute()
  const newMinute = Math.ceil(minMinute / minuteStep) * minuteStep
  return dayjs(min).set('minute', newMinute).toISOString()
}

export default mapMinTime
