import type { PriceEntry } from '@/lib/prices';

type Props = {
    items: PriceEntry[];
};

export function PriceTable({ items }: Props) {
    return (
        <div>
            {/* Desktop table */}
            <table className='hidden w-full md:table'>
                <thead>
                    <tr className='bg-accent text-left'>
                        <th className='px-4 py-3 font-semibold'>Услуга</th>
                        <th className='px-4 py-3 font-semibold'>Описание</th>
                        <th className='px-4 py-3 font-semibold text-right'>
                            Цена
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr
                            key={`${item.title}-${i}`}
                            className='border-b border-gray-100 even:bg-accent/50'
                        >
                            <td className='px-4 py-3 font-medium'>
                                {item.title}
                            </td>
                            <td className='px-4 py-3 text-sm text-text-muted'>
                                {item.description || '—'}
                            </td>
                            <td className='px-4 py-3 text-right font-semibold whitespace-nowrap'>
                                {item.priceFrom ? 'от ' : ''}
                                {item.price?.toLocaleString('ru-RU')} &#8381;
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mobile list */}
            <ul className='space-y-3 md:hidden'>
                {items.map((item, i) => (
                    <li
                        key={`${item.title}-${i}`}
                        className='flex items-start justify-between gap-4 rounded-lg bg-accent/50 px-4 py-3'
                    >
                        <div>
                            <p className='font-medium'>{item.title}</p>
                            {item.description && (
                                <p className='mt-1 text-sm text-text-muted'>
                                    {item.description}
                                </p>
                            )}
                        </div>
                        <span className='shrink-0 font-semibold whitespace-nowrap text-primary'>
                            {item.priceFrom ? 'от ' : ''}
                            {item.price?.toLocaleString('ru-RU')} &#8381;
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
