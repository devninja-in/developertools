/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  },
  images: {
    formats: ['image/webp', 'image/avif']
  },
  async rewrites() {
    return [
      {
        source: '/base64-encode',
        destination: '/tools/base64/encode'
      },
      {
        source: '/base64-decode',
        destination: '/tools/base64/decode'
      },
      {
        source: '/url-encode',
        destination: '/tools/url/encode'
      },
      {
        source: '/url-decode',
        destination: '/tools/url/decode'
      },
      {
        source: '/jwt-decode',
        destination: '/tools/jwt/decode'
      },
      {
        source: '/md5-hash',
        destination: '/tools/hash/md5'
      },
      {
        source: '/sha256-hash',
        destination: '/tools/hash/sha256'
      },
      {
        source: '/json-editor',
        destination: '/tools/json/editor'
      },
      {
        source: '/qr-code-generator',
        destination: '/tools/qr/generator'
      },
      {
        source: '/diff-viewer',
        destination: '/tools/diff/viewer'
      },
      {
        source: '/certificate-decoder',
        destination: '/tools/certificate/decoder'
      }
    ]
  }
}

module.exports = nextConfig