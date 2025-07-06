import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const ImageUpload = ({ onImageUpload, currentImage, label = "Upload Image" }) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }
  
  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onImageUpload(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }
  
  const handleRemoveImage = () => {
    onImageUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-secondary">
        {label}
      </label>
      
      {currentImage ? (
        <div className="relative">
          <img 
            src={currentImage} 
            alt="Header" 
            className="w-full h-32 object-contain bg-gray-50 rounded-lg border border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1 bg-error text-white rounded-full hover:bg-error/80 transition-colors"
          >
            <ApperIcon name="X" className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}
          `}
          onClick={() => fileInputRef.current?.click()}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <ApperIcon name="Upload" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
        </motion.div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {currentImage && (
        <Button
          variant="ghost"
          size="sm"
          icon="Upload"
          onClick={() => fileInputRef.current?.click()}
        >
          Change Image
        </Button>
      )}
    </div>
  )
}

export default ImageUpload