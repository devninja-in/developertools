import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ToolLayout } from '@/components/tools/tool-layout'
import { ComingSoonTool } from '@/components/tools/coming-soon-tool'

export const metadata: Metadata = {
  title: 'Certificate Decoder - DevNinja Tools',
  description: 'Decode and analyze SSL/TLS certificates, CSRs, and private keys with detailed information.',
  keywords: ['ssl', 'tls', 'certificate', 'x509', 'csr', 'decode', 'security', 'developer tools'],
}

export default function CertificateDecoderPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolLayout
          title="Certificate Decoder"
          description="Decode and analyze SSL/TLS certificates with comprehensive certificate chain inspection."
        >
          <ComingSoonTool
            toolName="Certificate Decoder"
            features={[
              'X.509 certificate parsing',
              'CSR (Certificate Signing Request) decoding',
              'Certificate chain analysis',
              'Expiration date checking',
              'Subject and issuer details',
              'Extension analysis'
            ]}
          />
        </ToolLayout>
      </main>
      <Footer />
    </>
  )
}