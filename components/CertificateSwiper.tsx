'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

type Cert = { src: string; alt: string; landscape?: boolean };

type Props = {
    certificates: Cert[];
    onOpenLightbox: (index: number) => void;
};

export function CertificateSwiper({ certificates, onOpenLightbox }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const ignoreScroll = useRef(false);
    const scrollTimer = useRef<ReturnType<typeof setTimeout>>(null);

    const findClosest = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return 0;
        const center = el.scrollLeft + el.clientWidth / 2;
        let closest = 0;
        let minDist = Infinity;
        for (let i = 0; i < el.children.length; i++) {
            const child = el.children[i] as HTMLElement;
            const dist = Math.abs(
                child.offsetLeft + child.clientWidth / 2 - center,
            );
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        }
        return closest;
    }, []);

    const scrollToIndex = (i: number) => {
        const el = scrollRef.current;
        if (!el) return;
        ignoreScroll.current = true;
        setActiveIndex(i);
        const child = el.children[i] as HTMLElement;
        if (child) {
            el.scrollTo({
                left:
                    child.offsetLeft - (el.clientWidth - child.clientWidth) / 2,
                behavior: 'smooth',
            });
        }
        setTimeout(() => {
            ignoreScroll.current = false;
        }, 600);
    };

    // Only update activeIndex when scrolling stops (debounced)
    const onScroll = () => {
        if (ignoreScroll.current) return;
        if (scrollTimer.current) clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => {
            const closest = findClosest();
            setActiveIndex(closest);
        }, 80);
    };

    const prev = () =>
        scrollToIndex(
            (activeIndex - 1 + certificates.length) % certificates.length,
        );
    const next = () => scrollToIndex((activeIndex + 1) % certificates.length);

    return (
        <div className='flex flex-col gap-4 bg-text-muted/5 rounded-2xl p-6'>
            <div className='relative'>
                <div
                    ref={scrollRef}
                    onScroll={onScroll}
                    className='flex snap-x snap-mandatory overflow-x-auto gap-4 items-center'
                    style={{
                        scrollbarWidth: 'none',
                    }}
                >
                    {certificates.map((cert, i) => (
                        <button
                            key={cert.src}
                            onClick={() => onOpenLightbox(i)}
                            className={`snap-center shrink-0 rounded-xl overflow-hidden border border-border cursor-zoom-in ${
                                cert.landscape
                                    ? 'w-full aspect-[4/3]'
                                    : 'w-[75%] aspect-[2/3]'
                            }`}
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

                <button
                    onClick={prev}
                    className='absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm'
                    aria-label='Предыдущий'
                >
                    <svg
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2.5'
                    >
                        <path d='M15 18l-6-6 6-6' />
                    </svg>
                </button>
                <button
                    onClick={next}
                    className='absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm'
                    aria-label='Следующий'
                >
                    <svg
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2.5'
                    >
                        <path d='M9 18l6-6-6-6' />
                    </svg>
                </button>

                <div className='absolute top-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm'>
                    {activeIndex + 1} / {certificates.length}
                </div>
            </div>

            <div
                className='flex gap-2 overflow-x-auto py-1'
                style={{ scrollbarWidth: 'none' }}
            >
                {certificates.map((cert, i) => (
                    <button
                        key={cert.src}
                        onClick={() => scrollToIndex(i)}
                        className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                            i === activeIndex
                                ? 'border-primary scale-105'
                                : 'border-transparent opacity-50'
                        }`}
                    >
                        <Image
                            src={cert.src}
                            alt={cert.alt}
                            width={56}
                            height={56}
                            className='w-full h-full object-cover'
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
