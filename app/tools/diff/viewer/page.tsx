import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ToolLayout } from '@/components/tools/tool-layout'
import { ComingSoonTool } from '@/components/tools/coming-soon-tool'

export const metadata: Metadata = {
  title: 'Text Diff Viewer - DevNinja Tools',
  description: 'Compare text files and highlight differences with syntax highlighting and merge options.',
  keywords: ['diff', 'compare', 'text', 'merge', 'differences', 'developer tools'],
}

export default function DiffViewerPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolLayout
          title="Text Diff Viewer"
          description="Compare text files and visualize differences with advanced highlighting."
        >
          <ComingSoonTool
            toolName="Text Diff Viewer"
            features={[
              'Side-by-side text comparison',
              'Inline diff highlighting',
              'Syntax highlighting support',
              'Word-level differences',
              'File upload support',
              'Merge conflict resolution'
            ]}
          />
        </ToolLayout>
      </main>
      <Footer />
    </>
  )
}