import { motion } from 'framer-motion'
import { getCurrencySymbol } from '@/utils/currency'
import { formatDate } from '@/utils/dateFormat'

const InvoicePreview = ({ invoiceData }) => {
  const currencySymbol = getCurrencySymbol(invoiceData.currency)
  
  const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0)
  const taxAmount = (subtotal * invoiceData.taxRate) / 100
  const total = subtotal + taxAmount
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border border-gray-200 shadow-lg p-8 invoice-pattern"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            {invoiceData.headerImage && (
              <img 
                src={invoiceData.headerImage} 
                alt="Company Logo" 
                className="h-16 w-auto mb-4 object-contain"
              />
            )}
            <h1 className="text-3xl font-bold gradient-text">INVOICE</h1>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Invoice Number</div>
            <div className="text-lg font-semibold">{invoiceData.invoiceNumber}</div>
          </div>
        </div>
        
        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="text-sm text-gray-600 mb-2">Date</div>
            <div className="font-medium">{formatDate(invoiceData.date)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Due Date</div>
            <div className="font-medium">{formatDate(invoiceData.dueDate)}</div>
          </div>
        </div>
        
        {/* From/To */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="text-sm text-gray-600 mb-2 font-medium">From</div>
            <div className="space-y-1">
              {invoiceData.from.name && (
                <div className="font-semibold">{invoiceData.from.name}</div>
              )}
              {invoiceData.from.email && (
                <div className="text-sm">{invoiceData.from.email}</div>
              )}
              {invoiceData.from.phone && (
                <div className="text-sm">{invoiceData.from.phone}</div>
              )}
              {invoiceData.from.address && (
                <div className="text-sm whitespace-pre-line">{invoiceData.from.address}</div>
              )}
              {invoiceData.from.taxId && (
                <div className="text-sm">Tax ID: {invoiceData.from.taxId}</div>
              )}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-600 mb-2 font-medium">Bill To</div>
            <div className="space-y-1">
              {invoiceData.to.name && (
                <div className="font-semibold">{invoiceData.to.name}</div>
              )}
              {invoiceData.to.company && (
                <div className="text-sm">{invoiceData.to.company}</div>
              )}
              {invoiceData.to.email && (
                <div className="text-sm">{invoiceData.to.email}</div>
              )}
              {invoiceData.to.phone && (
                <div className="text-sm">{invoiceData.to.phone}</div>
              )}
              {invoiceData.to.address && (
                <div className="text-sm whitespace-pre-line">{invoiceData.to.address}</div>
              )}
            </div>
          </div>
        </div>
        
        {/* Line Items */}
        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 font-medium text-gray-600">Description</th>
                <th className="text-right py-3 font-medium text-gray-600">Qty</th>
                <th className="text-right py-3 font-medium text-gray-600">Rate</th>
                <th className="text-right py-3 font-medium text-gray-600">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3">{item.description}</td>
                  <td className="py-3 text-right">{item.quantity}</td>
                  <td className="py-3 text-right">{currencySymbol}{item.rate.toFixed(2)}</td>
                  <td className="py-3 text-right font-medium number-animate">
                    {currencySymbol}{item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium number-animate">
                {currencySymbol}{subtotal.toFixed(2)}
              </span>
            </div>
            
            {invoiceData.taxRate > 0 && (
              <div className="flex justify-between">
                <span>Tax ({invoiceData.taxRate}%):</span>
                <span className="font-medium number-animate">
                  {currencySymbol}{taxAmount.toFixed(2)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg gradient-text number-animate">
                {currencySymbol}{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Notes & Terms */}
        {(invoiceData.notes || invoiceData.terms) && (
          <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
            {invoiceData.notes && (
              <div>
                <div className="font-medium text-gray-600 mb-2">Notes</div>
                <div className="text-sm whitespace-pre-line">{invoiceData.notes}</div>
              </div>
            )}
            
            {invoiceData.terms && (
              <div>
                <div className="font-medium text-gray-600 mb-2">Terms & Conditions</div>
                <div className="text-sm whitespace-pre-line">{invoiceData.terms}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default InvoicePreview