import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { cloneElement } from 'react'
import { createRoot } from 'react-dom/client'

export const useRenderReact = (elementId: string, App: React.ReactNode) => {
  const router = useRouter()
  const route = useRoute()

  onMounted(() => {
    const root = createRoot(document.getElementById(elementId) as HTMLElement)
    root.render(cloneElement(App as React.ReactElement<any>, { router, route }))
  })
}
