import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ToolLayout } from '@/components/tools/tool-layout'
import { URLTool } from '@/components/tools/url-tool'

export const metadata: Metadata = {
  title: 'URL Encoder/Decoder - DevNinja Tools',
  description: 'Encode and decode URLs and URI components with support for various encoding formats.',
  keywords: ['url', 'uri', 'encode', 'decode', 'percent encoding', 'developer tools'],
}

export default function URLToolPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolLayout
          title="URL Encoder/Decoder"
          description="Encode and decode URLs and URI components with real-time processing."
        >
          <URLTool />
        </ToolLayout>
      </main>
      <Footer />
    </>
  )
}