import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import InvoiceForm from '@/components/organisms/InvoiceForm'
import InvoicePreview from '@/components/organisms/InvoicePreview'
import ActionToolbar from '@/components/organisms/ActionToolbar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const InvoiceGenerator = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'USD',
    taxRate: 0,
    headerImage: '',
    from: {
      name: '',
      email: '',
      phone: '',
      address: '',
      taxId: ''
    },
    to: {
      name: '',
      email: '',
      phone: '',
      address: '',
      company: ''
    },
    items: [],
    notes: '',
    terms: ''
  })
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const handleInvoiceChange = (newData) => {
    setInvoiceData(newData)
  }
  
  const handleClearForm = () => {
    setInvoiceData({
      invoiceNumber: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      currency: 'USD',
      taxRate: 0,
      headerImage: '',
      from: {
        name: '',
        email: '',
        phone: '',
        address: '',
        taxId: ''
      },
      to: {
        name: '',
        email: '',
        phone: '',
        address: '',
        company: ''
      },
      items: [],
      notes: '',
      terms: ''
    })
  }
  
  const handleRetry = () => {
    setError(null)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  
  if (isLoading) {
    return <Loading />
  }
  
  if (error) {
    return <Error message={error} onRetry={handleRetry} />
  }
  
  const isEmpty = !invoiceData.from.name && !invoiceData.to.name && invoiceData.items.length === 0
  
  return (
<div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold gradient-text">InstantInvoice</h1>
              <p className="text-gray-600 mt-1">Create professional invoices in minutes</p>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                No signup required
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Instant PDF download
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Professional templates
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Main Content */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
{isEmpty ? (
          <Empty
            title="Ready to create your first invoice?"
            description="Fill out the form below to generate a professional invoice instantly. No account required!"
          />
        ) : (
          <ActionToolbar 
            invoiceData={invoiceData}
            onClearForm={handleClearForm}
          />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
          {/* Form - Takes up 3/5 of the width */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <InvoiceForm 
                invoiceData={invoiceData}
                onInvoiceChange={handleInvoiceChange}
              />
            </div>
          </div>
{/* Preview - Takes up 2/5 of the width */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8 space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-secondary flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Live Preview
                </h2>
                <div className="transform scale-80 origin-top-left overflow-hidden">
                  <InvoicePreview invoiceData={invoiceData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 InstantInvoice. Create professional invoices instantly.</p>
            <p className="text-sm">No registration required • Secure • Fast • Professional</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceGenerator