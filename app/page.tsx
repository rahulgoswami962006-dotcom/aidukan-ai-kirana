'use client'

import { useState, useEffect } from 'react'
import { Mic, Camera, Package, TrendingUp, Users, FileText, Menu, X } from 'lucide-react'
import Dashboard from '@/components/Dashboard'
import VoiceSale from '@/components/VoiceSale'
import PhotoProduct from '@/components/PhotoProduct'
import Inventory from '@/components/Inventory'
import Billing from '@/components/Billing'
import Reports from '@/components/Reports'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
    { id: 'voice', name: 'Voice Sale', icon: Mic },
    { id: 'photo', name: 'Add Product', icon: Camera },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'billing', name: 'Billing', icon: FileText },
    { id: 'reports', name: 'Reports', icon: Users },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'voice':
        return <VoiceSale />
      case 'photo':
        return <PhotoProduct />
      case 'inventory':
        return <Inventory />
      case 'billing':
        return <Billing />
      case 'reports':
        return <Reports />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Aidukan</h1>
                <p className="text-xs text-primary-100">AI Vyapar for Kirana</p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-primary-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block lg:w-64 space-y-2`}>
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}
