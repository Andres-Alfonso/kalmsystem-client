import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/metrics/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <h3>Metricas</h3>
    <section className="p-2">
      <div className="p-2">Aqui iran las metricas iniciales, usuarios activos, total accesos etc..</div>
    </section>
  </>
}
