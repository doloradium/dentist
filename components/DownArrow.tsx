'use client'

import { ArrowVertical } from '@/components/ArrowVertical';

export function DownArrow({
    label,
    className,
}: {
    label: string;
    className?: string;
}) {
    return (
        <div className={`relative h-full flex justify-center ${className ?? ''}`}>
            <ArrowVertical />
            {label && (
                <span className='absolute left-full ml-2 top-1/2 -translate-y-1/2 text-sm text-text-muted whitespace-nowrap'>
                    {label}
                </span>
            )}
        </div>
    );
}
