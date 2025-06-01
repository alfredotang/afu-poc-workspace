import { TimeStep } from '@alison-ui/time-picker/types'

import dayjs from 'dayjs'

const mapMaxTime = ({
  max,
  minuteStep = 1,
}: {
  max: string
  minuteStep?: TimeStep
}) => {
  if (!minuteStep || minuteStep === 1) return dayjs(max).toISOString()
  const maxMinute = dayjs(max).minute()
  const newMinute = (Math.ceil(maxMinute / minuteStep) - 1) * minuteStep
  return dayjs(max).set('minute', newMinute).toISOString()
}

export default mapMaxTime
