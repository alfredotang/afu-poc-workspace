# Alison UI
alison-ui is base on [shadcn/ui](https://ui.shadcn.com/) and [tailwindcss](https://tailwindcss.com/)
for consistency, we use `kebab-case` for component name and file name.

## add new component
use shadcn cli to add new component
```bash
pnpm dlx shadcn@latest add button
```

then, the component will be installed in `libs/alison-ui/src`
```
libs/alison-ui
└── src
    └── button.tsx
```


## change component structure and create storybook
1. mv [component-name].tsx to [component-name]/index.tsx
2. format the component code (by eslint and prettier)
3. create storybook file in [component-name]/[component-name].stories.tsx

```
libs/alison-ui
└── src
    └── button
        ├── button.stories.tsx
        └── index.tsx
```
## run storybook
```bash
pnpm nx run alison-ui:sb
```


## use component in apps
```tsx
import { Button } from '@alison-ui/button'

<Button>Click me</Button>
```




