# Folder structure

1. every `*.vue` in `src/pages` is a route
2. every `**/_content/**` is ignored to be a route
3. dynamic route params are defined in `src/pages/[...path].vue` or `src/pages/[...path]/index.vue`
4. route groups are defined in `src/pages/(..path)`

```
src/pages
├── (home)
│   ├── _content
│   │   ├── HomeDetail.vue
│   │   ├── IaaS.vue
│   │   └── MaaS.vue
│   └── index.vue  -> /
├── 401.vue -> /401
├── about
│   ├── [id]
│   │   └── index.vue -> /about/[id]
│   └── index.vue     -> /about
├── admin
│   └── index.vue  -> /admin
├── auth
│   └── signin.vue -> /auth/signin
├── callback
│   ├── [time].vue -> /callback/[time]
│   └── index.vue  -> /callback
├── cart
│   ├── index.vue   -> /cart
│   ├── failed.vue  -> /cart/failed
│   └── success.vue -> /cart/success
└── user-console
    ├── bare-metal
    │   ├── [id].vue      -> /user-console/bare-metal/[id]
    │   ├── create
    │   │   └── index.vue -> /user-console/bare-metal/create
    │   └── index.vue     -> /user-console/bare-metal
    ├── resource-overview
    │   └── index.vue -> /user-console/resource-overview
    └── template
        └── index.vue -> /user-console/template

```

# router groups

```
src/pages/
├── (admin)/
│   ├── dashboard.vue
│   └── settings.vue
└── (user)/
    ├── profile.vue
    └── order.vue
```

Resulting URLs:

```
- `/dashboard` -> renders `src/pages/(admin)/dashboard.vue`
- `/settings` -> renders `src/pages/(admin)/settings.vue`
- `/profile` -> renders `src/pages/(user)/profile.vue`
- `/order` -> renders `src/pages/(user)/order.vue`
```

# DefinePage

`definePage` is a helper function that adds the following properties to the `route` object:

```html
<script setup lang="ts">
  definePage({
    meta: {
      title: 'Hello world',
      isPublic: true,
      layouts: ['default'], // ['default'] or nested layout ['default', 'auth']
    },
    name: 'my-homie', // overrides the route name by auto generated
    redirect: to => {
      // redirect to a route
    },
  })
</script>
```

> Note: definePage is not supported **hot reloading** in development mode, you need to restart the dev server to see the changes.

# Layouts

All layouts are in `src/layouts/_content/`

```html
<script setup lang="ts">
  definePage({
    meta: {
      layouts: ['default', 'auth'], // or 'default' or undefined
    },
  })
</script>
```

Resulting:

```html
<DefaultLayout>
  <AuthLayout>
    <RouterView />
  </AuthLayout>
</DefaultLayout>
```

> Note: By default, the `DefaultLayout` is used.
>
> Note: Because layouts is defined in `definePage`, it is not supported **hot reloading** in development mode, you need to restart the dev server to see the changes.

# Troubleshooting

```
src/pages
├── cart
│   ├── failed.vue  -> /cart/failed
│   └── success.vue -> /cart/success
└── cart.vue  -> /cart
```

Resulting:

```json
{
  "path": "/cart",
  "name": "/cart",
  "component": "() => import('./src/pages/cart.vue')",
  "children": [
    {
      "path": "failed",
      "name": "/cart/failed",
      "component": "() => import('./src/pages/cart/failed.vue')",
      "children": []
    },
    {
      "path": "success",
      "name": "/cart/success",
      "component": "() => import('./src/pages/cart/failed.vue')",
      "children": []
    }
  ]
}
```

Because `cart.vue` is defined in `pages` root, So every `cart/*` will be `cart.vue` 's children.
every `cart/*`'s layout will inherit from `cart.vue`'s layout.

To Fix:

```
src/pages
└── cart
    ├── index.vue  -> /cart
    ├── failed.vue  -> /cart/failed
    └── success.vue -> /cart/success
```

Resulting:

```json
{
  "path": "/cart",
  "name": "/cart",
  "children": [
    {
      "path": "",
      "name": "/cart/",
      "component": "() => import('./src/pages/cart/index.vue')",
      "children": []
    },
    {
      "path": "failed",
      "name": "/cart/failed",
      "component": "() => import('./src/pages/cart/failed.vue')",
      "children": []
    },
    {
      "path": "success",
      "name": "/cart/success",
      "component": "() => import('./src/pages/cart/failed.vue')",
      "children": []
    }
  ]
}
```
