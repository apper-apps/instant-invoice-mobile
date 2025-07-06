import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { getCurrencySymbol } from './currency'
import { formatDate } from './dateFormat'

export const generatePDF = async (invoiceData) => {
  try {
    // Create a temporary div to render the invoice
    const tempDiv = document.createElement('div')
    tempDiv.style.position = 'absolute'
    tempDiv.style.left = '-9999px'
    tempDiv.style.top = '-9999px'
    tempDiv.style.width = '794px' // A4 width in pixels at 96 DPI
    tempDiv.style.backgroundColor = 'white'
    tempDiv.style.padding = '40px'
    tempDiv.style.fontFamily = 'Arial, sans-serif'
    
    document.body.appendChild(tempDiv)
    
    const currencySymbol = getCurrencySymbol(invoiceData.currency)
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0)
    const taxAmount = (subtotal * invoiceData.taxRate) / 100
    const total = subtotal + taxAmount
    
    // Generate HTML content
    tempDiv.innerHTML = `
      <div style="max-width: 700px; margin: 0 auto; line-height: 1.6; color: #1e293b;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
          <div>
            ${invoiceData.headerImage ? `<img src="${invoiceData.headerImage}" alt="Company Logo" style="height: 60px; width: auto; margin-bottom: 20px; object-fit: contain;">` : ''}
            <h1 style="font-size: 32px; font-weight: bold; margin: 0; background: linear-gradient(135deg, #2563EB, #3B82F6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">INVOICE</h1>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Invoice Number</div>
            <div style="font-size: 18px; font-weight: 600;">${invoiceData.invoiceNumber}</div>
          </div>
        </div>
        
        <!-- Invoice Details -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
          <div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Date</div>
            <div style="font-weight: 500;">${formatDate(invoiceData.date)}</div>
          </div>
          <div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Due Date</div>
            <div style="font-weight: 500;">${formatDate(invoiceData.dueDate)}</div>
          </div>
        </div>
        
        <!-- From/To -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
          <div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px; font-weight: 500;">From</div>
            <div style="line-height: 1.8;">
              ${invoiceData.from.name ? `<div style="font-weight: 600; margin-bottom: 4px;">${invoiceData.from.name}</div>` : ''}
              ${invoiceData.from.email ? `<div style="font-size: 14px; margin-bottom: 4px;">${invoiceData.from.email}</div>` : ''}
              ${invoiceData.from.phone ? `<div style="font-size: 14px; margin-bottom: 4px;">${invoiceData.from.phone}</div>` : ''}
              ${invoiceData.from.address ? `<div style="font-size: 14px; margin-bottom: 4px; white-space: pre-line;">${invoiceData.from.address}</div>` : ''}
              ${invoiceData.from.taxId ? `<div style="font-size: 14px;">Tax ID: ${invoiceData.from.taxId}</div>` : ''}
            </div>
          </div>
          
          <div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px; font-weight: 500;">Bill To</div>
            <div style="line-height: 1.8;">
              ${invoiceData.to.name ? `<div style="font-weight: 600; margin-bottom: 4px;">${invoiceData.to.name}</div>` : ''}
              ${invoiceData.to.company ? `<div style="font-size: 14px; margin-bottom: 4px;">${invoiceData.to.company}</div>` : ''}
              ${invoiceData.to.email ? `<div style="font-size: 14px; margin-bottom: 4px;">${invoiceData.to.email}</div>` : ''}
              ${invoiceData.to.phone ? `<div style="font-size: 14px; margin-bottom: 4px;">${invoiceData.to.phone}</div>` : ''}
              ${invoiceData.to.address ? `<div style="font-size: 14px; white-space: pre-line;">${invoiceData.to.address}</div>` : ''}
            </div>
          </div>
        </div>
        
        <!-- Line Items -->
        <div style="margin-bottom: 40px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid #e5e7eb;">
                <th style="text-align: left; padding: 12px 0; font-weight: 500; color: #6b7280;">Description</th>
                <th style="text-align: right; padding: 12px 0; font-weight: 500; color: #6b7280;">Qty</th>
                <th style="text-align: right; padding: 12px 0; font-weight: 500; color: #6b7280;">Rate</th>
                <th style="text-align: right; padding: 12px 0; font-weight: 500; color: #6b7280;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.items.map(item => `
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 12px 0;">${item.description}</td>
                  <td style="padding: 12px 0; text-align: right;">${item.quantity}</td>
                  <td style="padding: 12px 0; text-align: right;">${currencySymbol}${item.rate.toFixed(2)}</td>
                  <td style="padding: 12px 0; text-align: right; font-weight: 500;">${currencySymbol}${item.amount.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <!-- Totals -->
        <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
          <div style="width: 250px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span>Subtotal:</span>
              <span style="font-weight: 500;">${currencySymbol}${subtotal.toFixed(2)}</span>
            </div>
            ${invoiceData.taxRate > 0 ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Tax (${invoiceData.taxRate}%):</span>
                <span style="font-weight: 500;">${currencySymbol}${taxAmount.toFixed(2)}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between; border-top: 1px solid #e5e7eb; padding-top: 8px;">
              <span style="font-weight: 600;">Total:</span>
              <span style="font-weight: bold; font-size: 18px; background: linear-gradient(135deg, #2563EB, #3B82F6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${currencySymbol}${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <!-- Notes & Terms -->
        ${(invoiceData.notes || invoiceData.terms) ? `
          <div style="margin-top: 40px; padding-top: 40px; border-top: 1px solid #e5e7eb;">
            ${invoiceData.notes ? `
              <div style="margin-bottom: 20px;">
                <div style="font-weight: 500; color: #6b7280; margin-bottom: 8px;">Notes</div>
                <div style="font-size: 14px; white-space: pre-line;">${invoiceData.notes}</div>
              </div>
            ` : ''}
            
            ${invoiceData.terms ? `
              <div>
                <div style="font-weight: 500; color: #6b7280; margin-bottom: 8px;">Terms & Conditions</div>
                <div style="font-size: 14px; white-space: pre-line;">${invoiceData.terms}</div>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `
    
    // Convert to canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })
    
    // Remove temp div
    document.body.removeChild(tempDiv)
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgData = canvas.toDataURL('image/png')
    const imgWidth = 210
    const pageHeight = 297
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    
    let position = 0
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
    // Download PDF
    const filename = `invoice-${invoiceData.invoiceNumber || 'draft'}.pdf`
    pdf.save(filename)
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}