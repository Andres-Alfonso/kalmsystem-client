// src/components/MetricsChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MetricsChartProps {
  totalUsers: number;
  lastMonthUsers: number;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ totalUsers, lastMonthUsers }) => {
  const data = [
    {
      name: 'Usuarios',
      'Último Mes': lastMonthUsers,
      'Total': totalUsers,
    },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#FBC02D" />
          <Bar dataKey="Último Mes" fill="#FFA000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;