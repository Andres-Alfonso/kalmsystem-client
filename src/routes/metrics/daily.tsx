import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/metrics/daily')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_metrics/daily"!</div>
}
