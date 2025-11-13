'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, Map, BookOpen, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Report', href: '/report', icon: FileText },
  { name: 'Map', href: '/map', icon: Map },
  { name: 'Diary', href: '/diary', icon: BookOpen },
  { name: 'Tools', href: '/tools', icon: Wrench },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-5 h-16">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center space-y-1 transition-colors',
                  isActive
                    ? 'text-primary-teal'
                    : 'text-gray-400 hover:text-gray-600'
                )}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}