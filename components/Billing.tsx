'use client'

import { useState } from 'react'
import { Plus, Trash2, Printer, Share2, Download } from 'lucide-react'

export default function Billing() {
  const [billItems, setBillItems] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const products = [
    { name: 'Fortune Oil 1L', price: 150 },
    { name: 'Tata Salt 1kg', price: 20 },
    { name: 'Parle-G 100g', price: 5 },
    { name: 'Maggi Noodles', price: 14 },
    { name: 'Colgate 200g', price: 85 },
  ]

  const addItem = () => {
    if (selectedProduct && quantity > 0) {
      const product = products.find(p => p.name === selectedProduct)
      if (product) {
        setBillItems([...billItems, {
          id: Date.now(),
          name: product.name,
          price: product.price,
          quantity: quantity,
          total: product.price * quantity
        }])
        setSelectedProduct('')
        setQuantity(1)
      }
    }
  }

  const removeItem = (id: number) => {
    setBillItems(billItems.filter(item => item.id !== id))
  }

  const subtotal = billItems.reduce((sum, item) => sum + item.total, 0)
  const gst = subtotal * 0.05 // 5% GST
  const total = subtotal + gst

  const generateBill = () => {
    alert('Bill generated! Ready to print/share')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Bill</h2>

        {/* Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Add Items */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Add Items</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Product</option>
                {products.map((product) => (
                  <option key={product.name} value={product.name}>
                    {product.name} - ₹{product.price}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                onClick={addItem}
                className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus size={20} />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bill Items */}
        {billItems.length > 0 && (
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {billItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">₹{item.price}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{item.total}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bill Summary */}
        {billItems.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>GST (5%):</span>
                <span className="font-medium">₹{gst.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span className="text-primary-600">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        {billItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={generateBill}
              className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Printer size={20} />
              <span>Print Bill</span>
            </button>
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
              <Share2 size={20} />
              <span>Share WhatsApp</span>
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
              <Download size={20} />
              <span>Download PDF</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
