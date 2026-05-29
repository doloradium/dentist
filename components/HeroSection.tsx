import Image from 'next/image';
import { OrthoPrice } from '@/components/OrthoPrice';

export function HeroSection() {
    return (
        <section className='pt-32 pb-24 relative overflow-hidden bg-primary w-full text-white'>
            <div className='absolute left-1/2 z-0 max-w-5xl w-full h-140 px-4 -translate-x-1/2 top-20 pointer-events-none'>
                <Image
                    src='/icons/triangle.svg'
                    alt=''
                    width={300}
                    height={300}
                    className='w-full h-auto'
                />
                <Image
                    src='/icons/triangle.svg'
                    alt=''
                    width={300}
                    height={300}
                    className='w-full h-auto -mt-[90%]'
                />
            </div>

            <div className='max-w-5xl mx-auto px-4 relative z-1'>
                <h1 className='text-3xl md:text-4xl font-bold text-center mb-16'>
                    Ортодонтия
                </h1>
                <OrthoPrice />
            </div>
        </section>
    );
}
