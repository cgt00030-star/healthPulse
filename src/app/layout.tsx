import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HealthPulse - Your Area\'s Health Today',
  description: 'A mobile-first health awareness dashboard for anonymous symptom reporting and local trend visualization.',
  keywords: ['health', 'symptoms', 'dashboard', 'anonymous reporting', 'health trends'],
  authors: [{ name: 'HealthPulse Team' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#2DC6A8',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}