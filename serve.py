#!/usr/bin/env python3
"""
Tiny dev server for Segundo Cérebro that serves with no-cache headers.

Babel-standalone (used to transpile data.jsx and app-web.jsx in the
browser) caches transpiled output by URL+content. Combined with browser
caching, that means edits to .jsx files don't show up until the user
does a hard reload. Serving with `Cache-Control: no-store` makes the
browser fetch fresh JS on every load.

Usage:  python3 serve.py [port]   (default: 3000)
"""

import http.server
import os
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = http.server.ThreadingHTTPServer(('', port), NoCacheHandler)
    url = f'http://localhost:{port}/index.html'
    print(f'Segundo Cérebro · serving on {url}')
    print('  (no-cache headers — edits to .jsx files reload without hard-refresh)')
    print('  Ctrl-C to stop')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nbye.')


if __name__ == '__main__':
    main()
