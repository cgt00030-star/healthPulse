import "./globals.css";

export const metadata = {
  title: 'HealthPulse - Your Area\'s Health Today',
  description: 'A mobile-first health awareness dashboard for anonymous symptom reporting and local trend visualization.',
  keywords: ['health', 'symptoms', 'dashboard', 'anonymous reporting', 'health trends'],
  authors: [{ name: 'HealthPulse Team' }],
  themeColor: '#2DC6A8',
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  user-scalable: 'no',
  themeColor: '#2DC6A8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}