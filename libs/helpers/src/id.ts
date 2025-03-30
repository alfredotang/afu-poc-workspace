import { customAlphabet } from 'nanoid'

export const alphanumericalId = customAlphabet('1234567890abcdef', 8)
export const uuid = () =>
  `${alphanumericalId(8)}-${alphanumericalId(4)}-${alphanumericalId(4)}-${alphanumericalId(4)}-${alphanumericalId(12)}`
