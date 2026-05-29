import { Logo } from '@/components/Logo';
import { CLINIC_INFO, AUTHORITIES } from '@/lib/constants';

export function Footer() {
    return (
        <footer className='bg-text text-white'>
            <div className='mx-auto max-w-screen-lg px-4 py-12'>
                {/* Top section */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                    {/* Col 1: Logo + Legal */}
                    <div>
                        <div className='mb-6'>
                            <Logo text='#ffffff' accent='#3C9092' />
                        </div>
                        <div className='text-sm text-white space-y-1'>
                            <p className='whitespace-pre-line'>
                                {CLINIC_INFO.legalName}
                            </p>
                            <p>ИНН: {CLINIC_INFO.inn}</p>

                            <p className='whitespace-pre-line opacity-50'>
                                {CLINIC_INFO.legalDescription}
                            </p>
                        </div>
                    </div>

                    {/* Col 2: Address + Hours */}
                    <div className='space-y-6'>
                        <div>
                            <h3 className='font-bold text-base mb-2'>Адрес:</h3>
                            <p className='text-sm text-white/50'>
                                {CLINIC_INFO.address}
                            </p>
                        </div>
                        <div>
                            <h3 className='font-bold text-base mb-2'>
                                График работы:
                            </h3>
                            <div className='text-sm text-white/50 space-y-1'>
                                <p>{CLINIC_INFO.hoursWeekday}</p>
                                <p>{CLINIC_INFO.hoursWeekend}</p>
                            </div>
                        </div>
                    </div>

                    {/* Col 3: Phone + Email */}
                    <div className='space-y-6'>
                        <div>
                            <h3 className='font-bold text-base mb-2'>
                                Телефон
                            </h3>
                            <a
                                href={`tel:${CLINIC_INFO.phone.replace(/\s/g, '')}`}
                                className='text-sm text-white/50 hover:text-white underline transition-colors'
                            >
                                {CLINIC_INFO.phone}
                            </a>
                        </div>
                        <div>
                            <h3 className='font-bold text-base mb-2'>Email:</h3>
                            <a
                                href={`mailto:${CLINIC_INFO.email}`}
                                className='text-sm text-white/50 underline hover:text-white transition-colors'
                            >
                                {CLINIC_INFO.email}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom section: Authorities */}
                <div className='mt-10 border-t border-white/20 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-10'>
                    {AUTHORITIES.map((auth) => (
                        <div key={auth.name}>
                            <p className='font-bold text-sm'>{auth.name}</p>
                            <div className='text-sm text-white/50'>
                                {auth.phone}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}
