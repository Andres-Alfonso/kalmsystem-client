import React from 'react'

interface DataPoint {
  name: string
  value: number
}

interface SimpleLineChartProps {
  data: DataPoint[]
  title?: string
  className?: string
}

export function SimpleLineChart({ data, title, className = '' }: SimpleLineChartProps) {
  // Encontrar el valor máximo para la escala
  const maxValue = Math.max(...data.map(point => point.value))
  const chartHeight = 150

  // Calcular posiciones para el gráfico
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((point.value / maxValue) * 100)
    return `${x},${y}`
  }).join(' ')

  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      {title && <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>}
      
      <div className="h-40 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          {/* Línea del gráfico */}
          <polyline
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
            points={points}
          />
          
          {/* Puntos del gráfico */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - ((point.value / maxValue) * 100)
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1.5"
                fill="rgb(59, 130, 246)"
              />
            )
          })}
        </svg>
        
        {/* Etiquetas del eje X */}
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          {data.map((point, index) => (
            <div key={index} className="transform -translate-x-1/2" style={{ marginLeft: `${(index / (data.length - 1)) * 100}%` }}>
              {point.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}