import React from 'react';

const Card = ({
  children,
  title,
  className = '',
  titleClassName = '',
  bodyClassName = '',
  headerAction = null,
  ...props
}) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {title && (
        <div
          className={`px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center ${titleClassName}`}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
          {headerAction && <div className="flex items-center">{headerAction}</div>}
        </div>
      )}
      <div className={`px-4 py-4 dark:text-gray-200 ${bodyClassName}`}>{children}</div>
    </div>
  );
};

export default Card;
