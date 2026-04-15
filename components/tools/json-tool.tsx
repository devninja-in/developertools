'use client'

import { useState, useCallback } from 'react'
import { Copy, Download, RotateCcw, FileText, CheckCircle, AlertCircle, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { copyToClipboard, downloadFile, isValidJson, formatJson, minifyJson } from '@/lib/utils'
import { toast } from 'react-hot-toast'

export function JSONTool() {
  const [input, setInput] = useState('')
  const [formatted, setFormatted] = useState('')
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(false)

  const validateAndFormat = useCallback((text: string) => {
    if (!text.trim()) {
      setFormatted('')
      setError('')
      setIsValid(false)
      return
    }

    try {
      const parsed = JSON.parse(text)
      const prettified = JSON.stringify(parsed, null, 2)
      setFormatted(prettified)
      setIsValid(true)
      setError('')
    } catch (err: any) {
      setError(err.message || 'Invalid JSON')
      setIsValid(false)
      setFormatted('')
    }
  }, [])

  const handleInputChange = (value: string) => {
    setInput(value)
    validateAndFormat(value)
  }

  const handleCopy = async (text: string, type: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      toast.success(`${type} copied to clipboard!`)
    } else {
      toast.error('Failed to copy')
    }
  }

  const handleDownload = (text: string, filename: string) => {
    downloadFile(text, `${filename}.json`, 'application/json')
    toast.success('JSON file downloaded!')
  }

  const handleFormat = () => {
    if (isValid && input) {
      const formatted = formatJson(input, 2)
      setInput(formatted)
      setFormatted(formatted)
      toast.success('JSON formatted!')
    }
  }

  const handleMinify = () => {
    if (isValid && input) {
      const minified = minifyJson(input)
      setInput(minified)
      validateAndFormat(minified)
      toast.success('JSON minified!')
    }
  }

  const handleClear = () => {
    setInput('')
    setFormatted('')
    setError('')
    setIsValid(false)
  }

  const loadSample = () => {
    const sample = {
      "name": "DevNinja Tools",
      "version": "2.0.0",
      "description": "Modern developer tools collection",
      "tools": [
        "Base64 Encoder/Decoder",
        "JWT Decoder",
        "JSON Editor",
        "Hash Generator",
        "URL Encoder/Decoder"
      ],
      "features": {
        "realTime": true,
        "copyDownload": true,
        "responsive": true
      },
      "metadata": {
        "author": "DevNinja",
        "created": new Date().toISOString(),
        "tags": ["developer", "tools", "utilities"]
      }
    }

    const sampleString = JSON.stringify(sample, null, 2)
    setInput(sampleString)
    validateAndFormat(sampleString)
    toast.success('Sample JSON loaded!')
  }

  // Count JSON properties
  const getJsonStats = (text: string) => {
    if (!isValid || !text) return null

    try {
      const parsed = JSON.parse(text)
      const count = (obj: any): { keys: number; values: number; depth: number } => {
        let keys = 0
        let values = 0
        let maxDepth = 0

        const traverse = (item: any, depth = 1) => {
          maxDepth = Math.max(maxDepth, depth)

          if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
              values += item.length
              item.forEach(val => traverse(val, depth + 1))
            } else {
              const objKeys = Object.keys(item)
              keys += objKeys.length
              objKeys.forEach(key => {
                traverse(item[key], depth + 1)
              })
            }
          } else {
            values++
          }
        }

        traverse(obj)
        return { keys, values, depth: maxDepth }
      }

      return count(parsed)
    } catch {
      return null
    }
  }

  const stats = getJsonStats(input)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="devninja-card">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={loadSample}
              variant="outline"
              size="sm"
              className="h-8"
            >
              Load Sample
            </Button>
            <Button
              onClick={handleFormat}
              disabled={!isValid}
              variant="outline"
              size="sm"
              className="h-8"
            >
              <Maximize2 className="h-4 w-4 mr-1" />
              Format
            </Button>
            <Button
              onClick={handleMinify}
              disabled={!isValid}
              variant="outline"
              size="sm"
              className="h-8"
            >
              <Minimize2 className="h-4 w-4 mr-1" />
              Minify
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
            {isValid && (
              <>
                <Button
                  onClick={() => handleCopy(input, 'JSON')}
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button
                  onClick={() => handleDownload(input, 'formatted-json')}
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Editor */}
      <Card className="devninja-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>JSON Editor</span>
              {isValid && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Valid</span>
                </div>
              )}
              {error && (
                <div className="flex items-center space-x-1 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Invalid</span>
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Paste or type your JSON here..."
            className={`devninja-textarea min-h-[300px] font-mono text-sm ${
              error ? 'border-red-200 bg-red-50' : isValid ? 'border-green-200 bg-green-50' : ''
            }`}
          />

          {error && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex space-x-4">
              <span>{input.length} characters</span>
              <span>{new Blob([input]).size} bytes</span>
              {stats && (
                <>
                  <span>{stats.keys} keys</span>
                  <span>{stats.values} values</span>
                  <span>depth: {stats.depth}</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formatted Output */}
      {isValid && formatted && (
        <Card className="devninja-card border-green-200 bg-green-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Formatted JSON</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(formatted, 'Formatted JSON')}
                  className="h-8 px-3"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(formatted, 'formatted-json')}
                  className="h-8 px-3"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-white p-4 rounded border text-sm overflow-auto custom-scrollbar max-h-96">
              {formatted}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      <Card className="devninja-card">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">JSON Editor Features</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              A powerful JSON editor for formatting, validating, and manipulating JSON data.
              Perfect for API development, configuration files, and data analysis.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Features:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Real-time validation</li>
                  <li>Pretty formatting</li>
                  <li>Minification</li>
                  <li>JSON statistics</li>
                  <li>Error highlighting</li>
                  <li>Copy & download</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Tips:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use "Format" to prettify JSON</li>
                  <li>Use "Minify" to compress JSON</li>
                  <li>Load sample to see example</li>
                  <li>Validation happens in real-time</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}