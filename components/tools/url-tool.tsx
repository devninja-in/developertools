'use client'

import { useState, useCallback, useEffect } from 'react'
import { Copy, Download, RotateCcw, ArrowRightLeft, FileText, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { copyToClipboard, downloadFile } from '@/lib/utils'
import { toast } from 'react-hot-toast'

type Mode = 'encode' | 'decode'

export function URLTool() {
  const [mode, setMode] = useState<Mode>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const processText = useCallback((text: string, operation: Mode) => {
    setError('')

    if (!text.trim()) {
      setOutput('')
      return
    }

    try {
      if (operation === 'encode') {
        const encoded = encodeURIComponent(text)
        setOutput(encoded)
      } else {
        const decoded = decodeURIComponent(text)
        setOutput(decoded)
      }
    } catch (err) {
      setError(operation === 'decode' ? 'Invalid URL encoding' : 'Encoding failed')
      setOutput('')
    }
  }, [])

  useEffect(() => {
    processText(input, mode)
  }, [input, mode, processText])

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      toast.success('Copied to clipboard!')
    } else {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = (text: string) => {
    const filename = `url-${mode}-${Date.now()}.txt`
    downloadFile(text, filename)
    toast.success('File downloaded!')
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const handleSwap = () => {
    if (output && !error) {
      setInput(output)
      setMode(mode === 'encode' ? 'decode' : 'encode')
    }
  }

  const inputPlaceholder = mode === 'encode'
    ? 'Enter text or URL to encode...'
    : 'Enter URL encoded string to decode...'

  const outputLabel = mode === 'encode' ? 'URL Encoded' : 'Decoded Text'

  // Parse URL components if it's a valid URL
  const parseURL = (urlString: string) => {
    try {
      const url = new URL(urlString.startsWith('http') ? urlString : `https://${urlString}`)
      return {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? '443' : '80'),
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        searchParams: Array.from(url.searchParams.entries())
      }
    } catch {
      return null
    }
  }

  const urlInfo = mode === 'decode' && output && !error ? parseURL(output) : null

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <Tabs value={mode} onValueChange={(value) => setMode(value as Mode)} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <Card className="devninja-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Input</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={inputPlaceholder}
                className="devninja-textarea min-h-[200px] font-mono text-sm"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{input.length} characters</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="h-8 px-3"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="devninja-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>{outputLabel}</span>
                {output && !error && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSwap}
                    className="h-6 w-6 p-0 ml-auto"
                    title="Swap input/output"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Output will appear here..."
                  className={`devninja-textarea min-h-[200px] font-mono text-sm ${
                    error ? 'border-destructive' : ''
                  }`}
                />
                {error && (
                  <div className="absolute inset-x-3 top-3 flex items-center space-x-2 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{output.length} characters</span>
                {output && !error && (
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(output)}
                      className="h-8 px-3"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(output)}
                      className="h-8 px-3"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>

      {/* URL Analysis (for decoded URLs) */}
      {urlInfo && (
        <Card className="devninja-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">URL Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <span className="font-medium text-muted-foreground">Protocol:</span>
                  <div className="font-mono bg-muted p-2 rounded mt-1">{urlInfo.protocol}</div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Hostname:</span>
                  <div className="font-mono bg-muted p-2 rounded mt-1">{urlInfo.hostname}</div>
                </div>
                <div>
                  <span className="font-medium text-muted-foreground">Port:</span>
                  <div className="font-mono bg-muted p-2 rounded mt-1">{urlInfo.port}</div>
                </div>
              </div>

              {urlInfo.pathname !== '/' && (
                <div>
                  <span className="font-medium text-muted-foreground">Path:</span>
                  <div className="font-mono bg-muted p-2 rounded mt-1 break-all">{urlInfo.pathname}</div>
                </div>
              )}

              {urlInfo.search && (
                <div>
                  <span className="font-medium text-muted-foreground">Query String:</span>
                  <div className="font-mono bg-muted p-2 rounded mt-1 break-all">{urlInfo.search}</div>
                </div>
              )}

              {urlInfo.hash && (
                <div>
                  <span className="font-medium text-muted-foreground">Fragment:</span>
                  <div className="font-mono bg-muted p-2 rounded mt-1 break-all">{urlInfo.hash}</div>
                </div>
              )}

              {urlInfo.searchParams.length > 0 && (
                <div>
                  <span className="font-medium text-muted-foreground">Query Parameters:</span>
                  <div className="mt-1 space-y-2">
                    {urlInfo.searchParams.map(([key, value], index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="font-mono bg-muted p-2 rounded text-xs">
                          <span className="text-muted-foreground">Key:</span> {key}
                        </div>
                        <div className="font-mono bg-muted p-2 rounded text-xs break-all">
                          <span className="text-muted-foreground">Value:</span> {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      <Card className="devninja-card">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">About URL Encoding</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              URL encoding (percent-encoding) is a mechanism to encode information in a Uniform Resource Identifier (URI)
              by replacing certain characters with their percent-encoded equivalents.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Common Use Cases:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>URL query parameters</li>
                  <li>Form data submission</li>
                  <li>API request parameters</li>
                  <li>Special characters in URLs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Real-time encoding/decoding</li>
                  <li>URL component analysis</li>
                  <li>Query parameter parsing</li>
                  <li>Input/output swapping</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}