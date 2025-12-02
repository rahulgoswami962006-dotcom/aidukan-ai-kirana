'use client'

import { useState } from 'react'
import { Camera, Upload, CheckCircle, Loader } from 'lucide-react'

export default function PhotoProduct() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        processImage()
      }
      reader.readAsDataURL(file)
    }
  }

  const processImage = () => {
    setIsProcessing(true)
    setResult(null)

    // Simulate AI image recognition
    setTimeout(() => {
      setResult({
        productName: 'Fortune Refined Sunflower Oil',
        brand: 'Fortune',
        category: 'Cooking Oil',
        size: '1 Liter',
        mrp: 150,
        suggestedPrice: 145,
        barcode: '8901234567890',
        sku: 'FOR-OIL-1L-001'
      })
      setIsProcessing(false)
    }, 2500)
  }

  const saveProduct = () => {
    alert('Product added to inventory!')
    setSelectedImage(null)
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Photo-to-Product</h2>
        <p className="text-gray-600 mb-6">Take a photo to automatically add products to inventory</p>

        {/* Upload Area */}
        {!selectedImage && (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary-500 transition-colors">
            <label htmlFor="image-upload" className="cursor-pointer">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">Take or Upload Photo</p>
              <p className="text-sm text-gray-500">Click to capture or select product image</p>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* Image Preview */}
        {selectedImage && (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Product"
                className="w-full max-h-96 object-contain rounded-lg border-2 border-gray-200"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="text-center text-white">
                    <Loader className="w-12 h-12 animate-spin mx-auto mb-2" />
                    <p className="font-medium">AI Processing Image...</p>
                  </div>
                </div>
              )}
            </div>

            {/* AI Results */}
            {result && (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Product Identified!</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm text-gray-600">Product Name</label>
                    <p className="font-medium text-gray-900">{result.productName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Brand</label>
                    <p className="font-medium text-gray-900">{result.brand}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Category</label>
                    <p className="font-medium text-gray-900">{result.category}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Size</label>
                    <p className="font-medium text-gray-900">{result.size}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">MRP</label>
                    <p className="font-medium text-green-600">₹{result.mrp}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Suggested Price</label>
                    <p className="font-medium text-green-600">₹{result.suggestedPrice}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">SKU</label>
                    <p className="font-medium text-gray-900">{result.sku}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Barcode</label>
                    <p className="font-medium text-gray-900">{result.barcode}</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={saveProduct}
                    className="flex-1 bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                  >
                    Add to Inventory
                  </button>
                  <button
                    onClick={() => {
                      setSelectedImage(null)
                      setResult(null)
                    }}
                    className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Take a clear photo of the product label</li>
            <li>• AI identifies brand, size, and category</li>
            <li>• Auto-generates SKU and barcode</li>
            <li>• Suggests optimal pricing</li>
            <li>• Adds to inventory with one click</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
