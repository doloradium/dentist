'use client'

import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { DoctorCard } from '@/components/DoctorCard'
import 'swiper/css'

type Doctor = {
  name: string
  role: string
  description: string
  image: string
  color: string
}

export function DoctorSwiper({ doctors }: { doctors: Doctor[] }) {
  const swiperRef = useRef<SwiperType>(null)
  const [active, setActive] = useState(0)

  return (
    <div className='flex flex-col gap-4'>
      <Swiper
        spaceBetween={16}
        slidesPerView={1.15}
        centeredSlides
        onSwiper={(s) => { swiperRef.current = s }}
        onSlideChange={(s) => setActive(s.activeIndex)}
        className='w-full !overflow-visible'
      >
        {doctors.map((d) => (
          <SwiperSlide key={d.name}>
            <DoctorCard {...d} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='flex items-center justify-center gap-4'>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className='flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-text'
          aria-label='Предыдущий'
        >
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
            <path d='M15 18l-6-6 6-6' />
          </svg>
        </button>

        <div className='flex gap-2'>
          {doctors.map((_, i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? 'w-6 bg-primary' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className='flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-text'
          aria-label='Следующий'
        >
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
            <path d='M9 18l6-6-6-6' />
          </svg>
        </button>
      </div>
    </div>
  )
}
