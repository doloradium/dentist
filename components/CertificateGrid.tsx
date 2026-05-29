'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Lightbox } from '@/components/Lightbox'
import { CertificateSwiper } from '@/components/CertificateSwiper'

type Cert = { src: string; alt: string; landscape?: boolean }

function distributeToColumns(items: Cert[], cols: number) {
  const columns: { cert: Cert; globalIndex: number }[][] =
    Array.from({ length: cols }, () => [])
  const heights = new Array(cols).fill(0)

  items.forEach((cert, i) => {
    const weight = cert.landscape ? 1 : 2
    const shortest = heights.indexOf(Math.min(...heights))
    columns[shortest].push({ cert, globalIndex: i })
    heights[shortest] += weight
  })

  return columns
}

export function CertificateGrid({ certificates }: { certificates: Cert[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const columns = distributeToColumns(certificates, 3)

  return (
    <>
      {/* Desktop: balanced columns with matched heights */}
      <div className='hidden md:flex gap-4'>
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className='flex-1 flex flex-col gap-4'
            style={{ containerType: 'inline-size' }}
          >
            {col.map(({ cert, globalIndex }) => (
              <button
                key={cert.src}
                onClick={() => setLightboxIndex(globalIndex)}
                className='block w-full overflow-hidden rounded-xl border border-border cursor-zoom-in hover:opacity-90 transition-opacity'
                style={cert.landscape
                  ? { aspectRatio: '4/3' }
                  : { height: 'calc(150cqw + 1rem)' }
                }
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={400}
                  height={cert.landscape ? 300 : 560}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: swiper */}
      <div className='md:hidden'>
        <CertificateSwiper
          certificates={certificates}
          onOpenLightbox={(i) => setLightboxIndex(i)}
        />
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={certificates}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
