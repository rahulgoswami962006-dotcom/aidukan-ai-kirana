'use client'

import { useState } from 'react'
import { Mic, MicOff, CheckCircle, AlertCircle } from 'lucide-react'

export default function VoiceSale() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const startListening = () => {
    setIsListening(true)
    setError('')
    setResult(null)
    
    // Simulate voice recognition
    setTimeout(() => {
      const sampleTranscript = "100 rupaye ka Fortune oil bech diya"
      setTranscript(sampleTranscript)
      processVoiceCommand(sampleTranscript)
      setIsListening(false)
    }, 2000)
  }

  const processVoiceCommand = (command: string) => {
    // AI processing simulation
    setTimeout(() => {
      setResult({
        product: 'Fortune Refined Oil 1L',
        quantity: 1,
        price: 100,
        action: 'Sale Recorded',
        stockUpdated: true,
        customerBill: 'Added to cash sale'
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Voice-to-Sale</h2>
        <p className="text-gray-600 mb-6">Speak naturally to record sales instantly</p>

        {/* Voice Button */}
        <div className="flex flex-col items-center justify-center py-12">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`w-32 h-32 rounded-full flex items-center justify-center transition-all transform hover:scale-105 ${
              isListening
                ? 'bg-red-500 animate-pulse'
                : 'bg-primary-500 hover:bg-primary-600'
            } shadow-2xl`}
          >
            {isListening ? (
              <MicOff className="w-16 h-16 text-white" />
            ) : (
              <Mic className="w-16 h-16 text-white" />
            )}
          </button>
          <p className="mt-4 text-lg font-medium text-gray-700">
            {isListening ? 'Listening...' : 'Tap to speak'}
          </p>
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-1">You said:</p>
            <p className="text-lg font-medium text-gray-900">{transcript}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">Sale Recorded Successfully!</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-medium">{result.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-medium">{result.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium text-green-600">₹{result.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stock:</span>
                <span className="font-medium text-green-600">Updated ✓</span>
              </div>
            </div>
          </div>
        )}

        {/* Examples */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Example Commands:</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• "100 rupaye ka Fortune oil bech diya"</li>
            <li>• "2 packet Maggi 24 rupaye mein becha"</li>
            <li>• "Tata salt 1 kg 20 rupaye"</li>
            <li>• "Parle-G biscuit 5 rupaye ka becha"</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
