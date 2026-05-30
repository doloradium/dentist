import type { Metadata } from 'next'
import { HeroSection } from '@/components/HeroSection'

export const metadata: Metadata = {
  title: 'Ортодонтия в Луганске — брекеты, элайнеры, пластинки | Первая Европейская Стоматология',
  description:
    'Ортодонтия в Луганске — установка брекетов Damon, элайнеров, пластинок. Исправление прикуса у детей и взрослых. Первая Европейская Стоматология. Запись: +7 (959) 153-40-55.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Ортодонтия в Луганске — брекеты, элайнеры, пластинки',
    description:
      'Исправление прикуса у детей и взрослых. Брекеты Damon Q-2, Damon Clean, элайнеры, пластинки. Запишитесь на приём!',
    url: '/',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Dentist', 'MedicalBusiness'],
  name: 'Первая Европейская Стоматология',
  url: 'https://stomatolog-lugansk.ru',
  telephone: '+7 (959) 153-40-55',
  email: 'pervay_stomatologia@mail.ru',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Героя Зозулина, 19а',
    addressLocality: 'Луганск',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.571512,
    longitude: 39.314272,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '16:00',
    },
  ],
  medicalSpecialty: 'Orthodontics',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
    </>
  )
}
