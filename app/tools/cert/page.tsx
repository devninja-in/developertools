import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CertTool } from '@/components/tools/cert-tool'
import { ToolLayout } from '@/components/tools/tool-layout'

export const metadata: Metadata = {
  title: 'Certificate Decoder - DevNinja Tools',
  description: 'Decode and analyze X.509 certificates. View certificate details, validity dates, fingerprints, and more.',
  keywords: ['certificate', 'x509', 'ssl', 'tls', 'decode', 'pem', 'developer tools', 'crypto'],
}

export default function CertPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolLayout
          title="Certificate Decoder"
          description="Decode and analyze X.509 certificates to view detailed information including subject, issuer, validity dates, and fingerprints."
        >
          <CertTool />
        </ToolLayout>
      </main>
      <Footer />
    </>
  )
}