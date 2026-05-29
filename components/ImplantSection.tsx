'use client';

import { useState } from 'react';
import { IMPLANT_TYPES } from '@/lib/constants';
import { ImplantModal } from '@/components/ImplantModal';

export function ImplantSection() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const active = IMPLANT_TYPES.find((t) => t.id === activeId);

    return (
        <section className='bg-accent'>
            <div className='mx-auto max-w-screen-lg px-4 pb-16 md:pb-24'>
                <h2 className='mb-12 text-center text-3xl font-bold'>
                    Виды имплантации
                </h2>
                <div className='grid grid-cols-1 gap-2 md:grid-cols-3'>
                    {IMPLANT_TYPES.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setActiveId(type.id)}
                            className='group hover:bg-text-muted/5 hover:cursor-pointer overflow-hidden rounded-3xl bg-white shadow-card border border-border transition-colors text-left'
                        >
                            <div className='p-5 flex-col justify-between h-full flex'>
                                <h3 className='text-lg font-semibold mb-2'>
                                    {type.title}
                                </h3>
                                <span className='font-medium text-primary'>
                                    Подробнее
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {active && (
                <ImplantModal
                    isOpen={!!activeId}
                    onClose={() => setActiveId(null)}
                    title={active.title}
                    image={active.image}
                    price={active.price}
                    duration={active.duration}
                    description={active.description}
                    schemeId={active.id}
                />
            )}
        </section>
    );
}
