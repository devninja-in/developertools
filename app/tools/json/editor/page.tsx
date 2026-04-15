import { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ToolLayout } from '@/components/tools/tool-layout'
import { JSONTool } from '@/components/tools/json-tool'

export const metadata: Metadata = {
  title: 'JSON Editor - DevNinja Tools',
  description: 'Advanced JSON editor with syntax highlighting, validation, formatting, and querying capabilities.',
  keywords: ['json', 'editor', 'format', 'validate', 'prettify', 'developer tools'],
}

export default function JSONEditorPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ToolLayout
          title="JSON Editor"
          description="Advanced JSON editor with validation, formatting, and manipulation capabilities."
        >
          <JSONTool />
        </ToolLayout>
      </main>
      <Footer />
    </>
  )
}