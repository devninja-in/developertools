import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Base64Tool } from '@/components/tools/base64-tool'
import { ToolLayout } from '@/components/tools/tool-layout'

export const metadata: Metadata = {
  title: 'Base64 Encode/Decode - DevNinja Tools',
  description: 'Encode and decode text using Base64 encoding. Real-time processing with copy and download options.',
  keywords: ['base64', 'encode', 'decode', 'encoding', 'developer tools'],
}

export default function Base64Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolLayout
          title="Base64 Encode/Decode"
          description="Encode and decode text using Base64 encoding with real-time processing."
        >
          <Base64Tool />
        </ToolLayout>
      </main>
      <Footer />
    </>
  )
}