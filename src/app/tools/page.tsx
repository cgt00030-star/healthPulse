'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, Pill, Clock, ExternalLink, Bell, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BottomNav } from '@/components/navigation/BottomNav'

interface MedicineReminder {
  id: string
  name: string
  time: string
  frequency: 'daily' | 'weekly' | 'as_needed'
  enabled: boolean
}

export default function ToolsPage() {
  const [reminders, setReminders] = useState<MedicineReminder[]>([
    {
      id: '1',
      name: 'Vitamin D',
      time: '09:00',
      frequency: 'daily',
      enabled: true
    },
    {
      id: '2',
      name: 'Pain Reliever',
      time: '20:00',
      frequency: 'as_needed',
      enabled: false
    }
  ])
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')

  useEffect(() => {
    // Check notification permission on mount
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
    }
  }, [])

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)

      if (permission === 'granted') {
        // Show a test notification
        new Notification('HealthPulse', {
          body: 'Notifications enabled! You\'ll receive medicine reminders.',
          icon: '/icon-192x192.png'
        })
      }
    }
  }

  const findDoctor = () => {
    // Open Google Maps with nearby clinics/hospitals
    const query = encodeURIComponent('nearby clinics hospitals')
    window.open(`https://www.google.com/maps/search/${query}`, '_blank')
  }

  const addReminder = () => {
    const name = prompt('Medicine name:')
    if (!name) return

    const time = prompt('Time (HH:MM format):', '09:00')
    if (!time) return

    const frequency = prompt('Frequency (daily/weekly/as_needed):', 'daily') as 'daily' | 'weekly' | 'as_needed'
    if (!frequency || !['daily', 'weekly', 'as_needed'].includes(frequency)) return

    const newReminder: MedicineReminder = {
      id: Date.now().toString(),
      name,
      time,
      frequency,
      enabled: true
    }

    setReminders(prev => [...prev, newReminder])

    // Schedule notification if enabled
    if (notificationPermission === 'granted') {
      scheduleNotification(newReminder)
    }
  }

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ))
  }

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id))
  }

  const scheduleNotification = (reminder: MedicineReminder) => {
    if (!reminder.enabled || notificationPermission !== 'granted') return

    const [hours, minutes] = reminder.time.split(':').map(Number)
    const now = new Date()
    const scheduledTime = new Date()
    scheduledTime.setHours(hours, minutes, 0, 0)

    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1)
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime()

    if (reminder.frequency === 'daily') {
      setTimeout(() => {
        new Notification('Medicine Reminder', {
          body: `Time to take ${reminder.name}`,
          icon: '/icon-192x192.png',
          requireInteraction: true
        })

        // Schedule next day
        scheduleNotification(reminder)
      }, timeUntilNotification)
    }
  }

  // Schedule notifications for enabled reminders
  useEffect(() => {
    if (notificationPermission === 'granted') {
      reminders.forEach(reminder => {
        scheduleNotification(reminder)
      })
    }
  }, [reminders, notificationPermission])

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold font-heading text-gray-900">
            Health Tools
          </h1>
          <p className="text-sm text-gray-600">
            Utilities to support your health journey
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Find a Doctor Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={findDoctor}>
            <div className="bg-gradient-primary h-2"></div>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope size={24} className="mr-3 text-primary-teal" />
                Find a Doctor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                Locate nearby clinics, hospitals, and healthcare providers in your area.
              </p>
              <Button variant="outline" className="w-full group-hover:bg-primary-teal group-hover:text-white transition-colors">
                <ExternalLink size={16} className="mr-2" />
                Open in Google Maps
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Medicine Reminder Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <div className="bg-gradient-primary h-2"></div>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill size={24} className="mr-3 text-primary-blue" />
                Medicine Reminder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Set up medication reminders and receive browser notifications at scheduled times.
              </p>

              {/* Notification Permission */}
              {notificationPermission !== 'granted' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Bell size={16} className="text-amber-600" />
                    <span className="text-sm text-amber-800">
                      Enable notifications to receive medicine reminders
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={requestNotificationPermission}
                    className="mt-2 text-amber-700 border-amber-300 hover:bg-amber-100"
                  >
                    Enable Notifications
                  </Button>
                </div>
              )}

              {/* Reminders List */}
              <div className="space-y-2">
                {reminders.map((reminder, index) => (
                  <motion.div
                    key={reminder.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleReminder(reminder.id)}
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          reminder.enabled
                            ? 'bg-primary-teal border-primary-teal'
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        {reminder.enabled && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </button>
                      <div>
                        <div className="font-medium text-gray-900">{reminder.name}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-2">
                          <Clock size={12} />
                          <span>{reminder.time}</span>
                          <span>•</span>
                          <span className="capitalize">{reminder.frequency.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </motion.div>
                ))}

                {reminders.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    <Pill size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No medicine reminders set</p>
                  </div>
                )}
              </div>

              {/* Add Reminder Button */}
              <Button
                variant="outline"
                onClick={addReminder}
                className="w-full"
                disabled={notificationPermission !== 'granted'}
              >
                <Plus size={16} className="mr-2" />
                Add Reminder
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Tools Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-gray-500 space-y-2"
        >
          <p>More health tools coming soon!</p>
          <p className="text-xs">Including symptom checker, health tips, and emergency contacts.</p>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  )
}