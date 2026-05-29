import Image from 'next/image';

type Props = {
    className?: string;
};

export function Arrow({ className = '' }: Props) {
    return (
        <div className={`flex w-full items-center ${className}`}>
            <Image
                src='/icons/arrow-back.svg'
                alt=''
                width={4}
                height={8}
                className='shrink-0'
            />
            <div className='flex-1 h-[0.5rem] bg-[#CCCCCC]' />
            <Image
                src='/icons/arrow-front.svg'
                alt=''
                width={16}
                height={8}
                className='shrink-0'
            />
        </div>
    );
}
