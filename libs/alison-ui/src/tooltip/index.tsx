import {
  Tooltip as TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from './components'

export type TooltipProps = {
  children: React.ReactNode
  content: React.ReactNode
} & React.ComponentProps<typeof TooltipRoot>

function Tooltip({ children, content, ...props }: TooltipProps) {
  return (
    <TooltipRoot {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </TooltipRoot>
  )
}

export { Tooltip }
