import React from 'react';

const Loader = ({ size = 'md', color = 'blue', fullScreen = false }) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-2',
    lg: 'h-16 w-16 border-4',
    xl: 'h-24 w-24 border-4',
  };

  // Color classes
  const colorClasses = {
    blue: 'border-blue-500 dark:border-blue-400',
    red: 'border-red-500 dark:border-red-400',
    green: 'border-green-500 dark:border-green-400',
    yellow: 'border-yellow-500 dark:border-yellow-400',
    gray: 'border-gray-500 dark:border-gray-400',
    white: 'border-white dark:border-gray-300',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 dark:bg-black dark:bg-opacity-60 flex justify-center items-center z-50">
        <div
          className={`animate-spin rounded-full ${sizeClasses[size]} border-t-transparent ${colorClasses[color]}`}
        ></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-4">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-t-transparent ${colorClasses[color]}`}
      ></div>
    </div>
  );
};

export default Loader;
