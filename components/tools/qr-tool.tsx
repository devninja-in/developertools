'use client'

import { useState, useCallback, useEffect } from 'react'
import { Copy, Download, RotateCcw, FileText, QrCode as QrIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { copyToClipboard } from '@/lib/utils'
import { toast } from 'react-hot-toast'

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

export function QRTool() {
  const [input, setInput] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [size, setSize] = useState('200')
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateQR = useCallback(async (text: string, options: { size: number; errorCorrectionLevel: ErrorCorrectionLevel }) => {
    if (!text.trim()) {
      setQrCodeUrl('')
      return
    }

    setIsGenerating(true)
    try {
      // Dynamic import to avoid SSR issues
      const QRCode = (await import('qrcode')).default

      const url = await QRCode.toDataURL(text, {
        width: options.size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: options.errorCorrectionLevel
      })
      setQrCodeUrl(url)
    } catch (error) {
      console.error('Failed to generate QR code:', error)
      toast.error('Failed to generate QR code')
      setQrCodeUrl('')
    } finally {
      setIsGenerating(false)
    }
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      generateQR(input, {
        size: parseInt(size),
        errorCorrectionLevel: errorLevel
      })
    }, 300)

    return () => clearTimeout(debounce)
  }, [input, size, errorLevel, generateQR])

  const handleCopy = async (text: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      toast.success('Text copied to clipboard!')
    } else {
      toast.error('Failed to copy')
    }
  }

  const handleDownloadQR = () => {
    if (!qrCodeUrl) return

    const link = document.createElement('a')
    link.download = `qr-code-${Date.now()}.png`
    link.href = qrCodeUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('QR code downloaded!')
  }

  const handleClear = () => {
    setInput('')
    setQrCodeUrl('')
  }

  const loadSample = () => {
    const sample = 'https://devninja.in'
    setInput(sample)
    toast.success('Sample URL loaded!')
  }

  const errorLevels = [
    { value: 'L', label: 'Low (~7%)', description: 'Good for clean environments' },
    { value: 'M', label: 'Medium (~15%)', description: 'Recommended for most uses' },
    { value: 'Q', label: 'Quartile (~25%)', description: 'Good for noisy environments' },
    { value: 'H', label: 'High (~30%)', description: 'Best error recovery' }
  ]

  const sizes = [
    { value: '100', label: '100px' },
    { value: '150', label: '150px' },
    { value: '200', label: '200px (Recommended)' },
    { value: '300', label: '300px' },
    { value: '400', label: '400px' },
    { value: '500', label: '500px' }
  ]

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="devninja-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Text/URL Input</span>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={loadSample}
                variant="outline"
                size="sm"
                className="h-8"
              >
                Load Sample
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="sm"
                className="h-8"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text, URL, or any content to generate QR code..."
            className="devninja-textarea min-h-[120px] text-sm"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{input.length} characters</span>
            <Button
              onClick={() => handleCopy(input)}
              disabled={!input}
              variant="ghost"
              size="sm"
              className="h-8 px-3"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy Text
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="devninja-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">QR Code Size</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="size-select" className="text-sm font-medium">
              Select size
            </Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((sizeOption) => (
                  <SelectItem key={sizeOption.value} value={sizeOption.value}>
                    {sizeOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="devninja-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Error Correction</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="error-select" className="text-sm font-medium">
              Error correction level
            </Label>
            <Select value={errorLevel} onValueChange={(value: ErrorCorrectionLevel) => setErrorLevel(value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {errorLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-xs text-muted-foreground">{level.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* QR Code Output */}
      {(qrCodeUrl || isGenerating) && (
        <Card className="devninja-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <QrIcon className="h-5 w-5" />
                <span>Generated QR Code</span>
              </div>
              {qrCodeUrl && (
                <Button
                  onClick={handleDownloadQR}
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download PNG
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-muted-foreground">Generating QR code...</span>
              </div>
            ) : qrCodeUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="border border-border rounded-lg shadow-sm"
                    style={{ width: `${size}px`, height: `${size}px` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {size}x{size}px • Error Correction: {errorLevel} • {input.length} characters
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      <Card className="devninja-card">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">About QR Codes</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              QR (Quick Response) codes are two-dimensional barcodes that can store various types of information
              and can be easily scanned by smartphones and other devices.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Common Uses:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Website URLs</li>
                  <li>Contact information</li>
                  <li>Wi-Fi credentials</li>
                  <li>Payment links</li>
                  <li>App store links</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Error Correction:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>L (Low):</strong> ~7% - Clean conditions</li>
                  <li><strong>M (Medium):</strong> ~15% - Most common</li>
                  <li><strong>Q (Quartile):</strong> ~25% - Noisy environments</li>
                  <li><strong>H (High):</strong> ~30% - Maximum recovery</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}