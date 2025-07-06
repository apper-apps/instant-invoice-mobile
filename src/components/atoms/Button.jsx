import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 focus:ring-primary shadow-lg shadow-primary/25',
    secondary: 'bg-white text-secondary border border-gray-200 hover:bg-gray-50 focus:ring-primary shadow-sm',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-secondary hover:bg-gray-100 focus:ring-primary',
    danger: 'bg-gradient-to-r from-error to-red-600 text-white hover:from-error/90 hover:to-red-600/90 focus:ring-error shadow-lg shadow-error/25'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} className="mr-2 h-4 w-4" />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} className="ml-2 h-4 w-4" />
      )}
    </motion.button>
  )
}

export default Button