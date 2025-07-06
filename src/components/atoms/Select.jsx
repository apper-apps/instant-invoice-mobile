import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Select = forwardRef(({ 
  label, 
  error, 
  options = [],
  placeholder = 'Select an option',
  className = '',
  required = false,
  ...props 
}, ref) => {
  const selectClasses = `
    block w-full px-3 py-2 border rounded-lg shadow-sm 
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
    transition-colors duration-200 appearance-none bg-white
    ${error ? 'border-error' : 'border-gray-300'}
    ${className}
  `
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-secondary">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={selectClasses}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ApperIcon name="ChevronDown" className="h-4 w-4 text-gray-400" />
        </div>
      </div>
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select