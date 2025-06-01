export type TimeOption = {
  value: number
  label: string
  disabled?: boolean
}

export type TimeStruct = {
  hour: number
  minute: number
  second: number
}

export type TimeStep = 1 | 5 | 10 | 15 | 30
