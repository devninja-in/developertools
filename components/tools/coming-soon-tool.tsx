'use client'

import { Clock, CheckCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface ComingSoonToolProps {
  toolName: string
  features: string[]
  estimatedCompletion?: string
}

export function ComingSoonTool({
  toolName,
  features,
  estimatedCompletion = "Coming Soon"
}: ComingSoonToolProps) {
  return (
    <div className="space-y-6">
      {/* Main Card */}
      <Card className="devninja-card">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {toolName}
          </CardTitle>
          <CardDescription className="text-lg">
            This tool is currently under development and will be available soon.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Planned Features */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-center">Planned Features</h3>
            <div className="grid gap-3 max-w-md mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{estimatedCompletion}</span>
            </div>

            {/* Back to Home */}
            <div className="pt-4">
              <Button asChild variant="outline">
                <Link href="/" className="inline-flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to All Tools</span>
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Tools */}
      <Card className="devninja-card">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Available Now</h3>
          <p className="text-sm text-muted-foreground mb-4">
            While we work on this tool, you can use our Base64 encoder/decoder which is fully functional:
          </p>
          <Button asChild size="sm">
            <Link href="/tools/base64">
              Try Base64 Tool
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}