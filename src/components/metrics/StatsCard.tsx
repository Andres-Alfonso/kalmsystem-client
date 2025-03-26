import React from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  change?: {
    value: number
    isPositive: boolean
  }
  icon?: React.ReactNode
}

export function StatsCard({ title, value, description, change, icon }: StatsCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {icon && (
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                {icon}
              </div>
            )}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {value}
              </div>

              {change && (
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  change.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change.isPositive ? (
                    <span>↑ {change.value}%</span>
                  ) : (
                    <span>↓ {change.value}%</span>
                  )}
                </div>
              )}
            </dd>
          </div>
        </div>
      </div>
      {description && (
        <div className="bg-gray-50 px-5 py-3">
          <div className="text-sm text-gray-500">
            {description}
          </div>
        </div>
      )}
    </div>
  )
}