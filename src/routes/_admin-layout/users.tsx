import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin-layout/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin-layout/users"!</div>
}
