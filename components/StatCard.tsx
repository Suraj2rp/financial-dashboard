
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, detail, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow flex items-center space-x-4 animate-pulse">
        <div className="flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-full h-12 w-12"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-card p-4 rounded-lg shadow flex items-center space-x-4">
      <div className="flex-shrink-0 bg-red-100 dark:bg-red-900/50 text-primary-red p-3 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-lg font-bold text-gray-800 dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{detail}</p>
      </div>
    </div>
  );
};

export default StatCard;