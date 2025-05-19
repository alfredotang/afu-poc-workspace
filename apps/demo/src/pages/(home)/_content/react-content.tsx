import type { Router } from 'vue-router'

export default function ReactContent({ router }: { router?: Router }) {
  const onRedirect = () => {
    router?.push({ name: '/user-console/resource-overview/' })
  }

  return (
    <div className="space-y-4 rounded-2xl border p-4">
      <h2 className="text-2xl font-bold">ReactContent</h2>
      <button className="btn btn-primary" onClick={onRedirect}>
        Resource Overview
      </button>
    </div>
  )
}
