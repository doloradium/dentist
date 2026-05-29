import { Arrow } from '@/components/Arrow';
import { DownArrow } from '@/components/DownArrow';

export function TreatmentStages() {
    return (
        <section
            id='scheme'
            className='mx-auto w-full max-w-screen-lg px-4 py-16 md:py-24'
        >
            <h2 className='mb-12 text-center text-3xl font-bold'>
                С чего начать?
            </h2>

            <div className='flex max-w-sm mx-auto lg:ml-0 lg:max-w-full items-stretch w-full flex-col lg:flex-row gap-2'>
                {/* Step 1 */}
                <div className='flex-1 min-w-0 rounded-3xl border border-border shadow-card p-4 md:p-6'>
                    <div className='flex items-start justify-between gap-4 mb-6'>
                        <h2 className='text-lg md:text-xl font-bold leading-tight text-center lg:text-left w-full'>
                            Диагностика пациента
                        </h2>
                        <span className='text-5xl font-bold hidden lg:block text-primary shrink-0'>
                            1
                        </span>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <div className='w-full max-w-xs mx-auto'>
                            <h3 className='font-bold text-center lg:text-start text-lg mb-2'>
                                Первая консультация
                            </h3>
                            <ul className='space-y-1 text-text-muted leading-5'>
                                <li className='flex gap-2'>
                                    <span>&middot;</span>оформление медкарты
                                </li>
                                <li className='flex gap-2'>
                                    <span>&middot;</span>знакомство с хирургом
                                </li>
                                <li className='flex gap-2'>
                                    <span>&middot;</span>заполнение направления
                                    на КТ
                                </li>
                            </ul>
                        </div>

                        <div className='md:hidden self-center h-12'>
                            <DownArrow label='' />
                        </div>

                        <div className='w-full max-w-xs mx-auto'>
                            <h3 className='font-bold text-center lg:text-start text-lg mb-2'>
                                Вторая консультация
                            </h3>
                            <ul className='space-y-1 text-text-muted leading-5'>
                                <li className='flex gap-2'>
                                    <span>&middot;</span>анализ КТ
                                </li>
                                <li className='flex gap-2'>
                                    <span>&middot;</span>составление плана
                                    лечения и стоимости
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='flex-[1.5] min-w-0 gap-2 lg:gap-12 flex lg:flex-col self-end'>
                    <div className='hidden lg:block shrink-0 w-full'>
                        <Arrow />
                    </div>
                    <div className='lg:hidden flex-1 mr-4'>
                        <DownArrow label='' />
                    </div>

                    <div className='flex h-fit lg:flex-row flex-col items-center gap-2'>
                        {/* Arrow 1→2 */}
                        <div className='hidden lg:block shrink-0 w-12'>
                            <Arrow />
                        </div>
                        <div className='lg:hidden self-center h-12'>
                            <DownArrow label='' />
                        </div>

                        {/* Step 2 */}
                        <div
                            className='flex-1 min-w-0 flex flex-col items-center justify-center rounded-3xl shadow-card p-4 md:p-6 h-fit'
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='none' rx='24' ry='24' stroke='%232a2a2a20' stroke-width='2' stroke-dasharray='12%2C8' /%3E%3C/svg%3E")`,
                            }}
                        >
                            <div className='flex items-start justify-between gap-4 mb-6 w-full'>
                                <h2 className='text-lg md:text-xl font-bold leading-tight text-center lg:text-left'>
                                    Санация полости рта
                                </h2>
                                <span className='text-5xl hidden lg:block font-bold text-[#CCCCCC] shrink-0'>
                                    2
                                </span>
                            </div>

                            <div className='lg:w-full text-left w-fit'>
                                <h3 className='font-bold text-lg mb-2 text-center lg:text-left'>
                                    Если необходимо:
                                </h3>
                                <ul className='space-y-1 text-text-muted leading-5 w-fit'>
                                    <li className='flex gap-2'>
                                        <span>&middot;</span>лечение десны
                                    </li>
                                    <li className='flex gap-2'>
                                        <span>&middot;</span>удаления
                                    </li>
                                    <li className='flex gap-2'>
                                        <span>&middot;</span>лечение зубов
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Arrow 2→3 */}
                        <div className='hidden lg:block shrink-0 w-12'>
                            <Arrow />
                        </div>
                        <div className='lg:hidden self-center h-12'>
                            <DownArrow label='' />
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className='flex-1 min-w-0 border-border border rounded-3xl shadow-card bg-primary/20 p-4 md:p-6'>
                    <div className='flex items-start justify-between gap-4 mb-6'>
                        <h2 className='text-lg md:text-xl font-bold leading-tight text-center lg:text-left w-full'>
                            Стандартная имплантация
                        </h2>
                        <span className='text-5xl hidden lg:block font-bold text-primary shrink-0'>
                            3
                        </span>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <div>
                            <h3 className='font-bold text-lg mb-2 text-center lg:text-left'>
                                Хирургический этап
                            </h3>
                            <p className='lg:max-w-3xl mx-auto lg:ml-0 max-w-xs text-text-muted text-center lg:text-left'>
                                установка имплантата произведенного на заводе в
                                Германии
                            </p>
                        </div>

                        <div className='md:hidden self-center h-12'>
                            <DownArrow label='' />
                        </div>

                        <div>
                            <h3 className='font-bold text-lg mb-2 text-center lg:text-left'>
                                Протезирование
                            </h3>
                            <p className='lg:max-w-3xl mx-auto lg:ml-0 max-w-xs text-text-muted text-center lg:text-left'>
                                установка коронки из диоксида циркония в полости
                                рта
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
