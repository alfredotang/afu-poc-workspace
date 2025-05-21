import { Alert, AlertTitle } from '@alison-ui/alert'
import { Button } from '@alison-ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@alison-ui/tooltip'
import UniversalLink from '@apps/demo-react/components/universal-link'
import {
  useAuthStore,
  useHelloStore,
  useFrameworkStore,
} from '@apps/demo-react/stores'
import { universalRouter } from '@libs/helpers/bridges'
import { LinkProps } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const headerRoute = [
  {
    label: 'Home',
    to: undefined,
    toVue: '/',
  },
  {
    label: 'Resource Overview',
    to: undefined,
    toVue: '/user-console/resource-overview',
  },
  {
    label: 'Admin',
    to: undefined,
    toVue: '/admin',
  },
  {
    label: 'About',
    to: '/about',
    toVue: '',
  },
  {
    label: 'Cart',
    to: undefined,
    toVue: '/cart',
  },
  {
    label: 'Callback',
    to: undefined,
    toVue: '/callback',
  },
] satisfies {
  label: string
  to?: LinkProps['to']
  toVue: string
}[]

const LoginButton = () => {
  const { isLoggedIn, userName, logout } = useAuthStore()
  const toggleLogin = () => {
    if (isLoggedIn) {
      logout()
      return
    }

    universalRouter.pushVue('/auth/signin')
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isLoggedIn ? 'ghost' : 'default'}
          onClick={toggleLogin}
        >
          <img
            v-show="isLoggedIn"
            className="size-10"
            src="https://pansci.asia/wp-content/uploads/2016/11/f4ba5977f2f0519a10c9f9bd66cefc89-560x576.png"
            alt="pokemon"
          />
          <span>{isLoggedIn ? userName : 'Login'}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isLoggedIn ? 'logout' : undefined}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { framework, setFramework } = useFrameworkStore()
  const hello = useHelloStore(state => state.hello)
  const setHello = useHelloStore(state => state.setHello)
  return (
    <div className="flex min-h-screen flex-col">
      <Alert>
        <AlertTitle>This is a React app</AlertTitle>
      </Alert>
      <header className="flex justify-between p-6">
        <nav className="flex gap-4">
          {headerRoute.map(router => (
            <UniversalLink
              key={router.label}
              to={router.to}
              toVue={router.toVue}
            >
              {router.label}
            </UniversalLink>
          ))}
        </nav>
        <Button
          variant="ghost"
          onClick={() => setFramework(framework === 'react' ? 'vue' : 'react')}
        >
          {framework}
        </Button>
        <Button
          variant="ghost"
          onClick={() => setHello(hello === 'hello' ? 'world' : 'hello')}
        >
          {hello}
        </Button>
        <LoginButton />
      </header>
      <main className="mx-auto mb-12 max-w-sm grow">{children}</main>
      <TanStackRouterDevtools />
    </div>
  )
}
