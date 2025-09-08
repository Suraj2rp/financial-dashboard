
import React from 'react';

const ChartLoader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-dark-card/30 rounded-lg z-10">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-red"></div>
    </div>
  );
};

export default ChartLoader;