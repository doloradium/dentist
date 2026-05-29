import Image from 'next/image';

type Props = {
    name: string;
    role: string;
    description: string;
    image: string;
    color: string;
};

export function DoctorCard({ name, role, description, image, color }: Props) {
    return (
        <div className='relative overflow-hidden rounded-3xl bg-text-muted/10 aspect-[4/5]'>
            <Image src={image} alt={name} fill className='object-cover' />

            {/* Info overlay at bottom */}
            <div className='p-2 absolute bottom-0 left-0 right-0'>
                <div className='p-4 bg-card border border-border backdrop-blur-md rounded-2xl'>
                    <h3
                        className='text-lg md:max-w-[80%] font-bold mb-4 leading-tight'
                        style={{ color }}
                    >
                        {name}
                    </h3>
                    <p className='text-lg' style={{ color }}>
                        {role}
                    </p>
                    <p className='opacity-50' style={{ color }}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
