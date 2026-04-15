'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Code,
  Key,
  FileJson,
  Hash,
  QrCode,
  GitCompare,
  Shield,
  Link as LinkIcon
} from 'lucide-react'

const navigationItems = [
  { href: '/', label: 'Home', icon: null },
  { href: '/tools/base64', label: 'Base64 Encode/Decode', icon: Code },
  { href: '/tools/url', label: 'URL Encode/Decode', icon: LinkIcon },
  { href: '/tools/jwt/decode', label: 'JWT Decoder', icon: Key },
  { href: '/tools/hash', label: 'Hash Generator', icon: Hash },
  { href: '/tools/json/editor', label: 'JSON Editor', icon: FileJson },
  { href: '/tools/qr/generator', label: 'QR Code Generator', icon: QrCode },
  { href: '/tools/diff/viewer', label: 'Text Diff Viewer', icon: GitCompare },
  { href: '/tools/certificate/decoder', label: 'Certificate Decoder', icon: Shield },
]

interface MobileNavProps {
  onClose: () => void
}

export function MobileNav({ onClose }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-3">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/')

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{item.label}</span>
              </Link>
            )
          })}

        </div>
      </nav>
    </div>
  )
}