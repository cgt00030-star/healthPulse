'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface HealthLocation {
  id: string
  ward: string
  lat: number
  lng: number
  feverCount: number
  coughCount: number
  severity: 'low' | 'moderate' | 'high'
}

interface HealthMapProps {
  locations: HealthLocation[]
  selectedLocation: HealthLocation | null
  onLocationSelect: (location: HealthLocation | null) => void
}

// Fix for default markers in Leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOS40MDM2IDAgMjUgNS41OTY0NCAyNSAxMi41QzI1IDIwLjY0NzEgMTIuNSA0MSAxMi41IDQxQzEyLjUgNDEgMCAyMC42NDcxIDAgMTIuNUMwIDUuNTk2NDQgNS41OTY0NCAwIDEyLjUgMFoiIGZpbGw9IiMyREM2QTgiLz4KPGNpcmNsZSBjeD0iMTIuNSIgY3k9IjEyLjUiIHI9IjYiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOS40MDM2IDAgMjUgNS41OTY0NCAyNSAxMi41QzI1IDIwLjY0NzEgMTIuNSA0MSAxMi41IDQxQzEyLjUgNDEgMCAyMC42NDcxIDAgMTIuNUMwIDUuNTk2NDQgNS41OTY0NCAwIDEyLjUgMFoiIGZpbGw9IiMyREM2QTgiLz4KPGNpcmNsZSBjeD0iMTIuNSIgY3k9IjEyLjUiIHI9IjYiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
  shadowUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjIwLjUiIGN5PSIyMC41IiByPSI2IiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPC9zdmc+Cg==',
})

export function HealthMap({ locations, selectedLocation, onLocationSelect }: HealthMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  const getSeverityColor = (severity: 'low' | 'moderate' | 'high') => {
    switch (severity) {
      case 'low':
        return '#22c55e' // green
      case 'moderate':
        return '#eab308' // yellow
      case 'high':
        return '#ef4444' // red
      default:
        return '#2DC6A8'
    }
  }

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current).setView([40.7128, -74.0060], 12)

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker)
    })
    markersRef.current = []

    // Add markers for each location
    locations.forEach(location => {
      const color = getSeverityColor(location.severity)

      // Create custom icon
      const customIcon = L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: transform 0.2s;
          "
          onmouseover="this.style.transform='scale(1.2)'"
          onmouseout="this.style.transform='scale(1)'"
          ></div>
        `,
        className: 'custom-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      const marker = L.marker([location.lat, location.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current!)

      // Create popup content
      const popupContent = `
        <div style="min-width: 150px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #333;">${location.ward}</h3>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="color: #666;">Fever:</span>
            <span style="font-weight: 600;">${location.feverCount}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #666;">Cough:</span>
            <span style="font-weight: 600;">${location.coughCount}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <div style="
              background-color: ${color};
              width: 12px;
              height: 12px;
              border-radius: 50%;
            "></div>
            <span style="text-transform: capitalize; font-size: 12px; color: #666;">
              ${location.severity} severity
            </span>
          </div>
        </div>
      `

      marker.bindPopup(popupContent)

      // Click handler
      marker.on('click', () => {
        onLocationSelect(location)
      })

      markersRef.current.push(marker)
    })

    // Fit map to show all markers
    if (locations.length > 0) {
      const group = new L.FeatureGroup(markersRef.current)
      mapInstanceRef.current.fitBounds(group.getBounds(), { padding: [50, 50] })
    }

  }, [locations, onLocationSelect])

  useEffect(() => {
    if (!mapInstanceRef.current || !selectedLocation) return

    // Center map on selected location
    mapInstanceRef.current.setView([selectedLocation.lat, selectedLocation.lng], 14)

    // Open popup for selected location
    const marker = markersRef.current.find(m =>
      m.getLatLng().lat === selectedLocation.lat &&
      m.getLatLng().lng === selectedLocation.lng
    )

    if (marker) {
      marker.openPopup()
    }
  }, [selectedLocation])

  return (
    <div
      ref={mapRef}
      style={{
        height: '100%',
        width: '100%',
        zIndex: 1
      }}
    />
  )
}