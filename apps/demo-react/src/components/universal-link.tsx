import { Link, type LinkProps } from '@tanstack/react-router'

import { Button } from '@alison-ui/button'

import { universalRouter } from '@libs/helpers/bridges'

export default function UniversalLink({
  to,
  toVue,
  children,
  ...props
}: LinkProps & {
  toVue?: string
  children?: React.ReactNode
}) {
  if (!to) {
    return (
      <Button
        variant="ghost"
        onClick={() => universalRouter.pushVue(toVue || '')}
      >
        {children}
      </Button>
    )
  }
  return (
    <Link {...props} to={to}>
      {({ isActive }) => (
        <Button variant={isActive ? 'default' : 'ghost'}>{children}</Button>
      )}
    </Link>
  )
}
