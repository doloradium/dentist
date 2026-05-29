'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

type Props = {
    images: { src: string; alt: string }[];
    initialIndex: number;
    onClose: () => void;
};

export function Lightbox({ images, initialIndex, onClose }: Props) {
    const [index, setIndex] = useState(initialIndex);
    const [scale, setScale] = useState(1);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const translateStart = useRef({ x: 0, y: 0 });
    const pinchStart = useRef(0);
    const scaleStart = useRef(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const current = images[index];

    const resetTransform = useCallback(() => {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
    }, []);

    const goTo = useCallback((i: number) => {
        setIndex(i);
        setScale(1);
        setTranslate({ x: 0, y: 0 });
    }, []);

    const prev = useCallback(
        () => goTo((index - 1 + images.length) % images.length),
        [index, images.length, goTo],
    );
    const next = useCallback(
        () => goTo((index + 1) % images.length),
        [index, images.length, goTo],
    );

    // Keyboard
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose, prev, next]);

    // Scroll lock
    useEffect(() => {
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
        };
    }, []);

    // Mouse wheel zoom
    const onWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.min(Math.max(scale * delta, 0.5), 5);
        setScale(newScale);
        if (newScale <= 1) setTranslate({ x: 0, y: 0 });
    };

    // Mouse drag
    const onMouseDown = (e: React.MouseEvent) => {
        if (scale <= 1) return;
        e.preventDefault();
        setDragging(true);
        dragStart.current = { x: e.clientX, y: e.clientY };
        translateStart.current = { ...translate };
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!dragging) return;
        setTranslate({
            x: translateStart.current.x + (e.clientX - dragStart.current.x),
            y: translateStart.current.y + (e.clientY - dragStart.current.y),
        });
    };

    const onMouseUp = (e: React.MouseEvent) => {
        if (dragging) {
            setDragging(false);
            return;
        }
        if (scale <= 1 && e.target === containerRef.current) {
            onClose();
        }
    };

    // Touch: pinch zoom + drag
    const onTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            pinchStart.current = Math.hypot(dx, dy);
            scaleStart.current = scale;
        } else if (e.touches.length === 1 && scale > 1) {
            dragStart.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
            translateStart.current = { ...translate };
            setDragging(true);
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.hypot(dx, dy);
            const newScale = Math.min(
                Math.max(scaleStart.current * (dist / pinchStart.current), 0.5),
                5,
            );
            setScale(newScale);
            if (newScale <= 1) setTranslate({ x: 0, y: 0 });
        } else if (e.touches.length === 1 && dragging) {
            setTranslate({
                x:
                    translateStart.current.x +
                    (e.touches[0].clientX - dragStart.current.x),
                y:
                    translateStart.current.y +
                    (e.touches[0].clientY - dragStart.current.y),
            });
        }
    };

    const onTouchEnd = () => setDragging(false);

    // Double-click/tap to toggle zoom
    const onDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (scale > 1) {
            resetTransform();
        } else {
            setScale(2.5);
        }
    };

    return (
        <div className='fixed inset-0 z-100 flex items-center justify-center bg-black/90'>
            {/* Close */}
            <button
                onClick={onClose}
                className='absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors'
                aria-label='Закрыть'
            >
                <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                >
                    <path d='M18 6L6 18M6 6l12 12' />
                </svg>
            </button>

            {/* Prev/Next — hide for single image */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className='absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors'
                        aria-label='Предыдущий'
                    >
                        <svg
                            width='20'
                            height='20'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <path d='M15 18l-6-6 6-6' />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        className='absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors'
                        aria-label='Следующий'
                    >
                        <svg
                            width='20'
                            height='20'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <path d='M9 18l6-6-6-6' />
                        </svg>
                    </button>
                </>
            )}

            {/* Counter — hide for single image */}
            {images.length > 1 && (
                <div className='absolute top-4 left-4 text-white/60 text-sm'>
                    {index + 1} / {images.length}
                </div>
            )}

            {/* Image container */}
            <div
                ref={containerRef}
                className='w-full h-full flex items-center justify-center overflow-hidden select-none'
                onWheel={onWheel}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={() => setDragging(false)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onDoubleClick={onDoubleClick}
                style={{
                    cursor:
                        scale > 1
                            ? dragging
                                ? 'grabbing'
                                : 'grab'
                            : 'zoom-in',
                }}
            >
                <div
                    className='transition-transform duration-100'
                    style={{
                        transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                        transitionDuration: dragging ? '0ms' : '100ms',
                    }}
                >
                    <Image
                        src={current.src}
                        alt={current.alt}
                        width={800}
                        height={1120}
                        className='max-h-[85vh] w-auto object-contain pointer-events-none'
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
