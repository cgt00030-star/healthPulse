'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Thermometer, Heart, Activity, Wind } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { BottomNav } from '@/components/navigation/BottomNav'
import TrendChart from "@/components/TrendChart";


// Mock data for demo
const mockData = {
  feverReports: 142,
  coughReports: 98,
  recoveryRate: 87,
  weeklyTrend: [
    { day: 'Mon', fever: 12, cough: 8 },
    { day: 'Tue', fever: 18, cough: 12 },
    { day: 'Wed', fever: 25, cough: 15 },
    { day: 'Thu', fever: 22, cough: 18 },
    { day: 'Fri', fever: 20, cough: 14 },
    { day: 'Sat', fever: 15, cough: 10 },
    { day: 'Sun', fever: 18, cough: 11 },
  ],
  nearbyWards: [
    { id: '12', fever: 14, cough: 9 },
    { id: '13', fever: 8, cough: 6 },
    { id: '14', fever: 22, cough: 15 },
    { id: '15', fever: 11, cough: 8 },
  ]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

export default function Home() {
  const [data, setData] = useState(mockData)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        feverReports: prev.feverReports + Math.floor(Math.random() * 3) - 1,
        coughReports: prev.coughReports + Math.floor(Math.random() * 3) - 1,
        recoveryRate: Math.min(100, Math.max(70, prev.recoveryRate + (Math.random() * 6 - 3)))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold font-poppins text-gray-900">
              HealthPulse
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Your Area's Health Today
            </p>
          </motion.div>
        </div>
      </header>

     <main className="w-full max-w-md mx-auto px-4 py-6 space-y-6">

        {/* Health Overview Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-900 font-poppins">
            Health Overview
          </h2>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {/* Fever Reports Card */}
            <motion.div variants={cardVariants} className="flex-shrink-0">
              <Card className="w-40 bg-gradient-to-br from-primary to-secondary border-none">
                <CardContent className="p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <Thermometer size={24} />
                    <Activity size={16} className="animate-pulse" />
                  </div>
                  <div className="text-2xl font-bold">{data.feverReports}</div>
                  <div className="text-sm opacity-90">Fever Reports</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cough Reports Card */}
            <motion.div variants={cardVariants} className="flex-shrink-0">
              <Card className="w-40 bg-gradient-to-br from-primary to-secondary border-none">
                <CardContent className="p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <Wind size={24} />
                    <Activity size={16} className="animate-pulse" />
                  </div>
                  <div className="text-2xl font-bold">{data.coughReports}</div>
                  <div className="text-sm opacity-90">Cough Reports</div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recovery Rate Card */}
            <motion.div variants={cardVariants} className="flex-shrink-0">
              <Card className="w-40 bg-gradient-to-br from-primary to-secondary border-none">
                <CardContent className="p-4 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <Heart size={24} />
                    <Activity size={16} className="animate-pulse" />
                  </div>
                  <div className="text-2xl font-bold">{Math.round(data.recoveryRate)}%</div>

                  <div className="text-sm opacity-90">Recovery Rate</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Weekly Health Trend Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-900 font-poppins">
            Weekly Health Trend
          </h2>
          <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border border-gray-100">
            <CardContent className="p-6">
              {/* <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Activity size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Trend Chart Loading...</p>
                  <p className="text-xs mt-1">Fever and cough trends over 7 days</p>
                </div>
              </div> */}
              <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border border-gray-100">
  <CardContent className="p-4">
    <TrendChart weeklyTrend={data.weeklyTrend} />
  </CardContent>
</Card>

            </CardContent>
          </Card>
        </motion.div>

        {/* Nearby Wards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-900 font-poppins">
            Nearby Wards
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {data.nearbyWards.map((ward, index) => (
              <motion.div
                key={ward.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="font-semibold text-gray-900 mb-1">
                      Ward {ward.id}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>{ward.fever} fever cases</div>
                      <div>{ward.cough} cough cases</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}