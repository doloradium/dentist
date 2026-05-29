import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { CertificateGrid } from '@/components/CertificateGrid';

export const metadata: Metadata = {
    title: 'Сертификаты и лицензии стоматологии',
    description:
        'Сертификаты и дипломы врачей Первой Европейской Стоматологии в Луганске. Подтверждённая квалификация и непрерывное обучение.',
    alternates: { canonical: '/certificates' },
    openGraph: {
        title: 'Сертификаты — Первая Европейская Стоматология',
        description: 'Документы, подтверждающие квалификацию наших врачей.',
        url: '/certificates',
    },
};

function getCertificates() {
    const dir = path.join(process.cwd(), 'public/images/certificates');
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map((f, i) => {
            const landscape = f.includes('horizontal');
            return {
                src: `/images/certificates/${f}`,
                alt: `Сертификат ${i + 1}`,
                landscape,
            };
        });
}

export default function CertificatesPage() {
    return (
        <>
            {/* Hero header */}
            <section className='bg-primary pt-24 pb-0 text-center relative mb-16 text-white'>
                <div className='px-4 pb-20'>
                    <h1 className='mb-4 text-3xl md:text-4xl font-bold'>
                        Сертификаты
                    </h1>
                    <p className='text-white/60 max-w-lg mx-auto'>
                        Опыт наших врачей, подтверждённый документами. Мы не
                        останавливаемся в обучении, чтобы вы получали лучшее
                        лечение
                    </p>
                </div>

                <div className='absolute left-1/2 z-0 max-w-5xl w-full h-140 px-4 -translate-x-1/2 top-35 pointer-events-none'>
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
            </section>

            {/* Certificates grid */}
            <section className='mx-auto max-w-5xl px-4 pb-12'>
                <CertificateGrid certificates={getCertificates()} />
            </section>
        </>
    );
}
