import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import { generatePDF } from '@/utils/pdfGenerator'
import { sendEmail } from '@/utils/emailService'
import { toast } from 'react-toastify'

const ActionToolbar = ({ invoiceData, onClearForm }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  
  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true)
      await generatePDF(invoiceData)
      toast.success('Invoice PDF downloaded successfully!')
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.')
      console.error('PDF generation error:', error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }
  
  const handleSendEmail = async () => {
    if (!invoiceData.to.email) {
      toast.error('Please add client email address to send invoice')
      return
    }
    
    try {
      setIsSendingEmail(true)
      await sendEmail(invoiceData)
      toast.success('Invoice sent successfully!')
    } catch (error) {
      toast.error('Failed to send invoice. Please try again.')
      console.error('Email sending error:', error)
    } finally {
      setIsSendingEmail(false)
    }
  }
  
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all form data? This action cannot be undone.')) {
      onClearForm()
      toast.info('Form cleared successfully')
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-4 bg-white rounded-lg border border-gray-200 shadow-lg p-4 z-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-success rounded-full"></div>
          <span className="text-sm text-gray-600">Invoice ready</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            icon="RotateCcw"
          >
            Clear
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSendEmail}
            loading={isSendingEmail}
            icon="Mail"
            disabled={!invoiceData.to.email}
          >
            Send Email
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleDownloadPDF}
            loading={isGeneratingPDF}
            icon="Download"
          >
            Download PDF
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ActionToolbar