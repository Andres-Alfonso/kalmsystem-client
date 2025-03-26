import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/metrics/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/metrics/"!</div>
}
