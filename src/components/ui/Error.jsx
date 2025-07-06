import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full mx-auto px-4"
      >
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="AlertTriangle" className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-xl font-semibold text-secondary mb-2">
            Oops! Something went wrong
          </h2>
          
          <p className="text-gray-600 mb-6">
            {message}
          </p>
          
          <div className="space-y-3">
            {onRetry && (
              <Button
                onClick={onRetry}
                icon="RefreshCw"
                className="w-full"
              >
                Try Again
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Reload Page
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If the problem persists, please refresh the page or try again later.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Error