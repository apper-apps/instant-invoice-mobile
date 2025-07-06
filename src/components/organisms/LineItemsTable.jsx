import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { getCurrencySymbol } from '@/utils/currency'

const LineItemsTable = ({ items, onItemsChange, currency }) => {
  const [editingId, setEditingId] = useState(null)
  
  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    }
    onItemsChange([...items, newItem])
    setEditingId(newItem.id)
  }
  
  const updateItem = (id, field, value) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        // Recalculate amount
        if (field === 'quantity' || field === 'rate') {
          updated.amount = updated.quantity * updated.rate
        }
        return updated
      }
      return item
    })
    onItemsChange(updatedItems)
  }
  
  const removeItem = (id) => {
    onItemsChange(items.filter(item => item.id !== id))
  }
  
  const currencySymbol = getCurrencySymbol(currency)
  
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 text-sm font-medium text-gray-600">Description</th>
              <th className="text-right py-2 px-2 text-sm font-medium text-gray-600 min-w-20">Qty</th>
              <th className="text-right py-2 px-2 text-sm font-medium text-gray-600 min-w-24">Rate</th>
              <th className="text-right py-2 px-2 text-sm font-medium text-gray-600 min-w-24">Amount</th>
              <th className="w-12 py-2 px-2"></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {items.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-gray-100"
                >
                  <td className="py-2 px-2">
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description"
                      className="border-0 p-0 focus:ring-0 focus:border-0"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                      className="border-0 p-0 focus:ring-0 focus:border-0 text-right"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center justify-end">
                      <span className="text-sm text-gray-500 mr-1">{currencySymbol}</span>
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="0.01"
                        className="border-0 p-0 focus:ring-0 focus:border-0 text-right"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-2 text-right">
                    <span className="font-medium number-animate">
                      {currencySymbol}{item.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="p-1 h-8 w-8 text-gray-400 hover:text-error"
                    >
                      <ApperIcon name="Trash2" className="h-4 w-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-start">
        <Button
          variant="outline"
          onClick={addItem}
          icon="Plus"
          size="sm"
        >
          Add Line Item
        </Button>
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ApperIcon name="Package" className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>No items added yet. Click "Add Line Item" to get started.</p>
        </div>
      )}
    </div>
  )
}

export default LineItemsTable