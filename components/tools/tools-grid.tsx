'use client'

import Link from 'next/link'
import {
  Hash,
  Code,
  Key,
  FileJson,
  QrCode,
  GitCompare,
  Shield,
  Link as LinkIcon,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const tools = [
  {
    id: 'base64',
    title: 'Base64 Encode/Decode',
    description: 'Encode and decode text using Base64 encoding',
    icon: Code,
    href: '/tools/base64',
    category: 'Encoding',
  },
  {
    id: 'url',
    title: 'URL Encode/Decode',
    description: 'Encode and decode URLs and URI components',
    icon: LinkIcon,
    href: '/tools/url',
    category: 'Encoding',
  },
  {
    id: 'jwt',
    title: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens',
    icon: Key,
    href: '/tools/jwt/decode',
    category: 'Security',
  },
  {
    id: 'hash',
    title: 'Hash Generator',
    description: 'Generate MD5, SHA256, and other hash types',
    icon: Hash,
    href: '/tools/hash',
    category: 'Cryptography',
  },
  {
    id: 'json',
    title: 'JSON Editor',
    description: 'Format, validate, and edit JSON data',
    icon: FileJson,
    href: '/tools/json/editor',
    category: 'Data',
  },
  {
    id: 'qr',
    title: 'QR Code Generator',
    description: 'Generate QR codes from text or URLs',
    icon: QrCode,
    href: '/tools/qr/generator',
    category: 'Utilities',
  },
  {
    id: 'diff',
    title: 'Text Diff Viewer',
    description: 'Compare and highlight differences between text',
    icon: GitCompare,
    href: '/tools/diff/viewer',
    category: 'Development',
  },
  {
    id: 'certificate',
    title: 'Certificate Decoder',
    description: 'Decode and inspect X.509 SSL/TLS certificates',
    icon: Shield,
    href: '/tools/cert',
    category: 'Security',
  },
]

const categories = Array.from(new Set(tools.map(tool => tool.category)))

export function ToolsGrid() {
  return (
    <div className="space-y-8">
      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {category}
          </h2>
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tools
              .filter(tool => tool.category === category)
              .map(tool => {
                const Icon = tool.icon
                return (
                  <Link key={tool.id} href={tool.href} className="group">
                    <Card className="devninja-tool-card h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                              {tool.title}
                            </CardTitle>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                          {tool.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}