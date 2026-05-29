'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CLINIC_INFO, NAV_LINKS } from '@/lib/constants';
import { Logo } from '@/components/Logo';

type Props = { isOpen: boolean; onClose: () => void };

export function MobileDrawer({ isOpen, onClose }: Props) {
    const pathname = usePathname();

    useEffect(() => {
        if (!isOpen) return;
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
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
                    isOpen
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none invisible'
                }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-full bg-white shadow-xl flex flex-col pb-8 transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full invisible'
                }`}
            >
                {/* Header — same as navbar */}
                <div className='flex items-center justify-between px-4 py-2'>
                    <Link
                        href='/'
                        onClick={onClose}
                        className='px-4 py-2 border border-border bg-surface backdrop-blur-sm rounded-full shadow-card'
                    >
                        <Logo text='#2a2a2a' accent='#2a2a2a' />
                    </Link>

                    <button
                        onClick={onClose}
                        className='bg-surface border border-border backdrop-blur-sm rounded-full shadow-card p-4 text-text hover:text-text'
                        aria-label='Закрыть меню'
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

                <nav className='flex flex-col w-full flex-1 gap-1 pt-4 px-4'>
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={`rounded-lg px-4 py-3 text-base transition-colors ${
                                pathname === link.href
                                    ? 'bg-accent text-primary font-semibold'
                                    : 'text-text-muted hover:bg-accent hover:text-primary'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className='px-4'>
                    <div className='bg-surface border border-border flex backdrop-blur-sm rounded-full shadow-card gap-2 p-1 w-fit mx-auto'>
                        <a
                            href={`tel:${CLINIC_INFO.phone.replace(/\s/g, '')}`}
                            className='py-3 px-6 block bg-primary rounded-full text-secondary transition-colors'
                        >
                            Позвонить
                        </a>

                        <a
                            href='https://yandex.com/maps/-/CPC5vYIh'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='py-3 px-6 block bg-primary rounded-full text-secondary transition-colors'
                        >
                            Адрес
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
