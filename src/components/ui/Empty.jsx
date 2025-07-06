import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No data available",
  description = "Get started by adding some content",
  actionText = "Get Started",
  onAction,
  icon = "FileText"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-md w-full mx-auto px-4 py-12"
    >
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-2xl font-semibold text-secondary mb-3">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <Button
            onClick={onAction}
            icon="Plus"
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            {actionText}
          </Button>
        )}
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <ApperIcon name="Zap" className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-gray-500">Fast & Easy</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <ApperIcon name="Shield" className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500">Secure</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <ApperIcon name="Sparkles" className="h-4 w-4 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500">Professional</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Empty