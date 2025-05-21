# React and Vue Bridge

## router
Vue:
in vue-repo, will still use the original router, but the router content will be **empty**.

```html
 <!-- vue-repo/src/pages/about.vue -->
<template>
  <noscript></noscript>
</template>
<script setup lang="ts">
definePage({
  meta: {
    layouts: ['empty'],
  },
})
</script>

```

React:
```tsx
import { universalRouter } from '@libs/helpers/bridge'

universalRouter.pushVue('/user-console/bare-metal' )

universalRouter.pushVue('/user-console/bare-metal', { tab: 'iaas' })

universalRouter.pushVue(`/user-console/bare-metal/${bareMetalId}`, { tab: 'iaas' })

```


## store
Vue: 
```ts
import { defineStore } from 'pinia'
import { useHelloStore } from 'xxx/react/store/hello'
import { createVueStoreBridge } from '@libs/helpers/bridge'
import { createReactStoreBridge } from '@libs/helpers/bridge'

const useHelloStore = defineStore('store', () => createVueStoreBridge(useHelloStore))

const { hello, setHello } = useHelloStore()

const onChangeHello = (newHello: string) => {
  setHello(newHello)
}
```

React:
```tsx
import { useAuthStore as useVueAuthStore } from 'xxx/vue/store/auth'
import { create } from 'zustand'
import { createReactStoreBridge } from '@libs/helpers/bridge'

const useAuthStore = createReactStoreBridge(useVueAuthStore)

const user = useAuthStore(state => state.user)
const setUser = useAuthStore(state => state.setUser)

const onChangeUser = (newUser: User) => {
  setUser(newUser)
}
```
