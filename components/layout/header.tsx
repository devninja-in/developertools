'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <header className="devninja-header sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                DN
              </div>
              <span className="font-bold text-lg">Developer Tools</span>
            </Link>

            <MainNav className="hidden md:flex" />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              {mobileNavOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileNavOpen && (
          <MobileNav onClose={() => setMobileNavOpen(false)} />
        )}
      </div>
    </header>
  )
}