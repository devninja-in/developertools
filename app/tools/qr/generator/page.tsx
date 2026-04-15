import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ToolLayout } from '@/components/tools/tool-layout'
import { QRTool } from '@/components/tools/qr-tool'

export const metadata: Metadata = {
  title: 'QR Code Generator - DevNinja Tools',
  description: 'Generate customizable QR codes from text, URLs, and other data with download options.',
  keywords: ['qr code', 'generator', 'barcode', 'url', 'text', 'developer tools'],
}

export default function QRGeneratorPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolLayout
          title="QR Code Generator"
          description="Generate high-quality QR codes from text, URLs, and other data formats."
        >
          <QRTool />
        </ToolLayout>
      </main>
      <Footer />
    </>
  )
}