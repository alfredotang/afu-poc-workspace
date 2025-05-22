import { Alert as AlertRoot, AlertDescription, AlertTitle } from './components'

export type AlertProps = React.ComponentProps<typeof AlertRoot> & {
  title?: React.ReactNode
  description?: React.ReactNode
}

function Alert({ title, description, ...props }: AlertProps) {
  return (
    <AlertRoot {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </AlertRoot>
  )
}

export { Alert }
