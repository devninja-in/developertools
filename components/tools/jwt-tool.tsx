'use client'

import { useState, useCallback, useEffect } from 'react'
import { Copy, Download, RotateCcw, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { copyToClipboard, downloadFile } from '@/lib/utils'
import { toast } from 'react-hot-toast'

interface JWTPayload {
  header: any
  payload: any
  signature: string
  isValid: boolean
  isExpired: boolean
  expiresAt?: string
  issuedAt?: string
  notBefore?: string
}

export function JWTTool() {
  const [input, setInput] = useState('')
  const [decoded, setDecoded] = useState<JWTPayload | null>(null)
  const [error, setError] = useState('')
  const [showSignature, setShowSignature] = useState(false)

  const decodeJWT = useCallback((token: string) => {
    setError('')
    setDecoded(null)

    if (!token.trim()) {
      return
    }

    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format - must have 3 parts separated by dots')
      }

      // Decode header
      const header = JSON.parse(atob(parts[0]))

      // Decode payload
      const payload = JSON.parse(atob(parts[1]))

      // Get signature
      const signature = parts[2]

      // Check expiration
      let isExpired = false
      let expiresAt = undefined
      let issuedAt = undefined
      let notBefore = undefined

      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000)
        expiresAt = expDate.toISOString()
        isExpired = Date.now() > payload.exp * 1000
      }

      if (payload.iat) {
        issuedAt = new Date(payload.iat * 1000).toISOString()
      }

      if (payload.nbf) {
        notBefore = new Date(payload.nbf * 1000).toISOString()
      }

      setDecoded({
        header,
        payload,
        signature,
        isValid: true,
        isExpired,
        expiresAt,
        issuedAt,
        notBefore
      })

    } catch (err: any) {
      setError(err.message || 'Invalid JWT token')
    }
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      decodeJWT(input)
    }, 300)

    return () => clearTimeout(debounce)
  }, [input, decodeJWT])

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      toast.success('Copied to clipboard!')
    } else {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = (data: any, filename: string) => {
    const content = JSON.stringify(data, null, 2)
    downloadFile(content, `${filename}.json`, 'application/json')
    toast.success('File downloaded!')
  }

  const handleClear = () => {
    setInput('')
    setDecoded(null)
    setError('')
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="devninja-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>JWT Token Input</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 px-3"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="devninja-textarea min-h-[120px] font-mono text-sm"
          />
          <div className="text-sm text-muted-foreground">
            {input.length} characters
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="devninja-card border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Decoded Output */}
      {decoded && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Header */}
          <Card className="devninja-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Header</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(JSON.stringify(decoded.header, null, 2))}
                    className="h-8 px-3"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(decoded.header, 'jwt-header')}
                    className="h-8 px-3"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-3 rounded text-sm overflow-auto custom-scrollbar">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </CardContent>
          </Card>

          {/* Payload */}
          <Card className="devninja-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Payload</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(JSON.stringify(decoded.payload, null, 2))}
                    className="h-8 px-3"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(decoded.payload, 'jwt-payload')}
                    className="h-8 px-3"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-3 rounded text-sm overflow-auto custom-scrollbar">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Token Information */}
      {decoded && (
        <Card className="devninja-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Token Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status Indicators */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Valid JWT Format</span>
              </div>
              <div className="flex items-center space-x-2">
                {decoded.isExpired ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <span className={`text-sm font-medium ${
                  decoded.isExpired ? 'text-red-600' : 'text-green-600'
                }`}>
                  {decoded.isExpired ? 'Token Expired' : 'Token Valid'}
                </span>
              </div>
            </div>

            {/* Time Information */}
            {(decoded.issuedAt || decoded.expiresAt || decoded.notBefore) && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Time Information</h4>
                <div className="grid gap-2 text-sm">
                  {decoded.issuedAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issued At:</span>
                      <span className="font-mono">{new Date(decoded.issuedAt).toLocaleString()}</span>
                    </div>
                  )}
                  {decoded.notBefore && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Not Before:</span>
                      <span className="font-mono">{new Date(decoded.notBefore).toLocaleString()}</span>
                    </div>
                  )}
                  {decoded.expiresAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expires At:</span>
                      <span className={`font-mono ${decoded.isExpired ? 'text-red-600' : ''}`}>
                        {new Date(decoded.expiresAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Signature */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">Signature</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSignature(!showSignature)}
                  className="h-8 px-3"
                >
                  {showSignature ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-1" />
                      Show
                    </>
                  )}
                </Button>
              </div>
              {showSignature && (
                <div className="bg-muted p-3 rounded">
                  <code className="font-mono text-sm break-all">
                    {decoded.signature}
                  </code>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      <Card className="devninja-card">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">About JWT Decoder</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Real-time JWT decoding</li>
                  <li>Header and payload inspection</li>
                  <li>Token expiration checking</li>
                  <li>Signature display (optional)</li>
                  <li>Copy and download decoded data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Security Note:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Decoding only - no verification</li>
                  <li>All processing done client-side</li>
                  <li>No tokens sent to servers</li>
                  <li>Safe for sensitive tokens</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}