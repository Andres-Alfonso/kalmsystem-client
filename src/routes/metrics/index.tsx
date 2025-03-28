// src/routes/metrics/index.tsx
import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import MetricClientService, { ClientMetricsResponse } from '../../services/metricClientService';
import { useAuth } from '../../contexts/AuthContext';
import { StatsCard } from '../../components/metrics/StatsCard';
import { Navbar } from '../../components/Navbar';
import MetricsChart from '../../components/metrics/MetricsChart';

export const Route = createFileRoute('/metrics/')({
  component: Metrics,
});

function Metrics() {
  const [metrics, setMetrics] = useState<ClientMetricsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const metricService = MetricClientService.getInstance();
        const result = await metricService.getGeneralClientMetrics(user?.client);
        setMetrics(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setError('No se pudieron cargar las métricas. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [user.client]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Métricas del Cliente</h1>
        
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-300"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {metrics && !loading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatsCard
                title="Total de Usuarios"
                value={metrics.result.countUsers}
                change={{ value: Math.min(100, Math.round((metrics.result.countLastMonthUsers / metrics.result.countUsers) * 100)), isPositive: metrics.result.countLastMonthUsers >= 0 }}
                description="Comparados con el mes anterior"
              />

              <StatsCard
                title="Total de Usuarios Activos"
                value={metrics.result.countUsersActives}
                description="Usuarios activos en plataforma"
              />

              <StatsCard
                title="Total de Ingresos"
                value={metrics.result.countLastMonthLogins}
                description="Total de ingresos en el último mes"
              />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Visualización de Usuarios</h2>
              <MetricsChart 
                totalUsers={metrics.result.countUsers} 
                lastMonthUsers={metrics.result.countLastMonthUsers}
              />
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Porcentaje de Crecimiento</h2>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-amber-500 h-4 rounded-full" 
                    style={{ 
                      width: `${Math.min(100, Math.round((metrics.result.countLastMonthUsers / metrics.result.countUsers) * 100))}%` 
                    }}
                  ></div>
                </div>
                <span className="ml-4 font-bold">
                  {Math.round((metrics.result.countLastMonthUsers / metrics.result.countUsers) * 100)}%
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Porcentaje de usuarios del último mes respecto al total
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Metrics;