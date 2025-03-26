import { createFileRoute } from '@tanstack/react-router'
import { Card, CardGrid } from '../../components/ui/Card'
import { StatsCard } from '../../components/metrics/StatsCard'
import { SimpleLineChart } from '../../components/metrics/SimpleLineChart'

export const Route = createFileRoute('/metrics/')({
  component: Metrics,
})

// Datos de ejemplo para los gráficos
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

function Metrics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Metrics Dashboard</h1>
        
        <div className="flex space-x-2">
          <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
            <option>Last 3 months</option>
          </select>
          
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Export
          </button>
        </div>
      </div>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
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
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Weekly Performance">
          <SimpleLineChart data={weeklyData} />
        </Card>
        
        <Card title="Monthly Trends">
          <SimpleLineChart data={monthlyData} />
        </Card>
      </div>
      
      {/* Más contenido de ejemplo */}
      <Card title="Top Referrers">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Google</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4,325</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12.4%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+2.3%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Direct</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3,752</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15.7%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+1.2%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Twitter</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2,150</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9.8%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">-0.7%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Facebook</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,875</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8.3%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+3.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}