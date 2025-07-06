import { motion } from 'framer-motion'

const FormSection = ({ title, description, children, className = '' }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-secondary">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      {children}
    </motion.div>
  )
}

export default FormSection