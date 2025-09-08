
import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { ClientData } from '../types';
import { CHART_COLORS } from '../constants';
import ChartLoader from './ChartLoader';

interface ClientChartProps {
  data: ClientData[];
  loading: boolean;
  isPdfMode?: boolean;
}

const ClientChart: React.FC<ClientChartProps> = ({ data, loading, isPdfMode = false }) => {
  const total = data.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <div className="h-80 w-full relative">
      {loading && <ChartLoader />}
      <div className={`transition-opacity duration-300 ${loading ? 'animate-pulse' : 'opacity-100'}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <span className="text-3xl font-bold dark:text-white">{total}</span>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="60%"
              innerRadius={80}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              isAnimationActive={!isPdfMode && !loading}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: 20 }}
      
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClientChart;