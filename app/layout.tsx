import type { Metadata } from 'next'
import { Montserrat, Unbounded } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'] })
const unbounded = Unbounded({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'], variable: '--font-unbounded' })

const SITE_URL = 'https://stomatolog-lugansk.ru'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ортодонтия в Луганске — Первая Европейская Стоматология',
    template: '%s | Первая Европейская Стоматология',
  },
  description:
    'Ортодонтия в Луганске — брекеты Damon, элайнеры, пластинки. Исправление прикуса у детей и взрослых. Первая Европейская Стоматология. +7 (959) 153-40-55.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
    siteName: 'Первая Европейская Стоматология',
    title: 'Ортодонтия в Луганске — Первая Европейская Стоматология',
    description:
      'Ортодонтия в Луганске — брекеты, элайнеры, пластинки. Исправление прикуса у детей и взрослых.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Имплантация" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${montserrat.className} ${unbounded.variable} bg-surface text-text antialiased overflow-x-hidden`}>{children}</body>
    </html>
  )
}
