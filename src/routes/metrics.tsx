// src/routes/metrics.tsx
import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '../components/ProtectedRoute';

export const Route = createFileRoute('/metrics')({
  component: MetricsLayout,
});

// Componente que envuelve las rutas de métricas con protección de autenticación
function MetricsLayout() {
  // Proteger todas las rutas de métricas para admin y auditor
  return <ProtectedRoute requiredRoles={['Admin', 'auditor']} />;
}