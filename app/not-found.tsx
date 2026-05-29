import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className='min-h-screen flex items-center justify-center px-4'>
                <div className='text-center max-w-md'>
                    <h1 className='text-6xl font-bold text-primary mb-4'>404</h1>
                    <h2 className='text-2xl font-bold mb-4'>
                        Страница не найдена
                    </h2>
                    <p className='text-text-muted mb-8'>
                        К сожалению, запрашиваемая страница не существует. Возможно,
                        она была удалена или вы перешли по неверной ссылке.
                    </p>
                    <Link
                        href='/'
                        className='inline-block rounded-full bg-primary px-8 py-3 font-semibold text-text transition-colors hover:bg-primary/80'
                    >
                        Вернуться на главную
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    )
}
