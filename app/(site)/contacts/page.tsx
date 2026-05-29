import type { Metadata } from 'next'
import { CLINIC_INFO } from '@/lib/constants'
import { YandexMap } from '@/components/YandexMap'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Контакты стоматологии в Луганске',
  description:
    'Контакты Первой Европейской Стоматологии: г. Луганск, ул. Героя Зозулина, 19а. Телефон: +7 (959) 153-40-55. График работы: Пн-Пт 09:00-18:00, Сб-Вс 10:00-16:00.',
  alternates: { canonical: '/contacts' },
  openGraph: {
    title: 'Контакты — Первая Европейская Стоматология',
    description:
      'Адрес, телефон и график работы стоматологической клиники в Луганске.',
    url: '/contacts',
  },
}

export default function ContactsPage() {
  return (
    <section className='mx-auto max-w-screen-lg px-4 pt-24 pb-12'>
      <h1 className='mb-8 text-3xl md:text-4xl font-bold text-center'>Контакты</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Left: info cards */}
        <div className='flex flex-col gap-4'>
          <a
            href={`tel:${CLINIC_INFO.phone.replace(/\s/g, '')}`}
            className='flex items-center justify-between rounded-3xl border border-border shadow-card p-5 hover:bg-text-muted/5 transition-colors'
          >
            <div>
              <h3 className='font-bold text-base mb-1'>Наш номер:</h3>
              <p className='text-text-muted'>{CLINIC_INFO.phone}</p>
            </div>
            <Image src='/icons/phone.svg' alt='Телефон' width={28} height={28} className='shrink-0' />
          </a>

          <a
            href={`mailto:${CLINIC_INFO.email}`}
            className='flex items-center justify-between rounded-3xl border border-border shadow-card p-5 hover:bg-text-muted/5 transition-colors'
          >
            <div>
              <h3 className='font-bold text-base mb-1'>Наш email:</h3>
              <p className='text-text-muted'>{CLINIC_INFO.email}</p>
            </div>
            <Image src='/icons/mail.svg' alt='Электронная почта' width={28} height={28} className='shrink-0' />
          </a>

          <div className='flex items-center justify-between rounded-3xl border border-border shadow-card p-5'>
            <div>
              <h3 className='font-bold text-base mb-1'>График работы:</h3>
              <p className='text-text-muted'>{CLINIC_INFO.hoursWeekday}</p>
              <p className='text-text-muted'>{CLINIC_INFO.hoursWeekend}</p>
            </div>
            <Image src='/icons/calendar.svg' alt='График работы' width={28} height={28} className='shrink-0' />
          </div>

          <div className='flex gap-4'>
            <a
              href='https://vk.com/first_european'
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1 flex items-center justify-between rounded-3xl border border-border shadow-card p-5 hover:bg-text-muted/5 transition-colors'
            >
              <span className='font-bold text-base'>Мы в VK</span>
              <Image src='/icons/vk.svg' alt='VK' width={28} height={28} />
            </a>
            <a
              href='#'
              className='flex-1 flex items-center justify-between rounded-3xl border border-border shadow-card p-5 hover:bg-text-muted/5 transition-colors'
            >
              <span className='font-bold text-base'>Мы в Max</span>
              <Image src='/icons/max.svg' alt='Max' width={28} height={28} />
            </a>
          </div>
        </div>

        {/* Right: map */}
        <div className='rounded-3xl overflow-hidden border border-border shadow-card'>
          <YandexMap />
        </div>
      </div>
    </section>
  )
}
