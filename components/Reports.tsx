'use client'

import { useState } from 'react'
import { FileText, Download, Calendar, TrendingUp, DollarSign, Package } from 'lucide-react'

export default function Reports() {
  const [dateRange, setDateRange] = useState('today')

  const reports = [
    {
      title: 'Sales Report',
      description: 'Daily sales summary with product breakdown',
      icon: DollarSign,
      color: 'bg-green-500',
      value: '₹12,450',
      change: '+12.5%'
    },
    {
      title: 'Profit & Loss',
      description: 'Revenue, expenses, and net profit analysis',
      icon: TrendingUp,
      color: 'bg-blue-500',
      value: '₹2,890',
      change: '+8.2%'
    },
    {
      title: 'Stock Report',
      description: 'Current inventory levels and valuations',
      icon: Package,
      color: 'bg-purple-500',
      value: '234 items',
      change: '-3 items'
    },
    {
      title: 'GST Report',
      description: 'Tax collected and input credit summary',
      icon: FileText,
      color: 'bg-orange-500',
      value: '₹622',
      change: 'This month'
    },
  ]

  const recentTransactions = [
    { id: 1, date: '2024-12-02', customer: 'Ramesh Kumar', amount: 450, type: 'Sale' },
    { id: 2, date: '2024-12-02', customer: 'Priya Sharma', amount: 280, type: 'Sale' },
    { id: 3, date: '2024-12-02', customer: 'Amit Patel', amount: 1200, type: 'Sale' },
    { id: 4, date: '2024-12-01', customer: 'Supplier XYZ', amount: 5000, type: 'Purchase' },
    { id: 5, date: '2024-12-01', customer: 'Neha Singh', amount: 350, type: 'Sale' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
            <p className="text-gray-600">Business insights and performance metrics</p>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {reports.map((report, index) => {
            const Icon = report.icon
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${report.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    <Download size={20} />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{report.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{report.description}</p>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-gray-900">{report.value}</span>
                  <span className="text-sm text-green-600">{report.change}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Transactions */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'Sale' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      transaction.type === 'Sale' ? 'text-green-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.customer}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'Sale' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {transaction.type === 'Sale' ? '+' : '-'}₹{transaction.amount}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2">
            <Download size={20} />
            <span>Export All Reports</span>
          </button>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center space-x-2">
            <FileText size={20} />
            <span>Generate GST Report</span>
          </button>
        </div>
      </div>
    </div>
  )
}
