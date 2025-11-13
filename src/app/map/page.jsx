'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Activity, AlertTriangle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Card, CardContent } from '@/components/ui/card'
import { BottomNav } from '@/components/navigation/BottomNav'

// Dynamic import for Leaflet to avoid SSR issues
const MapComponent = dynamic(
  () => import('@/components/maps/HealthMap').then(mod => ({ default: mod.HealthMap })),
  {
    ssr: false,
    loading: () => <MapLoadingSkeleton />
  }
)

// Bengaluru ward coordinates
const mockLocations = [
  { id: '1', ward: 'Jayanagar', lat: 12.9250, lng: 77.5937, feverCount: 14, coughCount: 9, severity: 'moderate' },
  { id: '2', ward: 'Koramangala', lat: 12.9352, lng: 77.6245, feverCount: 8, coughCount: 6, severity: 'low' },
  { id: '3', ward: 'Indiranagar', lat: 12.9716, lng: 77.6412, feverCount: 22, coughCount: 15, severity: 'high' },
  { id: '4', ward: 'Whitefield', lat: 12.9698, lng: 77.7499, feverCount: 11, coughCount: 8, severity: 'low' },
  { id: '5', ward: 'Malleshwaram', lat: 13.0067, lng: 77.5703, feverCount: 6, coughCount: 4, severity: 'low' },
  { id: '6', ward: 'BTM Layout', lat: 12.9165, lng: 77.6101, feverCount: 18, coughCount: 12, severity: 'moderate' },
  { id: '7', ward: 'Electronic City', lat: 12.8456, lng: 77.6603, feverCount: 10, coughCount: 7, severity: 'low' },
  { id: '8', ward: 'Yelahanka', lat: 13.1007, lng: 77.5963, feverCount: 15, coughCount: 11, severity: 'moderate' },
]

function MapLoadingSkeleton() {
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
}

function StatsCard() {
  const totalReports = mockLocations.reduce((acc, loc) => acc + loc.feverCount + loc.coughCount, 0)
  const highSeverityCount = mockLocations.filter(loc => loc.severity === 'high').length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="absolute top-4 left-4 right-4 z-10"
    >
      <Card className="bg-white/95 backdrop-blur-sm border shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="text-primary" size={20} />
              <span className="text-sm font-medium text-gray-900">
                Total Reports
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              {totalReports}
            </span>
          </div>
          {highSeverityCount > 0 && (
            <div className="flex items-center space-x-2 mt-2 text-amber-600">
              <AlertTriangle size={16} />
              <span className="text-sm">
                {highSeverityCount} high severity area{highSeverityCount > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function LegendCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="absolute bottom-20 left-4 z-10"
    >
      <Card className="bg-white/95 backdrop-blur-sm border shadow-lg">
        <CardContent className="p-3">
          <h3 className="text-xs font-semibold text-gray-900 mb-2">Severity Levels</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Low (0-10 reports)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Moderate (11-20 reports)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">High (20+ reports)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function MapPage() {
  const [locations, setLocations] = useState(mockLocations)
  const [selectedLocation, setSelectedLocation] = useState(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLocations(prev => prev.map(loc => ({
        ...loc,
        feverCount: Math.max(0, loc.feverCount + Math.floor(Math.random() * 3) - 1),
        coughCount: Math.max(0, loc.coughCount + Math.floor(Math.random() * 3) - 1),
      })))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen relative bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-20 px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold font-poppins text-gray-900">
            Bengaluru Health Map
          </h1>
          <p className="text-sm text-gray-600">
            Real-time local health trends
          </p>
        </div>
      </header>

      {/* Map Container */}
      <div className="h-full pt-20">
        <MapComponent
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />
      </div>

      {/* Stats Card */}
      <StatsCard />

      {/* Legend */}
      <LegendCard />

      {/* Selected Location Info */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-20 right-4 left-20 z-10"
        >
          <Card className="bg-white/95 backdrop-blur-sm border shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-primary" size={16} />
                  <span className="font-semibold text-gray-900">
                    {selectedLocation.ward}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Fever:</span>
                  <span className="ml-1 font-medium">{selectedLocation.feverCount}</span>
                </div>
                <div>
                  <span className="text-gray-600">Cough:</span>
                  <span className="ml-1 font-medium">{selectedLocation.coughCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <BottomNav />
    </div>
  )
}