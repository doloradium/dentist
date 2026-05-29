'use client'

import Image from 'next/image';

type Props = {
    className?: string;
};

export function ArrowVertical({ className = '' }: Props) {
    return (
        <div className={`flex flex-col h-full items-center ${className}`}>
            <div className='w-2 h-1 flex items-center justify-center'>
                <Image
                    src='/icons/arrow-back.svg'
                    alt=''
                    width={4}
                    height={8}
                    className='shrink-0 rotate-90'
                />
            </div>

            <div className='h-full w-[0.5rem] bg-[#CCCCCC]' />

            <div className='h-2 w-4 flex items-center justify-center'>
                <Image
                    src='/icons/arrow-front.svg'
                    alt=''
                    width={16}
                    height={8}
                    className='shrink-0 rotate-90'
                />
            </div>
        </div>
    );
}
