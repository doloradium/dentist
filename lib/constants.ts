export const NAV_LINKS = [
    { href: '/', label: 'Главная' },
    { href: '/doctors', label: 'Врачи' },
    { href: '/certificates', label: 'Сертификаты' },
    { href: '/contacts', label: 'Контакты' },
];

export const CLINIC_INFO = {
    name: 'Первая Европейская Стоматология',
    legalName: 'ИП Инкелевич М.Ю.',
    legalDescription:
        'Стоматологический кабинет\n«Первая Европейская стоматология»',
    ogrn: '323940100172185',
    inn: '366238712146',
    phone: '+7 (959) 153-40-55',
    email: 'pervay_stomatologia@mail.ru',
    address: 'г. Луганск, ул. Героя Зозулина, 19а',
    hoursWeekday: 'Пн-Пт: 09:00-18:00',
    hoursWeekend: 'Сб-Вс: 10:00-16:00',
};

export const AUTHORITIES = [
    { name: 'Минздрав ЛНР', phone: '8 (8572) 920-510' },
    { name: 'Росздравнадзор ЛНР', phone: '+7 (959) 282-70-06' },
    { name: 'Роспотребнадзор ЛНР', phone: '+7 (959) 225-63-69' },
];

export const IMPLANT_TYPES = [
    {
        id: 'standard',
        title: 'Стандартная имплантация',
        image: '/images/standard.jpg',
        price: '100.000р',
        duration: '5 лет',
        description:
            'Классический метод восстановления зубов с использованием титановых имплантатов.',
    },
    {
        id: 'non-standard',
        title: 'Нестандартная имплантация',
        image: '/images/non-standard.jpg',
        price: 'от 120.000р',
        duration: '5 лет',
        description:
            'Применяется при сложных клинических случаях: недостаточном объёме кости, атрофии челюсти.',
    },
    {
        id: 'all-on',
        title: 'Всё на 4 / Всё на 6',
        image: '/images/all-on-4.jpg',
        price: 'от 350.000р',
        duration: '10 лет',
        description: 'Полное восстановление зубного ряда на 4 или 6 имплантах.',
    },
];

export const TREATMENT_STAGES = [
    {
        step: 1,
        title: 'Консультация',
        description: 'Осмотр и составление плана лечения',
    },
    { step: 2, title: 'Диагностика', description: 'Рентген, КТ и анализы' },
    { step: 3, title: 'Лечение', description: 'Проведение процедур по плану' },
    { step: 4, title: 'Результат', description: 'Здоровая и красивая улыбка' },
];
