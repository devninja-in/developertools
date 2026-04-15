import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ToolLayout } from '@/components/tools/tool-layout'
import { HashTool } from '@/components/tools/hash-tool'

export const metadata: Metadata = {
  title: 'Hash Generator - DevNinja Tools',
  description: 'Generate MD5, SHA256, SHA512, and other cryptographic hashes from text or files.',
  keywords: ['hash', 'md5', 'sha256', 'sha512', 'cryptography', 'checksum', 'developer tools'],
}

export default function HashGeneratorPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolLayout
          title="Hash Generator"
          description="Generate cryptographic hashes using various algorithms including MD5, SHA256, and SHA512."
        >
          <HashTool />
        </ToolLayout>
      </main>
      <Footer />
    </>
  )
}