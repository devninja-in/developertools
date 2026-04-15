'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
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
            {/* Search - Desktop only */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center space-x-2 text-muted-foreground"
            >
              <Search className="h-4 w-4" />
              <span>Search tools...</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                ⌘K
              </kbd>
            </Button>


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