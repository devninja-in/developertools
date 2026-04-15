import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ToolLayout } from '@/components/tools/tool-layout'
import { JWTTool } from '@/components/tools/jwt-tool'

export const metadata: Metadata = {
  title: 'JWT Decoder - DevNinja Tools',
  description: 'Decode and inspect JSON Web Tokens (JWT) with detailed header and payload analysis.',
  keywords: ['jwt', 'json web token', 'decode', 'token', 'security', 'developer tools'],
}

export default function JWTDecodePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolLayout
          title="JWT Decoder"
          description="Decode and inspect JSON Web Tokens with detailed header and payload analysis."
        >
          <JWTTool />
        </ToolLayout>
      </main>
      <Footer />
    </>
  )
}