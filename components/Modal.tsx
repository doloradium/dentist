'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  image: string
}

export function Modal({ isOpen, onClose, title, description, image }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef(0)
  const touchDelta = useRef(0)

  const handleClose = useCallback(() => onClose(), [onClose])

  // Scroll lock + escape key
  useEffect(() => {
    if (!isOpen) return

    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  const onTouchStart = (e: React.TouchEvent) => {
    const panel = panelRef.current
    if (panel && panel.scrollTop > 0) return
    touchStart.current = e.touches[0].clientY
    touchDelta.current = 0
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return
    const delta = e.touches[0].clientY - touchStart.current
    if (delta < 0) return
    touchDelta.current = delta
    if (panelRef.current) {
      panelRef.current.style.transform = `translateY(${delta}px)`
      panelRef.current.style.transition = 'none'
    }
  }

  const onTouchEnd = () => {
    if (!panelRef.current) return
    panelRef.current.style.transition = 'transform 300ms ease'
    if (touchDelta.current > 100) {
      panelRef.current.style.transform = 'translateY(100%)'
      setTimeout(handleClose, 300)
    } else {
      panelRef.current.style.transform = ''
    }
    touchStart.current = 0
    touchDelta.current = 0
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="
          relative z-10 w-full overflow-y-auto bg-white
          fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl
          md:static md:max-w-lg md:max-h-[90vh] md:rounded-2xl
          transition-transform duration-300
        "
      >
        {/* Swipe indicator (mobile) */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-text-muted hover:text-text transition-colors shadow-sm"
          aria-label="Закрыть"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-[3/2] w-full">
          <Image src={image} alt={title} fill className="object-cover md:rounded-t-2xl" />
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-3">{title}</h2>
          <p className="text-text-muted leading-relaxed">{description}</p>
          <button
            onClick={handleClose}
            className="mt-6 w-full rounded-lg bg-primary px-6 py-3 text-white font-semibold hover:bg-primary-dark transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
