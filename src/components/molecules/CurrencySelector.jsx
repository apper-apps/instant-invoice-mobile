import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const currencies = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
  { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'CHF', symbol: 'CHF', label: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', label: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { code: 'BRL', symbol: 'R$', label: 'Brazilian Real' }
]

const CurrencySelector = ({ value, onChange, label = "Currency" }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const selectedCurrency = currencies.find(c => c.code === value) || currencies[0]
  
  const handleSelect = (currency) => {
    onChange(currency.code)
    setIsOpen(false)
  }
  
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-secondary">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{selectedCurrency.symbol}</span>
              <span className="text-sm text-gray-600">{selectedCurrency.code}</span>
            </div>
            <ApperIcon 
              name="ChevronDown" 
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  type="button"
                  onClick={() => handleSelect(currency)}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    currency.code === value ? 'bg-primary/5 text-primary' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{currency.symbol}</span>
                      <span className="text-sm">{currency.code}</span>
                    </div>
                    <span className="text-xs text-gray-500">{currency.label}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CurrencySelector