import type { Metadata } from 'next';
import { DoctorCard } from '@/components/DoctorCard';
import { DoctorSwiper } from '@/components/DoctorSwiper';

export const metadata: Metadata = {
    title: 'Врачи стоматологии в Луганске',
    description:
        'Опытные стоматологи Первой Европейской Стоматологии в Луганске. Хирурги-имплантологи с многолетним стажем.',
    alternates: { canonical: '/doctors' },
    openGraph: {
        title: 'Наши врачи — Первая Европейская Стоматология',
        description:
            'Познакомьтесь с командой профессиональных стоматологов нашей клиники в Луганске.',
        url: '/doctors',
    },
};

const doctors = [
    {
        name: 'Инкелевич Максим Юрьевич',
        role: 'Стоматолог-хирург',
        description: 'Стаж: с 2001 г.',
        image: '/images/doctor1.jpg',
        color: '#000000',
    },
    {
        name: 'Труфанова Мария Сергеевна',
        role: 'Стоматология детская',
        description: 'Стаж: с 2009 г.',
        image: '/images/doctor2.jpg',
        color: '#000000',
    },
];

export default function DoctorsPage() {
    return (
        <section className='mx-auto max-w-5xl px-4 pt-24 pb-12'>
            <h1 className='mb-4 text-3xl md:text-4xl font-bold text-center'>
                Наши врачи
            </h1>
            <p className='text-center text-text-muted mb-12 max-w-xl mx-auto'>
                Каждый врач нашей клиники – опытный профессионал в своей сфере.
                Мы не просто коллеги, мы – семья!
            </p>

            {/* Desktop */}
            <div className='hidden md:grid grid-cols-2 gap-8 max-w-3xl mx-auto'>
                {doctors.map((d) => (
                    <DoctorCard key={d.name} {...d} />
                ))}
            </div>

            {/* Mobile */}
            <div className='md:hidden -mx-4'>
                <DoctorSwiper doctors={doctors} />
            </div>
        </section>
    );
}
