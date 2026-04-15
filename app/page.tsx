import { Metadata } from 'next'
import { MainNav } from '@/components/layout/main-nav'
import { ToolsGrid } from '@/components/tools/tools-grid'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'DevNinja Tools - Professional Developer Utilities',
  description: 'Essential developer tools including Base64 encoding, JWT decoding, JSON editing, hash generation, and more.',
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              Developer Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional utilities for modern development workflows. Encode, decode, hash, edit, and transform data with ease.
            </p>
          </div>

          <ToolsGrid />
        </div>
      </main>
      <Footer />
    </>
  )
}