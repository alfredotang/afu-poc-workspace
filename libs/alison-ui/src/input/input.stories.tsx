import { LockIcon } from 'lucide-react'

import { Input } from '.'

export default {
  component: Input,
  title: 'ui/input',
}

export const Default = () => (
  <div className="flex gap-4">
    <Input />
    <Input disabled />
    <Input invalid />
    <Input leading={<LockIcon />} />
    <Input trailing={<LockIcon />} />
    <Input leading={<LockIcon />} trailing={<LockIcon />} />
  </div>
)

export const IconLeading = () => <Input leading={<LockIcon />} />

export const IconTrailing = () => <Input trailing={<LockIcon />} />

export const IconLeadingAndTrailing = () => (
  <Input leading={<LockIcon />} trailing={<LockIcon />} />
)

export const Invalid = () => <Input invalid />

export const Disabled = () => <Input disabled />
