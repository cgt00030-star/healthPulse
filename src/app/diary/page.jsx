'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, TrendingUp, Plus } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BottomNav } from '@/components/navigation/BottomNav'

const mockEntries = [
  {
    id: '1',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    symptoms: ['Fever', 'Fatigue'],
    severity: 3,
    notes: 'Started feeling feverish in the evening'
  },
  {
    id: '2',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    symptoms: ['Cough', 'Cold'],
    severity: 2,
    notes: 'Mild cough, mostly in the morning'
  },
  {
    id: '3',
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    symptoms: ['Fever', 'Body Pain'],
    severity: 4,
    notes: 'High fever and muscle aches'
  },
]

export default function DiaryPage() {
  const [entries, setEntries] = useState(mockEntries)
  const [expandedEntry, setExpandedEntry] = useState(null)
  const [daysSickThisMonth, setDaysSickThisMonth] = useState(3)
  const [averageRecoveryTime, setAverageRecoveryTime] = useState(4.5)

  // Calculate personal stats
  useEffect(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const thisMonthEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date)
      return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear
    })

    setDaysSickThisMonth(thisMonthEntries.length)

    // Calculate average recovery time (days between entries)
    if (entries.length > 1) {
      const sortedEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime())
      const recoveryTimes = []

      for (let i = 0; i < sortedEntries.length - 1; i++) {
        const daysDiff = Math.ceil((sortedEntries[i].date.getTime() - sortedEntries[i + 1].date.getTime()) / (1000 * 60 * 60 * 24))
        if (daysDiff > 0 && daysDiff <= 14) { // Only consider reasonable recovery periods
          recoveryTimes.push(daysDiff)
        }
      }

      if (recoveryTimes.length > 0) {
        const avgRecovery = recoveryTimes.reduce((sum, time) => sum + time, 0) / recoveryTimes.length
        setAverageRecoveryTime(Math.round(avgRecovery * 10) / 10)
      }
    }
  }, [entries])

  const getSeverityColor = (severity) => {
    if (severity <= 2) return 'text-green-600 bg-green-100'
    if (severity <= 3) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  const getDaysAgo = (date) => {
    const daysDiff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (daysDiff === 0) return 'Today'
    if (daysDiff === 1) return 'Yesterday'
    return `${daysDiff} days ago`
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold font-poppins text-gray-900">
            My Health Diary
          </h1>
          <p className="text-sm text-gray-600">
            Track your personal health journey
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Personal Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="text-primary" size={20} />
                <span className="text-2xl font-bold text-gray-900">{daysSickThisMonth}</span>
              </div>
              <div className="text-sm text-gray-600">Days Sick This Month</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-blue-50 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Clock className="text-secondary" size={20} />
                <span className="text-2xl font-bold text-gray-900">{averageRecoveryTime}</span>
              </div>
              <div className="text-sm text-gray-600">Avg Recovery (days)</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal Trend Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp size={20} className="mr-2 text-primary" />
                Personal Health Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <TrendingUp size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Personal trend chart</p>
                  <p className="text-xs mt-1">Track your symptoms over time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 font-poppins">
              Health Timeline
            </h2>
            <Link href="/report">
              <Button variant="outline" size="sm">
                <Plus size={16} className="mr-1" />
                Add Entry
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {formatDate(entry.date)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {getDaysAgo(entry.date)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                          {entry.symptoms.map(symptom => (
                            <span
                              key={symptom}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>

                        {expandedEntry === entry.id && entry.notes && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 pt-3 border-t border-gray-100"
                          >
                            <p className="text-sm text-gray-600">{entry.notes}</p>
                          </motion.div>
                        )}
                      </div>

                      <div className="ml-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(entry.severity)}`}>
                          {entry.severity}/5
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {entries.length === 0 && (
              <Card className="border-dashed border-gray-200">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <Calendar size={32} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No health entries yet
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Start tracking your health journey by adding your first entry.
                  </p>
                  <Link href="/report">
                    <Button variant="outline" size="sm">
                      <Plus size={16} className="mr-1" />
                      Add First Entry
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>

        {/* Offline Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-gray-500"
        >
          <p>Your health data is stored locally and synced when online.</p>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}