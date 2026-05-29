import { NextRequest, NextResponse } from 'next/server'

const attempts = new Map<string, { count: number; resetAt: number }>()

async function hashToken(value: string): Promise<string> {
  const data = new TextEncoder().encode(value + process.env.ADMIN_PASSWORD)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()
  const entry = attempts.get(ip)
  if (entry && entry.count >= 5 && now < entry.resetAt) {
    return NextResponse.json(
      { error: 'too many attempts, try later' },
      { status: 429 }
    )
  }

  const { password } = await req.json()
  if (password !== process.env.ADMIN_PASSWORD) {
    const current = entry && now < entry.resetAt ? entry.count : 0
    attempts.set(ip, { count: current + 1, resetAt: now + 15 * 60 * 1000 })
    return NextResponse.json({ error: 'wrong password' }, { status: 401 })
  }

  attempts.delete(ip)
  const token = await hashToken(password)
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return res
}
