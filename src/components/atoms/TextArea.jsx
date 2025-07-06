import { forwardRef } from 'react'

const TextArea = forwardRef(({ 
  label, 
  error, 
  rows = 3,
  className = '',
  required = false,
  ...props 
}, ref) => {
  const textareaClasses = `
    block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent 
    transition-colors duration-200 resize-y
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
      <textarea
        ref={ref}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
})

TextArea.displayName = 'TextArea'

export default TextArea