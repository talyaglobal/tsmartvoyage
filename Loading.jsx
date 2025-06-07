import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="animate-spin rounded-full border-2 border-gray-300 border-t-navy-deep"></div>
    </div>
  );
};

const LoadingSkeleton = ({ className = '', lines = 3 }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`loading-skeleton h-4 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

const LoadingCard = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${className}`}>
      <div className="loading-skeleton h-6 w-3/4 mb-4" />
      <LoadingSkeleton lines={3} />
      <div className="loading-skeleton h-10 w-1/3 mt-6" />
    </div>
  );
};

export { LoadingSpinner, LoadingSkeleton, LoadingCard };

