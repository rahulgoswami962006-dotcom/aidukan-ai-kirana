'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Package, Users, DollarSign, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [stats, setStats] = useState({
    todaySales: 12450,
    totalProducts: 234,
    lowStock: 12,
    customers: 89,
    salesGrowth: 12.5,
    profitMargin: 18.2
  })

  const salesData = [
    { day: 'Mon', sales: 8500 },
    { day: 'Tue', sales: 9200 },
    { day: 'Wed', sales: 11000 },
    { day: 'Thu', sales: 10500 },
    { day: 'Fri', sales: 13000 },
    { day: 'Sat', sales: 15500 },
    { day: 'Sun', sales: 12450 },
  ]

  const topProducts = [
    { name: 'Fortune Oil 1L', sold: 45, revenue: 6750 },
    { name: 'Tata Salt 1kg', sold: 89, revenue: 1780 },
    { name: 'Parle-G 100g', sold: 156, revenue: 780 },
    { name: 'Maggi Noodles', sold: 67, revenue: 938 },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Sales"
          value={`₹${stats.todaySales.toLocaleString()}`}
          icon={DollarSign}
          trend={stats.salesGrowth}
          trendUp={true}
          color="bg-green-500"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="bg-blue-500"
        />
        <StatCard
          title="Low Stock Alert"
          value={stats.lowStock}
          icon={AlertCircle}
          color="bg-red-500"
        />
        <StatCard
          title="Customers"
          value={stats.customers}
          icon={Users}
          color="bg-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sold} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary-600">₹{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-start space-x-3">
          <TrendingUp className="w-6 h-6 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">AI Business Insights</h3>
            <ul className="space-y-2 text-primary-50">
              <li>• Fortune Oil sales up 25% this week - consider stocking more</li>
              <li>• 12 products running low - reorder recommended</li>
              <li>• Weekend sales peak at 3-5 PM - optimize staffing</li>
              <li>• Maggi Noodles trending in your area - increase inventory</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, trend, trendUp, color }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trendUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <span className="ml-1">{trend}%</span>
            </div>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}
