'use client'

import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

function LoginForm() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/keystatic'
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const password = new FormData(e.currentTarget).get('password') as string
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      window.location.href = from
    } else {
      setError(true)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-5 rounded-2xl bg-white p-8 shadow-lg"
    >
      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
      </div>

      <h1 className="text-center text-xl font-bold">Вход в админку</h1>

      <input
        name="password"
        type="password"
        placeholder="Пароль"
        autoFocus
        className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary-light"
      />

      {error && <p className="text-center text-sm text-red-500">Неверный пароль</p>}

      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Войти
      </button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-accent px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  )
}
