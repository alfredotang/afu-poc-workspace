# Folder structure react

1. every `*.index` in `src/pages` is a route
2. every `**/_content/**` is ignored to be a route
3. dynamic route params are defined in `src/pages/$xxx.tsx` or `src/pages/$xxx/index.vue`
4. route groups are defined in `src/pages/(..path)`

```
src/pages
├── __root.tsx -> router entrypoint, root layout
├── (home) // group
│   ├── _content
│   │   ├── HomeDetail.tsx
│   │   ├── IaaS.tsx
│   │   └── MaaS.tsx
│   └── index.tsx  -> /
├── about
│   ├── $aboutId
│   │   └── index.tsx -> /about/$aboutId
│   └── index.tsx     -> /about
├── auth
│   └── signin.tsx -> /auth/signin
├── callback
│   ├── $time.tsx -> /callback/$time
│   └── index.tsx  -> /callback
├── cart
│   ├── index.tsx   -> /cart
│   ├── failed.tsx  -> /cart/failed
│   └── success.tsx -> /cart/success
└── user-console
    ├── route.tsx -> /user-console layout
    ├── bare-metal
    │   ├── $id
    │   │   └── index.tsx -> /user-console/bare-metal/$id
    │   ├── create
    │   │   └── index.tsx -> /user-console/bare-metal/create
    │   ├── route.tsx     -> /user-console/bare-metal layout
    │   └── index.tsx     -> /user-console/bare-metal
    └── template
        └── index.tsx -> /user-console/template

```

## dynamic route params

```
src/pages/
├── $aboutId
│   └── index.tsx -> /about/$aboutId e.g /about/123
```

## router groups

```
src/pages/
├── (admin)/
│   ├── dashboard.tsx
│   └── settings.tsx
└── (user)/
    ├── profile.tsx
    └── order.vue
```

Resulting URLs:

```
- `/dashboard` -> renders `src/pages/(admin)/dashboard.tsx`
- `/settings` -> renders `src/pages/(admin)/settings.tsx`
- `/profile` -> renders `src/pages/(user)/profile.tsx`
- `/order` -> renders `src/pages/(user)/order.tsx`
```

## Layouts
```
src/pages/
├── __root.tsx -> router entrypoint, root layout
├── about
│   ├── route.tsx     -> /about layout
│   └── index.tsx     -> /about
└── about.tsx  -> because /about route
```

layout order is `__root.tsx` -> `about.tsx` -> `about/route.tsx` -> `about/index.tsx`
We should always use `__root.tsx` and `xxx/route.tsx` to define layouts. Avoid using `xxx.tsx` to define layouts.

# migration from vue-router

## meta
define meta in
vue: 
```ts
definePage({
  meta: {
    title: 'About',
  },
})
```

react:
```tsx
export const Route = createFileRoute('/about')({
  component: RouteComponent,
  staticData: {
    title: 'About',
  },
})
```
> staticData is **runtime** data, unlike vue-router.You can put variable in staticData.

## get route
vue:
```ts
const route = useRoute()
```

react:
```tsx
import { useMatches } from '@tanstack/react-router'

const route = useMatches({
  select: matched => matched[matched.length - 1],
})

```

## get route params
vue:
```ts
const route = useRoute()
const params = route.params
```

react:
```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about/$aboutId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { aboutId } = Route.useParams()
  return (
    <div>
      <div>$aboutId</div>
      <div>{aboutId}</div>
    </div>
  )
}

```

## get search params
vue:
```ts
const route = useRoute()
const searchParams = route.query
```

react:
```tsx
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const homeSearchSchema = z.object({
  tab: z.enum(['iaas', 'maas']).optional(),
})

export type HomeSearch = z.infer<typeof homeSearchSchema>

export const Route = createFileRoute('/')({
  component: Home,
  validateSearch: homeSearchSchema,
})

```

## before enter
vue:
```ts
const router = createRoute(...)

router.beforeEnter((to, from, next) => {
  ....
})

```

react:
```tsx
// in pages/_root.tsx

import { createRootRoute, Outlet, useMatches } from '@tanstack/react-router'

import RootLayout from '../layouts/root-layout'

export const Route = createRootRoute({
  component: () => {
    // logic
  },
  notFoundComponent: ...,
  pendingComponent: ...,
})


```