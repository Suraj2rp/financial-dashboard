
import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SipData } from '../types';
import ChartLoader from './ChartLoader';

interface SipChartProps {
  data: SipData[];
  loading: boolean;
  isPdfMode?: boolean;
}

const SipChart: React.FC<SipChartProps> = ({ data, loading, isPdfMode = false }) => {
  return (
    <div className="h-80 w-full relative">
       {loading && <ChartLoader />}
      <div className={`transition-opacity duration-300 ${loading ? 'animate-pulse' : 'opacity-100'}`}>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
            <XAxis dataKey="name" tick={{ fill: 'rgb(107 114 128)', fontSize: 12 }} />
            <YAxis yAxisId="left" orientation="left" stroke="rgb(107 114 128)" tick={{ fill: 'rgb(107 114 128)', fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="rgb(107 114 128)" tick={{ fill: 'rgb(107 114 128)', fontSize: 12 }} />
            <Tooltip />
            <Bar yAxisId="left" dataKey="uv" barSize={20} fill="#3B82F6" isAnimationActive={!isPdfMode && !loading} />
            <Line yAxisId="right" type="monotone" dataKey="pv" stroke="#EF4444" dot={false} strokeWidth={2} isAnimationActive={!isPdfMode && !loading} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SipChart;