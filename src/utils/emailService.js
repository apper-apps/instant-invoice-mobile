import { generatePDF } from './pdfGenerator'

export const sendEmail = async (invoiceData) => {
  try {
    // Since we can't actually send emails from a client-side application,
    // we'll simulate the email sending process and show a helpful message
    
    // First, generate the PDF
    await generatePDF(invoiceData)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real application, you would make an API call to your backend
    // which would handle the email sending via a service like SendGrid, Mailgun, etc.
    
    // For now, we'll open the user's email client with a pre-filled email
    const subject = encodeURIComponent(`Invoice ${invoiceData.invoiceNumber}`)
    const body = encodeURIComponent(`
Dear ${invoiceData.to.name || 'Client'},

Please find attached your invoice ${invoiceData.invoiceNumber}.

Invoice Details:
- Amount: ${invoiceData.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)} ${invoiceData.currency}
- Due Date: ${invoiceData.dueDate}

Thank you for your business!

Best regards,
${invoiceData.from.name || 'Your Business'}
    `)
    
    const mailtoLink = `mailto:${invoiceData.to.email}?subject=${subject}&body=${body}`
    window.open(mailtoLink, '_blank')
    
    return { success: true, message: 'Email client opened with pre-filled invoice details' }
    
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}