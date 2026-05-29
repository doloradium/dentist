'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, CLINIC_INFO } from '@/lib/constants';
import { MobileDrawer } from '@/components/MobileDrawer';
import { Logo } from '@/components/Logo';

export function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <header className='fixed top-0 left-0 right-0 z-30 isolate'>
                <div className='mx-auto flex max-w-5xl items-center justify-between px-4 py-2'>
                    <Link
                        href='/'
                        className='px-4 py-2 border border-border bg-surface backdrop-blur-sm rounded-full shadow-card'
                    >
                        <Logo text='#2a2a2a' accent='#2a2a2a' />
                    </Link>

                    {/* Desktop nav */}
                    <nav className='px-4 py-2 border border-border bg-surface backdrop-blur-sm rounded-full shadow-card hidden lg:flex items-center gap-1'>
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative rounded-lg px-3 py-2 text-text ${
                                    pathname === link.href
                                        ? 'font-semibold'
                                        : ''
                                }`}
                            >
                                <span className='relative'>{link.label}</span>
                            </Link>
                        ))}
                    </nav>

                    <div className='bg-surface border border-border hidden lg:flex backdrop-blur-sm rounded-full shadow-card flex gap-2 p-1'>
                        <a
                            href={`tel:${CLINIC_INFO.phone.replace(/\s/g, '')}`}
                            className='py-3 px-6 block bg-secondary rounded-full text-text hover:text-primary transition-colors'
                        >
                            Позвонить
                        </a>

                        <a
                            href='https://yandex.com/maps/-/CPC5vYIh'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='py-3 px-6 block bg-secondary rounded-full text-text hover:text-primary transition-colors'
                        >
                            Адрес
                        </a>
                    </div>

                    {/* Hamburger */}
                    <button
                        className='bg-surface border border-border backdrop-blur-sm rounded-full shadow-card lg:hidden p-4 text-text hover:text-text'
                        onClick={() => setDrawerOpen(true)}
                        aria-label='Открыть меню'
                    >
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                        >
                            <path d='M3 12h18M3 6h18M3 18h18' />
                        </svg>
                    </button>
                </div>
            </header>

            <MobileDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
        </>
    );
}
