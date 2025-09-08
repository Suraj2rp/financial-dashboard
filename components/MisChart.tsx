
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MisData } from '../types';
import ChartLoader from './ChartLoader';

interface MisChartProps {
    data: MisData[];
    loading: boolean;
    isPdfMode?: boolean;
}

const MisChart: React.FC<MisChartProps> = ({ data, loading, isPdfMode = false }) => {
  return (
    <div className="h-80 w-full relative">
      {loading && <ChartLoader />}
      <div className={`transition-opacity duration-300 ${loading ? 'animate-pulse' : 'opacity-100'}`}>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
            <XAxis dataKey="name" tick={{ fill: 'rgb(107 114 128)', fontSize: 12 }} />
            <YAxis tickFormatter={(value) => `${value} Cr`} tick={{ fill: 'rgb(107 114 128)', fontSize: 12 }} />
            <Tooltip formatter={(value: number) => `${value.toFixed(2)} Cr`} />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" isAnimationActive={!isPdfMode && !loading} />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" isAnimationActive={!isPdfMode && !loading} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MisChart;