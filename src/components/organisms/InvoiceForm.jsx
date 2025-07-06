import { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import TextArea from '@/components/atoms/TextArea'
import Button from '@/components/atoms/Button'
import FormSection from '@/components/molecules/FormSection'
import ImageUpload from '@/components/molecules/ImageUpload'
import CurrencySelector from '@/components/molecules/CurrencySelector'
import LineItemsTable from '@/components/organisms/LineItemsTable'
import ApperIcon from '@/components/ApperIcon'

const InvoiceForm = ({ invoiceData, onInvoiceChange }) => {
  const [formData, setFormData] = useState(invoiceData)
  
  const handleInputChange = (field, value) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onInvoiceChange(newData)
  }
  
  const handleNestedChange = (parent, field, value) => {
    const newData = {
      ...formData,
      [parent]: {
        ...formData[parent],
        [field]: value
      }
    }
    setFormData(newData)
    onInvoiceChange(newData)
  }
  
  const handleItemsChange = (items) => {
    const newData = { ...formData, items }
    setFormData(newData)
    onInvoiceChange(newData)
  }
  
  const generateInvoiceNumber = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `INV-${timestamp}-${random}`
  }
  
  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0]
  }
  
  const getDueDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    return date.toISOString().split('T')[0]
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-lg text-white">
        <h1 className="text-2xl font-bold mb-2">Create Invoice</h1>
        <p className="text-blue-100">Fill out the form to generate your professional invoice</p>
      </div>
      
      {/* Company Logo */}
      <FormSection title="Company Logo" description="Upload your company logo for branding">
        <ImageUpload 
          onImageUpload={(image) => handleInputChange('headerImage', image)}
          currentImage={formData.headerImage}
          label="Company Logo"
        />
      </FormSection>
      
      {/* Invoice Details */}
      <FormSection title="Invoice Details" description="Set invoice number, dates, and currency">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Invoice Number"
              value={formData.invoiceNumber}
              onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
              placeholder="Enter invoice number"
              required
            />
            <button
              type="button"
              onClick={() => handleInputChange('invoiceNumber', generateInvoiceNumber())}
              className="mt-1 text-xs text-primary hover:text-accent transition-colors"
            >
              Generate automatically
            </button>
          </div>
          
          <CurrencySelector
            value={formData.currency}
            onChange={(currency) => handleInputChange('currency', currency)}
          />
          
          <div>
            <Input
              label="Invoice Date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => handleInputChange('date', getCurrentDate())}
              className="mt-1 text-xs text-primary hover:text-accent transition-colors"
            >
              Use today's date
            </button>
          </div>
          
          <div>
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => handleInputChange('dueDate', getDueDate())}
              className="mt-1 text-xs text-primary hover:text-accent transition-colors"
            >
              30 days from today
            </button>
          </div>
        </div>
      </FormSection>
      
      {/* From (Business Details) */}
      <FormSection title="From (Your Business)" description="Your business information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Business Name"
            value={formData.from.name}
            onChange={(e) => handleNestedChange('from', 'name', e.target.value)}
            placeholder="Your business name"
            required
          />
          
          <Input
            label="Email"
            type="email"
            value={formData.from.email}
            onChange={(e) => handleNestedChange('from', 'email', e.target.value)}
            placeholder="your@email.com"
            required
          />
          
          <Input
            label="Phone"
            value={formData.from.phone}
            onChange={(e) => handleNestedChange('from', 'phone', e.target.value)}
            placeholder="Your phone number"
          />
          
          <Input
            label="Tax ID"
            value={formData.from.taxId}
            onChange={(e) => handleNestedChange('from', 'taxId', e.target.value)}
            placeholder="Tax ID / VAT number"
          />
          
          <div className="md:col-span-2">
            <TextArea
              label="Address"
              value={formData.from.address}
              onChange={(e) => handleNestedChange('from', 'address', e.target.value)}
              placeholder="Your business address"
              rows={2}
            />
          </div>
        </div>
      </FormSection>
      
      {/* To (Client Details) */}
      <FormSection title="Bill To (Client)" description="Your client's information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Client Name"
            value={formData.to.name}
            onChange={(e) => handleNestedChange('to', 'name', e.target.value)}
            placeholder="Client name"
            required
          />
          
          <Input
            label="Company"
            value={formData.to.company}
            onChange={(e) => handleNestedChange('to', 'company', e.target.value)}
            placeholder="Client company"
          />
          
          <Input
            label="Email"
            type="email"
            value={formData.to.email}
            onChange={(e) => handleNestedChange('to', 'email', e.target.value)}
            placeholder="client@email.com"
          />
          
          <Input
            label="Phone"
            value={formData.to.phone}
            onChange={(e) => handleNestedChange('to', 'phone', e.target.value)}
            placeholder="Client phone number"
          />
          
          <div className="md:col-span-2">
            <TextArea
              label="Address"
              value={formData.to.address}
              onChange={(e) => handleNestedChange('to', 'address', e.target.value)}
              placeholder="Client address"
              rows={2}
            />
          </div>
        </div>
      </FormSection>
      
      {/* Line Items */}
      <FormSection title="Line Items" description="Add products or services">
        <LineItemsTable
          items={formData.items}
          onItemsChange={handleItemsChange}
          currency={formData.currency}
        />
      </FormSection>
      
      {/* Tax */}
      <FormSection title="Tax & Calculations" description="Set tax rate and view totals">
        <div className="space-y-4">
          <div className="max-w-xs">
            <Input
              label="Tax Rate (%)"
              type="number"
              value={formData.taxRate}
              onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value) || 0)}
              placeholder="0"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>
      </FormSection>
      
      {/* Notes & Terms */}
      <FormSection title="Additional Information" description="Add notes or terms">
        <div className="space-y-4">
          <TextArea
            label="Notes"
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Any additional notes or comments"
            rows={3}
          />
          
          <TextArea
            label="Terms & Conditions"
            value={formData.terms}
            onChange={(e) => handleInputChange('terms', e.target.value)}
            placeholder="Payment terms, late fees, etc."
            rows={3}
          />
        </div>
      </FormSection>
    </div>
  )
}

export default InvoiceForm