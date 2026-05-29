import { NextRequest, NextResponse } from 'next/server'

// Middleware only runs in dev/SSR mode, not in static export
if (process.env.STATIC_EXPORT === 'true') {
  module.exports = {}
}

async function hashToken(value: string): Promise<string> {
  const data = new TextEncoder().encode(value + process.env.ADMIN_PASSWORD)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value
  const expected = await hashToken(process.env.ADMIN_PASSWORD!)
  if (token === expected) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/api/keystatic')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('from', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/keystatic', '/keystatic/:path*', '/api/keystatic/:path*'],
}
