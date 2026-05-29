'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { DownArrow } from '@/components/DownArrow';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    image: string;
    price: string;
    duration: string;
    description: string;
    schemeId: string;
};

function SchemeBox({
    children,
    green,
    fit,
}: {
    children: React.ReactNode;
    green?: boolean;
    fit?: boolean;
}) {
    return (
        <div
            className={`rounded-2xl border border-border px-4 py-3 text-center font-medium text-sm ${
                green ? 'bg-primary/20' : 'bg-white'
            } ${fit ? 'w-fit' : 'w-full'}`}
        >
            {children}
        </div>
    );
}

function StandardScheme() {
    return (
        <div className='flex flex-col items-center gap-2'>
            <div className='flex gap-2 w-full'>
                <SchemeBox>
                    Установка имплантата и формирователя десны
                </SchemeBox>
                <SchemeBox>Установка имплантата и заглушки</SchemeBox>
            </div>

            <div className='flex w-full'>
                <div className='w-full flex flex-col items-center'>
                    <DownArrow label='3-6 мес.' />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <div className='h-12 flex flex-col items-center'>
                        <DownArrow label='3-6 мес.' />
                    </div>
                    <SchemeBox>Установка формирователя десны</SchemeBox>
                    <div className='h-12 flex flex-col items-center'>
                        <DownArrow label='10-14 дн.' />
                    </div>
                </div>
            </div>

            <SchemeBox green>
                Оттиск классический (силиконом) или цифровой
            </SchemeBox>

            <div className='h-12'>
                <DownArrow label='8-10 дней' />
            </div>

            <SchemeBox green>Установка в полости рта</SchemeBox>
        </div>
    );
}

export function ImplantModal({
    isOpen,
    onClose,
    title,
    image,
    price,
    duration,
    description,
    schemeId,
}: Props) {
    const handleClose = useCallback(() => onClose(), [onClose]);
    const panelRef = useRef<HTMLDivElement>(null);
    const touchStart = useRef(0);
    const touchDelta = useRef(0);
    const isDragging = useRef(false);
    const [visible, setVisible] = useState(false);
    const [animating, setAnimating] = useState(false);
    const schemeRef = useRef<HTMLDivElement>(null);
    const [schemeHeight, setSchemeHeight] = useState<number | undefined>(
        undefined,
    );

    // Animate in + measure scheme
    useEffect(() => {
        if (isOpen) {
            setAnimating(true);
            requestAnimationFrame(() => {
                if (schemeRef.current) {
                    setSchemeHeight(schemeRef.current.offsetHeight);
                }
                requestAnimationFrame(() => setVisible(true));
            });
        } else {
            setSchemeHeight(undefined);
        }
    }, [isOpen]);

    // Scroll lock
    useEffect(() => {
        if (!isOpen) return;
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') doClose();
        };
        document.addEventListener('keydown', onKey);

        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
            document.removeEventListener('keydown', onKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const doClose = useCallback(() => {
        setVisible(false);
        setTimeout(() => {
            setAnimating(false);
            handleClose();
        }, 300);
    }, [handleClose]);

    if (!isOpen && !animating) return null;

    const hasScheme = schemeId === 'standard';

    const onTouchStart = (e: React.TouchEvent) => {
        const el = panelRef.current;
        if (el && el.scrollTop > 0) return;
        touchStart.current = e.touches[0].clientY;
        touchDelta.current = 0;
        isDragging.current = true;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return;
        const delta = e.touches[0].clientY - touchStart.current;
        if (delta < 0) {
            touchDelta.current = 0;
            return;
        }
        touchDelta.current = delta;
        if (panelRef.current) {
            panelRef.current.style.transform = `translateY(${delta}px)`;
            panelRef.current.style.transition = 'none';
        }
    };

    const onTouchEnd = () => {
        if (!isDragging.current || !panelRef.current) return;
        isDragging.current = false;
        if (touchDelta.current > 100) {
            panelRef.current.style.transition = 'transform 300ms ease';
            panelRef.current.style.transform = 'translateY(100%)';
            setTimeout(() => {
                handleClose();
                setAnimating(false);
                setVisible(false);
            }, 300);
        } else {
            panelRef.current.style.transition = 'transform 300ms ease';
            panelRef.current.style.transform = '';
        }
        touchStart.current = 0;
        touchDelta.current = 0;
    };

    return (
        <div className='fixed inset-0 z-50 flex md:items-center md:justify-center items-end p-0 md:p-4'>
            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
                onClick={doClose}
            />

            {/* Desktop panel */}
            <div
                className={`relative z-10 hidden md:flex flex-row items-start gap-4 w-full rounded-3xl transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${hasScheme ? 'max-w-4xl' : 'max-w-lg'}`}
            >
                {hasScheme && (
                    <div
                        ref={schemeRef}
                        className='flex-1 bg-white rounded-3xl border border-border shadow-card p-6'
                    >
                        <StandardScheme />
                    </div>
                )}
                <div
                    className='flex-1 bg-white rounded-3xl border border-border shadow-card p-6 flex flex-col gap-6 overflow-hidden'
                    style={schemeHeight ? { height: schemeHeight } : undefined}
                >
                    <div className='flex items-start justify-between'>
                        <h2 className='text-2xl md:text-3xl font-bold leading-tight'>
                            {title}
                        </h2>
                        <button
                            onClick={doClose}
                            className='shrink-0 ml-4 flex h-8 w-8 items-center justify-center rounded-full text-text-muted hover:text-text transition-colors'
                            aria-label='Закрыть'
                        >
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                            >
                                <path d='M18 6L6 18M6 6l12 12' />
                            </svg>
                        </button>
                    </div>
                    <div className='flex-1 flex items-center justify-center rounded-2xl border border-border overflow-hidden'>
                        <Image
                            src={image}
                            alt={title}
                            width={400}
                            height={500}
                            className={`w-full ${hasScheme ? 'object-contain h-full' : 'object-cover max-h-[300px]'}`}
                        />
                    </div>
                    {!hasScheme && (
                        <p className='text-text-muted'>{description}</p>
                    )}
                    <button
                        onClick={doClose}
                        className='relative cursor-pointer inline-flex justify-center items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-text transition-colors hover:bg-primary/80'
                    >
                        Закрыть
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <div
                ref={panelRef}
                className={`relative z-10 md:hidden flex flex-col w-full overflow-y-auto rounded-t-3xl bg-white transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ maxHeight: '92vh' }}
            >
                {/* Swipe handle */}
                <div
                    className='sticky top-0 bg-white z-10 rounded-t-3xl cursor-grab active:cursor-grabbing touch-none'
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    <div className='flex justify-center pt-3 pb-3'>
                        <div className='h-1 w-10 rounded-full bg-gray-300' />
                    </div>
                </div>

                <div className='px-6 pb-6 flex flex-col gap-6'>
                    <h2 className='text-2xl font-bold leading-tight'>
                        {title}
                    </h2>

                    {hasScheme && <StandardScheme />}

                    <div className='flex items-center justify-center rounded-2xl border border-border overflow-hidden'>
                        <Image
                            src={image}
                            alt={title}
                            width={400}
                            height={500}
                            className={`w-full ${hasScheme ? 'object-contain' : 'object-cover max-h-[300px]'}`}
                        />
                    </div>

                    {!hasScheme && (
                        <p className='text-text-muted'>{description}</p>
                    )}

                    <button
                        onClick={doClose}
                        className='w-full rounded-full bg-primary px-6 py-3 font-semibold text-text transition-colors hover:bg-primary/80'
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
}
