'use client'

import { cn } from '@libs/helpers/className'
import { ToastContainer, toast, type ToastContainerProps } from 'react-toastify'

// import { useTheme } from 'next-themes'

/**
 * @see https://fkhadra.github.io/react-toastify/introduction
 */
const Toaster = ({
  className,
  position = 'top-right',
  ...props
}: ToastContainerProps) => {
  // const { theme = 'system' } = useTheme()

  return (
    <ToastContainer
      theme="light"
      className={cn('toaster group', className)}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      position={position}
      {...props}
    />
  )
}

export { Toaster, toast }

export type { ToastContainerProps }
