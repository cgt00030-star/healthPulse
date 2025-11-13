import './globals.css'

export const metadata = {
  title: 'HealthPulse',
  description: 'Your Health Companion',
}

export const viewport = {
  themeColor: '#2DC6A8',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="grammarly" content="false" />
        <meta name="grammarly-extension" content="false" />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans">
  <div className="min-h-screen bg-background max-w-md mx-auto shadow-lg">
    {children}
  </div>
</body>

    </html>
  )
}