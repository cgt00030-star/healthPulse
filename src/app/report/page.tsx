'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { BottomNav } from '@/components/navigation/BottomNav'

const symptoms = [
  { id: 'fever', label: 'Fever', description: 'High body temperature' },
  { id: 'cough', label: 'Cough', description: 'Persistent coughing' },
  { id: 'fatigue', label: 'Fatigue', description: 'Extreme tiredness' },
  { id: 'cold', label: 'Cold', description: 'Runny nose or congestion' },
  { id: 'bodyPain', label: 'Body Pain', description: 'Muscle or joint pain' },
]

const wards = [
  'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5',
  'Ward 6', 'Ward 7', 'Ward 8', 'Ward 9', 'Ward 10',
  'Ward 11', 'Ward 12', 'Ward 13', 'Ward 14', 'Ward 15',
]

export default function ReportPage() {
  const router = useRouter()
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [selectedWard, setSelectedWard] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSymptomChange = (symptomId: string, checked: boolean) => {
    setSelectedSymptoms(prev =>
      checked
        ? [...prev, symptomId]
        : prev.filter(id => id !== symptomId)
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedSymptoms.length === 0 || !selectedWard) {
      alert('Please select at least one symptom and your ward')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowSuccess(true)

    // Reset form after delay
    setTimeout(() => {
      setShowSuccess(false)
      setSelectedSymptoms([])
      setSelectedWard('')
      router.push('/')
    }, 3000)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="mb-6">
            <CheckCircle2 size={64} className="mx-auto text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Report Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Your symptoms have been recorded anonymously.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting to dashboard...
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-6">
        <div className="max-w-md mx-auto flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <h1 className="text-xl font-bold font-heading text-gray-900">
            Report Your Symptoms
          </h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Symptoms Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Symptoms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {symptoms.map((symptom, index) => (
                  <motion.div
                    key={symptom.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <Checkbox
                      id={symptom.id}
                      checked={selectedSymptoms.includes(symptom.id)}
                      onCheckedChange={(checked) =>
                        handleSymptomChange(symptom.id, checked as boolean)
                      }
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={symptom.id}
                        className="text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        {symptom.label}
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        {symptom.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Ward Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Select Your Ward</CardTitle>
              </CardHeader>
              <CardContent>
                <select
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-teal focus:border-transparent"
                  required
                >
                  <option value="">Choose your ward</option>
                  {wards.map(ward => (
                    <option key={ward} value={ward}>
                      {ward}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              type="submit"
              className="w-full gradient"
              disabled={isSubmitting || selectedSymptoms.length === 0 || !selectedWard}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit Report'
              )}
            </Button>
          </motion.div>

          {/* Privacy Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-gray-500 mt-4"
          >
            <p>Your report is completely anonymous.</p>
            <p>No personal information is stored.</p>
          </motion.div>
        </form>
      </main>

      <BottomNav />
    </div>
  )
}