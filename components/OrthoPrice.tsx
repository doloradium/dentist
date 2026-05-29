'use client';

import Image from 'next/image';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Lightbox } from '@/components/Lightbox';

type PriceRow = { service: string; price: string; photo?: string };
type PriceTable = { title: string; rows: PriceRow[] };

const tables: PriceTable[] = [
    {
        title: 'Приёмы',
        rows: [
            { service: 'Первичный прием ортодонта', price: '1 500' },
            {
                service: 'Повторный прием ортодонта, пластинка, 1 челюсть',
                price: '3 000',
            },
            {
                service:
                    'Повторный прием ортодонта, аппараты, небные расширители, 1 челюсть',
                price: '5 000',
            },
            {
                service: 'Повторный прием ортодонта, брекеты, дети, 1 челюсть',
                price: '4 000',
            },
            {
                service:
                    'Повторный прием ортодонта, брекеты, взрослые, 1 челюсть',
                price: '5 000',
            },
            {
                service: 'Повторный прием ортодонта, элайнеры, 1 челюсть',
                price: '10 000',
            },
        ],
    },
    {
        title: 'Диагностика',
        rows: [
            {
                service: 'Диагностические модели в оклюдаторе, 2 челюсти',
                price: '10 000',
            },
            { service: 'Сканирование, 2 челюсти', price: '10 000' },
            {
                service:
                    'Расчет диагностической модели (гипсовой или цифровой), 1 челюсть',
                price: '10 000',
            },
            {
                service: 'Анализ КЛКТ, 2 челюсти (КЛКТ оплачивается отдельно)',
                price: '10 000',
            },
            { service: 'Серия фотографий', price: '5 000' },
        ],
    },
    {
        title: 'Пластинки',
        rows: [
            {
                service: 'Пластинка одноцветная, 1 челюсть',
                price: '16 000',
                photo: '/images/prices/plate-single.jpeg',
            },
            {
                service: 'Пластинка разноцветная, 1 челюсть',
                price: '20 000',
                photo: '/images/prices/plate-multicolor.jpeg',
            },
        ],
    },
    {
        title: 'Брекеты',
        rows: [
            {
                service: 'Брекеты лигатурные, дети, 1 челюсть',
                price: '40 000',
                photo: '/images/prices/braces-ligature.jpeg',
            },
            {
                service: 'Брекеты самолигирующие Damon Q-2, дети, 1 челюсть',
                price: '50 000',
                photo: '/images/prices/damon-q2.jpeg',
            },
            {
                service:
                    'Брекеты самолигирующие Damon Q-2, взрослые, 1 челюсть',
                price: '60 000',
                photo: '/images/prices/damon-q2.jpeg',
            },
            {
                service:
                    'Брекеты самолигирующие эстетические Damon Clean, 1 челюсть',
                price: '110 000',
                photo: '/images/prices/damon-clear.jpeg',
            },
            { service: 'Замки на шестые, 1 челюсть', price: '10 000' },
            { service: 'Замки на седьмые, 1 челюсть', price: '10 000' },
            { service: 'Фиксация брекетов, 1 челюсть', price: '10 000' },
            {
                service: 'Снятие брекетов + полировка, 1 челюсть',
                price: '10 000',
            },
        ],
    },
    {
        title: 'Элайнеры',
        rows: [
            {
                service: 'Элайнеры до 20 капп',
                price: '230 000',
                photo: '/images/prices/aligners.jpeg',
            },
            {
                service: 'Элайнеры до 30 капп',
                price: '—',
                photo: '/images/prices/aligners.jpeg',
            },
            { service: 'Фиксация аттачментов, 1 челюсть', price: '10 000' },
            {
                service: 'Снятие аттачментов + полировка, 1 челюсть',
                price: '10 000',
            },
        ],
    },
    {
        title: 'Ортодонтические аппараты',
        rows: [
            { service: 'Ортодонтический аппарат стандартный', price: '45 000' },
            { service: 'Ортодонтический аппарат сложный', price: '70 000' },
        ],
    },
    {
        title: 'Небные расширители',
        rows: [
            {
                service: 'Небный расширитель стандартный',
                price: '45 000',
                photo: '/images/prices/palatal-expander-standard.jpeg',
            },
            {
                service:
                    'Небный расширитель сложный (минивинты оплачиваются отдельно)',
                price: '70 000',
                photo: '/images/prices/palatal-expander-complex.jpeg',
            },
        ],
    },
    {
        title: 'Минивинты',
        rows: [
            { service: 'Минивинт стандартный', price: '15 000' },
            { service: 'Минивинт сложный', price: '20 000' },
            { service: 'Минивинт повторный', price: '5 000' },
            { service: 'Удаление минивинта', price: '5 000' },
        ],
    },
    {
        title: 'Ретенция',
        rows: [
            {
                service: 'Ретенционная каппа, 1 челюсть, 2 штуки',
                price: '10 000',
                photo: '/images/prices/retention-cap.jpeg',
            },
            {
                service: 'Несъемный адгезивный ретейнер, 6 единиц',
                price: '10 000',
                photo: '/images/prices/adhesive-retainer.jpeg',
            },
            {
                service:
                    'Снятие несъемного адгезивного ретейнера + полировка, 1 челюсть',
                price: '10 000',
            },
        ],
    },
];

export function OrthoPrice() {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    return (
        <div className='flex flex-col gap-8'>
            {tables.map((table, tableIdx) => (
                <div
                    key={table.title}
                    className={`rounded-3xl backdrop-blur-2xl border border-black/10 shadow-card overflow-hidden ${
                        tableIdx % 2 === 0 ? 'bg-black/10' : 'bg-black/30'
                    }`}
                >
                    <table className='w-full'>
                        <thead>
                            <tr className='bg-black/15 h-[60px]'>
                                <th className='px-4 py-3 text-left font-bold'>
                                    {table.title}
                                </th>
                                <th className='px-4 py-3 text-right font-bold whitespace-nowrap'>
                                    Цена, ₽
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {table.rows.map((row, i) => (
                                <tr
                                    key={i}
                                    className='border-b border-black/5 last:border-b-0 h-[60px]'
                                >
                                    <td className='px-4 py-2.5'>
                                        <span className='flex flex-col-reverse md:flex-row md:items-center gap-2'>
                                            {row.photo && (
                                                <button
                                                    onClick={() =>
                                                        setLightboxImage(
                                                            row.photo!,
                                                        )
                                                    }
                                                    className='inline-flex items-center w-fit gap-2 shrink-0 rounded-full bg-white p-1 pe-2 text-xs font-semibold hover:bg-white/75 transition-colors cursor-pointer'
                                                >
                                                    <Image
                                                        src={row.photo}
                                                        alt=''
                                                        width={50}
                                                        height={50}
                                                        className='rounded-full size-8 object-cover'
                                                    />

                                                    <Image
                                                        src='/icons/eye.svg'
                                                        alt=''
                                                        width={50}
                                                        height={50}
                                                        className='size-6'
                                                    />
                                                </button>
                                            )}
                                            {row.service}
                                        </span>
                                    </td>
                                    <td className='px-4 py-2.5 text-right font-semibold whitespace-nowrap'>
                                        {row.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
            {lightboxImage &&
                typeof document !== 'undefined' &&
                createPortal(
                    <Lightbox
                        images={[{ src: lightboxImage, alt: 'Фото' }]}
                        initialIndex={0}
                        onClose={() => setLightboxImage(null)}
                    />,
                    document.body,
                )}
        </div>
    );
}
