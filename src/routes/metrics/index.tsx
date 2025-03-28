import { createFileRoute, Link } from '@tanstack/react-router';
import { Navbar } from '../../components/Navbar'
import { useAuth } from '../../contexts/AuthContext';
import { StatsCard } from '../../components/metrics/StatsCard';
import { Card } from '../../components/ui/Card';
import { SimpleLineChart } from '../../components/metrics/SimpleLineChart';

export const Route = createFileRoute('/metrics/')({
  component: RouteComponent,
})

const weeklyData = [
  { name: 'Mon', value: 420 },
  { name: 'Tue', value: 380 },
  { name: 'Wed', value: 450 },
  { name: 'Thu', value: 520 },
  { name: 'Fri', value: 580 },
  { name: 'Sat', value: 620 },
  { name: 'Sun', value: 570 }
]

const monthlyData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 4500 },
  { name: 'Mar', value: 5200 },
  { name: 'Apr', value: 4800 },
  { name: 'May', value: 5600 },
  { name: 'Jun', value: 6200 }
]

function RouteComponent() {
    const { isAuthenticated, user } = useAuth();
  
  return <>
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <div className="space-y-6 max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Metricas general</h1>
        </div>
        
        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total de Usuarios"
            value="12,456"
            change={{ value: 8.2, isPositive: true }}
            description="Compared to last month"
          />
          
          <StatsCard
            title="Engagement Rate"
            value="58.3%"
            change={{ value: 5.1, isPositive: true }}
            description="Compared to last month"
          />
          
          <StatsCard
            title="Average Session"
            value="8m 12s"
            change={{ value: 2.4, isPositive: false }}
            description="Compared to last month"
          />
          
          <StatsCard
            title="Bounce Rate"
            value="24.8%"
            change={{ value: 3.2, isPositive: true }}
            description="Compared to last month"
          />
        </div>
      </div>
    </div>
  </>
}
