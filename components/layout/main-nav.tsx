'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/tools/base64', label: 'Base64' },
  { href: '/tools/jwt/decode', label: 'JWT' },
  { href: '/tools/json/editor', label: 'JSON' },
  { href: '/tools/hash', label: 'Hash' },
  { href: '/tools/qr/generator', label: 'QR Code' },
]

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center space-x-6', className)}>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-foreground/80',
            pathname?.startsWith(item.href) && item.href !== '/'
              ? 'text-foreground'
              : pathname === '/' && item.href === '/'
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}