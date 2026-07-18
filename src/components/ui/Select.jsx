import React from 'react';

const Select = ({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = '--select an option--',
  required = false,
  error = '',
  className = '',
  containerClassName = '',
  labelClassName = '',
  helpText = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-600 dark:text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 
          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500
          ${error ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500' : 'border-gray-300'} 
          ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => {
          if (typeof option === 'object' && option.value !== undefined) {
            return (
              <option key={option.value} value={option.value}>
                {option.label || option.value}
              </option>
            );
          }
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500" id={`${id}-error`}>
          {error}
        </p>
      )}
      {helpText && !error && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400" id={`${id}-help`}>
          {helpText}
        </p>
      )}
    </div>
  );
};

export default Select;
