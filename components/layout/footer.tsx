import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-sm font-bold">
                DN
              </div>
              <span className="font-semibold">DevNinja Tools</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional developer utilities for modern workflows.
              Built with care by the DevNinja team.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Access</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/base64" className="text-muted-foreground hover:text-foreground transition-colors">
                  Base64 Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/jwt/decode" className="text-muted-foreground hover:text-foreground transition-colors">
                  JWT Decoder
                </Link>
              </li>
              <li>
                <Link href="/tools/json/editor" className="text-muted-foreground hover:text-foreground transition-colors">
                  JSON Editor
                </Link>
              </li>
              <li>
                <Link href="/tools/hash" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hash Generator
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 DevNinja. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link href="https://devninja.in" className="hover:text-foreground transition-colors">
              DevNinja.in
            </Link>
            <span>•</span>
            <span>Made with ❤️ for developers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}