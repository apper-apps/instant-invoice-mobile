import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header Skeleton */}
        <div className="bg-white border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shimmer"></div>
                <div className="h-4 w-64 bg-gray-200 rounded mt-2 shimmer"></div>
              </div>
              <div className="hidden md:flex space-x-4">
                <div className="h-4 w-32 bg-gray-200 rounded shimmer"></div>
                <div className="h-4 w-32 bg-gray-200 rounded shimmer"></div>
                <div className="h-4 w-32 bg-gray-200 rounded shimmer"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Skeleton */}
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="h-6 w-32 bg-gray-200 rounded shimmer mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
              </div>
            </div>
            
            {/* Form Sections */}
            {[1, 2, 3, 4].map((section) => (
              <div key={section} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="h-5 w-40 bg-gray-200 rounded shimmer mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded shimmer"></div>
                    <div className="h-10 w-full bg-gray-200 rounded shimmer"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded shimmer"></div>
                    <div className="h-10 w-full bg-gray-200 rounded shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Preview Skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="h-5 w-32 bg-gray-200 rounded shimmer mb-4"></div>
            <div className="bg-white rounded-lg border border-gray-200 p-8 invoice-pattern">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="h-8 w-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded shimmer"></div>
                  <div className="text-right space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded shimmer"></div>
                    <div className="h-6 w-32 bg-gray-200 rounded shimmer"></div>
                  </div>
                </div>
                
                {/* From/To */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="h-4 w-16 bg-gray-200 rounded shimmer"></div>
                    <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-16 bg-gray-200 rounded shimmer"></div>
                    <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded shimmer"></div>
                  </div>
                </div>
                
                {/* Table */}
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                    <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                    <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                    <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                  </div>
                  {[1, 2, 3].map((row) => (
                    <div key={row} className="grid grid-cols-4 gap-4">
                      <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                      <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                      <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                      <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                    </div>
                  ))}
                </div>
                
                {/* Total */}
                <div className="flex justify-end">
                  <div className="w-48 space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded shimmer"></div>
                    <div className="h-6 w-full bg-gradient-to-r from-primary/20 to-accent/20 rounded shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Loading