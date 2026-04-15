'use client'

import { useState, useCallback, useEffect } from 'react'
import { Copy, Download, RotateCcw, FileText, Hash as HashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { copyToClipboard, downloadFile } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import CryptoJS from 'crypto-js'

type HashType = 'md5' | 'sha1' | 'sha256' | 'sha512'

interface HashResult {
  md5: string
  sha1: string
  sha256: string
  sha512: string
}

export function HashTool() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<HashResult | null>(null)
  const [selectedHash, setSelectedHash] = useState<HashType>('sha256')

  const generateHashes = useCallback((text: string) => {
    if (!text.trim()) {
      setHashes(null)
      return
    }

    try {
      const results: HashResult = {
        md5: CryptoJS.MD5(text).toString(),
        sha1: CryptoJS.SHA1(text).toString(),
        sha256: CryptoJS.SHA256(text).toString(),
        sha512: CryptoJS.SHA512(text).toString(),
      }
      setHashes(results)
    } catch (error) {
      console.error('Hash generation failed:', error)
      setHashes(null)
    }
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      generateHashes(input)
    }, 300)

    return () => clearTimeout(debounce)
  }, [input, generateHashes])

  const handleCopy = async (hash: string) => {
    const success = await copyToClipboard(hash)
    if (success) {
      toast.success('Hash copied to clipboard!')
    } else {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = (hash: string, type: string) => {
    const content = `${type.toUpperCase()}: ${hash}\nInput: ${input}`
    downloadFile(content, `${type}-hash-${Date.now()}.txt`)
    toast.success('Hash file downloaded!')
  }

  const handleDownloadAll = () => {
    if (!hashes) return

    const content = `Input: ${input}\n\nHashes:\nMD5:    ${hashes.md5}\nSHA1:   ${hashes.sha1}\nSHA256: ${hashes.sha256}\nSHA512: ${hashes.sha512}`
    downloadFile(content, `all-hashes-${Date.now()}.txt`)
    toast.success('All hashes downloaded!')
  }

  const handleClear = () => {
    setInput('')
    setHashes(null)
  }

  const hashData = [
    {
      type: 'md5' as HashType,
      name: 'MD5',
      description: '128-bit hash (deprecated for security)',
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200'
    },
    {
      type: 'sha1' as HashType,
      name: 'SHA1',
      description: '160-bit hash (deprecated for security)',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200'
    },
    {
      type: 'sha256' as HashType,
      name: 'SHA256',
      description: '256-bit hash (recommended)',
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200'
    },
    {
      type: 'sha512' as HashType,
      name: 'SHA512',
      description: '512-bit hash (highly secure)',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="devninja-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Text Input</span>
            </div>
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
              {hashes && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadAll}
                  className="h-8 px-3"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download All
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to generate hashes..."
            className="devninja-textarea min-h-[120px] font-mono text-sm"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{input.length} characters</span>
            <span>{new Blob([input]).size} bytes</span>
          </div>
        </CardContent>
      </Card>

      {/* Hash Selection Tabs */}
      {hashes && (
        <Tabs value={selectedHash} onValueChange={(value) => setSelectedHash(value as HashType)} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="md5">MD5</TabsTrigger>
            <TabsTrigger value="sha1">SHA1</TabsTrigger>
            <TabsTrigger value="sha256">SHA256</TabsTrigger>
            <TabsTrigger value="sha512">SHA512</TabsTrigger>
          </TabsList>

          {hashData.map((hashInfo) => (
            <TabsContent key={hashInfo.type} value={hashInfo.type} className="mt-6">
              <Card className={`devninja-card ${hashInfo.bgColor}`}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HashIcon className="h-5 w-5" />
                      <span>{hashInfo.name} Hash</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(hashes[hashInfo.type])}
                        className="h-8 px-3"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(hashes[hashInfo.type], hashInfo.type)}
                        className="h-8 px-3"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className={`text-sm font-medium ${hashInfo.color}`}>
                      {hashInfo.description}
                    </div>
                    <div className="bg-white p-3 rounded border font-mono text-sm break-all custom-scrollbar">
                      {hashes[hashInfo.type]}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Length: {hashes[hashInfo.type].length} characters
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* All Hashes Overview */}
      {hashes && (
        <Card className="devninja-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">All Hash Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {hashData.map((hashInfo) => (
              <div key={hashInfo.type} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="font-medium">
                  <span className={hashInfo.color}>{hashInfo.name}</span>
                </div>
                <div className="md:col-span-2 font-mono text-sm bg-muted p-2 rounded break-all">
                  {hashes[hashInfo.type]}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(hashes[hashInfo.type])}
                    className="h-8 px-3"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(hashes[hashInfo.type], hashInfo.type)}
                    className="h-8 px-3"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      <Card className="devninja-card">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">About Cryptographic Hashes</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Cryptographic hash functions produce a fixed-size hash value from input data of any size.
              They are widely used for data integrity verification, password storage, and digital signatures.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Hash Algorithms:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li><span className="text-red-600 font-medium">MD5</span> - Fast but insecure (deprecated)</li>
                  <li><span className="text-orange-600 font-medium">SHA1</span> - Faster but vulnerable</li>
                  <li><span className="text-green-600 font-medium">SHA256</span> - Recommended for most uses</li>
                  <li><span className="text-blue-600 font-medium">SHA512</span> - Most secure option</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Common Uses:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>File integrity verification</li>
                  <li>Password hashing (with salt)</li>
                  <li>Digital signatures</li>
                  <li>Blockchain and cryptocurrencies</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}