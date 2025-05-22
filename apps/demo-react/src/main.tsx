import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import { router } from './router'
import './main.css'

function App() {
  return <RouterProvider router={router} />
}

createRoot(document.getElementById('react-app')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
