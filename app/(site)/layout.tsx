import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AccessibilityLoader } from '@/components/AccessibilityLoader';

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <main className='flex-1'>{children}</main>
            <Footer />

            <AccessibilityLoader />
            {/* Floating accessibility button */}
            <button
                id='specialButton'
                className='fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-text text-white shadow-lg hover:bg-text/80 transition-colors cursor-pointer'
                aria-label='Версия для слабовидящих'
                title='Версия для слабовидящих'
            >
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                    <circle cx='12' cy='12' r='3' />
                </svg>
            </button>
        </div>
    );
}
