import { cx } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export type ClassValue = Parameters<typeof cx>[0]

export const cn = (...classValues: ClassValue[]) => twMerge(cx(...classValues))
