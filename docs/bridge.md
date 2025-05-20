# React and Vue Bridge

## router
```tsx
import { universalRouter } from '@libs/helpers/bridge'

universalRouter.push({ 
  path: '/user-console/bare-metal' 
})

universalRouter.push({ 
  path: '/user-console/bare-metal', query: { tab: 'iaas' } 
})

universalRouter.push({ 
  path: `/user-console/bare-metal/${bareMetalId}`, 
  query: { tab: 'iaas' } 
})

```


## store
vue: 
```ts
import { defineStore } from 'pinia'
import { useHelloStore } from 'xxx/react/store/hello'

const store = defineStore('store', () => {
  const hello = ref(useHelloStore.getState().hello)

  const setHello = (hello: string) => {
    useHelloStore.setState({ hello })
  }

  useHelloStore.subscribe((state) => {
    hello.value = state.hello
  })

  return {
    hello,
    setHello,
  }
})
```

react:
```tsx
import { useAuthStore as useVueAuthStore } from 'xxx/vue/store/auth'
import { create } from 'zustand'

type AuthStore = {
  getState: () => {
    isLoggedIn: boolean
    isOwner: boolean
    userName: string
  }
  login: ReturnType<typeof useStore>['login']
  logout: () => void
}

export type ReactStore = {
  framework: 'react' | 'vue'
  setFramework: (framework: 'react' | 'vue') => void
}

export const useAuthStore = create<AuthStore>(() => ({
  getState: () => {
    const { isLoggedIn, isOwner, userName } = useVueAuthStore?.() || {
      isLoggedIn: false,
      isOwner: false,
      userName: '',
    }
    return {
      isLoggedIn,
      isOwner,
      userName,
    }
  },
  login: payload => useStore().login(payload),
  logout: () => useStore().logout(),
}))
```
